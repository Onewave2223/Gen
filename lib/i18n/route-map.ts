/**
 * Central EN <-> RU route mapping for TryGenHub.
 *
 * This is the single source of truth used by:
 *  - the header/mobile language switcher (client-side lookup)
 *  - hreflang `alternates.languages` on individual pages
 *  - the sitemap (per-page alternate refs)
 *
 * Rules:
 *  - Only include a pair here if the two pages are genuine content
 *    equivalents (same tool/topic in the other language). Do NOT invent
 *    pairs for pages that don't actually have a translated counterpart.
 *  - /ru/gadaniya (fortune-telling) now has a full 1:1 English counterpart
 *    at /fortune — see the "Fortune & Fun <-> Gadaniya" block below for
 *    the per-tool pairs. The fallback still points there for any unmapped
 *    sub-paths.
 *  - A couple of "instrumenty" (RU) tools don't have a perfect 1:1 EN
 *    concept match (see NOTES below); we map them to the closest
 *    equivalent rather than leaving them without a translation link.
 */

import { FULL_DECK } from "@/lib/tarot/deck";

export interface RoutePair {
  en: string;
  ru: string;
}

export const ROUTE_PAIRS: RoutePair[] = [
  // Home
  { en: "/", ru: "/ru" },

  // Top-level pages
  { en: "/about", ru: "/ru/o-proekte" },
  { en: "/contact", ru: "/ru/kontakty" },
  { en: "/privacy", ru: "/ru/konfidencialnost" },
  { en: "/terms", ru: "/ru/usloviya" },

  // IQ Test
  { en: "/iq-test", ru: "/ru/test-na-iq" },

  // Fun & Random <-> Развлечения (full 1:1 category, already paired)
  { en: "/fun", ru: "/ru/razvlecheniya" },
  { en: "/fun/conversation-starter", ru: "/ru/razvlecheniya/tema-dlya-razgovora" },
  { en: "/fun/daily-idea", ru: "/ru/razvlecheniya/ideya-dnya" },
  { en: "/fun/decision-maker", ru: "/ru/razvlecheniya/prinyat-reshenie" },
  { en: "/fun/movie-night-picker", ru: "/ru/razvlecheniya/chto-posmotret" },
  { en: "/fun/never-have-i-ever", ru: "/ru/razvlecheniya/ya-nikogda-ne" },
  { en: "/fun/random-challenge", ru: "/ru/razvlecheniya/sluchaynoe-zadanie" },
  { en: "/fun/random-question", ru: "/ru/razvlecheniya/sluchaynyy-vopros" },
  { en: "/fun/this-or-that", ru: "/ru/razvlecheniya/to-ili-eto" },
  { en: "/fun/truth-or-dare", ru: "/ru/razvlecheniya/pravda-ili-deystvie" },
  { en: "/fun/what-should-i-eat", ru: "/ru/razvlecheniya/chto-poest" },
  { en: "/fun/what-to-do", ru: "/ru/razvlecheniya/chem-zanyatsya" },
  { en: "/fun/would-you-rather", ru: "/ru/razvlecheniya/chto-by-ty-vybral" },

  // Calculators <-> Instrumenty (calculator subset) — full 1:1
  { en: "/calculators/age-calculator", ru: "/ru/instrumenty/kalkulyator-vozrasta" },
  { en: "/calculators/bmi-calculator", ru: "/ru/instrumenty/kalkulyator-imt" },
  { en: "/calculators/date-difference", ru: "/ru/instrumenty/raznitsa-mezhdu-datami" },
  { en: "/calculators/percentage-calculator", ru: "/ru/instrumenty/kalkulyator-protsentov" },
  { en: "/calculators/tip-calculator", ru: "/ru/instrumenty/kalkulyator-chaevyh" },
  { en: "/calculators/discount-calculator", ru: "/ru/instrumenty/kalkulyator-skidki" },

  // Tools <-> Instrumenty (text-tools subset) — full 1:1
  { en: "/tools/case-converter", ru: "/ru/instrumenty/registr-teksta" },
  { en: "/tools/qr-code-generator", ru: "/ru/instrumenty/generator-qr-koda" },
  { en: "/tools/remove-duplicate-lines", ru: "/ru/instrumenty/udalit-dublikaty-strok" },
  { en: "/tools/sort-lines", ru: "/ru/instrumenty/sortirovka-strok" },
  { en: "/tools/word-counter", ru: "/ru/instrumenty/schetchik-slov" },
  { en: "/tools/unit-converter", ru: "/ru/instrumenty/konverter-edinic" },
  // NOTE: /tools/character-counter has no RU equivalent yet (schetchik-slov
  // covers word counting only) — intentionally omitted, falls back below.

  // Generators <-> Instrumenty (generator subset)
  { en: "/generators/password", ru: "/ru/instrumenty/generator-paroley" },
  { en: "/generators/uuid-generator", ru: "/ru/instrumenty/generator-uuid" },
  { en: "/generators/lorem-ipsum", ru: "/ru/instrumenty/lorem-ipsum" },
  { en: "/generators/random-number", ru: "/ru/instrumenty/sluchaynoe-chislo" },
  { en: "/generators/random-teams", ru: "/ru/instrumenty/sluchaynye-komandy" },
  // Random Picker (EN: "enter options, pick one, exclude picked items") is
  // the closest match to RandomChoice ("sluchaynyy-vybor"), not the winner
  // picker below.
  { en: "/generators/random-picker", ru: "/ru/instrumenty/sluchaynyy-vybor" },
  // Wheel Spinner (EN: "spin the wheel, get a winner, remove winners and
  // spin again") is the closest match to RandomWinnerRu
  // ("sluchaynyy-pobeditel"), which has the same remove-winner/redraw flow.
  { en: "/generators/wheel-spinner", ru: "/ru/instrumenty/sluchaynyy-pobeditel" },
  // NOTE: NicknameGeneratorRu ("generator-nikov") generates styled
  // nickname/handle combos (adjective+noun, gaming, suffix styles). It
  // isn't a perfect match for either EN "Username Generator" (keyword-based
  // handles) or "Random Name Generator" (real-name dataset), but Username
  // Generator is the closer concept (both produce online handles), so it's
  // used as the mapped pair rather than leaving it without a translation.
  { en: "/generators/username", ru: "/ru/instrumenty/generator-nikov" },

  // Category index pages: instrumenty combines EN calculators + generators
  // + tools into a single RU section, so there's no clean 1:1 category
  // match. We point it at /generators as the closest single equivalent
  // (largest overlap in tool count) — see fallback notes in
  // getLanguageSwitchTarget for pages without an explicit pair.
  { en: "/generators", ru: "/ru/instrumenty" },

  // Fortune & Fun <-> Gadaniya (full 1:1 section)
  { en: "/fortune", ru: "/ru/gadaniya" },
  { en: "/fortune/yes-or-no", ru: "/ru/gadaniya/da-net" },
  { en: "/fortune/magic-ball", ru: "/ru/gadaniya/shar-sudby" },
  { en: "/fortune/tarot-card", ru: "/ru/gadaniya/karta-dnya" },
  { en: "/fortune/coin-flip", ru: "/ru/gadaniya/monetka" },
  { en: "/fortune/life-path-number", ru: "/ru/gadaniya/chislo-sudby" },
  { en: "/fortune/wish-oracle", ru: "/ru/gadaniya/zhelanie" },
  { en: "/fortune/daily-reading", ru: "/ru/gadaniya/chto-zhdet-tebya-segodnya" },
  { en: "/fortune/compatibility", ru: "/ru/gadaniya/sovmestimost" },

  // Tarot card meanings catalog + all 78 per-card SEO pages. The EN and RU
  // routes share the same (English-based) slug, generated from the deck
  // data itself so this stays in sync automatically as the deck changes.
  { en: "/tarot/cards", ru: "/ru/tarot/cards" },
  ...FULL_DECK.map((card) => ({
    en: `/tarot/cards/${card.slug}`,
    ru: `/ru/tarot/cards/${card.slug}`,
  })),
];

/** EN path -> RU path */
export const EN_TO_RU: ReadonlyMap<string, string> = new Map(
  ROUTE_PAIRS.map((pair) => [pair.en, pair.ru]),
);

/** RU path -> EN path */
export const RU_TO_EN: ReadonlyMap<string, string> = new Map(
  ROUTE_PAIRS.map((pair) => [pair.ru, pair.en]),
);

/**
 * Fallback category targets, keyed by the leading path segment, used when
 * no exact page-level pair exists above. Ordered most-specific-first.
 */
const EN_CATEGORY_FALLBACKS: Array<{ prefix: string; ru: string }> = [
  { prefix: "/generators", ru: "/ru/instrumenty" },
  { prefix: "/tools", ru: "/ru/instrumenty" },
  { prefix: "/calculators", ru: "/ru/instrumenty" },
  { prefix: "/fun", ru: "/ru/razvlecheniya" },
  { prefix: "/fortune", ru: "/ru/gadaniya" },
];

const RU_CATEGORY_FALLBACKS: Array<{ prefix: string; en: string }> = [
  { prefix: "/ru/instrumenty", en: "/generators" },
  { prefix: "/ru/razvlecheniya", en: "/fun" },
  // /ru/gadaniya now has an English equivalent at /fortune.
  { prefix: "/ru/gadaniya", en: "/fortune" },
];

export interface LanguageSwitchTarget {
  /** URL to send the user to */
  href: string;
  /** Whether this is an exact page-level match or a category fallback */
  exact: boolean;
}

/**
 * Given the current pathname, returns where the language switcher should
 * point to land the user on the equivalent (or closest available) page in
 * the other language.
 */
export function getLanguageSwitchTarget(pathname: string): LanguageSwitchTarget {
  // Normalize trailing slash (except root paths)
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  const isRu = path === "/ru" || path.startsWith("/ru/");

  if (!isRu) {
    const exact = EN_TO_RU.get(path);
    if (exact) return { href: exact, exact: true };

    for (const { prefix, ru } of EN_CATEGORY_FALLBACKS) {
      if (path === prefix || path.startsWith(`${prefix}/`)) {
        return { href: ru, exact: false };
      }
    }
    return { href: "/ru", exact: false };
  }

  const exact = RU_TO_EN.get(path);
  if (exact) return { href: exact, exact: true };

  for (const { prefix, en } of RU_CATEGORY_FALLBACKS) {
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      return { href: en, exact: false };
    }
  }
  return { href: "/", exact: false };
}

/** True if `pathname` is anywhere under the /ru section. */
export function isRuPath(pathname: string): boolean {
  return pathname === "/ru" || pathname.startsWith("/ru/");
}
