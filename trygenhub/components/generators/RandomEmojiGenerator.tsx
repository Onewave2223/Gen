"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateRandomEmojis,
  formatEmojiResults,
  emojiCategories,
  getCategoryLabel,
  type RandomEmojiOptions,
  type EmojiCategory,
} from "@/lib/generators/random-emoji";

const CATEGORY_OPTIONS = emojiCategories.map((category) => ({
  value: category,
  label: getCategoryLabel(category),
}));

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function RandomEmojiGenerator() {
  const countId = React.useId();

  const [category, setCategory] = React.useState<EmojiCategory>("all");
  const [countInput, setCountInput] = React.useState("1");
  const [unique, setUnique] = React.useState(false);

  const [emojis, setEmojis] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: RandomEmojiOptions = {
      category,
      count: parseCountInput(countInput),
      unique,
    };

    try {
      const generated = generateRandomEmojis(options);
      setEmojis(generated.emojis);
      setError("");
    } catch (err) {
      setEmojis(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setCategory("all");
    setCountInput("1");
    setUnique(false);
    setEmojis(null);
    setError("");
  };

  const hasEmojis = emojis !== null && emojis.length > 0;
  const copyText = hasEmojis ? formatEmojiResults(emojis) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">
            Category
          </label>
          <Select
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as EmojiCategory)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many emojis?
          </label>
          <Input
            id={countId}
            type="number"
            inputMode="numeric"
            min={1}
            max={100}
            value={countInput}
            onChange={(event) => setCountInput(event.target.value)}
          />
        </div>

        <Checkbox
          checked={unique}
          onChange={(event) => setUnique(event.target.checked)}
          label="Unique emojis"
          description="Prevent duplicate emojis in the generated results."
        />

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Generate emojis</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasEmojis}
        emptyMessage="Your emojis will appear here."
        actions={
          <CopyButton
            text={copyText}
            disabled={!hasEmojis}
            size="sm"
            variant="secondary"
          />
        }
      >
        {hasEmojis &&
          (emojis.length === 1 ? (
            <span className="block text-6xl leading-none">{emojis[0]}</span>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {emojis.map((emoji, index) => (
                <li
                  key={`${emoji}-${index}`}
                  className="flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-2xl"
                >
                  {emoji}
                </li>
              ))}
            </ul>
          ))}
      </ResultBox>
    </div>
  );
}

RandomEmojiGenerator.displayName = "RandomEmojiGenerator";
