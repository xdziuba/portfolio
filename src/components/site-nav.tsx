"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { PROFILE } from "@/content/projects";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { Monogram } from "@/components/monogram";
import { LocaleToggle } from "@/components/locale-toggle";

/**
 * Compact translucent navigation.
 *
 * Glass is justified here — the bar genuinely floats over scrolling content. The
 * scroll state only tightens padding and raises the border contrast; it does not
 * resize type, which would shift layout.
 */
export function SiteNav({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Passive listener writing a boolean — no React state churn per scroll frame.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile panel and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-rail">
        <nav
          aria-label={dict.nav.ariaLabel}
          className={`glass mt-3 flex items-center justify-between rounded-[var(--r-md)] transition-all duration-[var(--dur-base)] ${
            scrolled ? "px-4 py-2.5" : "px-4 py-3.5 sm:px-5"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5 rounded-[var(--r-sm)] text-text"
            aria-label={`${PROFILE.name} — ${dict.nav.backToTop}`}
          >
            <Monogram className="h-7 w-7 shrink-0" />
            {/* Below ~370px the bar holds the monogram, the language switch and the
                menu button; the name wrapped onto a second line there, so it steps
                aside and the monogram carries the identity. */}
            <span className="font-display text-[0.9rem] leading-none font-medium tracking-tight max-[369px]:hidden">
              {PROFILE.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {dict.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative block rounded-[var(--r-sm)] px-3 py-2 text-[0.82rem] text-muted transition-colors duration-[var(--dur-fast)] hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="ml-2 border-l border-[var(--color-line)] pl-3">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="block rounded-[var(--r-sm)] px-2 py-2 text-[0.82rem] text-muted transition-colors duration-[var(--dur-fast)] hover:text-accent"
              >
                {dict.nav.github}
                <span className="sr-only"> {dict.nav.newTab}</span>
              </a>
            </li>
            <li className="ml-2">
              <LocaleToggle locale={locale} label={dict.nav.languageLabel} />
            </li>
          </ul>

          {/* On small screens the language switch stays in the bar — it is the one
              control a visitor may need before reading anything else. */}
          <div className="flex items-center gap-1 md:hidden">
            <LocaleToggle locale={locale} label={dict.nav.languageLabel} />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-1.5 grid h-11 w-11 place-items-center rounded-[var(--r-sm)] text-muted transition-colors hover:text-text"
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
              <span className="sr-only">{open ? dict.nav.closeMenu : dict.nav.openMenu}</span>
            </button>
          </div>
        </nav>

        {/* Mobile panel. Rendered as a sibling rather than inside the bar so the
            glass edge of the bar stays intact while it is open. */}
        <div id="mobile-nav" hidden={!open} className="glass mt-2 rounded-[var(--r-md)] p-2 md:hidden">
          <ul>
            {dict.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center rounded-[var(--r-sm)] px-3 text-[0.95rem] text-muted transition-colors hover:bg-white/5 hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center rounded-[var(--r-sm)] px-3 text-[0.95rem] text-accent transition-colors hover:bg-white/5"
              >
                {dict.nav.github}
                <span className="sr-only"> {dict.nav.newTab}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
