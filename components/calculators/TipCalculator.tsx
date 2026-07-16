"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const TIP_PRESETS = [10, 15, 18, 20, 25];

export function TipCalculator() {
  const billId = React.useId();
  const tipId = React.useId();
  const peopleId = React.useId();

  const [bill, setBill] = React.useState("");
  const [tipPct, setTipPct] = React.useState("15");
  const [people, setPeople] = React.useState("1");

  const billNum = parseFloat(bill) || 0;
  const tipNum = parseFloat(tipPct) || 0;
  const peopleNum = Math.max(1, parseInt(people, 10) || 1);

  const tipAmount = (billNum * tipNum) / 100;
  const totalAmount = billNum + tipAmount;
  const perPerson = peopleNum > 0 ? totalAmount / peopleNum : 0;
  const tipPerPerson = peopleNum > 0 ? tipAmount / peopleNum : 0;

  const rows = [
    { label: "Tip amount", value: `$${fmt(tipAmount)}` },
    { label: "Total amount", value: `$${fmt(totalAmount)}` },
    ...(peopleNum > 1
      ? [
          { label: "Per person (total)", value: `$${fmt(perPerson)}` },
          { label: "Per person (tip)", value: `$${fmt(tipPerPerson)}` },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={billId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Bill amount ($)
          </label>
          <Input
            id={billId}
            type="number"
            min="0"
            step="0.01"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="50.00"
            className="w-36"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={peopleId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Number of people
          </label>
          <Input
            id={peopleId}
            type="number"
            min="1"
            max="100"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            placeholder="1"
            className="w-28"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[var(--foreground)]">
          Tip percentage
        </span>
        <div className="flex flex-wrap gap-2">
          {TIP_PRESETS.map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => setTipPct(String(pct))}
              className={`rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                tipPct === String(pct)
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              {pct}%
            </button>
          ))}
          <div className="flex items-center gap-1">
            <Input
              id={tipId}
              type="number"
              min="0"
              max="100"
              value={tipPct}
              onChange={(e) => setTipPct(e.target.value)}
              placeholder="Custom"
              className="w-24"
              aria-label="Custom tip percentage"
            />
            <span className="text-sm text-[var(--muted)]">%</span>
          </div>
        </div>
      </div>

      {billNum > 0 && (
        <dl className="flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <dt className="text-sm text-[var(--muted)]">{row.label}</dt>
              <dd className="text-base font-semibold text-[var(--foreground)]">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

TipCalculator.displayName = "TipCalculator";
