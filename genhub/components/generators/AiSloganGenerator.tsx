"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiSlogans,
  formatAiSloganResults,
  type AiSloganOptions,
  type AiSloganCategory,
} from "@/lib/generators/ai-slogan";

const CATEGORY_OPTIONS: { value: AiSloganCategory; label: string }[] = [
  { value: "business", label: "Business" },
  { value: "startup", label: "Startup" },
  { value: "product", label: "Product" },
  { value: "brand", label: "Brand" },
  { value: "marketing", label: "Marketing" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_CATEGORY: AiSloganCategory = "business";
const DEFAULT_COUNT = 10;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiSloganGenerator() {
  const keywordId = React.useId();
  const categoryId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [category, setCategory] = React.useState<AiSloganCategory>(
    DEFAULT_CATEGORY,
  );
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiSloganOptions = {
      keyword,
      category,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiSlogans(options);
      setResults(generated.slogans);
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
  const copyText = hasResults ? formatAiSloganResults(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={keywordId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Brand or product name
          </label>
          <Input
            id={keywordId}
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Optional — e.g. Blue Ocean Studio"
          />
          <p className="text-sm text-[var(--muted)]">
            Add a name and it may be woven into some generated slogans.
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
              setCategory(event.target.value as AiSloganCategory)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many slogans?
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
            {hasResults ? "Generate again" : "Generate slogans"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your AI slogan ideas will appear here."
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
            {results.map((slogan, index) => (
              <li
                key={`${slogan}-${index}`}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)]"
              >
                {slogan}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>
    </div>
  );
}

AiSloganGenerator.displayName = "AiSloganGenerator";
