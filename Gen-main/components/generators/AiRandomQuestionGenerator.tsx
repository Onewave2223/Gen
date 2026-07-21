"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiQuestions,
  formatAiQuestionResults,
  type AiQuestionOptions,
  type AiQuestionCategory,
} from "@/lib/generators/ai-random-question";

const CATEGORY_OPTIONS: { value: AiQuestionCategory; label: string }[] = [
  { value: "fun", label: "Fun" },
  { value: "deep", label: "Deep" },
  { value: "relationship", label: "Relationship" },
  { value: "friends", label: "Friends" },
  { value: "icebreaker", label: "Icebreaker" },
  { value: "would-you-rather", label: "Would You Rather" },
  { value: "personal", label: "Personal" },
  { value: "random", label: "Random" },
];

const DEFAULT_CATEGORY: AiQuestionCategory = "random";
const DEFAULT_COUNT = 5;

const MIN_COUNT = 1;
const MAX_COUNT = 30;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiRandomQuestionGenerator() {
  const categoryId = React.useId();
  const countId = React.useId();

  const [category, setCategory] = React.useState<AiQuestionCategory>(
    DEFAULT_CATEGORY,
  );
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiQuestionOptions = {
      category,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiQuestions(options);
      setResults(generated.questions);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleClear = () => {
    setCategory(DEFAULT_CATEGORY);
    setCountInput(String(DEFAULT_COUNT));
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiQuestionResults(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={categoryId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Category
          </label>
          <Select
            id={categoryId}
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as AiQuestionCategory)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many questions?
          </label>
          <Input
            id={countId}
            type="number"
            inputMode="numeric"
            min={MIN_COUNT}
            max={MAX_COUNT}
            value={countInput}
            onChange={(event) => setCountInput(event.target.value)}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            {hasResults ? "Generate again" : "Generate questions"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your random questions will appear here."
        actions={
          <CopyButton
            text={copyText}
            disabled={!hasResults}
            size="sm"
            variant="secondary"
          />
        }
      >
        {hasResults && (
          <ul className="flex flex-col gap-2">
            {results.map((question, index) => (
              <li
                key={`${question}-${index}`}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)]"
              >
                {question}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>
    </div>
  );
}

AiRandomQuestionGenerator.displayName = "AiRandomQuestionGenerator";
