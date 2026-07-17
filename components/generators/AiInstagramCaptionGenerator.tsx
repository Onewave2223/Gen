"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiCaptions,
  formatAiCaptionResults,
  type AiCaptionOptions,
  type AiCaptionCategory,
  type AiCaptionLength,
} from "@/lib/generators/ai-instagram-caption";

const CATEGORY_OPTIONS: { value: AiCaptionCategory; label: string }[] = [
  { value: "selfie", label: "Selfie" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "fitness", label: "Fitness" },
  { value: "fashion", label: "Fashion" },
  { value: "love", label: "Love" },
  { value: "business", label: "Business" },
  { value: "motivation", label: "Motivation" },
  { value: "funny", label: "Funny" },
  { value: "random", label: "Random" },
];

const LENGTH_OPTIONS: { value: AiCaptionLength; label: string }[] = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

const DEFAULT_CATEGORY: AiCaptionCategory = "random";
const DEFAULT_LENGTH: AiCaptionLength = "medium";
const DEFAULT_COUNT = 5;

const MIN_COUNT = 1;
const MAX_COUNT = 30;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiInstagramCaptionGenerator() {
  const categoryId = React.useId();
  const lengthId = React.useId();
  const countId = React.useId();

  const [category, setCategory] = React.useState<AiCaptionCategory>(
    DEFAULT_CATEGORY,
  );
  const [length, setLength] = React.useState<AiCaptionLength>(DEFAULT_LENGTH);
  const [emojiMode, setEmojiMode] = React.useState(true);
  const [hashtagMode, setHashtagMode] = React.useState(true);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiCaptionOptions = {
      category,
      length,
      emojiMode,
      hashtagMode,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiCaptions(options);
      setResults(generated.captions);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleClear = () => {
    setCategory(DEFAULT_CATEGORY);
    setLength(DEFAULT_LENGTH);
    setEmojiMode(true);
    setHashtagMode(true);
    setCountInput(String(DEFAULT_COUNT));
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiCaptionResults(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={categoryId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Caption theme
          </label>
          <Select
            id={categoryId}
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as AiCaptionCategory)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={lengthId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Caption length
          </label>
          <Select
            id={lengthId}
            options={LENGTH_OPTIONS}
            value={length}
            onChange={(event) =>
              setLength(event.target.value as AiCaptionLength)
            }
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Checkbox
            checked={emojiMode}
            onChange={(event) => setEmojiMode(event.target.checked)}
            label="Emoji mode"
            description="Add emoji to each caption"
          />
          <Checkbox
            checked={hashtagMode}
            onChange={(event) => setHashtagMode(event.target.checked)}
            label="Hashtag mode"
            description="Add hashtags to each caption"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many captions?
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
            {hasResults ? "Generate again" : "Generate captions"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your AI Instagram captions will appear here."
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
            {results.map((caption, index) => (
              <li
                key={`${caption}-${index}`}
                className="whitespace-pre-line rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)]"
              >
                {caption}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>
    </div>
  );
}

AiInstagramCaptionGenerator.displayName = "AiInstagramCaptionGenerator";
