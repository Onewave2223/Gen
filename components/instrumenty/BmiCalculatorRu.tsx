"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type UnitSystem = "metric" | "imperial";

interface BmiResult {
  bmi: number;
  category: string;
  description: string;
}

function getBmiCategory(bmi: number): { category: string; description: string } {
  if (bmi < 18.5) return { category: "Дефицит массы тела", description: "ИМТ ниже нормы" };
  if (bmi < 25) return { category: "Норма", description: "ИМТ в пределах нормы" };
  if (bmi < 30) return { category: "Избыточный вес", description: "ИМТ выше нормы" };
  if (bmi < 35) return { category: "Ожирение I степени", description: "ИМТ значительно выше нормы" };
  if (bmi < 40) return { category: "Ожирение II степени", description: "ИМТ значительно выше нормы" };
  return { category: "Ожирение III степени", description: "ИМТ значительно выше нормы" };
}

export function BmiCalculatorRu() {
  const [units, setUnits] = React.useState<UnitSystem>("metric");
  const [heightCm, setHeightCm] = React.useState("");
  const [weightKg, setWeightKg] = React.useState("");
  const [heightFt, setHeightFt] = React.useState("");
  const [heightIn, setHeightIn] = React.useState("");
  const [weightLbs, setWeightLbs] = React.useState("");
  const [result, setResult] = React.useState<BmiResult | null>(null);
  const [error, setError] = React.useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    let heightM: number;
    let weightInKg: number;

    if (units === "metric") {
      heightM = parseFloat(heightCm.replace(",", ".")) / 100;
      weightInKg = parseFloat(weightKg.replace(",", "."));
    } else {
      const ft = parseFloat(heightFt.replace(",", ".")) || 0;
      const inches = parseFloat(heightIn.replace(",", ".")) || 0;
      heightM = (ft * 12 + inches) * 0.0254;
      weightInKg = parseFloat(weightLbs.replace(",", ".")) * 0.453592;
    }

    if (isNaN(heightM) || isNaN(weightInKg) || heightM <= 0 || weightInKg <= 0) {
      setError("Введите корректные значения роста и веса.");
      setResult(null);
      return;
    }

    setError("");
    const bmi = weightInKg / (heightM * heightM);
    const { category, description } = getBmiCategory(bmi);
    setResult({ bmi, category, description });
  };

  const reset = () => {
    setHeightCm(""); setWeightKg(""); setHeightFt(""); setHeightIn(""); setWeightLbs("");
    setResult(null); setError("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(["metric", "imperial"] as UnitSystem[]).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => { setUnits(u); setResult(null); setError(""); }}
            className={`rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors ${
              units === u
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {u === "metric" ? "Метрическая (кг / см)" : "Английская (фт, дюйм / фунт)"}
          </button>
        ))}
      </div>

      <form onSubmit={calculate} className="flex flex-col gap-4">
        {units === "metric" ? (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--foreground)]">Рост (см)</label>
              <Input type="text" inputMode="decimal" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="Например: 175" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--foreground)]">Вес (кг)</label>
              <Input type="text" inputMode="decimal" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="Например: 70" />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--foreground)]">Рост (футы)</label>
                <Input type="text" inputMode="decimal" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--foreground)]">Рост (дюймы)</label>
                <Input type="text" inputMode="decimal" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="9" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--foreground)]">Вес (фунты)</label>
              <Input type="text" inputMode="decimal" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} placeholder="154" />
            </div>
          </>
        )}
        {error && <p role="alert" className="text-sm font-medium text-[var(--danger)]">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Рассчитать ИМТ</Button>
          <Button type="button" variant="secondary" onClick={reset}>Сбросить</Button>
        </div>
      </form>

      {result && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm text-[var(--muted)]">Результат</p>
          <p className="text-3xl font-bold text-[var(--foreground)]">
            ИМТ: {result.bmi.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </p>
          <p className="text-base font-semibold text-[var(--foreground)]">{result.category}</p>
          <p className="text-sm text-[var(--muted)]">{result.description}</p>
        </div>
      )}

      <p className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3 text-xs text-[var(--muted)]">
        ⚠️ Результат носит исключительно информационный характер и не является медицинской консультацией, диагнозом или рекомендацией. Для оценки состояния здоровья обратитесь к врачу.
      </p>
    </div>
  );
}

BmiCalculatorRu.displayName = "BmiCalculatorRu";
