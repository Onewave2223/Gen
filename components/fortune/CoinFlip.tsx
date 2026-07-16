"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import { flipCoin, coinResultLabel, type CoinResult } from "@/lib/fortune/coin-flip";

const FLIP_DURATION_MS = 1100;

export function CoinFlip() {
  const [result, setResult] = React.useState<CoinResult | null>(null);
  const [isFlipping, setIsFlipping] = React.useState(false);
  const [flipKey, setFlipKey] = React.useState(0);

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFlipKey((key) => key + 1);
    window.setTimeout(() => {
      setResult(flipCoin());
      setIsFlipping(false);
    }, FLIP_DURATION_MS);
  };

  const handleReset = () => {
    setResult(null);
    setIsFlipping(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center py-4">
        <div
          key={flipKey}
          aria-hidden="true"
          className={`flex h-32 w-32 items-center justify-center rounded-full border-4 border-[var(--primary)] bg-gradient-to-br from-amber-300 to-amber-500 text-4xl font-bold text-amber-900 shadow-lg mystic-glow ${
            isFlipping ? "mystic-coin-flip" : ""
          }`}
        >
          {isFlipping ? "" : result ? (result === "heads" ? "👑" : "🪙") : "🪙"}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={handleFlip} disabled={isFlipping}>
          {isFlipping ? "Coin is flipping..." : "Flip the coin"}
        </Button>
        {result && (
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        )}
      </div>

      <ResultBox
        label="Result"
        empty={!result}
        emptyMessage="Your flip result will appear here."
        actions={
          <CopyButton
            text={result ? coinResultLabel(result) : ""}
            disabled={!result}
            size="sm"
            variant="secondary"
            label="Copy"
            copiedLabel="Copied!"
          />
        }
      >
        {result && (
          <span className="mystic-fade-up block text-center text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {coinResultLabel(result)}
          </span>
        )}
      </ResultBox>
    </div>
  );
}

CoinFlip.displayName = "CoinFlip";
