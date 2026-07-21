import { ArrowUpRight } from "lucide-react";
import { ARCHIVE } from "@/content/projects";
import type { GithubData } from "@/lib/github";
import type { Dictionary } from "@/i18n/types";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

/**
 * Repository overview.
 *
 * Numbers are stated flatly. Eighteen public repositories and a single-digit star
 * count are not achievements to dress up, and presenting them as such would be the
 * fastest way to lose a reader's trust.
 *
 * On the language chart: a stacked categorical bar was rejected. Running this
 * site's cold palette through a CVD validator returns ΔE 7.5 between its two blues
 * for *normal* vision — below the usable floor — so colour cannot carry identity
 * here. Instead each language is its own labelled row, colour encodes magnitude
 * only through a single hue, and identity is always the text.
 */

const MAX_LANGUAGES = 6;

export function Repositories({ dict, github }: { dict: Dictionary; github: GithubData }) {
  const copy = dict.repositories;

  const shown = github.languages.slice(0, MAX_LANGUAGES);
  const restShare = github.languages.slice(MAX_LANGUAGES).reduce((sum, l) => sum + l.share, 0);
  const rows = [
    ...shown,
    ...(restShare >= 0.1 ? [{ name: copy.other, bytes: 0, share: +restShare.toFixed(1) }] : []),
  ];
  const top = rows[0]?.share ?? 100;

  const facts = [
    { label: copy.publicRepos, value: String(github.profile.publicRepos) },
    { label: copy.original, value: String(github.profile.ownedRepos) },
    { label: copy.forks, value: String(github.profile.forkedRepos) },
    { label: copy.firstRepo, value: github.profile.createdAt },
  ];

  return (
    <section id="repositories" className="scroll-mt-24 py-[var(--section-y)]">
      <div className="container-rail">
        <SectionHeader index={copy.index} label={copy.label} title={copy.title} intro={copy.intro} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* counts + language distribution */}
          <div className="lg:col-span-5">
            <Reveal>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-md)] border border-[var(--color-line)]">
                {facts.map((fact) => (
                  <div key={fact.label} className="bg-white/[0.015] px-4 py-4">
                    <dt className="meta text-[0.58rem]">{fact.label}</dt>
                    <dd className="mt-1.5 font-display text-[1.5rem] leading-none tracking-tight text-text">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="mt-8">
                <figcaption className="meta mb-4">{copy.chartCaption}</figcaption>
                <ul className="space-y-2.5">
                  {rows.map((lang, i) => (
                    <li key={lang.name} className="grid grid-cols-[7.5rem_1fr_2.9rem] items-center gap-3">
                      <span className="truncate font-mono text-[0.76rem] text-muted">{lang.name}</span>
                      <span aria-hidden className="h-[6px] rounded-[2px] bg-white/[0.05]">
                        <span
                          className="block h-full rounded-[2px] bg-accent"
                          style={{
                            width: `${Math.max((lang.share / top) * 100, 1.5)}%`,
                            // One hue; opacity steps with rank so lightness stays monotonic.
                            opacity: Math.max(0.95 - i * 0.13, 0.3),
                          }}
                        />
                      </span>
                      {/* toFixed keeps the column aligned: a bare 5 next to 50.6 reads as a defect. */}
                      <span className="text-right font-mono text-[0.72rem] text-faint">
                        {lang.share.toFixed(1)}%
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.72rem] leading-relaxed text-faint">{copy.languageNote}</p>
              </figure>
            </Reveal>
          </div>

          {/* the rest of the repositories */}
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <p className="meta mb-5">{copy.otherLabel}</p>
            </Reveal>
            <ul>
              {ARCHIVE.map((entry, i) => {
                const text = dict.archive[entry.slug];
                return (
                  <Reveal as="li" key={entry.slug} delay={Math.min(i * 0.03, 0.15)}>
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group block border-t border-[var(--color-line)] py-4 transition-colors hover:border-accent/30"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-[1.02rem] tracking-tight text-text transition-colors group-hover:text-accent">
                          {text.name}
                        </h3>
                        <span className="font-mono text-[0.68rem] text-faint">{entry.language}</span>
                        <span className="font-mono text-[0.68rem] text-faint">{entry.updated}</span>
                        {entry.kind === "coursework" ? (
                          <span className="rounded-[var(--r-xs)] border border-[var(--color-line)] px-1.5 py-0.5 font-mono text-[0.6rem] tracking-wider text-faint uppercase">
                            {copy.coursework}
                          </span>
                        ) : null}
                        <ArrowUpRight
                          size={13}
                          aria-hidden
                          className="ml-auto shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </div>
                      <p className="mt-2 max-w-[44rem] text-[0.85rem] leading-relaxed text-muted">{text.note}</p>
                      <span className="sr-only">{dict.nav.newTab}</span>
                    </a>
                  </Reveal>
                );
              })}
            </ul>
            <Reveal delay={0.2}>
              <p className="mt-6 border-t border-[var(--color-line)] pt-4 text-[0.76rem] leading-relaxed text-faint">
                {copy.exclusionNote}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
