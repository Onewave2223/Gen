"use client";

import { useEffect, useState } from "react";
import { formatElapsedTime } from "@/lib/iq-test/scoring";

interface Props {
  startedAt: number; // timestamp ms
  label: string; // e.g. "Time elapsed"
}

// This is a passive, informational stopwatch only — it never forces a
// submission. Per the product requirement, the test has no hard cutoff:
// a suggested pacing time is shown elsewhere, but this indicator simply
// tracks how long the attempt has been open so users can pace themselves
// without risking losing their in-progress answers.
export function Timer({ startedAt, label }: Props) {
  const [elapsed, setElapsed] = useState<number>(() =>
    Math.max(0, Math.floor((Date.now() - startedAt) / 1000)),
  );

  useEffect(() => {
    const tick = () => {
      setElapsed(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  return (
    <div
      aria-label={`${label}: ${formatElapsedTime(elapsed)}`}
      className="inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-mono font-semibold tabular-nums text-[var(--foreground)]"
    >
      <svg aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {formatElapsedTime(elapsed)}
    </div>
  );
}

Timer.displayName = "Timer";
