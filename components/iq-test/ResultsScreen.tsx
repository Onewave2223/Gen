"use client";

import type { Locale, OptionId, Question, TestResult } from "@/lib/iq-test/types";
import { getDictionary } from "@/lib/iq-test/i18n";
import { formatDuration } from "@/lib/iq-test/scoring";
import { CategoryResults } from "./CategoryResults";
import { ScoreScale } from "./ScoreScale";
import { AnswerReview } from "./AnswerReview";
import { ShareControls } from "./ShareControls";
import { AdSlot } from "@/components/ads/AdSlot";
import { env } from "@/lib/env";
import { CountUp } from "@/components/motion/CountUp";

interface Props {
  result: TestResult;
  questions: Question[];
  answers: Record<number, OptionId>;
  locale: Locale;
  onRetake: () => void;
}

export function ResultsScreen({ result, questions, answers, locale, onRetake }: Props) {
  const dict = getDictionary(locale);

  return (
    <div className="flex flex-col gap-10">
      {/* Hero score card */}
      <div className="motion-page-enter overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-lg)]">
        <div className="relative flex flex-col items-center gap-3 overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--primary-soft)] to-[var(--surface-elevated)] px-6 py-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--primary)]">
            {dict.resultHeroLabel}
          </p>
          <div className="relative flex items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute h-36 w-36 rounded-full border-8 border-[var(--primary)]/15"
            />
            <span className="relative z-10 text-6xl font-extrabold tracking-tight text-[var(--foreground)]">
              <CountUp value={result.iqScore} />
            </span>
          </div>
          <span className="rounded-full bg-[var(--primary)] px-4 py-1 text-base font-semibold text-[var(--primary-foreground)]">
            {result.interpretation.label[locale]}
          </span>
          <p className="max-w-md text-sm text-[var(--muted)]">
            {result.interpretation.description[locale]}
          </p>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border)] sm:grid-cols-4 sm:divide-y-0">
          {[
            { label: dict.correctAnswers, value: `${result.rawCorrect} / ${result.rawTotal}` },
            { label: dict.accuracy, value: `${Math.round(result.rawPercentage)}%` },
            { label: dict.timeTaken, value: formatDuration(result.durationSeconds, locale) },
            { label: dict.scoreRange, value: result.interpretation.range },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 p-5 text-center">
              <span className="text-xl font-bold text-[var(--foreground)]">{value}</span>
              <span className="text-xs text-[var(--muted)]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--muted)] leading-relaxed">
        {dict.resultDisclaimer}
      </div>

      {/* Category breakdown */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
        <CategoryResults
          scores={result.categoryScores}
          strongestCategory={result.strongestCategory}
          weakestCategory={result.weakestCategory}
          locale={locale}
        />
      </div>

      {/* Score scale */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
        <ScoreScale iqScore={result.iqScore} locale={locale} />
      </div>

      {/* Share */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
        <h3 className="mb-3 text-base font-semibold text-[var(--foreground)]">{dict.shareTitle}</h3>
        <ShareControls
          iqScore={result.iqScore}
          interpretation={result.interpretation.label[locale]}
          locale={locale}
        />
      </div>

      {/* Retake */}
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex h-11 items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {dict.retakeButton}
        </button>
        <p className="text-xs text-[var(--muted)]">
          {dict.retakeNote}
        </p>
      </div>

      {/* Ad slot between score and review */}
      <div className="mx-auto w-full max-w-2xl">
        <AdSlot
          slot={env.adsenseSlotGenerator}
          className="my-2 min-h-[90px] w-full p-2"
        />
      </div>

      {/* Answer review */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
        <AnswerReview questions={questions} answers={answers} locale={locale} />
      </div>
    </div>
  );
}

ResultsScreen.displayName = "ResultsScreen";
