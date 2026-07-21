"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { StaticSignal } from "./static-signal";
import { useMediaQuery, useWebglSupport } from "@/lib/use-media-query";

/**
 * Decides whether the WebGL scene runs at all.
 *
 * `ssr: false` is only legal inside a Client Component, which is why this wrapper
 * exists rather than importing the scene from the server-rendered section. The
 * static SVG is the loading state and the permanent fallback, so the hero is never
 * empty and never blocks first paint on a 3D bundle.
 */
const SignalField = dynamic(() => import("./SignalField"), {
  ssr: false,
  // The loading state cannot receive props, so it renders the drawing without a
  // description; the labelled copy below covers the states a visitor actually lands on.
  loading: () => <div className="absolute inset-0" aria-hidden />,
});

function FallbackLayer({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <StaticSignal label={label} className="h-full w-full max-w-[46rem] opacity-90" />
    </div>
  );
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/**
 * Waits for the main thread to go quiet before pulling in the 3D chunk.
 *
 * three.js is ~236 KB and evaluating it during hydration was the single largest
 * contributor to total blocking time. Deferring costs nothing visually because the
 * static SVG is the designed intermediate state, not a placeholder.
 */
function useIdle(): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const w = window as IdleWindow;

    if (typeof w.requestIdleCallback === "function") {
      // The timeout guarantees the scene still arrives on a permanently busy page.
      const handle = w.requestIdleCallback(() => setIdle(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(() => setIdle(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  return idle;
}

export function HeroCanvas({ label }: { label: string }) {
  // Server snapshot is false, so the fallback renders first and the scene swaps in
  // after hydration — no cascading render, no flash of an empty canvas.
  const supported = useWebglSupport();
  const idle = useIdle();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const narrow = useMediaQuery("(max-width: 767px)");

  /*
   * Touch and small screens get the SVG, not a reduced WebGL scene.
   *
   * Measured on Lighthouse's throttled mobile profile, loading three.js cost about
   * 1.8s of script evaluation and dropped the performance score to 57. The scene's
   * only interaction is pointer parallax, which a touch device cannot use — so the
   * expensive half of the trade buys nothing there. The static composition is the
   * same drawing and costs no JavaScript at all.
   *
   * This is reactive: resizing a desktop window past the breakpoint swaps between
   * the two without a reload.
   */
  const wantsWebgl = supported && !coarsePointer && !narrow;

  if (!wantsWebgl || !idle) return <FallbackLayer label={label} />;
  return <SignalField />;
}
