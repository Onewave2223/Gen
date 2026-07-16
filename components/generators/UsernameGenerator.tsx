"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateUsernames,
  formatUsernameResults,
  type UsernameOptions,
  type UsernameStyle,
} from "@/lib/generators/username";

const STYLE_OPTIONS: { value: UsernameStyle; label: string }[] = [
  { value: "random", label: "Random" },
  { value: "clean", label: "Clean" },
  { value: "gaming", label: "Gaming" },
  { value: "cute", label: "Cute" },
  { value: "professional", label: "Professional" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_STYLE: UsernameStyle = "random";
const DEFAULT_COUNT = 10;
const DEFAULT_INCLUDE_NUMBERS = true;
const DEFAULT_INCLUDE_SEPARATOR = false;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function UsernameGenerator() {
  const keywordId = React.useId();
  const styleId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [style, setStyle] = React.useState<UsernameStyle>(DEFAULT_STYLE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));
  const [includeNumbers, setIncludeNumbers] = React.useState(
    DEFAULT_INCLUDE_NUMBERS,
  );
  const [includeSeparator, setIncludeSeparator] = React.useState(
    DEFAULT_INCLUDE_SEPARATOR,
  );

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: UsernameOptions = {
      keyword,
      style,
      count: parseCountInput(countInput),
      includeNumbers,
      includeSeparator,
    };

    try {
      const generated = generateUsernames(options);
      setResults(generated.usernames);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setKeyword(DEFAULT_KEYWORD);
    setStyle(DEFAULT_STYLE);
    setCountInput(String(DEFAULT_COUNT));
    setIncludeNumbers(DEFAULT_INCLUDE_NUMBERS);
    setIncludeSeparator(DEFAULT_INCLUDE_SEPARATOR);
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatUsernameResults(results) : "";

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
            placeholder="Optional word or name"
          />
          <p className="text-sm text-[var(--muted)]">
            Add an optional word to inspire your usernames.
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
              setStyle(event.target.value as UsernameStyle)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many usernames?
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

        <div className="flex flex-col gap-3">
          <Checkbox
            checked={includeNumbers}
            onChange={(event) => setIncludeNumbers(event.target.checked)}
            label="Include numbers"
            description="Allow number suffixes in some generated usernames."
          />
          <Checkbox
            checked={includeSeparator}
            onChange={(event) => setIncludeSeparator(event.target.checked)}
            label="Allow separators"
            description="Allow underscores or hyphens in generated usernames."
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Generate usernames</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your username ideas will appear here."
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
            {results.map((username, index) => (
              <li
                key={`${username}-${index}`}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-sm font-medium text-[var(--foreground)]"
              >
                {username}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>
    </div>
  );
}

UsernameGenerator.displayName = "UsernameGenerator";
