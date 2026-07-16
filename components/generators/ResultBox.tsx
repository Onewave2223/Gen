"use client";

import * as React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ResultBoxProps {
  children: ReactNode;
  label?: string;
  empty?: boolean;
  emptyMessage?: string;
  actions?: ReactNode;
  className?: string;
}

/**
 * Renders a generator/tool result. When the visible content changes (e.g.
 * a new random value was generated), the result replays a short fade/scale
 * reveal so the update is noticeable without any fake delay — the new value
 * is already in the DOM, only the animation class is toggled.
 */
export function ResultBox({
  children,
  label,
  empty = false,
  emptyMessage = "Your result will appear here.",
  actions,
  className,
}: ResultBoxProps) {
  const contentKey = empty ? "__empty__" : childrenToKey(children);
  const previousKey = React.useRef(contentKey);
  const [animKey, setAnimKey] = React.useState(0);

  React.useEffect(() => {
    if (previousKey.current !== contentKey) {
      previousKey.current = contentKey;
      setAnimKey((k) => k + 1);
    }
  }, [contentKey]);

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow-sm)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-2)] opacity-70"
      />

      {(label || actions) && (
        <div className="flex items-center justify-between gap-3">
          {label && (
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              {label}
            </span>
          )}
          {actions && (
            <div className="flex items-center gap-2">{actions}</div>
          )}
        </div>
      )}

      <div
        key={animKey}
        className={cn(
          "min-h-[2.5rem] break-words text-base text-[var(--foreground)]",
          !empty && "motion-result-reveal",
        )}
      >
        {empty ? (
          <span className="text-[var(--muted)]">{emptyMessage}</span>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

/** Cheap, stable key for primitive/simple result content (strings, numbers,
 * arrays of them). Complex React nodes (e.g. colored swatches) fall back to
 * a constant key, so the reveal animation simply won't replay for those —
 * safer than risking a false-positive replay from unstable object identity. */
function childrenToKey(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map((c) => childrenToKey(c)).join("|");
  }
  return "__node__";
}

ResultBox.displayName = "ResultBox";
