"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { CopyButton } from "@/components/generators/CopyButton";

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";

const CASE_OPTIONS = [
  { value: "upper", label: "Uppercase (A–Z)" },
  { value: "lower", label: "Lowercase (a–z)" },
  { value: "mixed", label: "Mixed" },
];

const COUNT_OPTIONS = [1, 3, 5, 10, 26].map((n) => ({
  value: String(n),
  label: String(n),
}));

export function RandomLetterGenerator() {
  const caseId = React.useId();
  const countId = React.useId();

  const [letterCase, setLetterCase] = React.useState("upper");
  const [count, setCount] = React.useState("5");
  const [allowRepeats, setAllowRepeats] = React.useState(true);
  const [letters, setLetters] = React.useState<string[]>([]);
  const [error, setError] = React.useState("");

  const handleGenerate = () => {
    const n = parseInt(count, 10);
    const pool =
      letterCase === "upper"
        ? UPPERCASE
        : letterCase === "lower"
          ? LOWERCASE
          : UPPERCASE + LOWERCASE;

    if (!allowRepeats && n > pool.length) {
      setError(
        `Cannot generate ${n} unique letters from a pool of ${pool.length}.`,
      );
      setLetters([]);
      return;
    }

    setError("");

    if (allowRepeats) {
      setLetters(
        Array.from({ length: n }, () =>
          pool[Math.floor(Math.random() * pool.length)],
        ),
      );
    } else {
      const poolArr = pool.split("");
      const result: string[] = [];
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * poolArr.length);
        result.push(poolArr[idx]);
        poolArr.splice(idx, 1);
      }
      setLetters(result);
    }
  };

  const resultText = letters.join(" ");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={caseId} className="text-sm font-medium text-[var(--foreground)]">
            Case
          </label>
          <Select
            id={caseId}
            options={CASE_OPTIONS}
            value={letterCase}
            onChange={(e) => setLetterCase(e.target.value)}
            className="w-[180px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={countId} className="text-sm font-medium text-[var(--foreground)]">
            Count
          </label>
          <Select
            id={countId}
            options={COUNT_OPTIONS}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-[100px]"
          />
        </div>
      </div>

      <Checkbox
        checked={allowRepeats}
        onChange={(e) => setAllowRepeats(e.target.checked)}
        label="Allow repeated letters"
        description="The same letter can appear more than once"
      />

      {error && (
        <p role="alert" className="text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      <Button type="button" onClick={handleGenerate} className="self-start">
        Generate
      </Button>

      {letters.length > 0 && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              Result
            </span>
            <CopyButton text={resultText} size="sm" variant="secondary" />
          </div>
          <div className="flex flex-wrap gap-2">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-[var(--surface)] text-xl font-bold text-[var(--primary)]"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

RandomLetterGenerator.displayName = "RandomLetterGenerator";
