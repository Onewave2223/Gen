"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiTeamNames,
  formatAiTeamNameResults,
  type AiTeamNameOptions,
  type AiTeamCategory,
} from "@/lib/generators/ai-team-name";

const CATEGORY_OPTIONS: { value: AiTeamCategory; label: string }[] = [
  { value: "gaming", label: "Gaming" },
  { value: "esports", label: "Esports" },
  { value: "business", label: "Business" },
  { value: "sports", label: "Sports" },
  { value: "random", label: "Random" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_CATEGORY: AiTeamCategory = "gaming";
const DEFAULT_COUNT = 10;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiTeamNameGenerator() {
  const keywordId = React.useId();
  const categoryId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [category, setCategory] = React.useState<AiTeamCategory>(
    DEFAULT_CATEGORY,
  );
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiTeamNameOptions = {
      keyword,
      category,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiTeamNames(options);
      setResults(generated.names);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleClear = () => {
    setKeyword(DEFAULT_KEYWORD);
    setCategory(DEFAULT_CATEGORY);
    setCountInput(String(DEFAULT_COUNT));
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiTeamNameResults(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={keywordId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Keyword
          </label>
          <Input
            id={keywordId}
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Optional word to inspire your team name"
          />
          <p className="text-sm text-[var(--muted)]">
            Add an optional word and it may be woven into some generated
            team names.
          </p>
        </div>

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
              setCategory(event.target.value as AiTeamCategory)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many names?
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
            {hasResults ? "Generate again" : "Generate team names"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your AI team name ideas will appear here."
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
          <ul className="flex flex-wrap gap-2">
            {results.map((name, index) => (
              <li
                key={`${name}-${index}`}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium text-[var(--foreground)]"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>
    </div>
  );
}

AiTeamNameGenerator.displayName = "AiTeamNameGenerator";
