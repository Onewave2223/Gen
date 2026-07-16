import type { QuestionCategory } from "./types";
import { CATEGORY_LIST, QUESTIONS_PER_CATEGORY, questionsByCategory } from "./questions";

/**
 * Small deterministic PRNG (mulberry32) so a given seed always produces the
 * same balanced draw — lets us persist just the seed instead of the full
 * list, though we persist the resolved ID list directly for simplicity and
 * forward-compatibility with question bank edits.
 */
export function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Draws a balanced set of QUESTIONS_PER_CATEGORY questions from each of the
 * 7 categories (35 total), shuffles overall order, and returns the question
 * IDs. Uses a seeded RNG so the same seed always reproduces the same draw.
 *
 * `recentlyShownIds` is an optional, bounded list of question IDs shown in
 * recent attempts (most-recent-first). When provided, each category prefers
 * drawing from its unseen questions first, only falling back to
 * recently-seen ones (least-recently-seen first) if a category doesn't have
 * enough unseen questions to fill its quota. This keeps repeat attempts
 * mostly fresh without ever blocking a draw or changing the function's
 * return shape.
 */
export function drawBalancedQuestionSet(
  seed: number,
  recentlyShownIds: number[] = [],
): number[] {
  const rand = mulberry32(seed);
  const selected: number[] = [];
  const recentSet = new Set(recentlyShownIds);

  for (const category of CATEGORY_LIST as QuestionCategory[]) {
    const pool = questionsByCategory[category];
    const unseen = pool.filter((q) => !recentSet.has(q.id));
    const seen = pool.filter((q) => recentSet.has(q.id));

    const shuffledUnseen = shuffle(unseen, rand);
    let picked = shuffledUnseen.slice(0, QUESTIONS_PER_CATEGORY);

    if (picked.length < QUESTIONS_PER_CATEGORY) {
      const needed = QUESTIONS_PER_CATEGORY - picked.length;
      // Fall back to recently-seen questions, preferring the ones that were
      // shown longest ago (i.e. later in recentlyShownIds).
      const seenByRecency = [...seen].sort(
        (a, b) => recentlyShownIds.indexOf(b.id) - recentlyShownIds.indexOf(a.id),
      );
      picked = picked.concat(seenByRecency.slice(0, needed));
    }

    selected.push(...picked.map((q) => q.id));
  }

  return shuffle(selected, rand);
}

export function generateSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}
