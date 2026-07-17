export type AiDomainVibeRu =
  | "ai"
  | "startup"
  | "creative"
  | "short"
  | "professional";

export type AiDomainExtensionRu =
  | ".ru"
  | ".рф"
  | ".com"
  | ".online"
  | ".site"
  | ".io";

export type AiDomainNameOptionsRu = {
  keyword: string;
  vibe: AiDomainVibeRu;
  extension: AiDomainExtensionRu;
  count: number;
  allowHyphens: boolean;
};

export type AiDomainNameValidationResultRu =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiDomainNameGenerationResultRu = {
  domains: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const AI_PREFIXES: readonly string[] = [
  "нейро",
  "кибер",
  "квант",
  "синт",
  "вектор",
  "байт",
  "сигнал",
  "схема",
  "нова",
  "прото",
  "мета",
  "гипер",
  "логик",
  "пиксель",
];

const AI_WORDS: readonly string[] = [
  "разум",
  "ядро",
  "узел",
  "импульс",
  "матрица",
  "цикл",
  "сеть",
  "поток",
  "искра",
  "волна",
  "орбита",
  "кузница",
];

const STARTUP_WORDS: readonly string[] = [
  "хаб",
  "база",
  "флоу",
  "гнездо",
  "точка",
  "студия",
  "лайн",
  "стек",
  "буст",
  "рывок",
];

const STARTUP_PREFIXES: readonly string[] = [
  "получи",
  "пробуй",
  "иди",
  "мой",
  "исполь",
  "привет",
  "смарт",
  "ярко",
  "некст",
  "мы",
];

const CREATIVE_WORDS: readonly string[] = [
  "муза",
  "лепесток",
  "дымка",
  "цветок",
  "сияние",
  "опал",
  "ива",
  "роса",
  "призма",
  "лён",
];

const SHORT_WORDS: readonly string[] = [
  "зо",
  "векс",
  "кай",
  "люкс",
  "никс",
  "рекс",
  "вио",
  "зен",
  "ива",
  "оки",
];

const PROFESSIONAL_WORDS: readonly string[] = [
  "групп",
  "партнеры",
  "решения",
  "венчурс",
  "диджитал",
  "коллектив",
  "офис",
  "бюро",
  "проекты",
  "лабс",
];

const ADJECTIVES: readonly string[] = [
  "яркий",
  "быстрый",
  "тихий",
  "космо",
  "четкий",
  "смелый",
  "скрытый",
  "лунный",
  "живой",
  "резкий",
];

export function validateAiDomainNameOptionsRu(
  options: AiDomainNameOptionsRu,
): AiDomainNameValidationResultRu {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Количество вариантов должно быть целым числом от ${MIN_COUNT} до ${MAX_COUNT}.`,
    };
  }

  if (keyword.trim().length > MAX_KEYWORD_LENGTH) {
    return {
      valid: false,
      error: `Ключевое слово должно быть не длиннее ${MAX_KEYWORD_LENGTH} символов.`,
    };
  }

  return { valid: true };
}

/**
 * Normalizes a keyword into a safe fragment for domain generation.
 * Keeps lowercase Cyrillic/Latin letters and digits only, so the
 * resulting label can never introduce markup or unsafe characters.
 */
export function sanitizeAiDomainKeywordRu(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-zа-яё0-9]/gi, "");
}

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[randomIndex(pool.length)];
}

function joinParts(parts: readonly string[], allowHyphens: boolean): string {
  if (!allowHyphens) {
    return parts.join("");
  }

  const useHyphen = Math.random() < 0.5;
  return parts.join(useHyphen ? "-" : "");
}

function buildLabel(
  options: AiDomainNameOptionsRu,
  sanitizedKeyword: string,
): string {
  const { vibe, allowHyphens } = options;
  const hasKeyword = sanitizedKeyword.length > 0;

  let parts: string[];

  switch (vibe) {
    case "ai": {
      const prefix = pick(AI_PREFIXES);
      const word = hasKeyword && Math.random() < 0.5 ? sanitizedKeyword : pick(AI_WORDS);
      parts = [prefix, word];
      break;
    }
    case "startup": {
      const word = pick(STARTUP_WORDS);
      parts = hasKeyword ? [sanitizedKeyword, word] : [pick(STARTUP_PREFIXES), word];
      break;
    }
    case "creative": {
      const word = pick(CREATIVE_WORDS);
      parts = hasKeyword
        ? Math.random() < 0.5
          ? [sanitizedKeyword, word]
          : [word, sanitizedKeyword]
        : [pick(ADJECTIVES), word];
      break;
    }
    case "short": {
      const word = hasKeyword ? sanitizedKeyword.slice(0, 5) : pick(SHORT_WORDS);
      parts = Math.random() < 0.5 ? [word, pick(SHORT_WORDS)] : [word];
      break;
    }
    case "professional":
    default: {
      const word = pick(PROFESSIONAL_WORDS);
      parts = hasKeyword ? [sanitizedKeyword, word] : [pick(ADJECTIVES), word];
      break;
    }
  }

  parts = parts.filter((part) => part.length > 0);
  if (parts.length === 0) {
    parts = [pick(AI_WORDS)];
  }

  return joinParts(parts, allowHyphens);
}

export function generateAiDomainNamesRu(
  options: AiDomainNameOptionsRu,
): AiDomainNameGenerationResultRu {
  const validation = validateAiDomainNameOptionsRu(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiDomainKeywordRu(options.keyword);
  const { count, extension } = options;

  const results = new Set<string>();
  const maxAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  let attempts = 0;

  while (results.size < count && attempts < maxAttempts) {
    const label = buildLabel(options, sanitizedKeyword);
    if (label.length > 0) {
      results.add(`${label}${extension}`);
    }
    attempts += 1;
  }

  let fallbackSuffix = 1;
  const maxFallbackAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  while (results.size < count && fallbackSuffix <= maxFallbackAttempts) {
    const label = buildLabel(options, sanitizedKeyword);
    const candidate = `${label}${fallbackSuffix}${extension}`;
    if (!results.has(candidate)) {
      results.add(candidate);
    }
    fallbackSuffix += 1;
  }

  return { domains: Array.from(results) };
}

export function formatAiDomainNameResultsRu(domains: readonly string[]): string {
  return domains.join("\n");
}
