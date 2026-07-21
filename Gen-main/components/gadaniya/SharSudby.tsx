"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import { CrystalBallScene } from "@/components/tarot/CrystalBallScene";
import {
  getShaSudbyAnswer,
  type ShaSudbyAnswer,
} from "@/lib/gadaniya/shar-sudby";
import { shareOrCopy } from "@/lib/tarot/share";
import { trackFortuneEvent } from "@/lib/tarot/analytics";

const REVEAL_DELAY_MS = 1400;

const toneStyles: Record<ShaSudbyAnswer["tone"], string> = {
  positive: "text-[var(--success)]",
  negative: "text-[var(--danger)]",
  neutral: "text-[var(--primary)]",
};

export function SharSudby() {
  const questionId = React.useId();

  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState<ShaSudbyAnswer | null>(null);
  const [isShaking, setIsShaking] = React.useState(false);
  const [shareState, setShareState] = React.useState<"idle" | "shared" | "copied">("idle");

  const revealAnswer = () => {
    if (isShaking) return;

    trackFortuneEvent("magic_ball_used", { locale: "ru" });
    setIsShaking(true);
    setAnswer(null);
    setShareState("idle");

    window.setTimeout(() => {
      setAnswer((previous) => getShaSudbyAnswer(previous));
      setIsShaking(false);
    }, REVEAL_DELAY_MS);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    revealAnswer();
  };

  const handleReset = () => {
    setQuestion("");
    setAnswer(null);
    setIsShaking(false);
    setShareState("idle");
  };

  const handleShare = async () => {
    if (!answer) return;
    const result = await shareOrCopy(
      `Шар судьбы отвечает: ${answer.text}\n\nTryGenHub`,
      "TryGenHub Шар судьбы",
    );
    trackFortuneEvent("share_result_clicked", { tool: "shar-sudby" });
    if (result === "shared") setShareState("shared");
    else if (result === "copied") setShareState("copied");
    if (result !== "failed") {
      window.setTimeout(() => setShareState("idle"), 2200);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={questionId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Загадай вопрос
          </label>
          <Input
            id={questionId}
            type="text"
            placeholder="О чём хочешь спросить шар судьбы?"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={200}
          />
        </div>

        <div className="flex justify-center py-4">
          <CrystalBallScene shaking={isShaking} />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button type="submit" disabled={isShaking}>
            {isShaking ? "Шар отвечает..." : "Спросить у шара"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Ответ шара судьбы"
        empty={!answer}
        emptyMessage="Здесь появится предсказание."
        actions={
          <>
            <CopyButton
              text={answer?.text ?? ""}
              disabled={!answer}
              size="sm"
              variant="secondary"
              label="Скопировать"
              copiedLabel="Скопировано!"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={!answer}
              onClick={handleShare}
            >
              {shareState === "idle" ? "Поделиться" : shareState === "shared" ? "Отправлено!" : "Скопировано!"}
            </Button>
          </>
        }
      >
        {answer && (
          <span
            className={`mystic-fade-up block text-center text-2xl font-bold tracking-tight ${toneStyles[answer.tone]}`}
          >
            {answer.text}
          </span>
        )}
      </ResultBox>

      {answer && (
        <Button type="button" variant="secondary" onClick={revealAnswer}>
          Спросить снова
        </Button>
      )}
    </div>
  );
}

SharSudby.displayName = "SharSudby";
