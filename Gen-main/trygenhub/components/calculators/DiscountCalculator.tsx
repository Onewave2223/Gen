"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { calculateDiscount, type DiscountResult } from "@/lib/calculators/discount";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function DiscountCalculator() {
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
    const priceNum = parseFloat(price);
    const discountNum = parseFloat(discount);
    const taxNum = tax.trim() === "" ? 0 : parseFloat(tax);

    try {
      const calculated = calculateDiscount(priceNum, discountNum, taxNum);
      setResult(calculated);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
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
              Original price
            </label>
            <Input
              id={priceId}
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="100"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={discountId} className="text-sm font-medium text-[var(--foreground)]">
              Discount (%)
            </label>
            <Input
              id={discountId}
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              step="0.1"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={taxId} className="text-sm font-medium text-[var(--foreground)]">
              Sales tax (%) — optional
            </label>
            <Input
              id={taxId}
              type="number"
              inputMode="decimal"
              min={0}
              step="0.1"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <p className="text-xs text-[var(--muted)]">
          Tax, if entered, is applied to the price after the discount.
        </p>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Calculate</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      {result && (
        <div className="flex flex-col gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-[var(--muted)]">Final price</span>
            <span className="text-3xl font-bold text-[var(--foreground)]">
              ${formatCurrency(result.finalPrice)}
            </span>
          </div>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-[var(--muted)]">You save</dt>
              <dd className="text-lg font-semibold text-[var(--foreground)]">
                ${formatCurrency(result.totalSavings)}
              </dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-[var(--muted)]">Discount amount</dt>
              <dd className="text-lg font-semibold text-[var(--foreground)]">
                ${formatCurrency(result.discountAmount)}
              </dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-[var(--muted)]">Price after discount</dt>
              <dd className="text-lg font-semibold text-[var(--foreground)]">
                ${formatCurrency(result.priceAfterDiscount)}
              </dd>
            </div>
            {result.additionalTaxAmount > 0 && (
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-[var(--muted)]">Tax added</dt>
                <dd className="text-lg font-semibold text-[var(--foreground)]">
                  ${formatCurrency(result.additionalTaxAmount)}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}

DiscountCalculator.displayName = "DiscountCalculator";
