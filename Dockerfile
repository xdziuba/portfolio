# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Multi-stage build producing a small runtime image around Next's standalone
# output. The final stage carries no source, no dev dependencies and no package
# manager — only the traced runtime files, which is what keeps it viable on a
# VPS with little memory and little disk.
# ---------------------------------------------------------------------------

FROM node:24-alpine AS deps
WORKDIR /app
# Some transitive native modules expect glibc symbols; this is the standard
# Alpine shim and costs a couple of hundred kilobytes.
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci


FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so the
# public origin has to be known HERE — setting it at runtime would leave
# canonical URLs, Open Graph tags and the sitemap pointing at localhost.
ARG NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Run as an unprivileged user. If the container is ever compromised, this is the
# difference between a contained process and root on the host namespace.
# -G puts the user in the group we just made; without it adduser -S falls back to
# "nogroup", which quietly mismatches the --chown below.
RUN addgroup -g 1001 -S nodejs && adduser -S -u 1001 -G nodejs nextjs

# The standalone server, then the two things Next does not place inside it.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000
ENV PORT=3000
# Binding to :: accepts IPv6 and, on a dual-stack kernel, IPv4-mapped clients too
# — which matters on a host whose only public address is IPv6.
ENV HOSTNAME="::"

CMD ["node", "server.js"]
