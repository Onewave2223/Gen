"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateCompanyNames,
  formatCompanyNameResults,
  type CompanyIndustry,
  type CompanyNameOptions,
  type CompanyNameStyle,
} from "@/lib/generators/company-name";

const INDUSTRY_OPTIONS: { value: CompanyIndustry; label: string }[] = [
  { value: "general", label: "General" },
  { value: "technology", label: "Technology" },
  { value: "creative", label: "Creative" },
  { value: "food", label: "Food" },
  { value: "fashion", label: "Fashion" },
  { value: "finance", label: "Finance" },
  { value: "wellness", label: "Wellness" },
  { value: "education", label: "Education" },
];

const STYLE_OPTIONS: { value: CompanyNameStyle; label: string }[] = [
  { value: "modern", label: "Modern" },
  { value: "professional", label: "Professional" },
  { value: "creative", label: "Creative" },
  { value: "minimal", label: "Minimal" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_INDUSTRY: CompanyIndustry = "general";
const DEFAULT_STYLE: CompanyNameStyle = "modern";
const DEFAULT_COUNT = 10;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function CompanyNameGenerator() {
  const keywordId = React.useId();
  const industryId = React.useId();
  const styleId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [industry, setIndustry] =
    React.useState<CompanyIndustry>(DEFAULT_INDUSTRY);
  const [style, setStyle] = React.useState<CompanyNameStyle>(DEFAULT_STYLE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: CompanyNameOptions = {
      keyword,
      industry,
      style,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateCompanyNames(options);
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
  const copyText = hasResults ? formatCompanyNameResults(results) : "";

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
            Add an optional word to inspire the generated names.
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
                setIndustry(event.target.value as CompanyIndustry)
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
                setStyle(event.target.value as CompanyNameStyle)
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
          <Button type="submit">Generate company names</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your company name ideas will appear here."
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

CompanyNameGenerator.displayName = "CompanyNameGenerator";
