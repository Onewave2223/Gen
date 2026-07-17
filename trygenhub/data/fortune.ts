export interface FortuneTool {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  href: string;
  emoji: string;
  ruHref: string;
  keywords: readonly string[];
}

/**
 * Catalog for the English-language /fortune ("fortune & fun") section.
 * Each tool corresponds to a Russian counterpart in /ru/gadaniya.
 */
export const fortuneTools: readonly FortuneTool[] = [
  {
    id: "yes-or-no",
    name: "Yes or No Oracle",
    shortDescription: "Ask a question and get a quick answer — yes, no, or something in between.",
    description:
      "A simple fortune tool for a quick answer to whatever is on your mind: yes, no, or maybe.",
    href: "/fortune/yes-or-no",
    ruHref: "/ru/gadaniya/da-net",
    emoji: "🔮",
    keywords: ["yes or no oracle", "yes or no online", "fortune yes no"],
  },
  {
    id: "magic-ball",
    name: "Magic Ball",
    shortDescription: "Ask the mystical magic ball and receive a short prediction.",
    description:
      "An interactive magic ball that answers your question with a short, atmospheric prediction.",
    href: "/fortune/magic-ball",
    ruHref: "/ru/gadaniya/shar-sudby",
    emoji: "🌙",
    keywords: ["magic ball online", "magic 8 ball", "fortune ball"],
  },
  {
    id: "tarot-card",
    name: "Tarot Card of the Day",
    shortDescription: "Draw one Tarot card and discover its message for today.",
    description:
      "A random card from the 22 Major Arcana with a short meaning and daily message.",
    href: "/fortune/tarot-card",
    ruHref: "/ru/gadaniya/karta-dnya",
    emoji: "🃏",
    keywords: ["tarot card of the day", "tarot online", "daily tarot"],
  },
  {
    id: "coin-flip",
    name: "Coin Flip",
    shortDescription: "Flip a virtual coin — heads or tails?",
    description:
      "A virtual coin for quick decisions: heads or tails, with a satisfying flip animation.",
    href: "/fortune/coin-flip",
    ruHref: "/ru/gadaniya/monetka",
    emoji: "🪙",
    keywords: ["coin flip online", "heads or tails", "flip a coin"],
  },
  {
    id: "life-path-number",
    name: "Life Path Number",
    shortDescription: "Discover your life path number from your date of birth.",
    description:
      "Calculate your life path number using a simple numerology system based on your birth date.",
    href: "/fortune/life-path-number",
    ruHref: "/ru/gadaniya/chislo-sudby",
    emoji: "✨",
    keywords: ["life path number", "numerology calculator", "birthday numerology"],
  },
  {
    id: "wish-oracle",
    name: "Will My Wish Come True?",
    shortDescription: "Make a wish and see how likely it is to come true.",
    description:
      "Wish fortune: find out what the oracle thinks about the chances of your wish coming true.",
    href: "/fortune/wish-oracle",
    ruHref: "/ru/gadaniya/zhelanie",
    emoji: "⭐",
    keywords: ["will my wish come true", "wish oracle", "fortune wish"],
  },
  {
    id: "daily-reading",
    name: "What Awaits You Today?",
    shortDescription: "A cinematic daily reading: energy, symbol, number, color, focus, and message of the day.",
    description:
      "A deterministic daily reading — the same for everyone today, new again tomorrow — covering the day's energy, symbol, number, color, focus, and message.",
    href: "/fortune/daily-reading",
    ruHref: "/ru/gadaniya/chto-zhdet-tebya-segodnya",
    emoji: "☀️",
    keywords: ["daily reading", "what awaits me today", "energy of the day"],
  },
  {
    id: "compatibility",
    name: "Compatibility",
    shortDescription: "Enter two names and a relationship type for a fun compatibility score.",
    description:
      "A deterministic, order-independent compatibility reading for two names across six categories, for Love, Friendship, or General relationships.",
    href: "/fortune/compatibility",
    ruHref: "/ru/gadaniya/sovmestimost",
    emoji: "💞",
    keywords: ["compatibility test", "name compatibility", "love compatibility"],
  },
];

export function getOtherFortuneTools(
  currentId: string,
  limit = 5,
): FortuneTool[] {
  return fortuneTools.filter((tool) => tool.id !== currentId).slice(0, limit);
}
