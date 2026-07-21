/**
 * Locale configuration.
 *
 * Two locales, each with its own route segment (/en, /pl) rather than a
 * client-side toggle. That keeps every page server-rendered, gives search engines
 * a real URL per language to index with hreflang, and makes the switch work with
 * JavaScript disabled — it is a link, not a state change.
 */

export const LOCALES = ["en", "pl"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Maps to the lang attribute and Open Graph locale. */
export const LOCALE_META: Record<Locale, { htmlLang: string; ogLocale: string; label: string; name: string }> = {
  en: { htmlLang: "en", ogLocale: "en_US", label: "EN", name: "English" },
  pl: { htmlLang: "pl", ogLocale: "pl_PL", label: "PL", name: "Polski" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
