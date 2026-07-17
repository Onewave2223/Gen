"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiQuestionsRu,
  formatAiQuestionResultsRu,
  type AiQuestionOptionsRu,
  type AiQuestionCategoryRu,
} from "@/lib/generators/ai-random-question-ru";

const CATEGORY_OPTIONS: { value: AiQuestionCategoryRu; label: string }[] = [
  { value: "fun", label: "Весёлые" },
  { value: "deep", label: "Глубокие" },
  { value: "relationship", label: "Отношения" },
  { value: "friends", label: "Друзья" },
  { value: "icebreaker", label: "Для знакомства" },
  { value: "would-you-rather", label: "Что бы ты выбрал" },
  { value: "personal", label: "Личные" },
  { value: "random", label: "Случайно" },
];

const DEFAULT_CATEGORY: AiQuestionCategoryRu = "random";
const DEFAULT_COUNT = 5;

const MIN_COUNT = 1;
const MAX_COUNT = 30;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiRandomQuestionGeneratorRu() {
  const categoryId = React.useId();
  const countId = React.useId();

  const [category, setCategory] = React.useState<AiQuestionCategoryRu>(
    DEFAULT_CATEGORY,
  );
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiQuestionOptionsRu = {
      category,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiQuestionsRu(options);
      setResults(generated.questions);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
    }
  };

  const handleClear = () => {
    setCategory(DEFAULT_CATEGORY);
    setCountInput(String(DEFAULT_COUNT));
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiQuestionResultsRu(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
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
              setCategory(event.target.value as AiQuestionCategoryRu)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Сколько вопросов?
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
            {hasResults ? "Сгенерировать снова" : "Сгенерировать вопросы"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Очистить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!hasResults}
        emptyMessage="Здесь появятся случайные вопросы."
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
            {results.map((question, index) => (
              <li
                key={`${question}-${index}`}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)]"
              >
                {question}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>
    </div>
  );
}

AiRandomQuestionGeneratorRu.displayName = "AiRandomQuestionGeneratorRu";
