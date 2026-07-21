import { resolveProjectUrl } from "@/content/projects";
import type { Dictionary } from "@/i18n/types";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

/**
 * Technical profile as a signal path rather than a logo wall.
 *
 * Each capability is a node on a vertical trace, and every group has to name the
 * repositories that demonstrate it — a link to working code is a stronger claim
 * than a percentage bar, and it is checkable.
 *
 * Interaction is CSS-only (group-hover / focus-within), so it degrades to plain
 * readable HTML with JavaScript off and never traps a keyboard user.
 */
export function Stack({ dict }: { dict: Dictionary }) {
  return (
    <section id="stack" className="scroll-mt-24 py-[var(--section-y)]">
      <div className="container-rail">
        <SectionHeader
          index={dict.stack.index}
          label={dict.stack.label}
          title={dict.stack.title}
          intro={dict.stack.intro}
        />

        <ol className="relative">
          {/* the trace running through every node */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-transparent via-[var(--color-line-strong)] to-transparent sm:left-[3px]"
          />

          {dict.stack.capabilities.map((capability, i) => (
            <Reveal
              as="li"
              key={capability.id}
              delay={i * 0.04}
              className="group relative border-b border-[var(--color-line)] py-8 pl-6 last:border-b-0 sm:pl-10"
            >
              {/* node */}
              <span
                aria-hidden
                className="absolute top-[2.45rem] left-[-3px] block h-[7px] w-[7px] rounded-full bg-[var(--color-line-strong)] transition-all duration-[var(--dur-base)] group-hover:bg-accent group-hover:shadow-[0_0_12px_2px_rgba(47,211,245,0.55)] group-focus-within:bg-accent"
              />

              <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-4">
                  <p className="meta text-accent/70">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-display text-[1.25rem] leading-tight font-semibold tracking-[-0.02em]">
                    {capability.title}
                  </h3>
                  <p className="mt-2.5 text-[0.86rem] leading-relaxed text-muted lg:max-w-[24rem]">
                    {capability.note}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {capability.items.map((item) => (
                      <li
                        key={item}
                        className="font-mono text-[0.76rem] text-faint transition-colors duration-[var(--dur-base)] group-hover:text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3">
                  <p className="meta mb-2 text-[0.6rem]">{dict.stack.seenIn}</p>
                  <ul className="space-y-1">
                    {capability.evidence.map((slug) => {
                      const project = resolveProjectUrl(slug);
                      if (!project) return null;
                      return (
                        <li key={slug}>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 py-0.5 font-mono text-[0.76rem] text-muted transition-colors hover:text-accent"
                          >
                            <span
                              aria-hidden
                              className="inline-block h-px w-3 bg-[var(--color-line-strong)] transition-colors group-hover:bg-accent/50"
                            />
                            {project.name}
                            <span className="sr-only">{dict.stack.repoNewTab}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
