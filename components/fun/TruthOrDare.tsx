"use client";

import * as React from "react";

interface TruthOrDareProps {
  data: Record<string, { truths: string[]; dares: string[] }>;
  categories: { key: string; label: string }[];
  labels: { truth: string; dare: string; next: string; tapToReveal: string };
}

export function TruthOrDare({ data, categories, labels }: TruthOrDareProps) {
  const [cat, setCat] = React.useState(categories[0].key);
  const [mode, setMode] = React.useState<"truth" | "dare" | null>(null);
  const [item, setItem] = React.useState<string | null>(null);

  function pick(type: "truth" | "dare") {
    const list = data[cat]?.[type === "truth" ? "truths" : "dares"] ?? [];
    const selected = list[Math.floor(Math.random() * list.length)];
    setMode(type);
    setItem(selected ?? null);
  }

  function next() {
    if (mode) pick(mode);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => { setCat(c.key); setMode(null); setItem(null); }}
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

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => pick("truth")}
          className={[
            "rounded-[var(--radius)] border-2 py-8 text-lg font-bold transition-all",
            mode === "truth"
              ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
              : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-blue-400 hover:bg-[var(--surface-hover)]",
          ].join(" ")}
        >
          {labels.truth}
        </button>
        <button
          onClick={() => pick("dare")}
          className={[
            "rounded-[var(--radius)] border-2 py-8 text-lg font-bold transition-all",
            mode === "dare"
              ? "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
              : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-orange-400 hover:bg-[var(--surface-hover)]",
          ].join(" ")}
        >
          {labels.dare}
        </button>
      </div>

      {item && (
        <div className={[
          "min-h-[100px] rounded-[var(--radius)] border-2 p-5",
          mode === "truth" ? "border-blue-300 bg-blue-50 dark:bg-blue-950" : "border-orange-300 bg-orange-50 dark:bg-orange-950",
        ].join(" ")}>
          <p className={[
            "text-base font-medium",
            mode === "truth" ? "text-blue-800 dark:text-blue-200" : "text-orange-800 dark:text-orange-200",
          ].join(" ")}>{item}</p>
        </div>
      )}

      {item && (
        <button
          onClick={next}
          className="inline-flex h-10 w-fit items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
        >
          {labels.next}
        </button>
      )}
    </div>
  );
}
