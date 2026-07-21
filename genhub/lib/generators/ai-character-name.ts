export type AiCharacterStyle =
  | "fantasy"
  | "scifi"
  | "medieval"
  | "modern"
  | "random";

export type AiCharacterNameOptions = {
  keyword: string;
  style: AiCharacterStyle;
  count: number;
  includeSurname: boolean;
};

export type AiCharacterNameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiCharacterNameGenerationResult = {
  names: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

function capitalize(value: string): string {
  if (value.length === 0) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const FANTASY_SYLLABLES: readonly string[] = [
  "el", "ael", "sil", "thal", "ian", "wen", "lor", "ith", "ny", "ra",
  "vae", "ori", "syl", "en", "fae",
];

const SCIFI_SYLLABLES: readonly string[] = [
  "zex", "vor", "kyr", "nax", "dro", "quin", "zar", "tek", "vyn", "orn",
  "xel", "ryn", "kex", "nova", "ion",
];

const MEDIEVAL_SYLLABLES: readonly string[] = [
  "ed", "wulf", "bert", "hild", "win", "fred", "gar", "mund", "helm", "ric",
  "bald", "wyn", "ard", "olf", "stan",
];

const MODERN_SYLLABLES: readonly string[] = [
  "jay", "ash", "kay", "leo", "mia", "zoe", "eli", "noa", "rae", "dex",
  "ivy", "max", "sky", "finn", "nell",
];

const RANDOM_SYLLABLES: readonly string[] = [
  ...FANTASY_SYLLABLES,
  ...SCIFI_SYLLABLES,
  ...MEDIEVAL_SYLLABLES,
  ...MODERN_SYLLABLES,
];

const FANTASY_SURNAME_SUFFIXES: readonly string[] = ["wen", "iel", "thas", "ion", "wyn", "dor"];
const SCIFI_SURNAME_SUFFIXES: readonly string[] = ["ex", "on", "ar", "us", "yx", "or"];
const MEDIEVAL_SURNAME_SUFFIXES: readonly string[] = ["ford", "wood", "shire", "brook", "hall", "gate"];
const MODERN_SURNAME_SUFFIXES: readonly string[] = ["son", "ley", "ton", "field", "wood", "man"];

function surnameSuffixesFor(style: AiCharacterStyle): readonly string[] {
  switch (style) {
    case "fantasy":
      return FANTASY_SURNAME_SUFFIXES;
    case "scifi":
      return SCIFI_SURNAME_SUFFIXES;
    case "medieval":
      return MEDIEVAL_SURNAME_SUFFIXES;
    case "modern":
      return MODERN_SURNAME_SUFFIXES;
    case "random":
    default:
      return [
        ...FANTASY_SURNAME_SUFFIXES,
        ...SCIFI_SURNAME_SUFFIXES,
        ...MEDIEVAL_SURNAME_SUFFIXES,
        ...MODERN_SURNAME_SUFFIXES,
      ];
  }
}

function pickIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[pickIndex(pool.length)];
}

export function validateAiCharacterNameOptions(
  options: AiCharacterNameOptions,
): AiCharacterNameValidationResult {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Number of names must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
    };
  }

  if (keyword.trim().length > MAX_KEYWORD_LENGTH) {
    return {
      valid: false,
      error: `Keyword must be ${MAX_KEYWORD_LENGTH} characters or fewer.`,
    };
  }

  return { valid: true };
}

/**
 * Normalizes a keyword into a safe fragment for name generation.
 * Removes anything outside of letters so the resulting fragment can
 * never introduce markup or unsafe characters into a generated name.
 */
export function sanitizeAiCharacterKeyword(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "");
}

function syllablesFor(style: AiCharacterStyle): readonly string[] {
  switch (style) {
    case "fantasy":
      return FANTASY_SYLLABLES;
    case "scifi":
      return SCIFI_SYLLABLES;
    case "medieval":
      return MEDIEVAL_SYLLABLES;
    case "modern":
      return MODERN_SYLLABLES;
    case "random":
    default:
      return RANDOM_SYLLABLES;
  }
}

function buildFirstName(
  style: AiCharacterStyle,
  sanitizedKeyword: string,
): string {
  if (sanitizedKeyword.length > 0 && Math.random() < 0.35) {
    return capitalize(sanitizedKeyword);
  }

  const syllables = syllablesFor(style);
  const parts = Math.random() < 0.5 ? 2 : 3;
  let name = "";
  for (let i = 0; i < parts; i += 1) {
    name += pick(syllables);
  }
  return capitalize(name);
}

function buildSurname(style: AiCharacterStyle): string {
  const syllables = syllablesFor(style);
  const suffix = pick(surnameSuffixesFor(style));
  return capitalize(`${pick(syllables)}${suffix}`);
}

function buildCandidate(
  options: AiCharacterNameOptions,
  sanitizedKeyword: string,
): string {
  const { style, includeSurname } = options;

  const first = buildFirstName(style, sanitizedKeyword);

  if (includeSurname && Math.random() < 0.7) {
    return `${first} ${buildSurname(style)}`;
  }

  return first;
}

export function generateAiCharacterNames(
  options: AiCharacterNameOptions,
): AiCharacterNameGenerationResult {
  const validation = validateAiCharacterNameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiCharacterKeyword(options.keyword);
  const { count } = options;

  const results = new Set<string>();
  const maxAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  let attempts = 0;

  while (results.size < count && attempts < maxAttempts) {
    const candidate = buildCandidate(options, sanitizedKeyword);
    if (candidate.length > 0) {
      results.add(candidate);
    }
    attempts += 1;
  }

  // Deterministic fallback in case the random pool was exhausted before
  // reaching the requested count. Bounded so this can never loop forever.
  let fallbackSuffix = 1;
  const maxFallbackAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  while (results.size < count && fallbackSuffix <= maxFallbackAttempts) {
    const base = buildCandidate(options, sanitizedKeyword);
    const candidate = `${base} ${fallbackSuffix}`;
    if (!results.has(candidate)) {
      results.add(candidate);
    }
    fallbackSuffix += 1;
  }

  return { names: Array.from(results) };
}

export function formatAiCharacterNameResults(names: readonly string[]): string {
  return names.join("\n");
}
