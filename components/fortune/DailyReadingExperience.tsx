"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/generators/CopyButton";
import { SunburstIcon } from "@/components/icons/ToolIcons";
import {
  generateDailyReading,
  getTodayKey,
  formatReadingForShare,
  type DailyReading,
} from "@/lib/fortune/daily-reading";
import type { DailyReadingLocale } from "@/lib/fortune/daily-reading-data";
import { shareOrCopy } from "@/lib/tarot/share";
import { trackFortuneEvent } from "@/lib/tarot/analytics";
import { usePrefersReducedMotion } from "@/lib/fortune/use-reduced-motion";

type Stage = "loading" | "start" | "revealing" | "done";

const FIELD_COUNT = 6; // energy, symbol, number, color, focus, message
const STAGGER_MS = 480;
const INTRO_DELAY_MS = 500;
const STORAGE_PREFIX = "tgh-daily-reading-seen:";

const copy = {
  en: {
    title: "What Awaits You Today?",
    intro:
      "One deterministic reading per calendar day — everyone sees the same theme today, and it changes again tomorrow.",
    reveal: "Reveal My Day",
    revealing: "Reading today's signs...",
    skip: "Skip animation",
    energy: "Energy of the Day",
    symbol: "Symbol",
    number: "Number of the Day",
    color: "Color of the Day",
    focus: "Focus of the Day",
    message: "Message of the Day",
    lucky: "Lucky Moment",
    showLucky: "Reveal my lucky moment",
    share: "Share",
    shared: "Shared!",
    copied: "Copied!",
    copy: "Copy",
    comeBack: "Come back tomorrow for a new reading.",
    alreadySeen: "You've already seen today's reading below.",
  },
  ru: {
    title: "Что ждёт тебя сегодня?",
    intro:
      "Одно предсказание на календарный день — сегодня оно одинаково для всех, а завтра станет другим.",
    reveal: "Узнать день",
    revealing: "Читаем знаки дня...",
    skip: "Пропустить анимацию",
    energy: "Энергия дня",
    symbol: "Символ",
    number: "Число дня",
    color: "Цвет дня",
    focus: "Фокус дня",
    message: "Послание дня",
    lucky: "Счастливый момент",
    showLucky: "Узнать счастливый момент",
    share: "Поделиться",
    shared: "Отправлено!",
    copied: "Скопировано!",
    copy: "Копировать",
    comeBack: "Загляни завтра за новым предсказанием.",
    alreadySeen: "Сегодняшнее предсказание уже открыто ниже.",
  },
} as const;

export interface DailyReadingExperienceProps {
  locale: DailyReadingLocale;
}

export function DailyReadingExperience({ locale }: DailyReadingExperienceProps) {
  const t = copy[locale];
  const prefersReducedMotion = usePrefersReducedMotion();

  const [stage, setStage] = React.useState<Stage>("loading");
  const [reading, setReading] = React.useState<DailyReading | null>(null);
  const [revealIndex, setRevealIndex] = React.useState(0);
  const [luckyRevealed, setLuckyRevealed] = React.useState(false);
  const [shareState, setShareState] = React.useState<"idle" | "shared" | "copied">("idle");
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  // Compute today's reading on mount only (client-local date), so the
  // date used never depends on server vs. browser time zone.
  React.useEffect(() => {
    const dateKey = getTodayKey(new Date());
    const todaysReading = generateDailyReading(dateKey, locale);
    setReading(todaysReading);

    let alreadySeen = false;
    try {
      alreadySeen = window.localStorage.getItem(`${STORAGE_PREFIX}${locale}`) === dateKey;
    } catch {
      // localStorage may be unavailable (private mode); default to showing the intro.
    }

    setStage(alreadySeen ? "done" : "start");
    if (alreadySeen) setRevealIndex(FIELD_COUNT);
  }, [locale]);

  React.useEffect(() => {
    return () => {
      timers.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const clearTimers = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  };

  const markSeenToday = React.useCallback(() => {
    if (!reading) return;
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}${locale}`, reading.dateKey);
    } catch {
      // Non-fatal — animation will just replay on the next visit.
    }
  }, [locale, reading]);

  const startReveal = () => {
    if (!reading) return;
    trackFortuneEvent("daily_reading_started", { locale });

    if (prefersReducedMotion) {
      setRevealIndex(FIELD_COUNT);
      setStage("done");
      markSeenToday();
      trackFortuneEvent("daily_reading_revealed", { locale, animated: false });
      return;
    }

    setStage("revealing");
    setRevealIndex(0);
    clearTimers();

    for (let i = 1; i <= FIELD_COUNT; i++) {
      const id = setTimeout(() => {
        setRevealIndex(i);
        if (i === FIELD_COUNT) {
          setStage("done");
          markSeenToday();
          trackFortuneEvent("daily_reading_revealed", { locale, animated: true });
        }
      }, INTRO_DELAY_MS + i * STAGGER_MS);
      timers.current.push(id);
    }
  };

  const skipReveal = () => {
    clearTimers();
    setRevealIndex(FIELD_COUNT);
    setStage("done");
    markSeenToday();
    trackFortuneEvent("daily_reading_revealed", { locale, animated: false, skipped: true });
  };

  const handleShare = async () => {
    if (!reading) return;
    const result = await shareOrCopy(
      formatReadingForShare(reading, locale),
      locale === "ru" ? "TryGenHub — Что ждёт тебя сегодня" : "TryGenHub — Daily Reading",
    );
    trackFortuneEvent("daily_reading_shared", { locale, method: result });
    if (result === "shared") setShareState("shared");
    else if (result === "copied") setShareState("copied");
    if (result !== "failed") {
      window.setTimeout(() => setShareState("idle"), 2200);
    }
  };

  if (stage === "loading" || !reading) {
    return (
      <div
        aria-hidden="true"
        className="flex h-64 items-center justify-center text-[var(--muted)]"
      >
        <SunburstIcon className="h-10 w-10 animate-pulse" />
      </div>
    );
  }

  const showField = (index: number) => stage === "done" || revealIndex >= index;

  return (
    <div className="flex flex-col gap-6">
      {stage === "start" && (
        <div className="flex flex-col items-center gap-5 py-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--background)] text-[var(--primary)] mystic-pulse">
            <SunburstIcon className="h-8 w-8" />
          </span>
          <p className="max-w-sm text-sm text-[var(--muted)]">{t.intro}</p>
          <Button type="button" size="lg" onClick={startReveal}>
            {t.reveal}
          </Button>
        </div>
      )}

      {stage === "revealing" && (
        <div className="flex flex-col items-center gap-4 py-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--background)] text-[var(--primary)] mystic-spin-reveal">
            <SunburstIcon className="h-7 w-7" />
          </span>
          <p className="text-sm font-medium text-[var(--muted)]">{t.revealing}</p>
          <Button type="button" variant="ghost" size="sm" onClick={skipReveal}>
            {t.skip}
          </Button>
        </div>
      )}

      {(stage === "revealing" || stage === "done") && (
        <div className="flex flex-col gap-4">
          {showField(1) && (
            <ReadingRow label={t.energy} className="mystic-fade-up">
              <span className="text-xl font-semibold text-[var(--foreground)]">
                {reading.energy}
              </span>
            </ReadingRow>
          )}

          {showField(2) && (
            <ReadingRow label={t.symbol} className="mystic-fade-up">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius)] bg-[var(--background)] text-[var(--primary)]"
                >
                  {reading.symbol.icon({ className: "h-5 w-5" }) as unknown as React.ReactNode}
                </span>
                <span>
                  <span className="block font-semibold text-[var(--foreground)]">
                    {reading.symbol.name}
                  </span>
                  <span className="block text-sm text-[var(--muted)]">
                    {reading.symbol.meaning}
                  </span>
                </span>
              </div>
            </ReadingRow>
          )}

          {showField(3) && (
            <ReadingRow label={t.number} className="mystic-fade-up">
              <span className="text-3xl font-bold tracking-tight text-[var(--primary)]">
                {reading.number}
              </span>
            </ReadingRow>
          )}

          {showField(4) && (
            <ReadingRow label={t.color} className="mystic-fade-up">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0 rounded-full border border-[var(--border)]"
                  style={{ backgroundColor: reading.color.hex }}
                />
                <span>
                  <span className="block font-semibold text-[var(--foreground)]">
                    {reading.color.name}
                  </span>
                  <span className="block text-sm text-[var(--muted)] capitalize">
                    {reading.color.meaning}
                  </span>
                </span>
              </div>
            </ReadingRow>
          )}

          {showField(5) && (
            <ReadingRow label={t.focus} className="mystic-fade-up">
              <span className="text-base text-[var(--foreground)]">{reading.focus}</span>
            </ReadingRow>
          )}

          {showField(6) && (
            <ReadingRow label={t.message} className="mystic-fade-up">
              <span className="block text-base italic leading-relaxed text-[var(--foreground)]">
                &ldquo;{reading.message}&rdquo;
              </span>
            </ReadingRow>
          )}
        </div>
      )}

      {stage === "done" && (
        <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-4">
          {luckyRevealed ? (
            <ReadingRow label={t.lucky} className="mystic-fade-up">
              <span className="text-base text-[var(--foreground)]">{reading.luckyMoment}</span>
            </ReadingRow>
          ) : (
            <Button type="button" variant="secondary" size="sm" onClick={() => setLuckyRevealed(true)}>
              {t.showLucky}
            </Button>
          )}

          <div className="flex flex-wrap gap-3">
            <CopyButton
              text={formatReadingForShare(reading, locale)}
              label={t.copy}
              copiedLabel={t.copied}
            />
            <Button type="button" variant="secondary" onClick={handleShare}>
              {shareState === "idle" ? t.share : shareState === "shared" ? t.shared : t.copied}
            </Button>
          </div>

          <p className="text-xs text-[var(--muted)]">
            {stage === "done" ? t.comeBack : t.alreadySeen}
          </p>
        </div>
      )}
    </div>
  );
}

DailyReadingExperience.displayName = "DailyReadingExperience";

function ReadingRow({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 ${className ?? ""}`}
    >
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </span>
      {children}
    </div>
  );
}
