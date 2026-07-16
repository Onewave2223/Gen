"use client";

import * as React from "react";

interface ThisOrThatProps {
  pairs: [string, string][];
  labels: { next: string; choices: string; thisRound: string };
}

export function ThisOrThat({ pairs, labels }: ThisOrThatProps) {
  const [index, setIndex] = React.useState<number | null>(null);
  const [chosen, setChosen] = React.useState<0 | 1 | null>(null);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setIndex(Math.floor(Math.random() * pairs.length));
  }, [pairs.length]);

  const current = index !== null ? pairs[index] : null;

  function choose(choice: 0 | 1) {
    setChosen(choice);
    setCount((c) => c + 1);
  }

  function next() {
    let n = Math.floor(Math.random() * pairs.length);
    if (n === index) n = (n + 1) % pairs.length;
    setIndex(n);
    setChosen(null);
  }

  if (!current) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {labels.thisRound}
        </p>
        <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-[var(--primary-foreground)]">
          {count} {labels.choices}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {current.map((option, i) => (
          <button
            key={i}
            onClick={() => choose(i as 0 | 1)}
            disabled={chosen !== null}
            className={[
              "flex min-h-[110px] flex-col items-center justify-center rounded-[var(--radius)] border-2 p-5 text-center text-sm font-semibold transition-all",
              chosen === i
                ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] scale-105"
                : chosen !== null
                ? "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] opacity-50"
                : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] cursor-pointer",
            ].join(" ")}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={next}
        className="inline-flex h-10 w-fit items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
      >
        {labels.next}
      </button>
    </div>
  );
}
