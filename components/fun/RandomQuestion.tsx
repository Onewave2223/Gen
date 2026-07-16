"use client";

import * as React from "react";

interface RandomQuestionProps {
  questions: Record<string, string[]>;
  categories: { key: string; label: string }[];
  labels: { next: string; copy: string; copied: string };
}

export function RandomQuestion({ questions, categories, labels }: RandomQuestionProps) {
  const [cat, setCat] = React.useState(categories[0].key);
  const [index, setIndex] = React.useState<number | null>(null);
  const [copied, setCopied] = React.useState(false);
  const list = questions[cat] ?? [];

  React.useEffect(() => {
    setIndex(Math.floor(Math.random() * list.length));
  }, [cat, list.length]);

  function next() {
    let n = Math.floor(Math.random() * list.length);
    if (n === index) n = (n + 1) % list.length;
    setIndex(n);
    setCopied(false);
  }

  async function copy() {
    if (index === null) return;
    await navigator.clipboard.writeText(list[index]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <p className="text-lg font-medium text-[var(--foreground)]">{current}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={next}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
        >
          {labels.next}
        </button>
        <button
          onClick={copy}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
        >
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
    </div>
  );
}
