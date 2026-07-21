"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiPetNamesRu,
  formatAiPetNameResultsRu,
  type AiPetNameOptionsRu,
  type AiPetTypeRu,
} from "@/lib/generators/ai-pet-name-ru";

const PET_TYPE_OPTIONS: { value: AiPetTypeRu; label: string }[] = [
  { value: "dog", label: "Собака" },
  { value: "cat", label: "Кошка" },
  { value: "bird", label: "Птица" },
  { value: "rabbit", label: "Кролик" },
  { value: "universal", label: "Универсальный" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_PET_TYPE: AiPetTypeRu = "dog";
const DEFAULT_COUNT = 10;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiPetNameGeneratorRu() {
  const keywordId = React.useId();
  const petTypeId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [petType, setPetType] = React.useState<AiPetTypeRu>(DEFAULT_PET_TYPE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiPetNameOptionsRu = {
      keyword,
      petType,
      count: parseCountInput(countInput),
    };

    try {
      const generated = generateAiPetNamesRu(options);
      setResults(generated.names);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
    }
  };

  const handleClear = () => {
    setKeyword(DEFAULT_KEYWORD);
    setPetType(DEFAULT_PET_TYPE);
    setCountInput(String(DEFAULT_COUNT));
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiPetNameResultsRu(results) : "";

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
            placeholder="Необязательное слово для вдохновения"
          />
          <p className="text-sm text-[var(--muted)]">
            Добавьте слово, и оно может войти в некоторые сгенерированные имена.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={petTypeId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Питомец
          </label>
          <Select
            id={petTypeId}
            options={PET_TYPE_OPTIONS}
            value={petType}
            onChange={(event) =>
              setPetType(event.target.value as AiPetTypeRu)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Сколько имён?
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
            {hasResults ? "Сгенерировать снова" : "Сгенерировать имена"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Очистить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!hasResults}
        emptyMessage="Здесь появятся имена питомцев от ИИ."
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

AiPetNameGeneratorRu.displayName = "AiPetNameGeneratorRu";
