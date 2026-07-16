"use client";

import * as React from "react";

export interface CountUpProps {
  value: number;
  durationMs?: number;
  className?: string;
  /** Optional formatter, e.g. (n) => `${n}%` */
  format?: (n: number) => string;
}

/**
 * Animates a number counting up to `value` on mount.
 *
 * Accessibility: the element carries an aria-label with the final value at
 * all times, so screen readers announce the correct number immediately
 * rather than reading intermediate frames. Reduced-motion users and
 * server/no-JS renders both see the final value with no animation delay.
 */
export function CountUp({ value, durationMs = 900, className, format }: CountUpProps) {
  const [display, setDisplay] = React.useState(value);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs, prefersReducedMotion]);

  const formatted = format ? format(display) : String(display);
  const finalFormatted = format ? format(value) : String(value);

  return (
    <span aria-label={finalFormatted} className={className}>
      <span aria-hidden="true">{formatted}</span>
    </span>
  );
}

CountUp.displayName = "CountUp";

function usePrefersReducedMotion() {
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
