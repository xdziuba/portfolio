import type { NextConfig } from "next";
import { DEFAULT_LOCALE } from "./src/i18n/config";

/**
 * Security headers. These cost nothing at runtime and are what Lighthouse's
 * "Best Practices" audit looks for. No CSP is set here: the 3D scene compiles
 * shaders at runtime and Next injects inline bootstrap scripts, so a strict
 * policy would need nonce plumbing that this static site does not justify.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  /**
   * Bundles a self-contained server into .next/standalone with only the runtime
   * dependencies it actually traced. Built for deploying to a small VPS: the
   * server never needs `npm install`, which matters on a box with little RAM
   * where installing (or building) would be the thing that runs out of memory.
   */
  output: "standalone",

  // Every image ships from /public, so no remote loader config is needed.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  /**
   * The root layout lives in the [locale] segment because <html lang> depends on it,
   * so `/` is not a route. A config redirect handles it without pulling in a proxy —
   * one less runtime component for a fully static site. Temporary, not permanent:
   * the default locale is a choice that may change.
   */
  async redirects() {
    return [{ source: "/", destination: `/${DEFAULT_LOCALE}`, permanent: false }];
  },
};

export default nextConfig;
