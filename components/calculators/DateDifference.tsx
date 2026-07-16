"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  calculateDateDifference,
  type DateDifferenceResult,
} from "@/lib/instrumenty/date-difference";

function toUtcDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00Z`);
}

export function DateDifference() {
  const d1Id = React.useId();
  const d2Id = React.useId();
  const [date1, setDate1] = React.useState("");
  const [date2, setDate2] = React.useState("");
  const [result, setResult] = React.useState<DateDifferenceResult | null>(null);
  const [error, setError] = React.useState("");

  const handleCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date1 || !date2) {
      setError("Please enter both dates.");
      setResult(null);
      return;
    }

    try {
      const calculated = calculateDateDifference(toUtcDate(date1), toUtcDate(date2));
      setResult(calculated);
      setError("");
    } catch {
      setError("Invalid date(s). Please check your input.");
      setResult(null);
    }
  };

  const handleSwap = () => {
    setDate1(date2);
    setDate2(date1);
  };

  const handleReset = () => {
    setDate1("");
    setDate2("");
    setResult(null);
    setError("");
  };

  const stats = result
    ? [
        { label: "Total days", value: result.totalDays.toLocaleString() },
        { label: "Years, months, days", value: `${result.years}y ${result.months}m ${result.days}d` },
        { label: "Total weeks & days", value: `${result.weeks}w ${result.remainderDays}d` },
        { label: "Approx. months", value: result.approxMonths },
        { label: "Total hours (approx.)", value: result.totalHours.toLocaleString() },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleCalculate} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={d1Id} className="text-sm font-medium text-[var(--foreground)]">
              Start date
            </label>
            <Input
              id={d1Id}
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="max-w-[200px]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={d2Id} className="text-sm font-medium text-[var(--foreground)]">
              End date
            </label>
            <Input
              id={d2Id}
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="max-w-[200px]"
            />
          </div>
          <Button type="button" variant="secondary" onClick={handleSwap}>
            Swap dates
          </Button>
        </div>

        <p className="text-xs text-[var(--muted)]">
          Works regardless of which date comes first.
        </p>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Calculate Difference</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      {result && (
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-0.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <dt className="text-xs text-[var(--muted)]">{item.label}</dt>
              <dd className="text-2xl font-bold text-[var(--foreground)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

DateDifference.displayName = "DateDifference";
