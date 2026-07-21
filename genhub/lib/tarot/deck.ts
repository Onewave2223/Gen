import { TAROT_DECK, type TarotCardData } from "./deck-data";

export type { TarotCardData, Arcana, Suit, CardValence } from "./deck-data";

/** Full 78-card deck, in a fixed canonical order (Major Arcana 0-21, then
 * Wands, Cups, Swords, Pentacles Ace-King). Draws should always shuffle a
 * copy of this array — never mutate it directly. */
export const FULL_DECK: readonly TarotCardData[] = TAROT_DECK;

const DECK_BY_ID = new Map(FULL_DECK.map((card) => [card.id, card]));

export function getCardById(id: string): TarotCardData | undefined {
  return DECK_BY_ID.get(id);
}

export interface DrawnCard {
  card: TarotCardData;
  reversed: boolean;
}

/** Renders the localized name for a card, including a reversed marker. */
export function getCardName(
  card: TarotCardData,
  locale: "en" | "ru",
  reversed: boolean,
): string {
  const name = locale === "en" ? card.nameEn : card.nameRu;
  if (!reversed) return name;
  return locale === "en" ? `${name} (Reversed)` : `${name} (Перевёрнутая)`;
}

export function getCardMeaning(
  card: TarotCardData,
  locale: "en" | "ru",
  reversed: boolean,
): string {
  if (locale === "en") return reversed ? card.reversedEn : card.uprightEn;
  return reversed ? card.reversedRu : card.uprightRu;
}

export function getCardKeywords(
  card: TarotCardData,
  locale: "en" | "ru",
): readonly string[] {
  return locale === "en" ? card.keywordsEn : card.keywordsRu;
}

export function getCardDailyMessage(
  card: TarotCardData,
  locale: "en" | "ru",
): string {
  return locale === "en" ? card.dailyMessageEn : card.dailyMessageRu;
}

export type CardLifeDomain = "love" | "career" | "finance" | "spiritual";

/** Returns the per-domain reading (love/career/finance/spiritual) for a card. */
export function getCardDomainText(
  card: TarotCardData,
  domain: CardLifeDomain,
  locale: "en" | "ru",
): string {
  const key = `${domain}${locale === "en" ? "En" : "Ru"}` as keyof TarotCardData;
  return card[key] as string;
}

export function getCardBySlug(slug: string): TarotCardData | undefined {
  return FULL_DECK.find((card) => card.slug === slug);
}

export const SUIT_ORDER: readonly Exclude<TarotCardData["suit"], null>[] = [
  "wands",
  "cups",
  "swords",
  "pentacles",
];

export interface TarotCardGroup {
  key: string;
  labelEn: string;
  labelRu: string;
  cards: readonly TarotCardData[];
}

const SUIT_LABELS: Record<string, { en: string; ru: string }> = {
  wands: { en: "Wands", ru: "Жезлы" },
  cups: { en: "Cups", ru: "Кубки" },
  swords: { en: "Swords", ru: "Мечи" },
  pentacles: { en: "Pentacles", ru: "Пентакли" },
};

/**
 * Groups the full deck for the catalog page: Major Arcana first (in rank
 * order), then each Minor Arcana suit (Wands, Cups, Swords, Pentacles),
 * each in rank order (Ace..King).
 */
export function getCardGroups(): readonly TarotCardGroup[] {
  const major = FULL_DECK.filter((c) => c.arcana === "major").sort((a, b) => a.rank - b.rank);
  const groups: TarotCardGroup[] = [
    { key: "major", labelEn: "Major Arcana", labelRu: "Старшие Арканы", cards: major },
  ];
  for (const suit of SUIT_ORDER) {
    const cards = FULL_DECK.filter((c) => c.suit === suit).sort((a, b) => a.rank - b.rank);
    groups.push({ key: suit, labelEn: SUIT_LABELS[suit].en, labelRu: SUIT_LABELS[suit].ru, cards });
  }
  return groups;
}

/** Previous and next card in the fixed canonical deck order, for prev/next navigation. */
export function getAdjacentCards(card: TarotCardData): { prev: TarotCardData; next: TarotCardData } {
  const index = FULL_DECK.findIndex((c) => c.id === card.id);
  const prev = FULL_DECK[(index - 1 + FULL_DECK.length) % FULL_DECK.length];
  const next = FULL_DECK[(index + 1) % FULL_DECK.length];
  return { prev, next };
}
