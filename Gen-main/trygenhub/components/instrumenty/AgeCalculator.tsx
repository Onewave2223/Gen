"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { calculateAge, type AgeResult } from "@/lib/instrumenty/age-calculator";

export function AgeCalculator() {
  const birthDateId = React.useId();
  const asOfDateId = React.useId();

  const [birthDateInput, setBirthDateInput] = React.useState("");
  const [asOfDateInput, setAsOfDateInput] = React.useState("");
  const [result, setResult] = React.useState<AgeResult | null>(null);
  const [error, setError] = React.useState("");

  const handleCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (birthDateInput.trim() === "") {
      setError("Введите дату рождения.");
      setResult(null);
      return;
    }

    const birthDate = new Date(`${birthDateInput}T00:00:00Z`);
    const referenceDate = asOfDateInput
      ? new Date(`${asOfDateInput}T00:00:00Z`)
      : new Date();

    try {
      const calculated = calculateAge(birthDate, referenceDate);
      setResult(calculated);
      setError("");
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
    }
  };

  const handleReset = () => {
    setBirthDateInput("");
    setAsOfDateInput("");
    setResult(null);
    setError("");
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleCalculate} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={birthDateId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Дата рождения
            </label>
            <Input
              id={birthDateId}
              type="date"
              value={birthDateInput}
              onChange={(event) => setBirthDateInput(event.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={asOfDateId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Дата, на которую считать (необязательно)
            </label>
            <Input
              id={asOfDateId}
              type="date"
              value={asOfDateInput}
              onChange={(event) => setAsOfDateInput(event.target.value)}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Рассчитать возраст</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!result}
        emptyMessage="Здесь появится ваш возраст."
      >
        {result && (
          <div className="flex flex-col gap-3">
            <span className="block text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {result.years} {pluralizeYears(result.years)}, {result.months}{" "}
              {pluralizeMonths(result.months)}
            </span>
            <ul className="flex flex-col gap-1 text-sm text-[var(--muted)]">
              <li>Полных месяцев: {result.totalMonths}</li>
              <li>Полных недель: {result.totalWeeks.toLocaleString("ru-RU")}</li>
              <li>Дней жизни (примерно): {result.totalDays.toLocaleString("ru-RU")}</li>
              <li>Часов жизни (примерно): {result.approxTotalHours.toLocaleString("ru-RU")}</li>
              <li>
                До следующего дня рождения:{" "}
                {result.daysUntilNextBirthday === 0
                  ? "сегодня 🎉"
                  : `${result.daysUntilNextBirthday} ${pluralizeDays(result.daysUntilNextBirthday)}`}
              </li>
              <li>День недели рождения: {result.birthWeekday}</li>
            </ul>
          </div>
        )}
      </ResultBox>
    </div>
  );
}

function pluralizeYears(n: number): string {
  return pluralizeRu(n, "год", "года", "лет");
}

function pluralizeMonths(n: number): string {
  return pluralizeRu(n, "месяц", "месяца", "месяцев");
}

function pluralizeDays(n: number): string {
  return pluralizeRu(n, "день", "дня", "дней");
}

/**
 * Selects the correct Russian plural form for a count using the
 * standard one/few/many noun declension rules.
 */
function pluralizeRu(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

AgeCalculator.displayName = "AgeCalculator";
