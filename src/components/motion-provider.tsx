"use client";

import { domAnimation, LazyMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads only the animation and gesture features the site actually uses, instead of
 * the full motion bundle. `domAnimation` includes the inView feature that drives
 * the scroll reveals; drag and layout projection are excluded because nothing here
 * drags or animates layout.
 *
 * `strict` makes any stray `motion.*` component throw, so the lightweight `m.*`
 * components cannot be silently bypassed and quietly pull the full bundle back in.
 *
 * Children stay Server Components — this only provides context.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
