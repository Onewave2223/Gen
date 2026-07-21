"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateRandomNumbers,
  formatRandomNumberResults,
  type RandomNumberOptions,
  type RandomNumberSeparator,
} from "@/lib/generators/random-number";

const DEFAULT_MIN = "1";
const DEFAULT_MAX = "100";
const DEFAULT_COUNT = "1";

const SORT_OPTIONS = [
  { value: "none", label: "None" },
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

const SEPARATOR_OPTIONS: { value: RandomNumberSeparator; label: string }[] = [
  { value: "newline", label: "New line" },
  { value: "comma", label: "Comma" },
  { value: "comma-space", label: "Comma + space" },
  { value: "space", label: "Space" },
];

function parseNumberInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function RandomNumberGenerator() {
  const minId = React.useId();
  const maxId = React.useId();
  const countId = React.useId();

  const [minInput, setMinInput] = React.useState(DEFAULT_MIN);
  const [maxInput, setMaxInput] = React.useState(DEFAULT_MAX);
  const [countInput, setCountInput] = React.useState(DEFAULT_COUNT);
  const [unique, setUnique] = React.useState(false);
  const [sort, setSort] = React.useState<RandomNumberOptions["sort"]>("none");
  const [separator, setSeparator] = React.useState<RandomNumberSeparator>("newline");

  const [results, setResults] = React.useState<number[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: RandomNumberOptions = {
      min: parseNumberInput(minInput),
      max: parseNumberInput(maxInput),
      count: parseNumberInput(countInput),
      unique,
      sort,
    };

    try {
      const generated = generateRandomNumbers(options);
      setResults(generated);
      setError(null);
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setMinInput(DEFAULT_MIN);
    setMaxInput(DEFAULT_MAX);
    setCountInput(DEFAULT_COUNT);
    setUnique(false);
    setSort("none");
    setSeparator("newline");
    setResults(null);
    setError(null);
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatRandomNumberResults(results, separator) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={minId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Minimum
            </label>
            <Input
              id={minId}
              type="number"
              inputMode="numeric"
              value={minInput}
              onChange={(event) => setMinInput(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={maxId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Maximum
            </label>
            <Input
              id={maxId}
              type="number"
              inputMode="numeric"
              value={maxInput}
              onChange={(event) => setMaxInput(event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many numbers?
          </label>
          <Input
            id={countId}
            type="number"
            inputMode="numeric"
            min={1}
            max={1000}
            value={countInput}
            onChange={(event) => setCountInput(event.target.value)}
          />
        </div>

        <Checkbox
          checked={unique}
          onChange={(event) => setUnique(event.target.checked)}
          label="Unique results"
          description="Prevent duplicate numbers in the generated results."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--foreground)]">
              Sort results
            </label>
            <Select
              options={SORT_OPTIONS}
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as RandomNumberOptions["sort"])
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--foreground)]">
              Copy separator
            </label>
            <Select
              options={SEPARATOR_OPTIONS}
              value={separator}
              onChange={(event) =>
                setSeparator(event.target.value as RandomNumberSeparator)
              }
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Generate numbers</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        actions={
          <CopyButton
            text={copyText}
            disabled={!hasResults}
            size="sm"
            variant="secondary"
          />
        }
      >
        {hasResults &&
          (results.length === 1 ? (
            <span className="block text-3xl font-bold tracking-tight text-[var(--foreground)]">
              {results[0]}
            </span>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {results.map((value, index) => (
                <li
                  key={`${value}-${index}`}
                  className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium text-[var(--foreground)]"
                >
                  {value}
                </li>
              ))}
            </ul>
          ))}
      </ResultBox>
    </div>
  );
}

RandomNumberGenerator.displayName = "RandomNumberGenerator";
