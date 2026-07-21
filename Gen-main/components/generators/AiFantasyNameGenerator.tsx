"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiFantasyNames,
  formatAiFantasyNameResults,
  type AiFantasyNameOptions,
  type AiFantasyRace,
} from "@/lib/generators/ai-fantasy-name";

const RACE_OPTIONS: { value: AiFantasyRace; label: string }[] = [
  { value: "elf", label: "Elf" },
  { value: "dwarf", label: "Dwarf" },
  { value: "orc", label: "Orc" },
  { value: "human", label: "Human" },
  { value: "dark", label: "Dark / Shadow" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_RACE: AiFantasyRace = "elf";
const DEFAULT_COUNT = 10;
const DEFAULT_INCLUDE_EPITHET = true;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiFantasyNameGenerator() {
  const keywordId = React.useId();
  const raceId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [race, setRace] = React.useState<AiFantasyRace>(DEFAULT_RACE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));
  const [includeEpithet, setIncludeEpithet] = React.useState(
    DEFAULT_INCLUDE_EPITHET,
  );

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiFantasyNameOptions = {
      keyword,
      race,
      count: parseCountInput(countInput),
      includeEpithet,
    };

    try {
      const generated = generateAiFantasyNames(options);
      setResults(generated.names);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setKeyword(DEFAULT_KEYWORD);
    setRace(DEFAULT_RACE);
    setCountInput(String(DEFAULT_COUNT));
    setIncludeEpithet(DEFAULT_INCLUDE_EPITHET);
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiFantasyNameResults(results) : "";

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
            htmlFor={raceId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Race
          </label>
          <Select
            id={raceId}
            options={RACE_OPTIONS}
            value={race}
            onChange={(event) => setRace(event.target.value as AiFantasyRace)}
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
          checked={includeEpithet}
          onChange={(event) => setIncludeEpithet(event.target.checked)}
          label="Include epithets"
          description="Add a fantasy epithet or title to some generated names."
        />

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            {hasResults ? "Regenerate names" : "Generate names"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your AI fantasy name ideas will appear here."
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

AiFantasyNameGenerator.displayName = "AiFantasyNameGenerator";
