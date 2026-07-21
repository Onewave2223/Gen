"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import { getWishOracleAnswer, type WishOracleAnswer } from "@/lib/fortune/wish-oracle";

const REVEAL_DELAY_MS = 900;

const toneStyles: Record<WishOracleAnswer["tone"], string> = {
  positive: "text-[var(--success)]",
  negative: "text-[var(--danger)]",
  neutral: "text-[var(--primary)]",
};

export function WishOracle() {
  const wishId = React.useId();

  const [wish, setWish] = React.useState("");
  const [answer, setAnswer] = React.useState<WishOracleAnswer | null>(null);
  const [isRevealing, setIsRevealing] = React.useState(false);

  const revealAnswer = () => {
    if (isRevealing) return;
    setIsRevealing(true);
    setAnswer(null);
    window.setTimeout(() => {
      setAnswer((previous) => getWishOracleAnswer(previous));
      setIsRevealing(false);
    }, REVEAL_DELAY_MS);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    revealAnswer();
  };

  const handleReset = () => {
    setWish("");
    setAnswer(null);
    setIsRevealing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={wishId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Your wish (optional)
          </label>
          <Input
            id={wishId}
            type="text"
            placeholder="Make a silent wish or write it here"
            value={wish}
            onChange={(event) => setWish(event.target.value)}
            maxLength={200}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isRevealing}>
            {isRevealing ? "Reading your wish..." : "Check the chances"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="The oracle says"
        empty={!answer}
        emptyMessage="The oracle's answer will appear here."
        actions={
          <CopyButton
            text={answer?.text ?? ""}
            disabled={!answer}
            size="sm"
            variant="secondary"
            label="Copy"
            copiedLabel="Copied!"
          />
        }
      >
        {answer && (
          <span
            className={`mystic-fade-up block text-2xl font-bold tracking-tight ${toneStyles[answer.tone]}`}
          >
            {answer.text}
          </span>
        )}
      </ResultBox>

      {answer && (
        <Button type="button" variant="secondary" onClick={revealAnswer}>
          Ask again
        </Button>
      )}
    </div>
  );
}

WishOracle.displayName = "WishOracle";
