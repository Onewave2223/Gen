"use client";

import type { OptionId } from "@/lib/iq-test/types";

interface Props {
  total: number;
  current: number; // 0-based
  answers: Record<number, OptionId>;
  questionIds: number[];
  onNavigate: (index: number) => void;
  jumpLabel: string;
  answeredLabel: string;
  currentLabel: string;
  unansweredLabel: string;
}

export function QuestionNavigator({
  total,
  current,
  answers,
  questionIds,
  onNavigate,
  jumpLabel,
  answeredLabel,
  currentLabel,
  unansweredLabel,
}: Props) {
  return (
    <nav aria-label="Question navigator" className="flex flex-col gap-2">
      <p className="text-xs font-medium text-[var(--muted)]">{jumpLabel}</p>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: total }, (_, i) => {
          const qId = questionIds[i];
          const answered = qId !== undefined && answers[qId] !== undefined;
          const isCurrent = i === current;
          return (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}${answered ? ` (${answeredLabel})` : ""}${isCurrent ? ` (${currentLabel})` : ""}`}
              aria-current={isCurrent ? "true" : undefined}
              onClick={() => onNavigate(i)}
              className={[
                "flex h-8 w-8 items-center justify-center rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                isCurrent
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : answered
                  ? "bg-[var(--success)] text-white"
                  : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] hover:bg-[var(--surface-hover)]",
              ].join(" ")}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-[var(--success)]" aria-hidden="true" />
          {answeredLabel}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-[var(--primary)]" aria-hidden="true" />
          {currentLabel}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm border border-[var(--border)] bg-[var(--surface)]" aria-hidden="true" />
          {unansweredLabel}
        </span>
      </div>
    </nav>
  );
}

QuestionNavigator.displayName = "QuestionNavigator";
