"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiCaptionsRu,
  formatAiCaptionResultsRu,
  type AiCaptionOptionsRu,
  type AiCaptionCategoryRu,
  type AiCaptionLengthRu,
} from "@/lib/generators/ai-instagram-caption-ru";

const CATEGORY_OPTIONS: { value: AiCaptionCategoryRu; label: string }[] = [
  { value: "selfie", label: "Селфи" },
  { value: "travel", label: "Путешествия" },
  { value: "food", label: "Еда" },
  { value: "fitness", label: "Фитнес" },
  { value: "fashion", label: "Мода" },
  { value: "love", label: "Любовь" },
  { value: "business", label: "Бизнес" },
  { value: "motivation", label: "Мотивация" },
  { value: "funny", label: "Юмор" },
  { value: "random", label: "Случайно" },
];

const LENGTH_OPTIONS: { value: AiCaptionLengthRu; label: string }[] = [
  { value: "short", label: "Короткая" },
  { value: "medium", label: "Средняя" },
  { value: "long", label: "Длинная" },
];

const DEFAULT_CATEGORY: AiCaptionCategoryRu = "random";
const DEFAULT_LENGTH: AiCaptionLengthRu = "medium";
const DEFAULT_COUNT = 5;

const MIN_COUNT = 1;
const MAX_COUNT = 30;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiInstagramCaptionGeneratorRu() {
  const categoryId = React.useId();
  const lengthId = React.useId();
  const countId = React.useId();

  const [category, setCategory] = React.useState<AiCaptionCategoryRu>(
    DEFAULT_CATEGORY,
  );
  const [length, setLength] = React.useState<AiCaptionLengthRu>(
    DEFAULT_LENGTH,
  );
  const [emojiMode, setEmojiMode] = React.useState(true);
  const [hashtagMode, setHashtagMode] = React.useState(true);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiCaptionOptionsRu = {
      category,
      length,
      emojiMode,
      hashtagMode,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiCaptionsRu(options);
      setResults(generated.captions);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
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
  const copyText = hasResults ? formatAiCaptionResultsRu(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={categoryId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Тема подписи
          </label>
          <Select
            id={categoryId}
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as AiCaptionCategoryRu)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={lengthId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Длина подписи
          </label>
          <Select
            id={lengthId}
            options={LENGTH_OPTIONS}
            value={length}
            onChange={(event) =>
              setLength(event.target.value as AiCaptionLengthRu)
            }
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Checkbox
            checked={emojiMode}
            onChange={(event) => setEmojiMode(event.target.checked)}
            label="Режим эмодзи"
            description="Добавлять эмодзи к каждой подписи"
          />
          <Checkbox
            checked={hashtagMode}
            onChange={(event) => setHashtagMode(event.target.checked)}
            label="Режим хэштегов"
            description="Добавлять хэштеги к каждой подписи"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Сколько подписей?
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
            {hasResults ? "Сгенерировать снова" : "Сгенерировать подписи"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Очистить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!hasResults}
        emptyMessage="Здесь появятся подписи от ИИ для Instagram."
        actions={
          <CopyButton
            text={copyText}
            disabled={!hasResults}
            size="sm"
            variant="secondary"
            label="Копировать"
            copiedLabel="Скопировано!"
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

AiInstagramCaptionGeneratorRu.displayName = "AiInstagramCaptionGeneratorRu";
