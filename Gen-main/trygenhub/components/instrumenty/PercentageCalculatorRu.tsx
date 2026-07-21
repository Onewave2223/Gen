"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Mode = "percent-of" | "what-percent" | "change" | "add" | "subtract";

const MODES: { value: Mode; label: string; formula: string }[] = [
  { value: "percent-of", label: "X% от числа", formula: "(X ÷ 100) × Y" },
  { value: "what-percent", label: "X — это сколько % от Y", formula: "(X ÷ Y) × 100" },
  { value: "change", label: "Процентное изменение", formula: "((Y − X) ÷ |X|) × 100" },
  { value: "add", label: "Прибавить X% к Y", formula: "Y + (X ÷ 100) × Y" },
  { value: "subtract", label: "Вычесть X% из Y", formula: "Y − (X ÷ 100) × Y" },
];

export function PercentageCalculatorRu() {
  const [mode, setMode] = React.useState<Mode>("percent-of");
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");

  const labelMap: Record<Mode, { a: string; b: string }> = {
    "percent-of": { a: "Процент (%)", b: "От числа" },
    "what-percent": { a: "Число X", b: "От числа Y" },
    change: { a: "Начальное значение", b: "Конечное значение" },
    add: { a: "Процент для прибавления (%)", b: "Число" },
    subtract: { a: "Процент для вычитания (%)", b: "Число" },
  };
  const { a: labelA, b: labelB } = labelMap[mode];
  const activeMode = MODES.find((m) => m.value === mode)!;

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const numA = parseFloat(a.replace(",", "."));
    const numB = parseFloat(b.replace(",", "."));
    if (isNaN(numA) || isNaN(numB)) {
      setError("Введите корректные числа в оба поля.");
      setResult(null);
      return;
    }
    setError("");
    if (mode === "percent-of") {
      const res = (numA / 100) * numB;
      setResult(`${numA}% от ${numB} = ${round(res)}`);
    } else if (mode === "what-percent") {
      if (numB === 0) { setError("Делитель не может быть равен нулю."); setResult(null); return; }
      const res = (numA / numB) * 100;
      setResult(`${numA} — это ${round(res)}% от ${numB}`);
    } else if (mode === "change") {
      if (numA === 0) { setError("Начальное значение не может быть равно нулю."); setResult(null); return; }
      const res = ((numB - numA) / Math.abs(numA)) * 100;
      const sign = res >= 0 ? "+" : "";
      setResult(`Изменение: ${sign}${round(res)}% (с ${numA} до ${numB})`);
    } else if (mode === "add") {
      const res = numB + (numA / 100) * numB;
      setResult(`${numB} + ${numA}% = ${round(res)}`);
    } else {
      const res = numB - (numA / 100) * numB;
      setResult(`${numB} − ${numA}% = ${round(res)}`);
    }
  };

  const reset = () => { setA(""); setB(""); setResult(null); setError(""); };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => { setMode(m.value); setResult(null); setError(""); }}
            className={`rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === m.value
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-[var(--muted)]">Формула: {activeMode.formula}</p>

      <form onSubmit={calculate} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">{labelA}</label>
          <Input
            type="text"
            inputMode="decimal"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Например: 15"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">{labelB}</label>
          <Input
            type="text"
            inputMode="decimal"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Например: 200"
          />
        </div>
        {error && <p role="alert" className="text-sm font-medium text-[var(--danger)]">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Рассчитать</Button>
          <Button type="button" variant="secondary" onClick={reset}>Сбросить</Button>
        </div>
      </form>

      {result && (
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm text-[var(--muted)] mb-1">Результат</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{result}</p>
        </div>
      )}
    </div>
  );
}

function round(n: number): string {
  const r = Math.round(n * 10000) / 10000;
  return r.toLocaleString("ru-RU", { maximumFractionDigits: 4 });
}

PercentageCalculatorRu.displayName = "PercentageCalculatorRu";
