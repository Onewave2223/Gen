"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiSlogansRu,
  formatAiSloganResultsRu,
  type AiSloganOptionsRu,
  type AiSloganCategoryRu,
} from "@/lib/generators/ai-slogan-ru";

const CATEGORY_OPTIONS: { value: AiSloganCategoryRu; label: string }[] = [
  { value: "business", label: "Бизнес" },
  { value: "startup", label: "Стартап" },
  { value: "product", label: "Продукт" },
  { value: "brand", label: "Бренд" },
  { value: "marketing", label: "Маркетинг" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_CATEGORY: AiSloganCategoryRu = "business";
const DEFAULT_COUNT = 10;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiSloganGeneratorRu() {
  const keywordId = React.useId();
  const categoryId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [category, setCategory] = React.useState<AiSloganCategoryRu>(
    DEFAULT_CATEGORY,
  );
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiSloganOptionsRu = {
      keyword,
      category,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiSlogansRu(options);
      setResults(generated.slogans);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
    }
  };

  const handleClear = () => {
    setKeyword(DEFAULT_KEYWORD);
    setCategory(DEFAULT_CATEGORY);
    setCountInput(String(DEFAULT_COUNT));
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiSloganResultsRu(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={keywordId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Название бренда или продукта
          </label>
          <Input
            id={keywordId}
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Необязательно — например, Синий Океан"
          />
          <p className="text-sm text-[var(--muted)]">
            Добавьте название, и оно может войти в некоторые сгенерированные
            слоганы.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={categoryId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Категория
          </label>
          <Select
            id={categoryId}
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as AiSloganCategoryRu)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Сколько слоганов?
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
            {hasResults ? "Сгенерировать снова" : "Сгенерировать слоганы"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Очистить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!hasResults}
        emptyMessage="Здесь появятся слоганы от ИИ."
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
            {results.map((slogan, index) => (
              <li
                key={`${slogan}-${index}`}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)]"
              >
                {slogan}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>
    </div>
  );
}

AiSloganGeneratorRu.displayName = "AiSloganGeneratorRu";
