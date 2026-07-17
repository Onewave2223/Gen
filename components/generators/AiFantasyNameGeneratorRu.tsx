"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiFantasyNamesRu,
  formatAiFantasyNameResultsRu,
  type AiFantasyNameOptionsRu,
  type AiFantasyRaceRu,
} from "@/lib/generators/ai-fantasy-name-ru";

const RACE_OPTIONS: { value: AiFantasyRaceRu; label: string }[] = [
  { value: "elf", label: "Эльф" },
  { value: "dwarf", label: "Гном" },
  { value: "orc", label: "Орк" },
  { value: "human", label: "Человек" },
  { value: "dark", label: "Тёмный / Теневой" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_RACE: AiFantasyRaceRu = "elf";
const DEFAULT_COUNT = 10;
const DEFAULT_INCLUDE_EPITHET = true;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiFantasyNameGeneratorRu() {
  const keywordId = React.useId();
  const raceId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [race, setRace] = React.useState<AiFantasyRaceRu>(DEFAULT_RACE);
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));
  const [includeEpithet, setIncludeEpithet] = React.useState(
    DEFAULT_INCLUDE_EPITHET,
  );

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiFantasyNameOptionsRu = {
      keyword,
      race,
      count: parseCountInput(countInput),
      includeEpithet,
    };

    try {
      const generated = generateAiFantasyNamesRu(options);
      setResults(generated.names);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
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
  const copyText = hasResults ? formatAiFantasyNameResultsRu(results) : "";

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
            placeholder="Необязательное слово или имя"
          />
          <p className="text-sm text-[var(--muted)]">
            Добавьте слово, и оно может войти в некоторые сгенерированные имена.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={raceId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Раса
          </label>
          <Select
            id={raceId}
            options={RACE_OPTIONS}
            value={race}
            onChange={(event) =>
              setRace(event.target.value as AiFantasyRaceRu)
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

        <Checkbox
          checked={includeEpithet}
          onChange={(event) => setIncludeEpithet(event.target.checked)}
          label="Добавлять эпитеты"
          description="Добавить фэнтезийный эпитет или титул к некоторым именам."
        />

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            {hasResults ? "Сгенерировать снова" : "Сгенерировать имена"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!hasResults}
        emptyMessage="Здесь появятся фэнтезийные имена от ИИ."
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

AiFantasyNameGeneratorRu.displayName = "AiFantasyNameGeneratorRu";
