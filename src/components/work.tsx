import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { FEATURED, type ProjectFacts } from "@/content/projects";
import { findRepo, type GithubData } from "@/lib/github";
import type { Dictionary, ProjectCopy } from "@/i18n/types";
import { ProjectVisual } from "@/components/project-visual";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

/**
 * Each project is assembled from two sources: locale-invariant facts (repo, stack,
 * dates, layout) and translated copy keyed by the same slug. A translation can
 * therefore never alter a URL, a dependency list or a date.
 */
type Entry = { facts: ProjectFacts; copy: ProjectCopy; stars: number | undefined };

/* ------------------------------------------------------------ fragments -- */

/** The through-line of the whole site, stated per project. */
function Chain({ copy, dict }: { copy: ProjectCopy; dict: Dictionary }) {
  const steps = [
    { label: dict.work.chainIn, value: copy.chain.input },
    { label: dict.work.chainTransform, value: copy.chain.transform },
    { label: dict.work.chainOut, value: copy.chain.output },
  ];

  return (
    <ol className="grid gap-px overflow-hidden rounded-[var(--r-sm)] border border-[var(--color-line)] sm:grid-cols-3">
      {steps.map((step) => (
        <li key={step.label} className="bg-white/[0.015] px-3.5 py-3">
          <span className="meta block text-[0.6rem] text-accent/70">{step.label}</span>
          <span className="mt-1 block text-[0.82rem] leading-snug text-muted">{step.value}</span>
        </li>
      ))}
    </ol>
  );
}

function Stack({ stack }: { stack: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
      {stack.map((tech) => (
        <li key={tech} className="font-mono text-[0.72rem] text-faint">
          {tech}
        </li>
      ))}
    </ul>
  );
}

function Meta({ entry, dict }: { entry: Entry; dict: Dictionary }) {
  const { facts, stars } = entry;
  return (
    <dl className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[0.7rem] text-faint">
      <div className="flex gap-1.5">
        <dt className="sr-only">{dict.work.srLanguage}</dt>
        <dd>{facts.language}</dd>
      </div>
      <div className="flex gap-1.5">
        <dt className="sr-only">{dict.work.srUpdated}</dt>
        <dd>
          {dict.work.updated} {facts.updated}
        </dd>
      </div>
      {/* Stars are shown only when there are any — a "0" badge is noise, not information. */}
      {stars && stars > 0 ? (
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">{dict.work.srStars}</dt>
          <dd className="flex items-center gap-1">
            <Star size={11} aria-hidden />
            {stars}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

function Links({ entry, dict }: { entry: Entry; dict: Dictionary }) {
  const { facts } = entry;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <a
        href={facts.url}
        target="_blank"
        rel="noreferrer noopener"
        className="group inline-flex min-h-[44px] items-center gap-1.5 text-[0.85rem] text-text transition-colors hover:text-accent"
      >
        {dict.work.viewOn.replace("{project}", facts.name)}
        <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        <span className="sr-only">{dict.nav.newTab}</span>
      </a>
      {facts.demoUrl ? (
        <a
          href={facts.demoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex min-h-[44px] items-center gap-1.5 text-[0.85rem] text-accent transition-colors hover:text-ice"
        >
          <ExternalLink size={13} aria-hidden />
          {dict.work.liveDemo}
          <span className="sr-only">{dict.nav.newTab}</span>
        </a>
      ) : null}
    </div>
  );
}

function Context({ copy }: { copy: ProjectCopy }) {
  if (!copy.context) return null;
  return <p className="text-[0.8rem] leading-relaxed text-faint">{copy.context}</p>;
}

function VisualPanel({ entry, dict, className = "" }: { entry: Entry; dict: Dictionary; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[var(--r-md)] border border-[var(--color-line)] bg-[var(--color-bg-sunken)] ${className}`}
    >
      <ProjectVisual variant={entry.facts.visual} label={dict.visuals[entry.facts.visual]} />
    </div>
  );
}

/* ---------------------------------------------------------- three forms -- */

/** The largest treatment. Reserved for a single project. */
function FeatureProject({ entry, dict }: { entry: Entry; dict: Dictionary }) {
  const { facts, copy } = entry;
  return (
    <Reveal as="article" className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <p className="meta mb-3">{dict.work.featured}</p>
        <h3 className="font-display text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.02] font-semibold tracking-[-0.032em]">
          {facts.name}
        </h3>
        <p className="mt-4 max-w-[34rem] text-[1.02rem] leading-relaxed text-text/90">{copy.tagline}</p>
        <p className="mt-4 max-w-[36rem] text-[0.92rem] leading-relaxed text-muted">{copy.summary}</p>

        <div className="mt-7">
          <Chain copy={copy} dict={dict} />
        </div>

        <div className="mt-6">
          <Stack stack={facts.stack} />
        </div>

        <div className="mt-6 space-y-3">
          <Meta entry={entry} dict={dict} />
          <Context copy={copy} />
        </div>

        <div className="mt-5">
          <Links entry={entry} dict={dict} />
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-5">
        <VisualPanel entry={entry} dict={dict} className="aspect-[5/3]" />
        {/* Glass is used here on purpose: a distinct layer of detail sitting on the project. */}
        <div className="glass rounded-[var(--r-md)] p-5">
          <p className="meta mb-2.5 text-accent/80">{dict.work.oneDetail}</p>
          <p className="font-display text-[1rem] leading-snug tracking-tight text-text">{copy.detail.label}</p>
          <p className="mt-2.5 text-[0.88rem] leading-relaxed text-muted">{copy.detail.body}</p>
          <p className="mt-3.5 border-t border-[var(--color-line)] pt-3 font-mono text-[0.68rem] text-faint">
            {facts.detailSource}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/** Horizontal case study. Sides alternate so consecutive cases do not rhyme. */
function CaseProject({ entry, dict, flip }: { entry: Entry; dict: Dictionary; flip: boolean }) {
  const { facts, copy } = entry;
  return (
    <Reveal as="article" className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <VisualPanel entry={entry} dict={dict} className={`aspect-[5/3] ${flip ? "lg:order-2" : ""}`} />

      <div className={flip ? "lg:order-1" : ""}>
        <h3 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-tight font-semibold tracking-[-0.028em]">
          {facts.name}
        </h3>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-text/90">{copy.tagline}</p>
        <p className="mt-3.5 text-[0.9rem] leading-relaxed text-muted">{copy.summary}</p>

        <div className="mt-6">
          <Chain copy={copy} dict={dict} />
        </div>

        <div className="mt-5">
          <Stack stack={facts.stack} />
        </div>

        <div className="mt-5">
          <p className="meta mb-2 text-accent/80">
            {dict.work.oneDetail} — {copy.detail.label}
          </p>
          <p className="text-[0.86rem] leading-relaxed text-muted">{copy.detail.body}</p>
          <p className="mt-2 font-mono text-[0.68rem] text-faint">{facts.detailSource}</p>
        </div>

        <div className="mt-5 space-y-3">
          <Meta entry={entry} dict={dict} />
          <Context copy={copy} />
        </div>

        <div className="mt-4">
          <Links entry={entry} dict={dict} />
        </div>
      </div>
    </Reveal>
  );
}

/** Smaller entries, side by side. Still gets a real visual and a real detail. */
function CompactProject({ entry, dict }: { entry: Entry; dict: Dictionary }) {
  const { facts, copy } = entry;
  return (
    <Reveal as="article" className="flex h-full flex-col">
      <VisualPanel entry={entry} dict={dict} className="aspect-[2/1]" />

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="font-display text-[1.35rem] leading-tight font-semibold tracking-[-0.025em]">
          {facts.name}
        </h3>
        <p className="mt-2.5 text-[0.92rem] leading-relaxed text-text/90">{copy.tagline}</p>
        <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">{copy.summary}</p>

        <div className="mt-5">
          <Chain copy={copy} dict={dict} />
        </div>

        <div className="mt-4">
          <Stack stack={facts.stack} />
        </div>

        <div className="mt-4">
          <p className="meta mb-1.5 text-accent/80">
            {dict.work.oneDetail} — {copy.detail.label}
          </p>
          <p className="text-[0.84rem] leading-relaxed text-muted">{copy.detail.body}</p>
          <p className="mt-2 font-mono text-[0.68rem] text-faint">{facts.detailSource}</p>
        </div>

        <div className="mt-auto pt-5">
          <div className="space-y-3">
            <Meta entry={entry} dict={dict} />
            <Context copy={copy} />
          </div>
          <div className="mt-3">
            <Links entry={entry} dict={dict} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ----------------------------------------------------------- the section -- */

export function Work({ dict, github }: { dict: Dictionary; github: GithubData }) {
  const entries: Entry[] = FEATURED.map((facts) => ({
    facts,
    copy: dict.projects[facts.slug],
    stars: findRepo(github, facts.repo)?.stars,
  }));

  const feature = entries.filter((e) => e.facts.layout === "feature");
  const cases = entries.filter((e) => e.facts.layout === "case");
  const compact = entries.filter((e) => e.facts.layout === "compact");

  return (
    <section id="work" className="scroll-mt-24 py-[var(--section-y)]">
      <div className="container-rail">
        <SectionHeader
          index={dict.work.index}
          label={dict.work.label}
          title={dict.work.title}
          intro={dict.work.intro}
        />

        <div className="space-y-24 sm:space-y-28">
          {feature.map((entry) => (
            <FeatureProject key={entry.facts.slug} entry={entry} dict={dict} />
          ))}

          {cases.map((entry, i) => (
            <CaseProject key={entry.facts.slug} entry={entry} dict={dict} flip={i % 2 === 1} />
          ))}

          {compact.length > 0 ? (
            <div className="grid gap-14 md:grid-cols-2 md:gap-10">
              {compact.map((entry) => (
                <CompactProject key={entry.facts.slug} entry={entry} dict={dict} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
