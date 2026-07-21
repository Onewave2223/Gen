"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  flipFateCoin,
  coinSideLabel,
  type CoinSide,
} from "@/lib/gadaniya/monetka";

const FLIP_DURATION_MS = 1100;

export function Monetka() {
  const [result, setResult] = React.useState<CoinSide | null>(null);
  const [isFlipping, setIsFlipping] = React.useState(false);
  const [flipKey, setFlipKey] = React.useState(0);

  const handleFlip = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setFlipKey((key) => key + 1);

    window.setTimeout(() => {
      setResult(flipFateCoin());
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
          {isFlipping ? "" : result ? (result === "orel" ? "🦅" : "🪙") : "🪙"}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={handleFlip} disabled={isFlipping}>
          {isFlipping ? "Монета летит..." : "Подбросить монету"}
        </Button>
        {result && (
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        )}
      </div>

      <ResultBox
        label="Результат"
        empty={!result}
        emptyMessage="Здесь появится результат броска."
        actions={
          <CopyButton
            text={result ? coinSideLabel(result) : ""}
            disabled={!result}
            size="sm"
            variant="secondary"
            label="Скопировать"
            copiedLabel="Скопировано!"
          />
        }
      >
        {result && (
          <span className="mystic-fade-up block text-center text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {coinSideLabel(result)}
          </span>
        )}
      </ResultBox>
    </div>
  );
}

Monetka.displayName = "Monetka";
