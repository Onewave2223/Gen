/**
 * Shared randomness helpers for the /ru/gadaniya ("fortune telling")
 * section. All selection happens locally in the browser (or on the
 * server during a single render) via Math.random — no external API,
 * no persistence, matching the rest of the generator tools in this
 * project (see lib/generators/coin-flip.ts for the same pattern).
 */

/**
 * Picks a uniformly random element from a non-empty array.
 */
export function pickRandom<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error("Cannot pick a random item from an empty array.");
  }
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

/**
 * Picks a uniformly random element, avoiding the previous pick when
 * possible, so pressing the retry button in quick succession doesn't
 * feel repetitive. Falls back to a plain random pick when the list
 * only has one item.
 */
export function pickRandomDistinct<T>(
  items: readonly T[],
  previous: T | null,
): T {
  if (items.length <= 1) {
    return pickRandom(items);
  }

  let next = pickRandom(items);
  let guard = 0;

  while (next === previous && guard < 10) {
    next = pickRandom(items);
    guard += 1;
  }

  return next;
}
