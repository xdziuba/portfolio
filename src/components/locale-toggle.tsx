"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";

/**
 * Language switch.
 *
 * Built from real links, not state: each option navigates to that locale's URL, so
 * it works with JavaScript disabled, can be opened in a new tab, and gives search
 * engines a crawlable path to both translations. The sliding indicator is a CSS
 * transform behind the labels — no layout animation, no measurement.
 *
 * The current pathname is only used to preserve the hash-free path shape when the
 * route grows beyond a single page.
 */
export function LocaleToggle({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  // Swap only the leading locale segment, leaving any deeper path intact.
  const pathFor = (next: Locale) => {
    const rest = pathname.replace(/^\/(en|pl)(?=\/|$)/, "");
    return `/${next}${rest}`;
  };

  const activeIndex = LOCALES.indexOf(locale);

  return (
    <div
      role="group"
      aria-label={label}
      className="relative flex items-center rounded-[var(--r-sm)] border border-[var(--color-line)] p-0.5"
    >
      {/* The moving highlight. Sized to half the control and translated into place. */}
      <span
        aria-hidden
        className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-[3px] bg-white/[0.09] transition-transform duration-[var(--dur-base)] ease-[var(--ease-signal)]"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {LOCALES.map((option) => {
        const isActive = option === locale;
        return (
          <Link
            key={option}
            href={pathFor(option)}
            hrefLang={LOCALE_META[option].htmlLang}
            aria-current={isActive ? "true" : undefined}
            /* The inactive label uses `muted`, not `faint`. On mobile the nav falls
               back to an opaque surface for paint cost, and `faint` measured 4.43:1
               against it — just under AA. `muted` is 6.4:1 and still reads as the
               unselected option next to the near-white active one. */
            className={`relative z-10 min-w-[2.4rem] px-2 py-1 text-center font-mono text-[0.7rem] tracking-[0.1em] transition-colors duration-[var(--dur-fast)] ${
              isActive ? "text-text" : "text-muted hover:text-text"
            }`}
          >
            {LOCALE_META[option].label}
            <span className="sr-only"> — {LOCALE_META[option].name}</span>
          </Link>
        );
      })}
    </div>
  );
}
