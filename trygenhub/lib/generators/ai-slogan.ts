export type AiSloganCategory =
  | "business"
  | "startup"
  | "product"
  | "brand"
  | "marketing";

export type AiSloganOptions = {
  keyword: string;
  category: AiSloganCategory;
  count: number;
};

export type AiSloganValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiSloganGenerationResult = {
  slogans: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 40;
const MAX_ATTEMPTS_MULTIPLIER = 50;

type WordBank = {
  adjectives: readonly string[];
  nouns: readonly string[];
};

const WORD_BANKS: Record<AiSloganCategory, WordBank> = {
  business: {
    adjectives: [
      "smarter", "stronger", "reliable", "proven", "trusted", "efficient",
      "strategic", "bold", "sustainable", "focused",
    ],
    nouns: [
      "results", "growth", "solutions", "partnerships", "performance",
      "success", "strategy", "outcomes",
    ],
  },
  startup: {
    adjectives: [
      "bold", "fearless", "fast", "disruptive", "unstoppable", "ambitious",
      "relentless", "visionary", "agile", "fresh",
    ],
    nouns: [
      "ideas", "momentum", "growth", "breakthroughs", "change", "vision",
      "opportunity", "ambition",
    ],
  },
  product: {
    adjectives: [
      "simple", "powerful", "seamless", "effortless", "intuitive",
      "reliable", "precise", "elegant", "smart", "refined",
    ],
    nouns: [
      "design", "experience", "quality", "performance", "detail",
      "innovation", "craftsmanship",
    ],
  },
  brand: {
    adjectives: [
      "authentic", "iconic", "memorable", "timeless", "bold", "genuine",
      "distinctive", "trusted", "inspiring", "original",
    ],
    nouns: [
      "stories", "identity", "trust", "impact", "connection", "presence",
      "legacy",
    ],
  },
  marketing: {
    adjectives: [
      "measurable", "targeted", "impactful", "data-driven", "compelling",
      "strategic", "creative", "smart", "effective", "bold",
    ],
    nouns: [
      "reach", "results", "engagement", "attention", "growth",
      "impressions", "audiences",
    ],
  },
};

const GENERIC_TEMPLATES: readonly string[] = [
  "{Adj} by design.",
  "Where {adj} meets {noun}.",
  "Built for {noun}.",
  "{Adj} today. {Adj2} tomorrow.",
  "The {adj} way to grow.",
  "{Noun} you can count on.",
  "Driven by {noun}, defined by {adj} thinking.",
  "{Adj}, {adj2}, unstoppable.",
  "Your {noun}, starting today.",
  "Redefining {noun}.",
  "{Noun} made {adj}.",
  "Think {adj}. Move {adj2}.",
  "{Adj} ideas, real {noun}.",
  "Committed to {noun}, powered by {adj} thinking.",
];

const KEYWORD_TEMPLATES: readonly string[] = [
  "{Keyword}: {adj} by design.",
  "{Keyword} — the start of real {noun}.",
  "Choose {keyword}. Choose {noun}.",
  "{Keyword}: your partner in {noun}.",
  "With {keyword}, expect real {noun}.",
  "{Keyword} — {adj}, {adj2}, unstoppable.",
  "Powering {noun} with {keyword}.",
  "{Keyword}: {adj} results, every time.",
  "{Keyword}. {Adj} by nature.",
  "Experience {noun}, the {keyword} way.",
];

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[randomIndex(pool.length)];
}

function pickTwoDistinct(pool: readonly string[]): [string, string] {
  const first = pick(pool);
  if (pool.length <= 1) {
    return [first, first];
  }
  let second = pick(pool);
  let guard = 0;
  while (second === first && guard < 10) {
    second = pick(pool);
    guard += 1;
  }
  return [first, second];
}

function capitalize(value: string): string {
  if (value.length === 0) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function wordBankFor(category: AiSloganCategory): WordBank {
  return WORD_BANKS[category];
}

export function validateAiSloganOptions(
  options: AiSloganOptions,
): AiSloganValidationResult {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Number of slogans must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
    };
  }

  if (keyword.trim().length > MAX_KEYWORD_LENGTH) {
    return {
      valid: false,
      error: `Brand or product name must be ${MAX_KEYWORD_LENGTH} characters or fewer.`,
    };
  }

  return { valid: true };
}

/**
 * Normalizes a keyword into a safe fragment for slogan generation. Keeps
 * letters, digits, spaces, apostrophes, and hyphens (title-cased per word,
 * spaces preserved) so a multi-word brand name reads naturally inside a
 * generated sentence, while stripping anything that could introduce unsafe
 * characters.
 */
export function sanitizeAiSloganKeyword(keyword: string): string {
  const cleaned = keyword
    .trim()
    .replace(/[^a-zA-Z0-9\s'-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function fillTemplate(
  template: string,
  values: { adj: string; adj2: string; noun: string; keyword: string },
): string {
  return template
    .replace(/\{Adj2\}/g, capitalize(values.adj2))
    .replace(/\{adj2\}/g, values.adj2)
    .replace(/\{Adj\}/g, capitalize(values.adj))
    .replace(/\{adj\}/g, values.adj)
    .replace(/\{Noun\}/g, capitalize(values.noun))
    .replace(/\{noun\}/g, values.noun)
    .replace(/\{Keyword\}/g, values.keyword)
    .replace(/\{keyword\}/g, values.keyword);
}

function buildCandidate(
  options: AiSloganOptions,
  sanitizedKeyword: string,
): string {
  const { category } = options;
  const bank = wordBankFor(category);
  const [adj, adj2] = pickTwoDistinct(bank.adjectives);
  const noun = pick(bank.nouns);
  const hasKeyword = sanitizedKeyword.length > 0;

  const templatePool =
    hasKeyword && Math.random() < 0.55 ? KEYWORD_TEMPLATES : GENERIC_TEMPLATES;
  const template = pick(templatePool);

  return fillTemplate(template, { adj, adj2, noun, keyword: sanitizedKeyword });
}

export function generateAiSlogans(
  options: AiSloganOptions,
): AiSloganGenerationResult {
  const validation = validateAiSloganOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiSloganKeyword(options.keyword);
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

  // Deterministic fallback in case the template/word pool was exhausted
  // before reaching the requested count. Bounded so this can never loop
  // forever.
  let fallbackSuffix = 1;
  const maxFallbackAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  while (results.size < count && fallbackSuffix <= maxFallbackAttempts) {
    const base = buildCandidate(options, sanitizedKeyword);
    const candidate = `${base} (${fallbackSuffix})`;
    if (!results.has(candidate)) {
      results.add(candidate);
    }
    fallbackSuffix += 1;
  }

  return { slogans: Array.from(results) };
}

export function formatAiSloganResults(slogans: readonly string[]): string {
  return slogans.join("\n");
}
