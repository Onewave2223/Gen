"use client";

import type { Locale, OptionId, Question } from "@/lib/iq-test/types";
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from "@/lib/iq-test/i18n";
import { VisualPuzzle } from "./VisualPuzzle";

interface Props {
  question: Question;
  locale: Locale;
  selectedAnswer: OptionId | undefined;
  onAnswer: (answerId: OptionId) => void;
}

const OPTION_KEYS: OptionId[] = ["A", "B", "C", "D"];

export function QuestionCard({ question, locale, selectedAnswer, onAnswer }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {/* Category + difficulty badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">
          {CATEGORY_LABELS[question.category][locale]}
        </span>
        <span className="inline-flex items-center rounded-full bg-[var(--surface-hover)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">
          {DIFFICULTY_LABELS[question.difficulty][locale]}
        </span>
      </div>

      {/* Prompt */}
      <p className="whitespace-pre-line text-base font-medium leading-relaxed text-[var(--foreground)]">
        {question.prompt[locale]}
      </p>

      {/* Visual puzzle */}
      {question.visual && (
        <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
          <VisualPuzzle question={question} />
        </div>
      )}

      {/* Answer options */}
      <fieldset>
        <legend className="sr-only">Select your answer for question {question.id}</legend>
        <div className="flex flex-col gap-2.5">
          {OPTION_KEYS.map((key) => {
            const option = question.options.find((o) => o.id === key);
            if (!option) return null;
            const isSelected = selectedAnswer === key;
            return (
              <label
                key={key}
                className={[
                  "flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border p-3.5 transition-all duration-150",
                  "focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:ring-offset-1",
                  isSelected
                    ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-glow)]"
                    : "border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name={`q${question.id}`}
                  value={key}
                  checked={isSelected}
                  onChange={() => onAnswer(key)}
                  className="sr-only"
                  aria-label={`Option ${key}: ${option.text[locale]}`}
                />
                <span
                  aria-hidden="true"
                  className={[
                    "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                    isSelected
                      ? "border-[var(--primary-foreground)] bg-[var(--primary-foreground)] text-[var(--primary)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]",
                  ].join(" ")}
                >
                  {key}
                </span>
                <span className="flex-1 text-sm leading-snug">
                  {option.text[locale]}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

QuestionCard.displayName = "QuestionCard";
