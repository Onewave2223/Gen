"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import {
  calculateDateDifference,
  type DateDifferenceResult,
} from "@/lib/instrumenty/date-difference";

export function DateDifferenceCalculator() {
  const startId = React.useId();
  const endId = React.useId();

  const [startInput, setStartInput] = React.useState("");
  const [endInput, setEndInput] = React.useState("");
  const [result, setResult] = React.useState<DateDifferenceResult | null>(
    null,
  );
  const [error, setError] = React.useState("");

  const handleCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (startInput.trim() === "" || endInput.trim() === "") {
      setError("Выберите обе даты.");
      setResult(null);
      return;
    }

    const startDate = new Date(`${startInput}T00:00:00Z`);
    const endDate = new Date(`${endInput}T00:00:00Z`);

    try {
      const calculated = calculateDateDifference(startDate, endDate);
      setResult(calculated);
      setError("");
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
    }
  };

  const handleReset = () => {
    setStartInput("");
    setEndInput("");
    setResult(null);
    setError("");
  };

  const handleSwap = () => {
    setStartInput(endInput);
    setEndInput(startInput);
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleCalculate} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={startId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Первая дата
            </label>
            <Input
              id={startId}
              type="date"
              value={startInput}
              onChange={(event) => setStartInput(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={endId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Вторая дата
            </label>
            <Input
              id={endId}
              type="date"
              value={endInput}
              onChange={(event) => setEndInput(event.target.value)}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Рассчитать</Button>
          <Button type="button" variant="secondary" onClick={handleSwap}>
            Поменять местами
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!result}
        emptyMessage="Здесь появится разница между датами."
      >
        {result && (
          <div className="flex flex-col gap-3">
            <span className="block text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {result.totalDays.toLocaleString("ru-RU")}{" "}
              {pluralizeDays(result.totalDays)}
            </span>
            <ul className="flex flex-col gap-1 text-sm text-[var(--muted)]">
              <li>
                {result.years} {pluralizeYears(result.years)}, {result.months}{" "}
                {pluralizeMonths(result.months)}, {result.days} {pluralizeDays(result.days)}
              </li>
              <li>
                {result.weeks} {pluralizeWeeks(result.weeks)}{" "}
                {result.remainderDays} {pluralizeDays(result.remainderDays)}
              </li>
              <li>Примерно {result.approxMonths} мес.</li>
              <li>Примерно {result.totalHours.toLocaleString("ru-RU")} ч.</li>
              {result.direction !== "same" && (
                <li>
                  Вторая дата{" "}
                  {result.direction === "future" ? "позже" : "раньше"}{" "}
                  первой.
                </li>
              )}
              {result.direction === "same" && <li>Даты совпадают.</li>}
            </ul>
          </div>
        )}
      </ResultBox>
    </div>
  );
}

function pluralizeDays(n: number): string {
  return pluralizeRu(n, "день", "дня", "дней");
}

function pluralizeWeeks(n: number): string {
  return pluralizeRu(n, "неделя", "недели", "недель");
}

function pluralizeYears(n: number): string {
  return pluralizeRu(n, "год", "года", "лет");
}

function pluralizeMonths(n: number): string {
  return pluralizeRu(n, "месяц", "месяца", "месяцев");
}

function pluralizeRu(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

DateDifferenceCalculator.displayName = "DateDifferenceCalculator";
