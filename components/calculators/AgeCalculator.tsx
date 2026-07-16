"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { calculateAge, type AgeResult } from "@/lib/instrumenty/age-calculator";

const WEEKDAY_EN: Record<string, string> = {
  "воскресенье": "Sunday",
  "понедельник": "Monday",
  "вторник": "Tuesday",
  "среда": "Wednesday",
  "четверг": "Thursday",
  "пятница": "Friday",
  "суббота": "Saturday",
};

function toUtcDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00Z`);
}

export function AgeCalculator() {
  const inputId = React.useId();
  const asOfId = React.useId();

  const [birthDate, setBirthDate] = React.useState("");
  const [asOfDate, setAsOfDate] = React.useState("");
  const [result, setResult] = React.useState<AgeResult | null>(null);
  const [error, setError] = React.useState("");

  const todayIso = new Date().toISOString().split("T")[0];

  const handleCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!birthDate) {
      setError("Please enter your date of birth.");
      setResult(null);
      return;
    }

    const birth = toUtcDate(birthDate);
    const reference = asOfDate ? toUtcDate(asOfDate) : new Date();

    try {
      const calculated = calculateAge(birth, reference);
      setResult(calculated);
      setError("");
    } catch {
      setError("Date of birth cannot be after the reference date.");
      setResult(null);
    }
  };

  const handleReset = () => {
    setBirthDate("");
    setAsOfDate("");
    setResult(null);
    setError("");
  };

  const stats = result
    ? [
        { label: "Years", value: result.years },
        { label: "Months", value: result.months },
        { label: "Days", value: result.days },
        { label: "Total months", value: result.totalMonths },
        { label: "Total weeks", value: result.totalWeeks.toLocaleString() },
        { label: "Total days lived", value: result.totalDays.toLocaleString() },
        {
          label: "Total hours (approx.)",
          value: result.approxTotalHours.toLocaleString(),
        },
        {
          label: "Days until birthday",
          value:
            result.daysUntilNextBirthday === 0
              ? "Today!"
              : result.daysUntilNextBirthday,
        },
        {
          label: "Born on a",
          value: WEEKDAY_EN[result.birthWeekday] ?? result.birthWeekday,
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleCalculate} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Date of birth
            </label>
            <Input
              id={inputId}
              type="date"
              value={birthDate}
              max={todayIso}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={asOfId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              As of date (optional)
            </label>
            <Input
              id={asOfId}
              type="date"
              value={asOfDate}
              placeholder={todayIso}
              onChange={(e) => setAsOfDate(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Calculate Age</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      {result && (
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-0.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3"
            >
              <dt className="text-xs text-[var(--muted)]">{item.label}</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

AgeCalculator.displayName = "AgeCalculator";
