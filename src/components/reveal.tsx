"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * The one entry animation used across the page.
 *
 * Keeping every reveal in a single primitive is what makes the motion read as one
 * system rather than a pile of independent effects. It only animates transform and
 * opacity, runs once, and collapses to a plain render when the visitor asks for
 * reduced motion — no fade, no offset, no delay.
 */

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds. Keep under ~0.3s total or the page feels slow. */
  delay?: number;
  /** Distance travelled, in px. Small by default — this is punctuation, not choreography. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
};

export function Reveal({ children, delay = 0, y = 14, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  // `m` rather than `motion`: the feature set is supplied once by MotionProvider.
  const Component = m[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      /* Marks the element for the <noscript> override in the root layout: these
         initial styles are server-rendered, so without it the content would be
         permanently invisible when JavaScript does not run. */
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

/**
 * Entry animation for content already on screen at load.
 *
 * No JavaScript involved, for the same reason as RevealLine: the hero paragraph is
 * the page's largest contentful paint, and waiting on hydration to reveal it cost
 * roughly two seconds of LCP on a throttled phone. Everything below the fold keeps
 * using `Reveal`, where an observer is genuinely needed.
 */
export function RevealOnLoad({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal-up ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/**
 * Masked text reveal for headline lines. The clip is the point: the line arrives
 * from behind its own edge rather than fading in, which reads as deliberate.
 *
 * This one is CSS, not Motion, and that is a performance decision rather than a
 * stylistic one. The headline is the largest contentful paint; a clipped line
 * cannot count as painted until it has moved into view, so running the animation
 * off hydration delayed mobile LCP to 3.9s. A CSS animation starts at first paint,
 * survives with JavaScript disabled, and is neutralised by the reduced-motion rule
 * in globals.css.
 */
export function RevealLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <span className="reveal-line" style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}
