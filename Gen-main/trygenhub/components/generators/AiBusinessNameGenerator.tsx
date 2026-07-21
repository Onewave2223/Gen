"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiBusinessNames,
  formatAiBusinessNameResults,
  type AiBusinessIndustry,
  type AiBusinessNameOptions,
  type AiBusinessNameStyle,
} from "@/lib/generators/ai-business-name";

const INDUSTRY_OPTIONS: { value: AiBusinessIndustry; label: string }[] = [
  { value: "general", label: "General" },
  { value: "technology", label: "Technology" },
  { value: "retail", label: "Retail" },
  { value: "food", label: "Food & Drink" },
  { value: "health", label: "Health & Wellness" },
  { value: "creative", label: "Creative" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
];

const STYLE_OPTIONS: { value: AiBusinessNameStyle; label: string }[] = [
  { value: "modern", label: "Modern" },
  { value: "playful", label: "Playful" },
  { value: "elegant", label: "Elegant" },
  { value: "bold", label: "Bold" },
  { value: "minimal", label: "Minimal" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_INDUSTRY: AiBusinessIndustry = "general";
const DEFAULT_STYLE: AiBusinessNameStyle = "modern";
const DEFAULT_COUNT = 10;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiBusinessNameGenerator() {
  const keywordId = React.useId();
  const industryId = React.useId();
  const styleId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [industry, setIndustry] =
    React.useState<AiBusinessIndustry>(DEFAULT_INDUSTRY);
  const [style, setStyle] = React.useState<AiBusinessNameStyle>(DEFAULT_STYLE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiBusinessNameOptions = {
      keyword,
      industry,
      style,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiBusinessNames(options);
      setResults(generated.names);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setKeyword(DEFAULT_KEYWORD);
    setIndustry(DEFAULT_INDUSTRY);
    setStyle(DEFAULT_STYLE);
    setCountInput(String(DEFAULT_COUNT));
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiBusinessNameResults(results) : "";

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
            placeholder="Optional word or idea"
          />
          <p className="text-sm text-[var(--muted)]">
            Add an optional word to inspire the generated business names.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={industryId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Industry
            </label>
            <Select
              id={industryId}
              options={INDUSTRY_OPTIONS}
              value={industry}
              onChange={(event) =>
                setIndustry(event.target.value as AiBusinessIndustry)
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={styleId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Style
            </label>
            <Select
              id={styleId}
              options={STYLE_OPTIONS}
              value={style}
              onChange={(event) =>
                setStyle(event.target.value as AiBusinessNameStyle)
              }
            />
          </div>
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
          <Button type="submit">Generate business names</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your AI business name ideas will appear here."
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

AiBusinessNameGenerator.displayName = "AiBusinessNameGenerator";
