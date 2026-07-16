import type { TarotCardData, DrawnCard } from "./deck";

export type YesNoTier =
  | "yes"
  | "probably-yes"
  | "unclear"
  | "probably-no"
  | "no";

const LABELS_EN: Record<YesNoTier, string> = {
  yes: "Yes",
  "probably-yes": "Probably yes",
  unclear: "Unclear — ask again later",
  "probably-no": "Probably no",
  no: "No",
};

const LABELS_RU: Record<YesNoTier, string> = {
  yes: "Да",
  "probably-yes": "Скорее да",
  unclear: "Неясно — спроси позже",
  "probably-no": "Скорее нет",
  no: "Нет",
};

const TONE: Record<YesNoTier, "positive" | "negative" | "neutral"> = {
  yes: "positive",
  "probably-yes": "positive",
  unclear: "neutral",
  "probably-no": "negative",
  no: "negative",
};

/**
 * Maps a drawn Tarot card onto the requested 5-tier Yes/No scale.
 * Deterministic given the card + reversed state — driven by the card's
 * own `valence` field (set per-card in the deck data), then shifted one
 * step toward "no" when the card is reversed, since a reversed card
 * traditionally softens or blocks its usual meaning.
 */
export function mapCardToYesNo(
  card: TarotCardData,
  reversed: boolean,
): { tier: YesNoTier; labelEn: string; labelRu: string; tone: "positive" | "negative" | "neutral" } {
  const order: YesNoTier[] = ["yes", "probably-yes", "unclear", "probably-no", "no"];
  const base: YesNoTier =
    card.valence === "positive" ? "yes" : card.valence === "challenging" ? "no" : "unclear";
  let index = order.indexOf(base);
  if (reversed) {
    index = Math.min(index + 1, order.length - 1);
  }
  const tier = order[index];
  return { tier, labelEn: LABELS_EN[tier], labelRu: LABELS_RU[tier], tone: TONE[tier] };
}

export function drawnCardShareText(
  drawn: DrawnCard,
  locale: "en" | "ru",
  meaning: string,
  name: string,
): string {
  return locale === "en"
    ? `My Tarot card: ${name}\n\n${meaning}\n\nDrawn on TryGenHub`
    : `Моя карта Таро: ${name}\n\n${meaning}\n\nСгенерировано на TryGenHub`;
}
