"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import { getDaNetAnswer, type DaNetAnswer } from "@/lib/gadaniya/da-net";

const REVEAL_DELAY_MS = 900;

const toneStyles: Record<DaNetAnswer["tone"], string> = {
  yes: "text-[var(--success)]",
  no: "text-[var(--danger)]",
  maybe: "text-[var(--primary)]",
};

export function DaNet() {
  const questionId = React.useId();

  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState<DaNetAnswer | null>(null);
  const [isRevealing, setIsRevealing] = React.useState(false);

  const revealAnswer = () => {
    if (isRevealing) return;

    setIsRevealing(true);
    setAnswer(null);

    window.setTimeout(() => {
      setAnswer((previous) => getDaNetAnswer(previous));
      setIsRevealing(false);
    }, REVEAL_DELAY_MS);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    revealAnswer();
  };

  const handleReset = () => {
    setQuestion("");
    setAnswer(null);
    setIsRevealing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={questionId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Твой вопрос
          </label>
          <Input
            id={questionId}
            type="text"
            placeholder="Например: стоит ли мне..."
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={200}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isRevealing}>
            {isRevealing ? "Спрашиваю у судьбы..." : "Получить ответ"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Ответ"
        empty={!answer}
        emptyMessage="Здесь появится ответ на твой вопрос."
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
            className={`mystic-fade-up block text-3xl font-bold tracking-tight ${toneStyles[answer.tone]}`}
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

DaNet.displayName = "DaNet";
