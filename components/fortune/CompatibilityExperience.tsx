"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CopyButton } from "@/components/generators/CopyButton";
import { CountUp } from "@/components/motion/CountUp";
import { HeartLinkIcon } from "@/components/icons/ToolIcons";
import {
  computeCompatibility,
  formatCompatibilityForShare,
  type CompatibilityResult,
} from "@/lib/fortune/compatibility";
import type { RelationshipType, CompatibilityLocale } from "@/lib/fortune/compatibility-data";
import { shareOrCopy } from "@/lib/tarot/share";
import { trackFortuneEvent } from "@/lib/tarot/analytics";
import { usePrefersReducedMotion } from "@/lib/fortune/use-reduced-motion";

type Stage = "form" | "analyzing" | "done";

const ANALYZE_STEP_MS = 550;

const copy = {
  en: {
    title: "Compatibility",
    intro: "Enter two names and a relationship type for a playful, deterministic compatibility read.",
    nameA: "First name",
    nameB: "Second name",
    relationship: "Relationship type",
    love: "Love",
    friendship: "Friendship",
    general: "General",
    analyze: "Check Compatibility",
    steps: ["Reading the names...", "Weighing the signs...", "Calculating chemistry...", "Finalizing the result..."],
    overall: "Overall Score",
    share: "Share",
    shared: "Shared!",
    copied: "Copied!",
    copy: "Copy",
    tryAgain: "Try another pair",
    privacyNote: "Names are used only in your browser to compute this result — never sent to a server or stored.",
    nameRequired: "Please enter both names.",
  },
  ru: {
    title: "Совместимость",
    intro: "Введите два имени и тип отношений, чтобы получить игровой, детерминированный результат совместимости.",
    nameA: "Первое имя",
    nameB: "Второе имя",
    relationship: "Тип отношений",
    love: "Любовь",
    friendship: "Дружба",
    general: "Общее",
    analyze: "Проверить совместимость",
    steps: ["Читаем имена...", "Взвешиваем знаки...", "Считаем химию...", "Формируем результат..."],
    overall: "Общий результат",
    share: "Поделиться",
    shared: "Отправлено!",
    copied: "Скопировано!",
    copy: "Копировать",
    tryAgain: "Проверить другую пару",
    privacyNote: "Имена используются только в браузере для расчёта — они никогда не отправляются на сервер и не сохраняются.",
    nameRequired: "Пожалуйста, введите оба имени.",
  },
} as const;

const RELATIONSHIP_OPTIONS: RelationshipType[] = ["love", "friendship", "general"];

export interface CompatibilityExperienceProps {
  locale: CompatibilityLocale;
}

export function CompatibilityExperience({ locale }: CompatibilityExperienceProps) {
  const t = copy[locale];
  const prefersReducedMotion = usePrefersReducedMotion();

  const [nameA, setNameA] = React.useState("");
  const [nameB, setNameB] = React.useState("");
  const [relationship, setRelationship] = React.useState<RelationshipType>("love");
  const [stage, setStage] = React.useState<Stage>("form");
  const [stepIndex, setStepIndex] = React.useState(0);
  const [result, setResult] = React.useState<CompatibilityResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [shareState, setShareState] = React.useState<"idle" | "shared" | "copied">("idle");
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  React.useEffect(() => {
    return () => timers.current.forEach((id) => clearTimeout(id));
  }, []);

  const runAnalysis = () => {
    const trimmedA = nameA.trim();
    const trimmedB = nameB.trim();
    if (!trimmedA || !trimmedB) {
      setError(t.nameRequired);
      return;
    }
    setError(null);
    trackFortuneEvent("compatibility_started", { locale, relationship });

    const computed = computeCompatibility(trimmedA, trimmedB, relationship, locale);

    if (prefersReducedMotion) {
      setResult(computed);
      setStage("done");
      trackFortuneEvent("compatibility_revealed", { locale, relationship, animated: false });
      return;
    }

    setStage("analyzing");
    setStepIndex(0);
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];

    t.steps.forEach((_, i) => {
      const id = setTimeout(() => {
        setStepIndex(i);
        if (i === t.steps.length - 1) {
          const finishId = setTimeout(() => {
            setResult(computed);
            setStage("done");
            trackFortuneEvent("compatibility_revealed", { locale, relationship, animated: true });
          }, ANALYZE_STEP_MS);
          timers.current.push(finishId);
        }
      }, i * ANALYZE_STEP_MS);
      timers.current.push(id);
    });
  };

  const skipAnalysis = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
    const trimmedA = nameA.trim();
    const trimmedB = nameB.trim();
    const computed = computeCompatibility(trimmedA, trimmedB, relationship, locale);
    setResult(computed);
    setStage("done");
    trackFortuneEvent("compatibility_revealed", { locale, relationship, animated: false, skipped: true });
  };

  const handleReset = () => {
    setStage("form");
    setResult(null);
    setError(null);
    setShareState("idle");
  };

  const handleShare = async () => {
    if (!result) return;
    const text = formatCompatibilityForShare(nameA, nameB, result, locale);
    const shared = await shareOrCopy(
      text,
      locale === "ru" ? "TryGenHub — Совместимость" : "TryGenHub — Compatibility",
    );
    trackFortuneEvent("compatibility_shared", { locale, method: shared });
    if (shared === "shared") setShareState("shared");
    else if (shared === "copied") setShareState("copied");
    if (shared !== "failed") {
      window.setTimeout(() => setShareState("idle"), 2200);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {stage === "form" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runAnalysis();
          }}
          className="flex flex-col gap-5"
        >
          <p className="text-sm text-[var(--muted)]">{t.intro}</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="compat-name-a" className="text-sm font-medium text-[var(--foreground)]">
                {t.nameA}
              </label>
              <Input
                id="compat-name-a"
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                maxLength={40}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="compat-name-b" className="text-sm font-medium text-[var(--foreground)]">
                {t.nameB}
              </label>
              <Input
                id="compat-name-b"
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                maxLength={40}
                autoComplete="off"
              />
            </div>
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1 text-sm font-medium text-[var(--foreground)]">
              {t.relationship}
            </legend>
            <div className="flex flex-wrap gap-2">
              {RELATIONSHIP_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRelationship(option)}
                  aria-pressed={relationship === option}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                    relationship === option
                      ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  {t[option]}
                </button>
              ))}
            </div>
          </fieldset>

          {error && (
            <p role="alert" className="text-sm text-[var(--danger)]">
              {error}
            </p>
          )}

          <Button type="submit" size="lg">
            {t.analyze}
          </Button>

          <p className="text-xs text-[var(--muted)]">{t.privacyNote}</p>
        </form>
      )}

      {stage === "analyzing" && (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--background)] text-[var(--primary)] mystic-pulse">
            <HeartLinkIcon className="h-7 w-7" />
          </span>
          <p className="text-sm font-medium text-[var(--muted)]" aria-live="polite">
            {t.steps[stepIndex]}
          </p>
          <Button type="button" variant="ghost" size="sm" onClick={skipAnalysis}>
            {locale === "ru" ? "Пропустить" : "Skip"}
          </Button>
        </div>
      )}

      {stage === "done" && result && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 py-2 text-center mystic-fade-up">
            <span className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              {t.overall}
            </span>
            <CountUp
              value={result.overallScore}
              format={(n) => `${n}%`}
              className="text-5xl font-bold tracking-tight text-[var(--primary)]"
            />
            <p className="max-w-md text-sm text-[var(--foreground)]">{result.overallText}</p>
            <p className="text-sm font-medium text-[var(--muted)]">
              {nameA.trim()} + {nameB.trim()}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {result.metrics.map((metric, i) => (
              <div
                key={metric.id}
                className="mystic-fade-up flex flex-col gap-1.5"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--foreground)]">{metric.label}</span>
                  <span className="text-[var(--muted)]">{metric.score}%</span>
                </div>
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-[var(--background)]"
                  role="progressbar"
                  aria-valuenow={metric.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={metric.label}
                >
                  <div
                    className="h-full origin-left rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent-2)] transition-transform duration-700 ease-out"
                    style={{ transform: `scaleX(${metric.score / 100})` }}
                  />
                </div>
                <p className="text-sm text-[var(--muted)]">{metric.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 border-t border-[var(--border)] pt-4">
            <CopyButton
              text={formatCompatibilityForShare(nameA, nameB, result, locale)}
              label={t.copy}
              copiedLabel={t.copied}
            />
            <Button type="button" variant="secondary" onClick={handleShare}>
              {shareState === "idle" ? t.share : shareState === "shared" ? t.shared : t.copied}
            </Button>
            <Button type="button" variant="ghost" onClick={handleReset}>
              {t.tryAgain}
            </Button>
          </div>

          <p className="text-xs text-[var(--muted)]">{t.privacyNote}</p>
        </div>
      )}
    </div>
  );
}

CompatibilityExperience.displayName = "CompatibilityExperience";
