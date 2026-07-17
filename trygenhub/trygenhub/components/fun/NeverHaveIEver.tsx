"use client";

import * as React from "react";

interface NeverHaveIEverProps {
  statements: Record<string, string[]>;
  categories: { key: string; label: string }[];
  labels: { next: string; category: string };
}

export function NeverHaveIEver({ statements, categories, labels }: NeverHaveIEverProps) {
  const [cat, setCat] = React.useState(categories[0].key);
  const [index, setIndex] = React.useState<number | null>(null);
  const list = statements[cat] ?? [];

  React.useEffect(() => {
    setIndex(Math.floor(Math.random() * list.length));
  }, [cat, list.length]);

  function next() {
    let n = Math.floor(Math.random() * list.length);
    if (n === index) n = (n + 1) % list.length;
    setIndex(n);
  }

  const current = index !== null ? list[index] : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
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

      {current && (
        <div className="min-h-[120px] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-6">
          <p className="text-base font-medium text-[var(--foreground)]">{current}</p>
        </div>
      )}

      <button
        onClick={next}
        className="inline-flex h-10 w-fit items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
      >
        {labels.next}
      </button>
    </div>
  );
}
