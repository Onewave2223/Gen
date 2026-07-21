"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiBusinessNamesRu,
  formatAiBusinessNameResultsRu,
  type AiBusinessIndustryRu,
  type AiBusinessNameOptionsRu,
  type AiBusinessNameStyleRu,
} from "@/lib/generators/ai-business-name-ru";

const INDUSTRY_OPTIONS: { value: AiBusinessIndustryRu; label: string }[] = [
  { value: "general", label: "Общее" },
  { value: "technology", label: "Технологии" },
  { value: "retail", label: "Розница" },
  { value: "food", label: "Еда и напитки" },
  { value: "health", label: "Здоровье" },
  { value: "creative", label: "Творчество" },
  { value: "finance", label: "Финансы" },
  { value: "education", label: "Образование" },
];

const STYLE_OPTIONS: { value: AiBusinessNameStyleRu; label: string }[] = [
  { value: "modern", label: "Современный" },
  { value: "playful", label: "Игривый" },
  { value: "elegant", label: "Элегантный" },
  { value: "bold", label: "Смелый" },
  { value: "minimal", label: "Минимализм" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_INDUSTRY: AiBusinessIndustryRu = "general";
const DEFAULT_STYLE: AiBusinessNameStyleRu = "modern";
const DEFAULT_COUNT = 10;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiBusinessNameGeneratorRu() {
  const keywordId = React.useId();
  const industryId = React.useId();
  const styleId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [industry, setIndustry] =
    React.useState<AiBusinessIndustryRu>(DEFAULT_INDUSTRY);
  const [style, setStyle] =
    React.useState<AiBusinessNameStyleRu>(DEFAULT_STYLE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiBusinessNameOptionsRu = {
      keyword,
      industry,
      style,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiBusinessNamesRu(options);
      setResults(generated.names);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
    }
  };

  const handleReset = () => {
    setKeyword(DEFAULT_KEYWORD);
    setIndustry(DEFAULT_INDUSTRY);
    setStyle(DEFAULT_STYLE);
    setCountInput(String(DEFAULT_COUNT));
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiBusinessNameResultsRu(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={keywordId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Ключевое слово
          </label>
          <Input
            id={keywordId}
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Необязательное слово или идея"
          />
          <p className="text-sm text-[var(--muted)]">
            Добавьте слово, чтобы вдохновить генератор названий компании.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={industryId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Отрасль
            </label>
            <Select
              id={industryId}
              options={INDUSTRY_OPTIONS}
              value={industry}
              onChange={(event) =>
                setIndustry(event.target.value as AiBusinessIndustryRu)
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={styleId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Стиль
            </label>
            <Select
              id={styleId}
              options={STYLE_OPTIONS}
              value={style}
              onChange={(event) =>
                setStyle(event.target.value as AiBusinessNameStyleRu)
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Сколько названий?
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
          <Button type="submit">Сгенерировать названия</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!hasResults}
        emptyMessage="Здесь появятся варианты названий вашей компании."
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

AiBusinessNameGeneratorRu.displayName = "AiBusinessNameGeneratorRu";
