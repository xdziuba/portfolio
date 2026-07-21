import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { en } from "./en";
import { pl } from "./pl";

/**
 * Both dictionaries are plain modules resolved at build time. There is no async
 * loading and no runtime fetch: the page is statically prerendered per locale, so
 * shipping both is a compile-time concern, not a request-time one.
 */
const DICTIONARIES: Record<Locale, Dictionary> = { en, pl };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Build a locale-prefixed path, e.g. localePath("pl", "#work") -> "/pl#work". */
export function localePath(locale: Locale, hash = ""): string {
  return `/${locale}${hash}`;
}
