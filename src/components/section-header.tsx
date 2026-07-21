import { Reveal } from "@/components/reveal";

/**
 * Shared section opening: an indexed monospace label on a hairline, then the title.
 * Using one header everywhere is what gives the page its rhythm — the variation
 * belongs in the content below it, not in how each section announces itself.
 */
export function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal as="header" className="mb-12 sm:mb-16">
      <div className="rule-node mb-5" />
      <p className="meta flex items-center gap-3">
        <span className="text-accent/80">{index}</span>
        <span>{label}</span>
      </p>
      <h2 className="mt-4 font-display text-[clamp(1.85rem,4.2vw,2.9rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
        {title}
      </h2>
      {intro ? <p className="mt-4 max-w-[42rem] text-[0.98rem] leading-relaxed text-muted">{intro}</p> : null}
    </Reveal>
  );
}
