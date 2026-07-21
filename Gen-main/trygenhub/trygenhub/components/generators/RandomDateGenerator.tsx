"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateRandomDates,
  formatRandomDate,
  formatRandomDateResults,
  type RandomDateOptions,
} from "@/lib/generators/random-date";

const SORT_OPTIONS = [
  { value: "none", label: "None" },
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

/**
 * Formats a Date using local calendar getters as a "YYYY-MM-DD"
 * string for use as a native date input value.
 */
function toDateInputValue(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDefaultDateRange(): { start: string; end: string } {
  const today = new Date();
  const oneYearLater = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate(),
  );

  return {
    start: toDateInputValue(today),
    end: toDateInputValue(oneYearLater),
  };
}

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function RandomDateGenerator() {
  const startId = React.useId();
  const endId = React.useId();
  const countId = React.useId();

  // Initialize date fields empty so server and client render the
  // same markup on first paint. The actual "today" defaults are
  // filled in after mount, since "today" can only be known on the
  // client without risking a server/client mismatch.
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [countInput, setCountInput] = React.useState("1");
  const [unique, setUnique] = React.useState(false);
  const [sort, setSort] = React.useState<RandomDateOptions["sort"]>("none");

  const [results, setResults] = React.useState<Date[] | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const defaults = getDefaultDateRange();
    setStartDate(defaults.start);
    setEndDate(defaults.end);
  }, []);

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: RandomDateOptions = {
      startDate,
      endDate,
      count: parseCountInput(countInput),
      unique,
      sort,
    };

    try {
      const generated = generateRandomDates(options);
      setResults(generated);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    const defaults = getDefaultDateRange();
    setStartDate(defaults.start);
    setEndDate(defaults.end);
    setCountInput("1");
    setUnique(false);
    setSort("none");
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatRandomDateResults(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={startId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Start date
            </label>
            <Input
              id={startId}
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={endId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              End date
            </label>
            <Input
              id={endId}
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many dates?
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
          label="Unique dates"
          description="Prevent duplicate dates in the generated results."
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">
            Sort results
          </label>
          <Select
            options={SORT_OPTIONS}
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as RandomDateOptions["sort"])
            }
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Generate dates</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your random dates will appear here."
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
            <span className="block text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {formatRandomDate(results[0])}
            </span>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {results.map((date, index) => (
                <li
                  key={`${date.getTime()}-${index}`}
                  className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium text-[var(--foreground)]"
                >
                  {formatRandomDate(date)}
                </li>
              ))}
            </ul>
          ))}
      </ResultBox>
    </div>
  );
}

RandomDateGenerator.displayName = "RandomDateGenerator";
