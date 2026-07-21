"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { questionMap } from "@/lib/iq-test/questions";
import { drawBalancedQuestionSet, generateSeed } from "@/lib/iq-test/selection";
import type { Locale, OptionId, TestState } from "@/lib/iq-test/types";
import {
  loadTestState,
  saveTestState,
  clearTestState,
  createInitialState,
  loadRecentQuestionIds,
  recordShownQuestionIds,
} from "@/lib/iq-test/storage";
import { calculateResult } from "@/lib/iq-test/scoring";
import { getDictionary } from "@/lib/iq-test/i18n";
import { trackEvent } from "@/lib/analytics";
import { IntroScreen } from "./IntroScreen";
import { QuestionCard } from "./QuestionCard";
import { ProgressBar } from "./ProgressBar";
import { Timer } from "./Timer";
import { QuestionNavigator } from "./QuestionNavigator";
import { ConfirmModal } from "./ConfirmModal";
import { ResultsScreen } from "./ResultsScreen";

type ModalType =
  | "finish_with_skips"
  | "confirm_finish"
  | "confirm_retake"
  | null;

interface Props {
  locale: Locale;
}

export function IQTestApp({ locale }: Props) {
  const dict = useMemo(() => getDictionary(locale), [locale]);
  const [state, setState] = useState<TestState | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state on mount (client-only)
  useEffect(() => {
    const saved = loadTestState();
    setState(saved ?? createInitialState(locale));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist state on every change
  useEffect(() => {
    if (state && hydrated) {
      saveTestState(state);
    }
  }, [state, hydrated]);

  const handleStart = useCallback(() => {
    const seed = generateSeed();
    const recentlyShownIds = loadRecentQuestionIds();
    const questionIds = drawBalancedQuestionSet(seed, recentlyShownIds);
    recordShownQuestionIds(questionIds);
    const freshState: TestState = {
      ...createInitialState(locale),
      status: "in_progress",
      startedAt: Date.now(),
      currentQuestion: 0,
      questionIds,
      seed,
    };
    setState(freshState);
    trackEvent("iq_test_started");
  }, [locale]);

  const handleAnswer = useCallback((answerId: OptionId) => {
    setState((prev) => {
      if (!prev || prev.status !== "in_progress") return prev;
      const qId = prev.questionIds[prev.currentQuestion];
      if (qId === undefined) return prev;
      return {
        ...prev,
        answers: { ...prev.answers, [qId]: answerId },
      };
    });
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setState((prev) => {
      if (!prev || prev.status !== "in_progress") return prev;
      return { ...prev, currentQuestion: index };
    });
  }, []);

  const handlePrev = useCallback(() => {
    setState((prev) => {
      if (!prev || prev.status !== "in_progress") return prev;
      return {
        ...prev,
        currentQuestion: Math.max(0, prev.currentQuestion - 1),
      };
    });
  }, []);

  const handleNext = useCallback(() => {
    setState((prev) => {
      if (!prev || prev.status !== "in_progress") return prev;
      return {
        ...prev,
        currentQuestion: Math.min(prev.questionIds.length - 1, prev.currentQuestion + 1),
      };
    });
  }, []);

  const handleAttemptFinish = useCallback(() => {
    if (!state || state.status !== "in_progress") return;
    const answeredCount = Object.keys(state.answers).length;
    if (answeredCount < state.questionIds.length) {
      setModal("finish_with_skips");
    } else {
      setModal("confirm_finish");
    }
  }, [state]);

  const handleConfirmFinish = useCallback(() => {
    setModal(null);
    setState((prev) => {
      if (!prev || !prev.startedAt) return prev;
      return { ...prev, status: "finished", finishedAt: Date.now() };
    });
    trackEvent("iq_test_completed");
  }, []);

  const handleRetakeRequest = useCallback(() => {
    setModal("confirm_retake");
  }, []);

  const handleConfirmRetake = useCallback(() => {
    setModal(null);
    clearTestState();
    const fresh = createInitialState(locale);
    setState(fresh);
    trackEvent("iq_test_retaken");
  }, [locale]);

  // Navigate to first skipped question
  const handleGoToSkipped = useCallback(() => {
    setModal(null);
    if (!state) return;
    const firstSkippedIndex = state.questionIds.findIndex(
      (qId) => state.answers[qId] === undefined
    );
    if (firstSkippedIndex !== -1) {
      setState((prev) => {
        if (!prev) return prev;
        return { ...prev, currentQuestion: firstSkippedIndex };
      });
    }
  }, [state]);

  // Not yet hydrated — render nothing to avoid SSR/localStorage mismatch
  if (!hydrated || !state) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" aria-label="Loading" />
      </div>
    );
  }

  const attemptQuestions = state.questionIds
    .map((id) => questionMap.get(id))
    .filter((q): q is NonNullable<typeof q> => q !== undefined);

  // ── Finished ────────────────────────────────────────────────────────────────
  if (state.status === "finished" && state.startedAt) {
    const durationSeconds = state.finishedAt
      ? Math.floor((state.finishedAt - state.startedAt) / 1000)
      : 0;

    const result = calculateResult(state.answers, attemptQuestions, durationSeconds);

    return (
      <>
        <ResultsScreen
          result={result}
          questions={attemptQuestions}
          answers={state.answers}
          locale={locale}
          onRetake={handleRetakeRequest}
        />
        {modal === "confirm_retake" && (
          <ConfirmModal
            title={dict.retakeConfirmTitle}
            message={dict.retakeConfirmMessage}
            confirmLabel={dict.yesRetake}
            cancelLabel={dict.cancel}
            onConfirm={handleConfirmRetake}
            onCancel={() => setModal(null)}
            dangerous
          />
        )}
      </>
    );
  }

  // ── Idle / not started ──────────────────────────────────────────────────────
  if (state.status === "idle" || attemptQuestions.length === 0) {
    return <IntroScreen locale={locale} onStart={handleStart} />;
  }

  // ── In progress ─────────────────────────────────────────────────────────────
  const currentQuestion = attemptQuestions[state.currentQuestion];
  if (!currentQuestion || !state.startedAt) {
    return <IntroScreen locale={locale} onStart={handleStart} />;
  }

  const selectedAnswer = state.answers[currentQuestion.id];
  const isFirst = state.currentQuestion === 0;
  const isLast = state.currentQuestion === attemptQuestions.length - 1;
  const answeredCount = Object.keys(state.answers).length;
  const skippedCount = attemptQuestions.length - answeredCount;

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar: progress + timer */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <ProgressBar
            current={state.currentQuestion + 1}
            total={attemptQuestions.length}
            questionOfLabel={dict.questionOf}
          />
        </div>
        <Timer startedAt={state.startedAt} label={dict.timeElapsedLabel} />
      </div>

      {/* Question card — keyed by index so it replays a short crossfade
          on every Next/Previous/jump, without affecting question order,
          selection state, or persistence (those live in `state`, not here). */}
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-lg)] sm:p-7">
        <div key={state.currentQuestion} className="motion-question-enter">
          <QuestionCard
            question={currentQuestion}
            locale={locale}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFirst}
          aria-label={dict.previous}
          className="motion-press group inline-flex h-10 items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          <svg aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {dict.previous}
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={handleAttemptFinish}
            className="motion-press inline-flex h-10 items-center gap-2 rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            {dict.finishTest}
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="motion-press group inline-flex h-10 items-center gap-2 rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            {dict.next}
            <svg aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom bar: navigator + finish early button */}
      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
        <QuestionNavigator
          total={attemptQuestions.length}
          current={state.currentQuestion}
          answers={state.answers}
          questionIds={state.questionIds}
          onNavigate={handleNavigate}
          jumpLabel={dict.jumpToQuestion}
          answeredLabel={dict.answered}
          currentLabel={dict.current}
          unansweredLabel={dict.unanswered}
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-3">
          <p className="text-xs text-[var(--muted)]">
            {answeredCount}/{attemptQuestions.length} {dict.answeredCount}
            {skippedCount > 0 && (
              <span className="ml-1 text-amber-600 dark:text-amber-400">
                · {skippedCount} {dict.unanswered.toLowerCase()}
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={handleAttemptFinish}
            className="text-xs font-medium text-[var(--primary)] underline underline-offset-2 hover:text-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            {dict.finishTest}
          </button>
        </div>
      </div>

      {/* Modals */}
      {modal === "finish_with_skips" && (
        <ConfirmModal
          title={`${skippedCount} ${dict.finishWithSkipsTitle}`}
          message={dict.finishWithSkipsMessage}
          confirmLabel={dict.finishAnyway}
          cancelLabel={dict.goToSkipped}
          onConfirm={handleConfirmFinish}
          onCancel={handleGoToSkipped}
        />
      )}
      {modal === "confirm_finish" && (
        <ConfirmModal
          title={dict.confirmFinishTitle}
          message={dict.confirmFinishMessage}
          confirmLabel={dict.submitAndSeeResults}
          cancelLabel={dict.cancel}
          onConfirm={handleConfirmFinish}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}

IQTestApp.displayName = "IQTestApp";
