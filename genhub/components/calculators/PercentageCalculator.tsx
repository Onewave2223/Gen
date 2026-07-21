"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Mode = "whatIsXofY" | "xIsWhatPercent" | "percentChange" | "addPercent" | "subtractPercent";

const MODES: { id: Mode; label: string; formula: string }[] = [
  { id: "whatIsXofY", label: "What is X% of Y?", formula: "(X ÷ 100) × Y" },
  { id: "xIsWhatPercent", label: "X is what % of Y?", formula: "(X ÷ Y) × 100" },
  { id: "percentChange", label: "% change from X to Y", formula: "((Y − X) ÷ |X|) × 100" },
  { id: "addPercent", label: "Add X% to Y", formula: "Y + (X ÷ 100) × Y" },
  { id: "subtractPercent", label: "Subtract X% from Y", formula: "Y − (X ÷ 100) × Y" },
];

function formatNum(n: number): string {
  if (!isFinite(n)) return "—";
  return parseFloat(n.toFixed(6)).toLocaleString("en-US", {
    maximumFractionDigits: 4,
  });
}

export function PercentageCalculator() {
  const [mode, setMode] = React.useState<Mode>("whatIsXofY");
  const [x, setX] = React.useState("");
  const [y, setY] = React.useState("");
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");

  const handleCalculate = () => {
    const xNum = parseFloat(x);
    const yNum = parseFloat(y);

    if (isNaN(xNum) || isNaN(yNum)) {
      setError("Please enter valid numbers for both fields.");
      setResult(null);
      return;
    }

    setError("");

    if (mode === "whatIsXofY") {
      const res = (xNum / 100) * yNum;
      setResult(`${formatNum(xNum)}% of ${formatNum(yNum)} = ${formatNum(res)}`);
    } else if (mode === "xIsWhatPercent") {
      if (yNum === 0) {
        setError("Y cannot be zero.");
        setResult(null);
        return;
      }
      const res = (xNum / yNum) * 100;
      setResult(`${formatNum(xNum)} is ${formatNum(res)}% of ${formatNum(yNum)}`);
    } else if (mode === "percentChange") {
      if (xNum === 0) {
        setError("Starting value (X) cannot be zero.");
        setResult(null);
        return;
      }
      const res = ((yNum - xNum) / Math.abs(xNum)) * 100;
      const dir = res >= 0 ? "increase" : "decrease";
      setResult(
        `${formatNum(Math.abs(res))}% ${dir} from ${formatNum(xNum)} to ${formatNum(yNum)}`,
      );
    } else if (mode === "addPercent") {
      const res = yNum + (xNum / 100) * yNum;
      setResult(`${formatNum(yNum)} + ${formatNum(xNum)}% = ${formatNum(res)}`);
    } else {
      const res = yNum - (xNum / 100) * yNum;
      setResult(`${formatNum(yNum)} − ${formatNum(xNum)}% = ${formatNum(res)}`);
    }
  };

  const labels: Record<Mode, { x: string; y: string }> = {
    whatIsXofY: { x: "Percentage (%)", y: "Value" },
    xIsWhatPercent: { x: "Part", y: "Whole" },
    percentChange: { x: "From (X)", y: "To (Y)" },
    addPercent: { x: "Percentage to add (%)", y: "Value" },
    subtractPercent: { x: "Percentage to subtract (%)", y: "Value" },
  };

  const { x: xLabel, y: yLabel } = labels[mode];
  const activeMode = MODES.find((m) => m.id === mode)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[var(--foreground)]">Mode</span>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMode(m.id);
                setResult(null);
                setError("");
              }}
              className={`rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                mode === m.id
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)]">Formula: {activeMode.formula}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">
            {xLabel}
          </label>
          <Input
            type="number"
            value={x}
            onChange={(e) => { setX(e.target.value); setResult(null); }}
            placeholder="0"
            className="w-36"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">
            {yLabel}
          </label>
          <Input
            type="number"
            value={y}
            onChange={(e) => { setY(e.target.value); setResult(null); }}
            placeholder="0"
            className="w-36"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      <Button type="button" onClick={handleCalculate} className="self-start">
        Calculate
      </Button>

      {result && (
        <div className="rounded-[var(--radius)] border border-[var(--primary)] bg-[var(--surface)] p-4">
          <p className="text-lg font-semibold text-[var(--foreground)]">{result}</p>
        </div>
      )}
    </div>
  );
}

PercentageCalculator.displayName = "PercentageCalculator";
