"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import { getWishAnswer, type WishAnswer } from "@/lib/gadaniya/zhelanie";

const REVEAL_DELAY_MS = 900;

const toneStyles: Record<WishAnswer["tone"], string> = {
  positive: "text-[var(--success)]",
  negative: "text-[var(--danger)]",
  neutral: "text-[var(--primary)]",
};

export function Zhelanie() {
  const wishId = React.useId();

  const [wish, setWish] = React.useState("");
  const [answer, setAnswer] = React.useState<WishAnswer | null>(null);
  const [isRevealing, setIsRevealing] = React.useState(false);

  const revealAnswer = () => {
    if (isRevealing) return;

    setIsRevealing(true);
    setAnswer(null);

    window.setTimeout(() => {
      setAnswer((previous) => getWishAnswer(previous));
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
            Твоё желание (необязательно)
          </label>
          <Input
            id={wishId}
            type="text"
            placeholder="Можно загадать молча или написать здесь"
            value={wish}
            onChange={(event) => setWish(event.target.value)}
            maxLength={200}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isRevealing}>
            {isRevealing ? "Считываю желание..." : "Узнать шансы"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Прогноз"
        empty={!answer}
        emptyMessage="Здесь появится прогноз для твоего желания."
        actions={
          <CopyButton
            text={answer?.text ?? ""}
            disabled={!answer}
            size="sm"
            variant="secondary"
            label="Скопировать"
            copiedLabel="Скопировано!"
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
          Спросить ещё раз
        </Button>
      )}
    </div>
  );
}

Zhelanie.displayName = "Zhelanie";
