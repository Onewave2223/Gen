"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";

const PRESET_TIPS = [10, 15, 18, 20, 25];

export function TipCalculatorRu() {
  const [bill, setBill] = React.useState("");
  const [tipPercent, setTipPercent] = React.useState<number>(15);
  const [customTip, setCustomTip] = React.useState("");
  const [isCustom, setIsCustom] = React.useState(false);
  const [people, setPeople] = React.useState("1");

  const billNum = parseFloat(bill.replace(",", ".")) || 0;
  const tipPct = isCustom ? (parseFloat(customTip.replace(",", ".")) || 0) : tipPercent;
  const peopleNum = Math.max(1, Math.round(parseFloat(people) || 1));

  const tipAmount = billNum * (tipPct / 100);
  const total = billNum + tipAmount;
  const perPerson = total / peopleNum;

  const fmt = (n: number) =>
    n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--foreground)]">Сумма счёта</label>
        <Input
          type="text"
          inputMode="decimal"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          placeholder="Например: 2500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[var(--foreground)]">Процент чаевых</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_TIPS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTipPercent(t); setIsCustom(false); }}
              className={`rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors ${
                !isCustom && tipPercent === t
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {t}%
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsCustom(true)}
            className={`rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors ${
              isCustom
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Другой
          </button>
        </div>
        {isCustom && (
          <Input
            type="text"
            inputMode="decimal"
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
            placeholder="Введите % чаевых"
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--foreground)]">Количество человек</label>
        <Input
          type="number"
          min="1"
          max="100"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ResultCard label="Сумма чаевых" value={fmt(tipAmount)} />
        <ResultCard label="Итого с чаевыми" value={fmt(total)} />
        <ResultCard label="На одного человека" value={fmt(perPerson)} highlight />
      </div>
    </div>
  );
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex flex-col gap-1 rounded-[var(--radius)] border p-3 ${highlight ? "border-[var(--primary)] bg-[var(--surface)]" : "border-[var(--border)] bg-[var(--background)]"}`}>
      <span className="text-xs font-medium text-[var(--muted)]">{label}</span>
      <span className={`text-xl font-bold ${highlight ? "text-[var(--primary)]" : "text-[var(--foreground)]"}`}>{value}</span>
    </div>
  );
}

TipCalculatorRu.displayName = "TipCalculatorRu";
