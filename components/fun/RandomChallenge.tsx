"use client";

import * as React from "react";

interface RandomChallengeProps {
  challenges: Record<string, string[]>;
  categories: { key: string; label: string }[];
  labels: { generate: string; category: string };
}

export function RandomChallenge({ challenges, categories, labels }: RandomChallengeProps) {
  const [cat, setCat] = React.useState(categories[0].key);
  const [item, setItem] = React.useState<string | null>(null);

  function generate() {
    const list = challenges[cat] ?? [];
    setItem(list[Math.floor(Math.random() * list.length)] ?? null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => { setCat(c.key); setItem(null); }}
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

      {item && (
        <div className="min-h-[100px] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-6">
          <p className="text-base font-medium text-[var(--foreground)]">{item}</p>
        </div>
      )}

      <button
        onClick={generate}
        className="inline-flex h-10 w-fit items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
      >
        {labels.generate}
      </button>
    </div>
  );
}
