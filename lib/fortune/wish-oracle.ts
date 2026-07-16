import { pickRandomDistinct } from "@/lib/gadaniya/random";

export type WishOracleTone = "positive" | "negative" | "neutral";

export interface WishOracleAnswer {
  text: string;
  tone: WishOracleTone;
}

export const WISH_ORACLE_ANSWERS: readonly WishOracleAnswer[] = [
  { text: "Yes, the chances are high", tone: "positive" },
  { text: "Your wish will come true — don't give up", tone: "positive" },
  { text: "Everything is aligning in your favor", tone: "positive" },
  { text: "Yes, but take the first step first", tone: "positive" },
  { text: "Possible, but it will take time", tone: "neutral" },
  { text: "It all depends on your actions", tone: "neutral" },
  { text: "There are obstacles right now", tone: "neutral" },
  { text: "Try coming back to this later", tone: "neutral" },
  { text: "The answer is hidden — listen to yourself", tone: "neutral" },
  { text: "Not now, but don't lose hope", tone: "negative" },
  { text: "It may be worth reconsidering the wish itself", tone: "negative" },
  { text: "The road to this goal will not be easy", tone: "negative" },
  { text: "Better to direct your energy elsewhere", tone: "negative" },
];

export function getWishOracleAnswer(
  previous: WishOracleAnswer | null,
): WishOracleAnswer {
  return pickRandomDistinct(WISH_ORACLE_ANSWERS, previous);
}
