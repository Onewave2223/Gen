"use client";

import * as React from "react";

interface FoodPickerProps {
  ideas: Record<string, string[]>;
  categories: { key: string; label: string }[];
  labels: { pick: string; pickAnother: string; result: string; disclaimer: string };
}

export function FoodPicker({ ideas, categories, labels }: FoodPickerProps) {
  const [cat, setCat] = React.useState(categories[0].key);
  const [result, setResult] = React.useState<string | null>(null);

  function pick() {
    const list = ideas[cat] ?? [];
    setResult(list[Math.floor(Math.random() * list.length)] ?? null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => { setCat(c.key); setResult(null); }}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              cat === c.key
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
            ].join(" ")}
          >
            {c.label}
          </button>
        ))}
      </div>

      {result && (
        <div className="rounded-[var(--radius)] border-2 border-[var(--primary)] bg-[var(--surface)] p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">{labels.result}</p>
          <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">{result}</p>
        </div>
      )}

      <button
        onClick={pick}
        className="inline-flex h-10 w-fit items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
      >
        {result ? labels.pickAnother : labels.pick}
      </button>

      <p className="text-xs text-[var(--muted)]">{labels.disclaimer}</p>
    </div>
  );
}
