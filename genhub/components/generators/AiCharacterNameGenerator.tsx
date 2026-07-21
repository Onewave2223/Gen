"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiCharacterNames,
  formatAiCharacterNameResults,
  type AiCharacterNameOptions,
  type AiCharacterStyle,
} from "@/lib/generators/ai-character-name";

const STYLE_OPTIONS: { value: AiCharacterStyle; label: string }[] = [
  { value: "fantasy", label: "Fantasy" },
  { value: "scifi", label: "Sci-Fi" },
  { value: "medieval", label: "Medieval" },
  { value: "modern", label: "Modern" },
  { value: "random", label: "Random" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_STYLE: AiCharacterStyle = "fantasy";
const DEFAULT_COUNT = 10;
const DEFAULT_INCLUDE_SURNAME = true;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiCharacterNameGenerator() {
  const keywordId = React.useId();
  const styleId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [style, setStyle] = React.useState<AiCharacterStyle>(DEFAULT_STYLE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));
  const [includeSurname, setIncludeSurname] = React.useState(
    DEFAULT_INCLUDE_SURNAME,
  );

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiCharacterNameOptions = {
      keyword,
      style,
      count: parseCountInput(countInput),
      includeSurname,
    };

    try {
      const generated = generateAiCharacterNames(options);
      setResults(generated.names);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleClear = () => {
    setKeyword(DEFAULT_KEYWORD);
    setStyle(DEFAULT_STYLE);
    setCountInput(String(DEFAULT_COUNT));
    setIncludeSurname(DEFAULT_INCLUDE_SURNAME);
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiCharacterNameResults(results) : "";

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
            placeholder="Optional word or name to inspire results"
          />
          <p className="text-sm text-[var(--muted)]">
            Add an optional word and it may be woven into some generated names.
          </p>
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
              setStyle(event.target.value as AiCharacterStyle)
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

        <Checkbox
          checked={includeSurname}
          onChange={(event) => setIncludeSurname(event.target.checked)}
          label="Include surnames"
          description="Add a surname to some generated character names."
        />

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            {hasResults ? "Generate again" : "Generate names"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your AI character name ideas will appear here."
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

AiCharacterNameGenerator.displayName = "AiCharacterNameGenerator";
