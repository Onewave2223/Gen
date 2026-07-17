import { seededRandom } from "@/lib/fortune/prng";
import {
  getCatalogItemById,
  type CatalogItem,
  type CatalogLocale,
} from "@/lib/engagement/catalog";

/**
 * Curated, hand-picked pools that back the homepage "Trending This
 * Week" and "Recently Added" sections. These are intentionally
 * separate from `catalog` (the full flat list of every generator /
 * tool / calculator) because both sections need a smaller, editorial
 * subset rather than "everything" — trending should stay broadly
 * appealing across categories, and recently-added should only ever
 * contain genuinely new tools.
 *
 * IMPORTANT: ids here must exist in `catalog` / `catalogRu`
 * (lib/engagement/catalog.ts). Unresolvable ids are silently dropped
 * by getTrendingItems/getRecentlyAddedItems rather than throwing, so
 * a stale id here never breaks a page — it just quietly shrinks the
 * pool. Keep pools comfortably larger than the display count so the
 * weekly rotation actually varies.
 */
const TRENDING_POOL_EN: readonly string[] = [
  "generator:random-number",
  "generator:password",
  "generator:username",
  "generator:dice-roller",
  "generator:coin-flip",
  "generator:wheel-spinner",
  "generator:random-picker",
  "generator:uuid-generator",
  "generator:random-name",
  "generator:random-teams",
  "tool:qr-code-generator",
  "tool:word-counter",
  "tool:unit-converter",
  "calculator:percentage-calculator",
  "calculator:age-calculator",
  "calculator:tip-calculator",
];

const TRENDING_POOL_RU: readonly string[] = [
  "instrument:sluchaynoe-chislo",
  "instrument:generator-paroley",
  "instrument:generator-nikov",
  "instrument:sluchaynyy-vybor",
  "instrument:sluchaynyy-pobeditel",
  "instrument:sluchaynye-komandy",
  "instrument:generator-uuid",
  "instrument:generator-qr-koda",
  "instrument:schetchik-slov",
  "instrument:konverter-edinic",
  "instrument:kalkulyator-protsentov",
  "instrument:kalkulyator-vozrasta",
  "instrument:kalkulyator-chaevyh",
];

/**
 * Ordered newest-first. Reflects the actual build order of the AI
 * generator family (the most recently shipped tools on the site), so
 * this section only ever surfaces content that is genuinely new.
 */
const RECENTLY_ADDED_EN: readonly string[] = [
  "generator:ai-random-question",
  "generator:ai-instagram-caption",
  "generator:ai-slogan",
  "generator:ai-team-name",
  "generator:ai-pet-name",
  "generator:ai-character-name",
  "generator:ai-fantasy-name",
  "generator:ai-domain-name",
];

const RECENTLY_ADDED_RU: readonly string[] = [
  "instrument:ai-random-question",
  "instrument:ai-instagram-caption",
  "instrument:ai-slogan",
  "instrument:ai-team-name",
  "instrument:ai-pet-name",
  "instrument:ai-character-name",
  "instrument:ai-fantasy-name",
  "instrument:ai-domain-name",
];

export const TRENDING_DISPLAY_COUNT = 6;
export const RECENTLY_ADDED_DISPLAY_COUNT = 6;

/** ISO-8601 week key, e.g. "2026-W29". Stable across a Mon–Sun week
 * so every visitor sees the same "this week" set, and it rotates
 * automatically once a week without any stored state. */
function isoWeekKey(date: Date): string {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7,
  );
  return `${d.getUTCFullYear()}-W${weekNo}`;
}

/** Deterministic Fisher–Yates shuffle seeded by `seed`. */
function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const rng = seededRandom(seed);
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function resolveIds(ids: readonly string[], locale: CatalogLocale): CatalogItem[] {
  return ids
    .map((id) => getCatalogItemById(id, locale))
    .filter((item): item is CatalogItem => Boolean(item));
}

/**
 * Returns this week's trending items, deterministically shuffled from
 * the curated pool so the set changes weekly without a backend.
 * Pass an explicit `date` only for testing — defaults to now.
 */
export function getTrendingItems(
  locale: CatalogLocale = "en",
  date: Date = new Date(),
): CatalogItem[] {
  const pool = locale === "ru" ? TRENDING_POOL_RU : TRENDING_POOL_EN;
  const seed = `trending:${locale}:${isoWeekKey(date)}`;
  const ids = seededShuffle(pool, seed).slice(0, TRENDING_DISPLAY_COUNT);
  return resolveIds(ids, locale);
}

/** Returns the newest tools on the site, newest first. */
export function getRecentlyAddedItems(locale: CatalogLocale = "en"): CatalogItem[] {
  const ids = locale === "ru" ? RECENTLY_ADDED_RU : RECENTLY_ADDED_EN;
  return resolveIds(ids.slice(0, RECENTLY_ADDED_DISPLAY_COUNT), locale);
}
