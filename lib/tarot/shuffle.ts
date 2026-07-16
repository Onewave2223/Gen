import type { TarotCardData, DrawnCard } from "./deck";
import { FULL_DECK } from "./deck";

export type { DrawnCard } from "./deck";

/**
 * Returns a cryptographically strong float in [0, 1), mirroring
 * `Math.random()`'s contract. Falls back to `Math.random()` only in
 * environments without `crypto.getRandomValues` (very old browsers /
 * non-browser test runners) — never silently falls back in a modern
 * browser, since `crypto` is available on every supported target.
 */
function secureRandom(): number {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] / 2 ** 32;
  }
  return Math.random();
}

/** Cryptographically-seeded Fisher-Yates shuffle. Does not mutate the input. */
export function secureShuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(secureRandom() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Draws `count` unique cards from the full 78-card deck, each independently
 * given a chance of landing reversed. No card can repeat within one draw. */
export function drawUniqueCards(
  count: number,
  reversedProbability = 0.25,
): DrawnCard[] {
  const shuffled = secureShuffle(FULL_DECK);
  return shuffled.slice(0, count).map((card) => ({
    card,
    reversed: secureRandom() < reversedProbability,
  }));
}

/** Draws a single card, biased by a recent-history buffer (session-scoped)
 * so the exact same card is unlikely to repeat back-to-back. */
export function drawCardAvoidingRecent(
  recentIds: readonly string[],
  reversedProbability = 0.25,
): DrawnCard {
  const pool: TarotCardData[] =
    recentIds.length >= FULL_DECK.length
      ? FULL_DECK.slice()
      : FULL_DECK.filter((c) => !recentIds.includes(c.id));
  const shuffled = secureShuffle(pool.length > 0 ? pool : FULL_DECK);
  return {
    card: shuffled[0],
    reversed: secureRandom() < reversedProbability,
  };
}
