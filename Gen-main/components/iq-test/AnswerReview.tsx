"use client";

import { useState } from "react";
import type { Locale, OptionId, Question } from "@/lib/iq-test/types";
import { CATEGORY_LABELS, getDictionary } from "@/lib/iq-test/i18n";
import { VisualPuzzle } from "./VisualPuzzle";

interface Props {
  questions: Question[];
  answers: Record<number, OptionId>;
  locale: Locale;
}

export function AnswerReview({ questions, answers, locale }: Props) {
  const dict = getDictionary(locale);
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-semibold text-[var(--foreground)]">
        {dict.reviewTitle}
      </h3>
      <p className="text-sm text-[var(--muted)]">
        {dict.reviewHint}
      </p>
      <div className="flex flex-col gap-2">
        {questions.map((q, idx) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;
          const isOpen = openIds.has(q.id);
          const promptText = q.prompt[locale];

          return (
            <div
              key={q.id}
              className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`review-${q.id}`}
                onClick={() => toggle(q.id)}
                className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--primary)]"
              >
                <span
                  aria-label={isCorrect ? dict.reviewCorrect : userAnswer ? dict.reviewIncorrect : dict.reviewSkipped}
                  className={[
                    "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                    isCorrect
                      ? "bg-[var(--success)]"
                      : userAnswer
                      ? "bg-[var(--danger)]"
                      : "bg-[var(--muted)]",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {isCorrect ? "✓" : userAnswer ? "✗" : "–"}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-[var(--foreground)]">
                    {idx + 1}. {promptText.slice(0, 80)}{promptText.length > 80 ? "…" : ""}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {CATEGORY_LABELS[q.category][locale]}
                    {" · "}
                    {isCorrect ? dict.reviewCorrect : userAnswer ? dict.reviewIncorrect : dict.reviewSkipped}
                  </span>
                </div>
                <svg
                  aria-hidden="true"
                  className={["h-4 w-4 flex-shrink-0 text-[var(--muted)] transition-transform", isOpen ? "rotate-180" : ""].join(" ")}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div
                  id={`review-${q.id}`}
                  className="border-t border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <p className="mb-3 whitespace-pre-line text-sm leading-relaxed text-[var(--foreground)]">
                    {promptText}
                  </p>

                  {q.visual && (
                    <div className="mb-4 overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3">
                      <VisualPuzzle question={q} />
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    {q.options.map((opt) => {
                      const isUser = opt.id === userAnswer;
                      const isCorrectOpt = opt.id === q.correctAnswer;
                      return (
                        <div
                          key={opt.id}
                          className={[
                            "flex items-start gap-2.5 rounded-[var(--radius)] border p-2.5 text-sm",
                            isCorrectOpt
                              ? "border-[var(--success)] bg-[var(--success)]/10 font-medium text-[var(--success)]"
                              : isUser && !isCorrectOpt
                              ? "border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]"
                              : "border-transparent text-[var(--muted)]",
                          ].join(" ")}
                        >
                          <span className="flex-shrink-0 font-bold">{opt.id}.</span>
                          <span className="flex-1">{opt.text[locale]}</span>
                          {isCorrectOpt && (
                            <span className="flex-shrink-0 text-xs font-semibold text-[var(--success)]">{dict.correctLabel}</span>
                          )}
                          {isUser && !isCorrectOpt && (
                            <span className="flex-shrink-0 text-xs font-semibold text-[var(--danger)]">{dict.yourAnswer}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!userAnswer && (
                    <p className="mt-2 text-xs text-[var(--muted)] italic">{dict.notAnswered}</p>
                  )}

                  <div className="mt-3 rounded-[var(--radius)] bg-[var(--background)] p-3 text-sm text-[var(--muted)]">
                    <span className="font-semibold text-[var(--foreground)]">{dict.explanationLabel} </span>
                    {q.explanation[locale]}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

AnswerReview.displayName = "AnswerReview";
