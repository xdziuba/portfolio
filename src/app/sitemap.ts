import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LOCALES, LOCALE_META } from "@/i18n/config";

/**
 * One entry per locale, each declaring the other as an alternate so search engines
 * treat them as translations rather than duplicates. The origin is imported rather
 * than taken from metadataBase — the Next docs only scope metadataBase to metadata
 * fields and say nothing about sitemap/robots reading it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [LOCALE_META[locale].htmlLang, `${SITE_URL}/${locale}`]),
  );

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages },
  }));
}
