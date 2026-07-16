"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  parseChoiceOptions,
  pickRandomOption,
} from "@/lib/instrumenty/random-choice";

const SPIN_DURATION_MS = 900;
const SPIN_INTERVAL_MS = 80;

export function RandomChoice() {
  const textareaId = React.useId();

  const [rawInput, setRawInput] = React.useState("");
  const [result, setResult] = React.useState<string | null>(null);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [spinPreview, setSpinPreview] = React.useState("");
  const [error, setError] = React.useState("");

  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handlePick = () => {
    const options = parseChoiceOptions(rawInput);

    if (options.length === 0) {
      setError("Введите хотя бы один вариант, каждый с новой строки.");
      setResult(null);
      return;
    }

    if (options.length === 1) {
      setError("Введите хотя бы два варианта для случайного выбора.");
      setResult(null);
      return;
    }

    setError("");
    setResult(null);
    setIsSpinning(true);

    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setSpinPreview(options[randomIndex]);
    }, SPIN_INTERVAL_MS);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsSpinning(false);

      try {
        const picked = pickRandomOption(options);
        setResult(picked);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Что-то пошло не так.");
      }
    }, SPIN_DURATION_MS);
  };

  const handleClear = () => {
    setRawInput("");
    setResult(null);
    setError("");
    setIsSpinning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const hasResult = result !== null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Варианты (каждый с новой строки)
        </label>
        <textarea
          id={textareaId}
          value={rawInput}
          onChange={(event) => setRawInput(event.target.value)}
          placeholder={"Пицца\nСуши\nБургер\nСалат"}
          rows={6}
          className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handlePick} disabled={isSpinning}>
          {isSpinning ? "Выбираем..." : "Выбрать случайно"}
        </Button>
        {hasResult && !isSpinning && (
          <Button type="button" variant="secondary" onClick={handlePick}>
            Выбрать ещё раз
          </Button>
        )}
        <Button type="button" variant="ghost" onClick={handleClear}>
          Очистить
        </Button>
      </div>

      <ResultBox
        label="Результат"
        empty={!hasResult && !isSpinning}
        emptyMessage="Здесь появится случайный вариант."
        actions={
          result ? (
            <CopyButton
              text={result}
              size="sm"
              variant="secondary"
              label="Скопировать"
              copiedLabel="Скопировано!"
            />
          ) : undefined
        }
      >
        {isSpinning && (
          <span
            aria-live="polite"
            className="block text-center text-2xl font-bold tracking-tight text-[var(--muted)]"
          >
            {spinPreview}
          </span>
        )}
        {hasResult && !isSpinning && (
          <span
            aria-live="polite"
            className="block text-center text-2xl font-bold tracking-tight text-[var(--foreground)]"
          >
            {result}
          </span>
        )}
      </ResultBox>
    </div>
  );
}

RandomChoice.displayName = "RandomChoice";
