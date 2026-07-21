export type AiTeamCategory =
  | "gaming"
  | "esports"
  | "business"
  | "sports"
  | "random";

export type AiTeamNameOptions = {
  keyword: string;
  category: AiTeamCategory;
  count: number;
};

export type AiTeamNameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiTeamNameGenerationResult = {
  names: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const GAMING_ADJECTIVES: readonly string[] = [
  "shadow", "phantom", "rogue", "frost", "venom", "savage", "toxic",
  "feral", "silent", "crimson", "iron", "grim",
];

const GAMING_NOUNS: readonly string[] = [
  "wolves", "reapers", "vipers", "ghosts", "ravens", "phoenix", "legion",
  "outlaws", "ninjas", "marauders", "renegades", "hunters",
];

const ESPORTS_ADJECTIVES: readonly string[] = [
  "apex", "prime", "elite", "vertex", "velocity", "overclock", "surge",
  "havoc", "alpha", "nitro", "zenith", "quantum",
];

const ESPORTS_NOUNS: readonly string[] = [
  "esports", "gaming", "squad", "collective", "syndicate", "academy",
  "rivals", "dynasty", "vanguard", "coalition", "circuit", "origin",
];

const BUSINESS_ADJECTIVES: readonly string[] = [
  "summit", "meridian", "vertex", "momentum", "catalyst", "sterling",
  "atlas", "beacon", "anchor", "pinnacle", "strategic", "prime",
];

const BUSINESS_NOUNS: readonly string[] = [
  "partners", "group", "alliance", "ventures", "consultants", "solutions",
  "enterprises", "associates", "holdings", "network", "guild", "collective",
];

const SPORTS_ADJECTIVES: readonly string[] = [
  "thunder", "iron", "rapid", "fire", "steel", "storm", "blaze", "titan",
  "rising", "golden", "wild", "united",
];

const SPORTS_NOUNS: readonly string[] = [
  "eagles", "lions", "hawks", "bulls", "athletic", "rangers", "warriors",
  "strikers", "rovers", "city", "falcons", "bears",
];

const RANDOM_ADJECTIVES: readonly string[] = [
  ...GAMING_ADJECTIVES,
  ...ESPORTS_ADJECTIVES,
  ...BUSINESS_ADJECTIVES,
  ...SPORTS_ADJECTIVES,
];

const RANDOM_NOUNS: readonly string[] = [
  ...GAMING_NOUNS,
  ...ESPORTS_NOUNS,
  ...BUSINESS_NOUNS,
  ...SPORTS_NOUNS,
];

function adjectivesFor(category: AiTeamCategory): readonly string[] {
  switch (category) {
    case "gaming":
      return GAMING_ADJECTIVES;
    case "esports":
      return ESPORTS_ADJECTIVES;
    case "business":
      return BUSINESS_ADJECTIVES;
    case "sports":
      return SPORTS_ADJECTIVES;
    case "random":
    default:
      return RANDOM_ADJECTIVES;
  }
}

function nounsFor(category: AiTeamCategory): readonly string[] {
  switch (category) {
    case "gaming":
      return GAMING_NOUNS;
    case "esports":
      return ESPORTS_NOUNS;
    case "business":
      return BUSINESS_NOUNS;
    case "sports":
      return SPORTS_NOUNS;
    case "random":
    default:
      return RANDOM_NOUNS;
  }
}

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[randomIndex(pool.length)];
}

function capitalize(word: string): string {
  if (word.length === 0) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function validateAiTeamNameOptions(
  options: AiTeamNameOptions,
): AiTeamNameValidationResult {
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
 * Normalizes a keyword into a safe fragment for name generation. Keeps
 * letters, digits, and spaces (title-cased and joined), stripping anything
 * else so the result can never introduce unsafe characters.
 */
export function sanitizeAiTeamKeyword(keyword: string): string {
  const cleaned = keyword
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
}

function buildCandidate(
  options: AiTeamNameOptions,
  sanitizedKeyword: string,
): string {
  const { category } = options;
  const hasKeyword = sanitizedKeyword.length > 0;
  const adjPool = adjectivesFor(category);
  const nounPool = nounsFor(category);

  const adjPart =
    hasKeyword && Math.random() < 0.4
      ? sanitizedKeyword
      : capitalize(pick(adjPool));

  const nounPart = capitalize(pick(nounPool));

  return `${adjPart} ${nounPart}`;
}

export function generateAiTeamNames(
  options: AiTeamNameOptions,
): AiTeamNameGenerationResult {
  const validation = validateAiTeamNameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiTeamKeyword(options.keyword);
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

export function formatAiTeamNameResults(names: readonly string[]): string {
  return names.join("\n");
}
