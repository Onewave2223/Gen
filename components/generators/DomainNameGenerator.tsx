"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateDomainNames,
  formatDomainNameResults,
  type DomainExtension,
  type DomainNameOptions,
  type DomainStyle,
} from "@/lib/generators/domain-name";

const EXTENSION_OPTIONS: { value: DomainExtension; label: string }[] = [
  { value: ".com", label: ".com" },
  { value: ".net", label: ".net" },
  { value: ".org", label: ".org" },
  { value: ".io", label: ".io" },
  { value: ".co", label: ".co" },
  { value: ".ai", label: ".ai" },
];

const STYLE_OPTIONS: { value: DomainStyle; label: string }[] = [
  { value: "brandable", label: "Brandable" },
  { value: "keyword", label: "Keyword-focused" },
  { value: "short", label: "Short" },
  { value: "creative", label: "Creative" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_EXTENSION: DomainExtension = ".com";
const DEFAULT_STYLE: DomainStyle = "brandable";
const DEFAULT_COUNT = 20;
const DEFAULT_ALLOW_HYPHENS = false;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function DomainNameGenerator() {
  const keywordId = React.useId();
  const extensionId = React.useId();
  const styleId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [extension, setExtension] =
    React.useState<DomainExtension>(DEFAULT_EXTENSION);
  const [style, setStyle] = React.useState<DomainStyle>(DEFAULT_STYLE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));
  const [allowHyphens, setAllowHyphens] = React.useState(
    DEFAULT_ALLOW_HYPHENS,
  );

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: DomainNameOptions = {
      keyword,
      extension,
      style,
      count: parseCountInput(countInput),
      allowHyphens,
    };

    try {
      const generated = generateDomainNames(options);
      setResults(generated.domains);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setKeyword(DEFAULT_KEYWORD);
    setExtension(DEFAULT_EXTENSION);
    setStyle(DEFAULT_STYLE);
    setCountInput(String(DEFAULT_COUNT));
    setAllowHyphens(DEFAULT_ALLOW_HYPHENS);
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatDomainNameResults(results) : "";

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
            placeholder="Enter a word or idea"
            required
          />
          <p className="text-sm text-[var(--muted)]">
            Enter a keyword that describes your project, brand, or topic.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={extensionId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Domain extension
            </label>
            <Select
              id={extensionId}
              options={EXTENSION_OPTIONS}
              value={extension}
              onChange={(event) =>
                setExtension(event.target.value as DomainExtension)
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
              onChange={(event) => setStyle(event.target.value as DomainStyle)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many domain ideas?
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

        <Checkbox
          checked={allowHyphens}
          onChange={(event) => setAllowHyphens(event.target.checked)}
          label="Allow hyphens"
          description="Allow occasional hyphens in generated domain ideas."
        />

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Generate domain names</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your domain name ideas will appear here."
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
            {results.map((domain, index) => (
              <li
                key={`${domain}-${index}`}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-sm font-medium text-[var(--foreground)]"
              >
                {domain}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>

      {hasResults && (
        <p className="text-sm text-[var(--muted)]">
          Domain availability is not checked. Verify availability with a
          domain registrar before making a decision.
        </p>
      )}
    </div>
  );
}

DomainNameGenerator.displayName = "DomainNameGenerator";
