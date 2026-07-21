"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query as an external store.
 *
 * Deliberately not useState + useEffect: that pattern renders once with the wrong
 * answer and then re-renders, and it also reads the preference exactly once. This
 * subscribes, so a visitor who flips "reduce motion" mid-session is respected
 * immediately, and the server snapshot is a defined value rather than a guess.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    // On the server nothing is known; false keeps markup stable through hydration.
    () => false,
  );
}

/**
 * WebGL availability, probed once per page load and cached at module scope so the
 * snapshot stays referentially stable across renders.
 */
let webglSupport: boolean | undefined;

function getWebglSupport(): boolean {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const noopSubscribe = () => () => {};

export function useWebglSupport(): boolean {
  return useSyncExternalStore(noopSubscribe, getWebglSupport, () => false);
}
