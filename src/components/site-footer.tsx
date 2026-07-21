import { PROFILE } from "@/content/projects";
import type { Dictionary } from "@/i18n/types";
import { Monogram } from "@/components/monogram";

/**
 * Footer. Restrained by design.
 *
 * The closing line is the one place the signal metaphor is stated outright, as a
 * link status rather than a slogan. The year is computed at render time so it never
 * goes stale.
 */
export function SiteFooter({ dict, isLive }: { dict: Dictionary; isLive: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] py-10">
      <div className="container-rail">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Monogram className="h-7 w-7 shrink-0 text-muted" />
            <div>
              <p className="font-display text-[0.92rem] tracking-tight text-text">{PROFILE.name}</p>
              <p className="font-mono text-[0.68rem] text-faint">© {year}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[0.76rem] text-muted transition-colors hover:text-accent"
            >
              github.com/{PROFILE.handle}
              <span className="sr-only"> {dict.nav.newTab}</span>
            </a>
            <p className="font-mono text-[0.7rem] text-faint">{dict.footer.stackNote}</p>
          </div>
        </div>

        {/* Link status, not a sign-off. */}
        <div className="mt-8 flex items-center gap-3 border-t border-[var(--color-line)] pt-5">
          <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
          <p className="font-mono text-[0.66rem] tracking-[0.14em] text-faint uppercase">
            {isLive ? dict.footer.live : dict.footer.snapshot}
          </p>
        </div>
      </div>
    </footer>
  );
}
