export type AiBusinessIndustry =
  | "general"
  | "technology"
  | "retail"
  | "food"
  | "health"
  | "creative"
  | "finance"
  | "education";

export type AiBusinessNameStyle =
  | "modern"
  | "playful"
  | "elegant"
  | "bold"
  | "minimal";

export type AiBusinessNameOptions = {
  keyword: string;
  industry: AiBusinessIndustry;
  style: AiBusinessNameStyle;
  count: number;
};

export type AiBusinessNameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiBusinessNameGenerationResult = {
  names: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 40;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const GENERAL_WORDS: readonly string[] = [
  "nova",
  "summit",
  "horizon",
  "prime",
  "north",
  "bright",
  "venture",
  "bridge",
  "beacon",
  "anchor",
  "atlas",
  "haven",
  "pioneer",
  "vertex",
  "compass",
  "cascade",
  "meridian",
];

const INDUSTRY_WORDS: Record<Exclude<AiBusinessIndustry, "general">, readonly string[]> = {
  technology: [
    "pixel",
    "cloud",
    "logic",
    "byte",
    "data",
    "quantum",
    "circuit",
    "stack",
    "signal",
    "nexus",
    "orbit",
    "vector",
    "silicon",
    "binary",
  ],
  retail: [
    "market",
    "trove",
    "supply",
    "goods",
    "outfit",
    "bazaar",
    "corner",
    "parcel",
    "curated",
    "shelf",
    "depot",
    "emporium",
  ],
  food: [
    "harvest",
    "kitchen",
    "table",
    "flavor",
    "fresh",
    "garden",
    "spoon",
    "feast",
    "pantry",
    "hearth",
    "orchard",
    "kettle",
  ],
  health: [
    "vital",
    "pulse",
    "bloom",
    "renew",
    "balance",
    "thrive",
    "calm",
    "wellspring",
    "radiant",
    "nurture",
    "vitality",
  ],
  creative: [
    "canvas",
    "studio",
    "spark",
    "craft",
    "bloom",
    "story",
    "frame",
    "muse",
    "palette",
    "gallery",
    "sketch",
    "prism",
  ],
  finance: [
    "capital",
    "ledger",
    "vault",
    "asset",
    "equity",
    "trust",
    "reserve",
    "stone",
    "sterling",
    "yield",
  ],
  education: [
    "academy",
    "scholar",
    "bright",
    "insight",
    "mentor",
    "learn",
    "campus",
    "lyceum",
    "quill",
    "beacon",
  ],
};

const STYLE_SUFFIXES: Record<AiBusinessNameStyle, readonly string[]> = {
  modern: ["Labs", "Co", "Studio", "Works"],
  playful: ["Hive", "Club", "Nest", "Bunch"],
  elegant: ["House", "& Co.", "Atelier", "Maison"],
  bold: ["Group", "Collective", "Industries", "Ventures"],
  minimal: ["", "", "Co", ""],
};

export function validateAiBusinessNameOptions(
  options: AiBusinessNameOptions,
): AiBusinessNameValidationResult {
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
 * letters, digits, and spaces (which are then title-cased and joined),
 * stripping anything else so the result can never introduce unsafe
 * characters.
 */
export function sanitizeAiBusinessKeyword(keyword: string): string {
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

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[randomIndex(pool.length)];
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function wordPoolFor(industry: AiBusinessIndustry): readonly string[] {
  if (industry === "general") return GENERAL_WORDS;
  return [...INDUSTRY_WORDS[industry], ...GENERAL_WORDS];
}

function buildCandidate(
  options: AiBusinessNameOptions,
  sanitizedKeyword: string,
): string {
  const { industry, style } = options;
  const hasKeyword = sanitizedKeyword.length > 0;
  const pool = wordPoolFor(industry);

  const base = hasKeyword && Math.random() < 0.55
    ? sanitizedKeyword
    : capitalize(pick(pool));

  const secondary = capitalize(pick(pool));

  let name: string;
  if (hasKeyword && base !== sanitizedKeyword && Math.random() < 0.5) {
    name = `${sanitizedKeyword}${secondary}`;
  } else if (Math.random() < 0.6) {
    name = base;
  } else {
    name = `${base}${secondary}`;
  }

  const suffixPool = STYLE_SUFFIXES[style];
  const suffix = pick(suffixPool);

  return suffix ? `${name} ${suffix}` : name;
}

export function generateAiBusinessNames(
  options: AiBusinessNameOptions,
): AiBusinessNameGenerationResult {
  const validation = validateAiBusinessNameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiBusinessKeyword(options.keyword);
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

export function formatAiBusinessNameResults(names: readonly string[]): string {
  return names.join("\n");
}
