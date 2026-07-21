import type { Dictionary } from "@/i18n/types";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

/**
 * About. Grounded and short.
 *
 * The avatar is not used: the GitHub account still carries the default generated
 * identicon, and blowing that up into a portrait would be worse than no image.
 * The interests panel is explicitly labelled as stated interests, because no
 * repository backs them and implying otherwise would be an invention.
 */
export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;

  return (
    <section id="about" className="scroll-mt-24 py-[var(--section-y)]">
      <div className="container-rail">
        <SectionHeader index={about.index} label={about.label} title={about.title} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Spacing lives on the container, not the paragraphs. Each <p> is the only
              child of its own Reveal wrapper, so a `last:mb-0` on the paragraph
              matched every one of them and collapsed the gaps entirely. */}
          <div className="space-y-5 lg:col-span-7">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="max-w-[38rem] text-[1rem] leading-[1.75] text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="glass rounded-[var(--r-md)] p-6">
                <p className="meta text-accent/80">{about.interests.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {about.interests.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-3">
                      <span aria-hidden className="mt-[0.4rem] h-px w-4 shrink-0 bg-accent/40" />
                      <span className="text-[0.92rem] text-text">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-[var(--color-line)] pt-4 text-[0.78rem] leading-relaxed text-faint">
                  {about.interests.note}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 border-l border-[var(--color-line-strong)] pl-4 text-[0.84rem] leading-relaxed text-faint">
                {about.education}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
