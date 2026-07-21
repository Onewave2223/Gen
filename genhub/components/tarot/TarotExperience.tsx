"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import { CardArt } from "@/components/tarot/CardArt";
import { TarotCardBack } from "@/components/tarot/TarotCardBack";
import { drawUniqueCards, type DrawnCard } from "@/lib/tarot/shuffle";
import {
  getCardName,
  getCardMeaning,
  getCardKeywords,
  getCardDailyMessage,
} from "@/lib/tarot/deck";
import { mapCardToYesNo } from "@/lib/tarot/yesno";
import { shareOrCopy } from "@/lib/tarot/share";
import { trackFortuneEvent } from "@/lib/tarot/analytics";

export type TarotMode = "day" | "yesno" | "three";

export interface TarotExperienceProps {
  locale: "en" | "ru";
  /** Which modes to expose as tabs. Defaults to all three. */
  modes?: readonly TarotMode[];
}

const FAN_SIZE = 9;
const SHUFFLE_DELAY_MS = 900;
const FLIP_STAGGER_MS = 450;

const STRINGS = {
  en: {
    modeLabel: {
      day: "Card of the Day",
      yesno: "Yes / No",
      three: "Past · Present · Future",
    } as Record<TarotMode, string>,
    questionLabel: "Your question (optional)",
    questionPlaceholder: "What would you like to ask the cards?",
    shuffleIdle: "Shuffle the deck",
    shuffling: "Shuffling...",
    pickPromptDay: "Tap a card to draw it.",
    pickPromptYesNo: "Tap a card for your answer.",
    pickPromptThree: (n: number) =>
      n === 0 ? "Tap a card for Past." : n === 1 ? "Tap a card for Present." : "Tap a card for Future.",
    positionLabels: ["Past", "Present", "Future"],
    newReading: "New reading",
    share: "Share",
    shared: "Shared!",
    copied: "Copied!",
    copy: "Copy",
    yourAnswer: "The cards say",
    meaning: "Meaning",
    keywords: "Keywords",
    dailyMessage: "Today's message",
    readFullMeaning: "Read full card meaning →",
    summary: "Summary",
    summaryText:
      "Read the three cards as a single story: where you're coming from, where you stand now, and where things are heading — the middle card usually matters most.",
  },
  ru: {
    modeLabel: {
      day: "Карта дня",
      yesno: "Да / Нет",
      three: "Прошлое · Настоящее · Будущее",
    } as Record<TarotMode, string>,
    questionLabel: "Твой вопрос (необязательно)",
    questionPlaceholder: "Что ты хочешь спросить у карт?",
    shuffleIdle: "Перемешать колоду",
    shuffling: "Перемешиваю...",
    pickPromptDay: "Коснись карты, чтобы вытянуть её.",
    pickPromptYesNo: "Коснись карты, чтобы получить ответ.",
    pickPromptThree: (n: number) =>
      n === 0 ? "Выбери карту для Прошлого." : n === 1 ? "Выбери карту для Настоящего." : "Выбери карту для Будущего.",
    positionLabels: ["Прошлое", "Настоящее", "Будущее"],
    newReading: "Новый расклад",
    share: "Поделиться",
    shared: "Отправлено!",
    copied: "Скопировано!",
    copy: "Скопировать",
    yourAnswer: "Карты отвечают",
    meaning: "Значение",
    keywords: "Ключевые слова",
    dailyMessage: "Послание на сегодня",
    readFullMeaning: "Полное значение карты →",
    summary: "Итог",
    summaryText:
      "Читай три карты как единую историю: откуда ты пришёл, где находишься сейчас и куда всё движется — центральная карта обычно самая важная.",
  },
};

type Phase = "idle" | "shuffling" | "spread" | "revealing" | "done";

interface Slot {
  drawn: DrawnCard;
  revealed: boolean;
  position?: number; // for three-card mode: 0=past,1=present,2=future
}

function cardsNeeded(mode: TarotMode): number {
  return mode === "three" ? 3 : 1;
}

export function TarotExperience({
  locale,
  modes = ["day", "yesno", "three"],
}: TarotExperienceProps) {
  const t = STRINGS[locale];
  const [mode, setMode] = React.useState<TarotMode>(modes[0]);
  const [question, setQuestion] = React.useState("");
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [pool, setPool] = React.useState<DrawnCard[]>([]);
  const [fanOrder, setFanOrder] = React.useState<number[]>([]);
  const [slots, setSlots] = React.useState<Slot[]>([]);
  const [shareState, setShareState] = React.useState<"idle" | "shared" | "copied">("idle");
  const questionId = React.useId();

  const needed = cardsNeeded(mode);

  const resetAll = React.useCallback(() => {
    setPhase("idle");
    setPool([]);
    setFanOrder([]);
    setSlots([]);
    setShareState("idle");
  }, []);

  const handleModeChange = (next: TarotMode) => {
    if (next === mode) return;
    setMode(next);
    resetAll();
    setQuestion("");
  };

  const startShuffle = () => {
    if (phase === "shuffling") return;
    trackFortuneEvent("tarot_reading_started", { mode });
    setPhase("shuffling");
    setSlots([]);
    setShareState("idle");

    window.setTimeout(() => {
      // Draw the real cards now (crypto-based, no duplicates), but
      // present them face-down in a shuffled fan — the visual "pick"
      // just reveals a pre-drawn, already-random card at that slot.
      const drawn = drawUniqueCards(needed);
      setPool(drawn);
      const order = Array.from({ length: FAN_SIZE }, (_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      setFanOrder(order);
      setPhase("spread");
    }, SHUFFLE_DELAY_MS);
  };

  const pickFromFan = (fanIndex: number) => {
    if (phase !== "spread") return;
    const nextPosition = slots.length;
    if (nextPosition >= needed) return;

    const drawn = pool[nextPosition];
    trackFortuneEvent("tarot_card_drawn", { mode, position: nextPosition });

    setFanOrder((prev) => prev.filter((i) => i !== fanIndex));
    setSlots((prev) => [...prev, { drawn, revealed: false, position: nextPosition }]);

    // Flip after a short beat so the selection itself reads clearly
    // before the reveal animation starts.
    window.setTimeout(() => {
      setSlots((prev) =>
        prev.map((s, i) => (i === nextPosition ? { ...s, revealed: true } : s)),
      );
      if (nextPosition + 1 >= needed) {
        window.setTimeout(() => {
          setPhase("done");
          trackFortuneEvent("tarot_reading_completed", { mode, cardCount: needed });
        }, FLIP_STAGGER_MS);
      }
    }, 350);
  };

  const shareText = React.useMemo(() => {
    if (phase !== "done" || slots.length === 0) return "";
    const lines = slots.map((slot, i) => {
      const name = getCardName(slot.drawn.card, locale, slot.drawn.reversed);
      const meaning = getCardMeaning(slot.drawn.card, locale, slot.drawn.reversed);
      const label = mode === "three" ? `${t.positionLabels[i]}: ` : "";
      return `${label}${name} — ${meaning}`;
    });
    const header =
      mode === "yesno"
        ? locale === "en"
          ? "My Tarot Yes/No reading"
          : "Моё гадание Таро Да/Нет"
        : mode === "three"
          ? locale === "en"
            ? "My 3-card Tarot reading"
            : "Мой расклад Таро на 3 карты"
          : locale === "en"
            ? "My Tarot card of the day"
            : "Моя карта дня Таро";
    return `${header}\n\n${lines.join("\n\n")}\n\nTryGenHub`;
  }, [phase, slots, locale, mode, t.positionLabels]);

  const handleShare = async () => {
    const result = await shareOrCopy(shareText, "TryGenHub Tarot");
    trackFortuneEvent("share_result_clicked", { tool: "tarot" });
    if (result === "shared") setShareState("shared");
    else if (result === "copied") setShareState("copied");
    if (result !== "failed") {
      window.setTimeout(() => setShareState("idle"), 2200);
    }
  };

  const promptText =
    phase === "spread"
      ? mode === "three"
        ? t.pickPromptThree(slots.length)
        : mode === "yesno"
          ? t.pickPromptYesNo
          : t.pickPromptDay
      : null;

  return (
    <div className="flex flex-col gap-6">
      {modes.length > 1 && (
        <div
          role="tablist"
          aria-label="Tarot mode"
          className="flex flex-wrap gap-2"
        >
          {modes.map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => handleModeChange(m)}
              className={`motion-press rounded-[var(--radius)] border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                mode === m
                  ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              {t.modeLabel[m]}
            </button>
          ))}
        </div>
      )}

      {mode === "yesno" && phase === "idle" && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={questionId} className="text-sm font-medium text-[var(--foreground)]">
            {t.questionLabel}
          </label>
          <Input
            id={questionId}
            type="text"
            placeholder={t.questionPlaceholder}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={200}
          />
        </div>
      )}

      {phase === "idle" && (
        <div className="flex justify-center py-4">
          <Button type="button" size="lg" onClick={startShuffle}>
            {t.shuffleIdle}
          </Button>
        </div>
      )}

      {phase === "shuffling" && (
        <div className="flex flex-col items-center gap-4 py-8" aria-live="polite">
          <div className="relative h-40 w-28">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="tarot-shuffle-stack absolute inset-0"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <TarotCardBack className="h-full w-full drop-shadow-lg" />
              </div>
            ))}
          </div>
          <span className="text-sm text-[var(--muted)]">{t.shuffling}</span>
        </div>
      )}

      {(phase === "spread" || phase === "revealing" || (phase === "done" && slots.length < FAN_SIZE)) && (
        <div className="flex flex-col gap-3">
          {promptText && (
            <p className="text-center text-sm font-medium text-[var(--muted)]" aria-live="polite">
              {promptText}
            </p>
          )}
          {phase === "spread" && (
            <div
              className="flex flex-wrap items-end justify-center gap-2 py-2"
              role="group"
              aria-label={promptText ?? undefined}
            >
              {fanOrder.map((fanIndex, i) => {
                const angle = (i - (fanOrder.length - 1) / 2) * 6;
                return (
                  <button
                    key={fanIndex}
                    type="button"
                    onClick={() => pickFromFan(fanIndex)}
                    aria-label={
                      locale === "en" ? `Draw card ${i + 1}` : `Вытянуть карту ${i + 1}`
                    }
                    className="tarot-fan-in motion-press h-28 w-[4.6rem] shrink-0 rounded-[var(--radius-sm)] transition-transform hover:-translate-y-2 focus-visible:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] sm:h-32 sm:w-20"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      animationDelay: `${i * 25}ms`,
                    }}
                  >
                    <TarotCardBack className="h-full w-full drop-shadow-md" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {slots.length > 0 && (
        <div
          className={`grid gap-4 ${mode === "three" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 place-items-center"}`}
        >
          {slots.map((slot, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              {mode === "three" && (
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {t.positionLabels[i]}
                </span>
              )}
              <div className="tarot-card-flip h-40 w-28 sm:h-48 sm:w-32">
                <div className="tarot-card-flip-inner" data-flipped={slot.revealed}>
                  <div className="tarot-card-face tarot-card-face-back">
                    <TarotCardBack className="h-full w-full drop-shadow-lg" />
                  </div>
                  <div className="tarot-card-face tarot-card-face-front">
                    <CardArt
                      card={slot.drawn.card}
                      reversed={slot.drawn.reversed}
                      className="h-full w-full drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {phase === "done" && slots.length > 0 && (
        <div className="flex flex-col gap-5">
          {slots.map((slot, i) => {
            const name = getCardName(slot.drawn.card, locale, slot.drawn.reversed);
            const meaning = getCardMeaning(slot.drawn.card, locale, slot.drawn.reversed);
            const keywords = getCardKeywords(slot.drawn.card, locale);
            const yesNo = mode === "yesno" ? mapCardToYesNo(slot.drawn.card, slot.drawn.reversed) : null;

            return (
              <ResultBox
                key={i}
                label={
                  mode === "three"
                    ? `${t.positionLabels[i]} — ${name}`
                    : mode === "yesno"
                      ? t.yourAnswer
                      : name
                }
                actions={
                  i === slots.length - 1 ? (
                    <>
                      <CopyButton
                        text={shareText}
                        disabled={!shareText}
                        size="sm"
                        variant="secondary"
                        label={t.copy}
                        copiedLabel={t.copied}
                      />
                      <Button type="button" variant="secondary" size="sm" onClick={handleShare}>
                        {shareState === "idle" ? t.share : shareState === "shared" ? t.shared : t.copied}
                      </Button>
                    </>
                  ) : undefined
                }
              >
                <div className="tarot-interpretation-in flex flex-col gap-2" style={{ animationDelay: `${i * 120}ms` }}>
                  {mode === "yesno" && yesNo && (
                    <span
                      className={`text-2xl font-bold tracking-tight ${
                        yesNo.tone === "positive"
                          ? "text-[var(--success)]"
                          : yesNo.tone === "negative"
                            ? "text-[var(--danger)]"
                            : "text-[var(--primary)]"
                      }`}
                    >
                      {locale === "en" ? yesNo.labelEn : yesNo.labelRu}
                    </span>
                  )}
                  {mode !== "yesno" && (
                    <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                      {name}
                    </span>
                  )}
                  <p className="text-sm text-[var(--foreground)]">
                    <span className="font-medium text-[var(--muted)]">{t.meaning}: </span>
                    {meaning}
                  </p>
                  {mode === "day" && (
                    <p className="text-sm text-[var(--foreground)]">
                      <span className="font-medium text-[var(--muted)]">{t.dailyMessage}: </span>
                      {getCardDailyMessage(slot.drawn.card, locale)}
                    </p>
                  )}
                  <p className="text-xs text-[var(--muted)]">
                    {t.keywords}: {keywords.join(", ")}
                  </p>
                  <a
                    href={`${locale === "en" ? "/tarot/cards" : "/ru/tarot/cards"}/${slot.drawn.card.slug}`}
                    className="w-fit text-xs font-medium text-[var(--primary)] hover:underline"
                  >
                    {t.readFullMeaning}
                  </a>
                </div>
              </ResultBox>
            );
          })}

          {mode === "three" && (
            <div className="tarot-interpretation-in rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4" style={{ animationDelay: "380ms" }}>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                {t.summary}
              </p>
              <p className="mt-1 text-sm text-[var(--foreground)]">{t.summaryText}</p>
            </div>
          )}

          <div className="flex justify-center">
            <Button type="button" variant="secondary" onClick={resetAll}>
              {t.newReading}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

TarotExperience.displayName = "TarotExperience";
