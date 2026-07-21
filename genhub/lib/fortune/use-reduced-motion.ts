"use client";

import * as React from "react";

/** Shared `prefers-reduced-motion` hook for the cinematic reveal
 * sequences in Daily Reading and Compatibility (mirrors the private
 * hook already used by components/motion/CountUp.tsx). */
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    const handler = () => setPrefers(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefers;
}
