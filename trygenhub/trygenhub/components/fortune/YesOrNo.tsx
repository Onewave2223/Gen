"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import { getYesOrNoAnswer, type YesOrNoAnswer } from "@/lib/fortune/yes-or-no";

const REVEAL_DELAY_MS = 900;

const toneStyles: Record<YesOrNoAnswer["tone"], string> = {
  yes: "text-[var(--success)]",
  no: "text-[var(--danger)]",
  maybe: "text-[var(--primary)]",
};

export function YesOrNo() {
  const questionId = React.useId();

  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState<YesOrNoAnswer | null>(null);
  const [isRevealing, setIsRevealing] = React.useState(false);

  const revealAnswer = () => {
    if (isRevealing) return;
    setIsRevealing(true);
    setAnswer(null);
    window.setTimeout(() => {
      setAnswer((previous) => getYesOrNoAnswer(previous));
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
            Your question
          </label>
          <Input
            id={questionId}
            type="text"
            placeholder="e.g. Should I take this step now?"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={200}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isRevealing}>
            {isRevealing ? "Asking the oracle..." : "Get an answer"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Answer"
        empty={!answer}
        emptyMessage="Your answer will appear here."
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
            className={`mystic-fade-up block text-3xl font-bold tracking-tight ${toneStyles[answer.tone]}`}
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

YesOrNo.displayName = "YesOrNo";
