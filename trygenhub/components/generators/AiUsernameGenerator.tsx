"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiUsernames,
  formatAiUsernameResults,
  type AiUsernameOptions,
  type AiUsernameVibe,
} from "@/lib/generators/ai-username";

const VIBE_OPTIONS: { value: AiUsernameVibe; label: string }[] = [
  { value: "ai", label: "AI / Futuristic" },
  { value: "gamer", label: "Gamer" },
  { value: "aesthetic", label: "Aesthetic" },
  { value: "professional", label: "Professional" },
  { value: "minimal", label: "Minimal" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_VIBE: AiUsernameVibe = "ai";
const DEFAULT_COUNT = 10;
const DEFAULT_INCLUDE_NUMBERS = true;
const DEFAULT_INCLUDE_UNDERSCORE = false;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiUsernameGenerator() {
  const keywordId = React.useId();
  const vibeId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [vibe, setVibe] = React.useState<AiUsernameVibe>(DEFAULT_VIBE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));
  const [includeNumbers, setIncludeNumbers] = React.useState(
    DEFAULT_INCLUDE_NUMBERS,
  );
  const [includeUnderscore, setIncludeUnderscore] = React.useState(
    DEFAULT_INCLUDE_UNDERSCORE,
  );

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiUsernameOptions = {
      keyword,
      vibe,
      count: parseCountInput(countInput),
      includeNumbers,
      includeUnderscore,
    };

    try {
      const generated = generateAiUsernames(options);
      setResults(generated.usernames);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setKeyword(DEFAULT_KEYWORD);
    setVibe(DEFAULT_VIBE);
    setCountInput(String(DEFAULT_COUNT));
    setIncludeNumbers(DEFAULT_INCLUDE_NUMBERS);
    setIncludeUnderscore(DEFAULT_INCLUDE_UNDERSCORE);
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiUsernameResults(results) : "";

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
            Add an optional word to inspire your AI-style usernames.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={vibeId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Vibe
          </label>
          <Select
            id={vibeId}
            options={VIBE_OPTIONS}
            value={vibe}
            onChange={(event) => setVibe(event.target.value as AiUsernameVibe)}
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
            checked={includeUnderscore}
            onChange={(event) => setIncludeUnderscore(event.target.checked)}
            label="Allow underscores"
            description="Allow underscores between parts of generated usernames."
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
        emptyMessage="Your AI username ideas will appear here."
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

AiUsernameGenerator.displayName = "AiUsernameGenerator";
