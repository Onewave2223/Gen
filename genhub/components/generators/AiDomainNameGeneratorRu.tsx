"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiDomainNamesRu,
  formatAiDomainNameResultsRu,
  type AiDomainNameOptionsRu,
  type AiDomainVibeRu,
  type AiDomainExtensionRu,
} from "@/lib/generators/ai-domain-name-ru";

const VIBE_OPTIONS: { value: AiDomainVibeRu; label: string }[] = [
  { value: "ai", label: "ИИ / Футуризм" },
  { value: "startup", label: "Стартап" },
  { value: "creative", label: "Творческий" },
  { value: "short", label: "Короткий" },
  { value: "professional", label: "Профессиональный" },
];

const EXTENSION_OPTIONS: { value: AiDomainExtensionRu; label: string }[] = [
  { value: ".ru", label: ".ru" },
  { value: ".рф", label: ".рф" },
  { value: ".com", label: ".com" },
  { value: ".online", label: ".online" },
  { value: ".site", label: ".site" },
  { value: ".io", label: ".io" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_VIBE: AiDomainVibeRu = "ai";
const DEFAULT_EXTENSION: AiDomainExtensionRu = ".ru";
const DEFAULT_COUNT = 10;
const DEFAULT_ALLOW_HYPHENS = false;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiDomainNameGeneratorRu() {
  const keywordId = React.useId();
  const vibeId = React.useId();
  const extensionId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [vibe, setVibe] = React.useState<AiDomainVibeRu>(DEFAULT_VIBE);
  const [extension, setExtension] = React.useState<AiDomainExtensionRu>(
    DEFAULT_EXTENSION,
  );
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));
  const [allowHyphens, setAllowHyphens] = React.useState(
    DEFAULT_ALLOW_HYPHENS,
  );

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiDomainNameOptionsRu = {
      keyword,
      vibe,
      extension,
      count: parseCountInput(countInput),
      allowHyphens,
    };

    try {
      const generated = generateAiDomainNamesRu(options);
      setResults(generated.domains);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
    }
  };

  const handleReset = () => {
    setKeyword(DEFAULT_KEYWORD);
    setVibe(DEFAULT_VIBE);
    setExtension(DEFAULT_EXTENSION);
    setCountInput(String(DEFAULT_COUNT));
    setAllowHyphens(DEFAULT_ALLOW_HYPHENS);
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiDomainNameResultsRu(results) : "";

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
            placeholder="Необязательное слово или тема"
          />
          <p className="text-sm text-[var(--muted)]">
            Добавьте слово, чтобы вдохновить генератор на варианты в стиле ИИ.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={vibeId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Стиль
          </label>
          <Select
            id={vibeId}
            options={VIBE_OPTIONS}
            value={vibe}
            onChange={(event) =>
              setVibe(event.target.value as AiDomainVibeRu)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={extensionId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Расширение
          </label>
          <Select
            id={extensionId}
            options={EXTENSION_OPTIONS}
            value={extension}
            onChange={(event) =>
              setExtension(event.target.value as AiDomainExtensionRu)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Сколько вариантов?
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
          checked={allowHyphens}
          onChange={(event) => setAllowHyphens(event.target.checked)}
          label="Разрешить дефисы"
          description="Разрешить дефис между частями сгенерированных доменов."
        />

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            {hasResults ? "Сгенерировать снова" : "Сгенерировать домены"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!hasResults}
        emptyMessage="Здесь появятся варианты доменных имён от ИИ."
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
            {results.map((domain, index) => (
              <li
                key={`${domain}-${index}`}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-sm font-medium text-[var(--foreground)]"
              >
                {domain}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>
    </div>
  );
}

AiDomainNameGeneratorRu.displayName = "AiDomainNameGeneratorRu";
