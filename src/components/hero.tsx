import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/content/projects";
import type { Dictionary } from "@/i18n/types";
import { HeroCanvas } from "@/components/hero/hero-canvas";
import { RevealLine, RevealOnLoad } from "@/components/reveal";

/**
 * Hero.
 *
 * The 3D object sits behind the type rather than beside it, masked so the reading
 * column keeps its contrast. The INPUT / TRANSFORM / OUTPUT labels live in the DOM,
 * not the canvas — they are the actual explanation of the object, so they must be
 * selectable, translatable and reachable by a screen reader.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-center pt-28 pb-16">
      {/* Scene layer. Pushed right on wide screens so it never sits under the headline. */}
      <div
        /* Held well back on small screens: with the graphic beside the text there is
           no room, so it sits behind the reading column and must not compete with it. */
        /* Starts further right than the reading column ends, and the mask keeps a
           small opaque core so the falloff clears the paragraph. Before this the
           signal path ran a hairline and a pulse dot straight through the lede. */
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 sm:opacity-45 lg:left-[37%] lg:opacity-100"
        style={{
          maskImage: "radial-gradient(115% 100% at 68% 50%, #000 26%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(115% 100% at 68% 50%, #000 26%, transparent 76%)",
        }}
      >
        <HeroCanvas label={dict.visuals.hero} />
      </div>

      <div className="container-rail">
        {/* Wider than the reading measure so the headline keeps one line per phrase.
            Polish is ~20% longer than English here; at the previous width it broke
            into four lines with "sygnał," stranded on its own. */}
        <div className="max-w-[53rem]">
          <RevealOnLoad>
            {/* The job title is long once uppercased and letter-spaced; at 320px it
                filled the column exactly. Tightening the tracking on the narrowest
                screens keeps it on one line with room to spare. */}
            <p className="meta mb-6 flex items-center gap-2.5 max-[359px]:tracking-[0.08em]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_1px_rgba(47,211,245,0.7)]" />
              {hero.eyebrow}
            </p>
          </RevealOnLoad>

          <h1 className="font-display text-[clamp(2.35rem,6.6vw,5.1rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
            <RevealLine delay={0.05}>{hero.headline[0]}</RevealLine>
            <RevealLine delay={0.15}>
              <span className="text-gradient-signal">{hero.headline[1]}</span>
            </RevealLine>
          </h1>

          <RevealOnLoad delay={0.3}>
            <p className="mt-7 max-w-[38rem] text-[1.02rem] leading-relaxed text-muted sm:text-[1.09rem]">
              {hero.lede}
            </p>
          </RevealOnLoad>

          <RevealOnLoad delay={0.4}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-[var(--r-sm)] bg-text px-5 text-[0.9rem] font-medium text-[#06080e] transition-transform duration-[var(--dur-fast)] hover:-translate-y-0.5"
              >
                {hero.primaryCta}
                <ArrowDown size={15} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-[var(--r-sm)] border border-[var(--color-line-strong)] px-5 text-[0.9rem] text-muted transition-colors duration-[var(--dur-fast)] hover:border-accent/45 hover:text-text"
              >
                github.com/{PROFILE.handle}
                <ArrowUpRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">{dict.nav.newTab}</span>
              </a>
            </div>
          </RevealOnLoad>

          <RevealOnLoad delay={0.5}>
            <div className="mt-12 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-l border-[var(--color-line-strong)] pl-4">
              <span className="meta">{hero.status.label}</span>
              <span className="font-mono text-[0.8rem] text-text">{hero.status.value}</span>
              <span className="font-mono text-[0.72rem] text-faint">{hero.status.detail}</span>
            </div>
          </RevealOnLoad>
        </div>
      </div>

      {/* The legend for the object above. Real text, deliberately not baked into the canvas. */}
      <RevealOnLoad delay={0.65}>
        <div className="container-rail mt-14 lg:mt-24">
          <ul className="grid max-w-3xl grid-cols-3 gap-3 border-t border-[var(--color-line)] pt-4 sm:gap-6">
            {hero.chain.map((step) => (
              <li key={step.k}>
                <span className="meta block text-accent/70">{step.k}</span>
                <span className="mt-1.5 block font-display text-[0.95rem] tracking-tight text-text">
                  {step.t}
                </span>
                <span className="mt-0.5 block font-mono text-[0.7rem] text-faint">{step.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </RevealOnLoad>
    </section>
  );
}
