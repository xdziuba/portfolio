/**
 * Site-level constants that do not vary by language.
 *
 * metadataBase, the sitemap and robots.txt all need an absolute origin, and the
 * Next docs are explicit that sitemap/robots do not read metadataBase — so the
 * origin is resolved once here and imported everywhere it is needed. Titles and
 * descriptions live in the locale dictionaries instead.
 */

function resolveSiteUrl(): string {
  // Explicit configuration always wins.
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  // Vercel exposes the stable production domain at build time.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  // Local development. Set NEXT_PUBLIC_SITE_URL before deploying so that canonical
  // URLs, Open Graph tags and the sitemap point at the real origin.
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE = {
  url: SITE_URL,
  name: "Paweł Dziuba",
} as const;
