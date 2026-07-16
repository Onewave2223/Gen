"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { calculateDiscount, type DiscountResult } from "@/lib/calculators/discount";

function formatCurrency(n: number): string {
  return n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function DiscountCalculatorRu() {
  const priceId = React.useId();
  const discountId = React.useId();
  const taxId = React.useId();

  const [price, setPrice] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [tax, setTax] = React.useState("");
  const [result, setResult] = React.useState<DiscountResult | null>(null);
  const [error, setError] = React.useState("");

  const handleCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const priceNum = parseFloat(price.replace(",", "."));
    const discountNum = parseFloat(discount.replace(",", "."));
    const taxNum = tax.trim() === "" ? 0 : parseFloat(tax.replace(",", "."));

    try {
      const calculated = calculateDiscount(priceNum, discountNum, taxNum);
      setResult(calculated);
      setError("");
    } catch {
      setError("Проверьте введённые значения: цена и скидка должны быть корректными числами.");
      setResult(null);
    }
  };

  const handleReset = () => {
    setPrice("");
    setDiscount("");
    setTax("");
    setResult(null);
    setError("");
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleCalculate} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={priceId} className="text-sm font-medium text-[var(--foreground)]">
              Исходная цена
            </label>
            <input
              id={priceId}
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1000"
              className="h-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={discountId} className="text-sm font-medium text-[var(--foreground)]">
              Скидка (%)
            </label>
            <input
              id={discountId}
              type="text"
              inputMode="decimal"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="20"
              className="h-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={taxId} className="text-sm font-medium text-[var(--foreground)]">
              Налог (%) — опционально
            </label>
            <input
              id={taxId}
              type="text"
              inputMode="decimal"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              placeholder="0"
              className="h-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            />
          </div>
        </div>

        <p className="text-xs text-[var(--muted)]">
          Налог, если указан, применяется к цене после скидки.
        </p>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Рассчитать</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      {result && (
        <div className="flex flex-col gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-[var(--muted)]">Итоговая цена</span>
            <span className="text-3xl font-bold text-[var(--foreground)]">
              {formatCurrency(result.finalPrice)} ₽
            </span>
          </div>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-[var(--muted)]">Вы экономите</dt>
              <dd className="text-lg font-semibold text-[var(--foreground)]">
                {formatCurrency(result.totalSavings)} ₽
              </dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-[var(--muted)]">Сумма скидки</dt>
              <dd className="text-lg font-semibold text-[var(--foreground)]">
                {formatCurrency(result.discountAmount)} ₽
              </dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-[var(--muted)]">Цена после скидки</dt>
              <dd className="text-lg font-semibold text-[var(--foreground)]">
                {formatCurrency(result.priceAfterDiscount)} ₽
              </dd>
            </div>
            {result.additionalTaxAmount > 0 && (
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-[var(--muted)]">Добавленный налог</dt>
                <dd className="text-lg font-semibold text-[var(--foreground)]">
                  {formatCurrency(result.additionalTaxAmount)} ₽
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}

DiscountCalculatorRu.displayName = "DiscountCalculatorRu";
