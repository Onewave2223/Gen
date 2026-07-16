export type CompanyIndustry =
  | "general"
  | "technology"
  | "creative"
  | "food"
  | "fashion"
  | "finance"
  | "wellness"
  | "education";

export type CompanyNameStyle =
  | "modern"
  | "professional"
  | "creative"
  | "minimal";

export type CompanyNameOptions = {
  keyword: string;
  industry: CompanyIndustry;
  style: CompanyNameStyle;
  count: number;
};

export type CompanyNameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type CompanyNameGenerationResult = {
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
  "forge",
  "bridge",
  "peak",
  "beacon",
  "anchor",
  "atlas",
  "haven",
  "pioneer",
  "vertex",
  "sterling",
  "compass",
  "cascade",
  "meridian",
];

const INDUSTRY_WORDS: Record<Exclude<CompanyIndustry, "general">, readonly string[]> = {
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
    "core",
    "nexus",
    "orbit",
    "vector",
    "matrix",
    "grid",
    "silicon",
    "binary",
    "cipher",
  ],
  creative: [
    "canvas",
    "vivid",
    "studio",
    "spark",
    "craft",
    "bloom",
    "story",
    "frame",
    "muse",
    "color",
    "palette",
    "ink",
    "gallery",
    "motif",
    "sketch",
    "prism",
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
    "bite",
    "pantry",
    "hearth",
    "grove",
    "orchard",
    "kettle",
    "market",
    "supper",
  ],
  fashion: [
    "thread",
    "mode",
    "style",
    "velvet",
    "atelier",
    "form",
    "loom",
    "edit",
    "wear",
    "drape",
    "seam",
    "silhouette",
    "textile",
    "runway",
  ],
  finance: [
    "capital",
    "ledger",
    "fund",
    "wealth",
    "trust",
    "value",
    "equity",
    "balance",
    "reserve",
    "asset",
    "yield",
    "vault",
    "treasury",
    "dividend",
  ],
  wellness: [
    "calm",
    "balance",
    "bloom",
    "vital",
    "pure",
    "harmony",
    "wellness",
    "flow",
    "renew",
    "glow",
    "breathe",
    "restore",
    "serenity",
    "vitality",
  ],
  education: [
    "learn",
    "academy",
    "scholar",
    "bright",
    "mind",
    "study",
    "skill",
    "knowledge",
    "insight",
    "lesson",
    "wisdom",
    "curious",
    "tutor",
    "campus",
  ],
};

const MODERN_SUFFIXES: readonly string[] = [
  "labs",
  "works",
  "co",
  "hub",
  "loop",
  "shift",
];

const PROFESSIONAL_SUFFIXES: readonly string[] = [
  "solutions",
  "partners",
  "group",
  "associates",
  "consulting",
];

const CREATIVE_SUFFIXES: readonly string[] = [
  "bloom",
  "spark",
  "forge",
  "story",
  "craft",
];

export function validateCompanyNameOptions(
  options: CompanyNameOptions,
): CompanyNameValidationResult {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Number of company names must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
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
 * Normalizes a keyword for safe display within a generated company
 * name. The result is never rendered as HTML, so this only trims
 * whitespace and strips control characters rather than reducing the
 * keyword to a narrow character set.
 */
export function sanitizeCompanyKeyword(keyword: string): string {
  return keyword
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, "");
}

function capitalize(word: string): string {
  if (word.length === 0) return word;
  return word[0].toUpperCase() + word.slice(1);
}

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[randomIndex(pool.length)];
}

function getIndustryWords(industry: CompanyIndustry): readonly string[] {
  if (industry === "general") {
    return GENERAL_WORDS;
  }
  return INDUSTRY_WORDS[industry];
}

function buildCandidate(
  options: CompanyNameOptions,
  sanitizedKeyword: string,
): string {
  const { style, industry } = options;
  const hasKeyword = sanitizedKeyword.length > 0;
  const industryWords = getIndustryWords(industry);
  const coreWord = capitalize(pick(industryWords));
  const generalWord = capitalize(pick(GENERAL_WORDS));
  const keywordWord = hasKeyword ? capitalize(sanitizedKeyword) : "";

  const useKeyword = hasKeyword && Math.random() < 0.5;

  switch (style) {
    case "modern": {
      const suffix = capitalize(pick(MODERN_SUFFIXES));
      const base = useKeyword ? keywordWord : coreWord;
      return `${base} ${suffix}`;
    }
    case "professional": {
      const suffix = capitalize(pick(PROFESSIONAL_SUFFIXES));
      const base = useKeyword ? keywordWord : generalWord;
      return `${base} ${suffix}`;
    }
    case "creative": {
      const suffix = capitalize(pick(CREATIVE_SUFFIXES));
      const base = useKeyword ? keywordWord : coreWord;
      if (base.toLowerCase() === suffix.toLowerCase()) {
        return `${capitalize(pick(GENERAL_WORDS))} ${suffix}`;
      }
      return `${base} ${suffix}`;
    }
    case "minimal":
    default: {
      const base = useKeyword ? keywordWord : coreWord;
      const addSecondWord = Math.random() < 0.3;
      if (!addSecondWord) {
        return base;
      }
      const second = capitalize(pick(GENERAL_WORDS));
      if (second.toLowerCase() === base.toLowerCase()) {
        return base;
      }
      return `${base} ${second}`;
    }
  }
}

export function generateCompanyNames(
  options: CompanyNameOptions,
): CompanyNameGenerationResult {
  const validation = validateCompanyNameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeCompanyKeyword(options.keyword);
  const { count } = options;

  const results = new Set<string>();
  const maxAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  let attempts = 0;

  while (results.size < count && attempts < maxAttempts) {
    const candidate = buildCandidate(options, sanitizedKeyword);
    if (candidate.trim().length > 0) {
      results.add(candidate);
    }
    attempts += 1;
  }

  // Bounded so this can never loop indefinitely.
  let fallbackSuffix = 2;
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

export function formatCompanyNameResults(names: readonly string[]): string {
  return names.join("\n");
}
