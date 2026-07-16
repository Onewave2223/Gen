"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Unit = "metric" | "imperial";

interface BmiResult {
  bmi: number;
  category: string;
}

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function calcBmi(unit: Unit, weight: number, height: number, heightIn?: number): number {
  if (unit === "metric") {
    const hM = height / 100;
    return weight / (hM * hM);
  } else {
    const totalInches = height * 12 + (heightIn ?? 0);
    return (703 * weight) / (totalInches * totalInches);
  }
}

export function BmiCalculator() {
  const [unit, setUnit] = React.useState<Unit>("metric");
  const [weight, setWeight] = React.useState("");
  const [heightCm, setHeightCm] = React.useState("");
  const [heightFt, setHeightFt] = React.useState("");
  const [heightIn, setHeightIn] = React.useState("");
  const [result, setResult] = React.useState<BmiResult | null>(null);
  const [error, setError] = React.useState("");

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const hCm = parseFloat(heightCm);
    const hFt = parseFloat(heightFt);
    const hIn = parseFloat(heightIn) || 0;

    if (unit === "metric") {
      if (isNaN(w) || isNaN(hCm) || w <= 0 || hCm <= 0) {
        setError("Enter valid positive weight (kg) and height (cm).");
        setResult(null);
        return;
      }
      const bmi = calcBmi("metric", w, hCm);
      setResult({ bmi: Math.round(bmi * 10) / 10, category: getBmiCategory(bmi) });
    } else {
      if (isNaN(w) || isNaN(hFt) || w <= 0 || hFt < 0) {
        setError("Enter valid weight (lbs) and height (ft / in).");
        setResult(null);
        return;
      }
      const bmi = calcBmi("imperial", w, hFt, hIn);
      setResult({ bmi: Math.round(bmi * 10) / 10, category: getBmiCategory(bmi) });
    }
    setError("");
  };

  const categoryColors: Record<string, string> = {
    Underweight: "text-blue-500",
    "Normal weight": "text-green-500",
    Overweight: "text-yellow-500",
    Obese: "text-red-500",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(["metric", "imperial"] as Unit[]).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => {
              setUnit(u);
              setResult(null);
              setError("");
            }}
            className={`rounded-[var(--radius)] px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
              unit === u
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            {u === "metric" ? "Metric (kg / cm)" : "Imperial (lbs / ft-in)"}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <Input
            type="number"
            min="0"
            value={weight}
            onChange={(e) => { setWeight(e.target.value); setResult(null); }}
            placeholder={unit === "metric" ? "70" : "154"}
            className="w-28"
          />
        </div>

        {unit === "metric" ? (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--foreground)]">
              Height (cm)
            </label>
            <Input
              type="number"
              min="0"
              value={heightCm}
              onChange={(e) => { setHeightCm(e.target.value); setResult(null); }}
              placeholder="175"
              className="w-28"
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Height (ft)
              </label>
              <Input
                type="number"
                min="0"
                value={heightFt}
                onChange={(e) => { setHeightFt(e.target.value); setResult(null); }}
                placeholder="5"
                className="w-20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Height (in)
              </label>
              <Input
                type="number"
                min="0"
                max="11"
                value={heightIn}
                onChange={(e) => { setHeightIn(e.target.value); setResult(null); }}
                placeholder="9"
                className="w-20"
              />
            </div>
          </>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      <Button type="button" onClick={handleCalculate} className="self-start">
        Calculate BMI
      </Button>

      {result && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-[var(--foreground)]">
              {result.bmi}
            </span>
            <span className={`text-lg font-semibold ${categoryColors[result.category] ?? ""}`}>
              {result.category}
            </span>
          </div>
          <div className="text-xs text-[var(--muted)]">
            Standard BMI ranges: &lt;18.5 Underweight · 18.5–24.9 Normal · 25–29.9 Overweight · ≥30 Obese
          </div>
        </div>
      )}

      <p className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3 text-xs text-[var(--muted)]">
        <strong>Note:</strong> BMI is a general screening tool and does not account for age, sex,
        muscle mass, or other individual factors. It is not a substitute for professional medical
        advice. Consult a healthcare provider for a full health assessment.
      </p>
    </div>
  );
}

BmiCalculator.displayName = "BmiCalculator";
