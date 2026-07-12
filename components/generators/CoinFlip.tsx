"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  flipCoins,
  formatCoinFlipResult,
  type CoinFlipOptions,
  type CoinFlipResult,
  type CoinSide,
} from "@/lib/generators/coin-flip";

const DEFAULT_COUNT = "1";

function parseNumberInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

function formatPercentage(part: number, total: number): string {
  if (total === 0) return "0%";
  return `${((part / total) * 100).toFixed(1)}%`;
}

function sideLabel(side: CoinSide): string {
  return side === "heads" ? "Heads" : "Tails";
}

export function CoinFlip() {
  const countId = React.useId();

  const [countInput, setCountInput] = React.useState(DEFAULT_COUNT);
  const [result, setResult] = React.useState<CoinFlipResult | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: CoinFlipOptions = {
      count: parseNumberInput(countInput),
    };

    try {
      const flipped = flipCoins(options);
      setResult(flipped);
      setError("");
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setCountInput(DEFAULT_COUNT);
    setResult(null);
    setError("");
  };

  const hasResult = result !== null;
  const copyText = hasResult ? formatCoinFlipResult(result) : "";
  const isSingleFlip = hasResult && result.flips.length === 1;

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Number of flips
          </label>
          <Input
            id={countId}
            type="number"
            inputMode="numeric"
            min={1}
            max={1000}
            value={countInput}
            onChange={(event) => setCountInput(event.target.value)}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Flip coins</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResult}
        emptyMessage="Your coin flip results will appear here."
        actions={
          <CopyButton
            text={copyText}
            disabled={!hasResult}
            size="sm"
            variant="secondary"
          />
        }
      >
        {hasResult &&
          (isSingleFlip ? (
            <span className="block text-3xl font-bold tracking-tight text-[var(--foreground)]">
              {sideLabel(result.flips[0])}
            </span>
          ) : (
            <div className="flex flex-col gap-3">
              <ul className="flex flex-wrap gap-2">
                {result.flips.map((flip, index) => (
                  <li
                    key={`${flip}-${index}`}
                    className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium text-[var(--foreground)]"
                  >
                    {sideLabel(flip)}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-1 text-sm text-[var(--foreground)]">
                <span>
                  Heads: {result.heads} (
                  {formatPercentage(result.heads, result.flips.length)})
                </span>
                <span>
                  Tails: {result.tails} (
                  {formatPercentage(result.tails, result.flips.length)})
                </span>
              </div>
            </div>
          ))}
      </ResultBox>
    </div>
  );
}

CoinFlip.displayName = "CoinFlip";
