"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { CopyButton } from "@/components/generators/CopyButton";
import { COMMON_WORDS } from "@/lib/data/words";

const COUNT_OPTIONS = [1, 3, 5, 10, 20].map((n) => ({
  value: String(n),
  label: String(n),
}));

export function RandomWordGenerator() {
  const countId = React.useId();
  const [count, setCount] = React.useState("5");
  const [words, setWords] = React.useState<string[]>([]);

  const handleGenerate = () => {
    const n = parseInt(count, 10);
    const result: string[] = [];
    const pool = [...COMMON_WORDS];
    for (let i = 0; i < n && pool.length > 0; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      result.push(pool[idx]);
      pool.splice(idx, 1);
    }
    setWords(result);
  };

  const resultText = words.join("\n");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={countId} className="text-sm font-medium text-[var(--foreground)]">
          Number of words
        </label>
        <Select
          id={countId}
          options={COUNT_OPTIONS}
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="max-w-[140px]"
        />
      </div>

      <Button type="button" onClick={handleGenerate} className="self-start">
        Generate Words
      </Button>

      {words.length > 0 && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              {words.length} word{words.length !== 1 ? "s" : ""}
            </span>
            <CopyButton text={resultText} size="sm" variant="secondary" />
          </div>
          <div className="flex flex-wrap gap-2">
            {words.map((word, i) => (
              <span
                key={i}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--foreground)]"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

RandomWordGenerator.displayName = "RandomWordGenerator";
