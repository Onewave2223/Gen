export type AiBusinessIndustryRu =
  | "general"
  | "technology"
  | "retail"
  | "food"
  | "health"
  | "creative"
  | "finance"
  | "education";

export type AiBusinessNameStyleRu =
  | "modern"
  | "playful"
  | "elegant"
  | "bold"
  | "minimal";

export type AiBusinessNameOptionsRu = {
  keyword: string;
  industry: AiBusinessIndustryRu;
  style: AiBusinessNameStyleRu;
  count: number;
};

export type AiBusinessNameValidationResultRu =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiBusinessNameGenerationResultRu = {
  names: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 40;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const GENERAL_WORDS: readonly string[] = [
  "Нова",
  "Вершина",
  "Горизонт",
  "Прайм",
  "Север",
  "Ясный",
  "Импульс",
  "Мост",
  "Маяк",
  "Якорь",
  "Атлас",
  "Гавань",
  "Пионер",
  "Вектор",
  "Компас",
  "Каскад",
  "Меридиан",
];

const INDUSTRY_WORDS: Record<Exclude<AiBusinessIndustryRu, "general">, readonly string[]> = {
  technology: [
    "Пиксель",
    "Облако",
    "Логика",
    "Байт",
    "Данные",
    "Квант",
    "Схема",
    "Стек",
    "Сигнал",
    "Орбита",
    "Кремний",
  ],
  retail: [
    "Маркет",
    "Клад",
    "Товары",
    "Лавка",
    "Базар",
    "Уголок",
    "Полка",
    "Депо",
  ],
  food: [
    "Урожай",
    "Кухня",
    "Стол",
    "Вкус",
    "Свежесть",
    "Сад",
    "Пир",
    "Кладовая",
    "Очаг",
  ],
  health: [
    "Вита",
    "Пульс",
    "Расцвет",
    "Обновление",
    "Баланс",
    "Гармония",
    "Покой",
    "Сияние",
  ],
  creative: [
    "Холст",
    "Студия",
    "Искра",
    "Мастерство",
    "Расцвет",
    "История",
    "Муза",
    "Палитра",
    "Галерея",
    "Эскиз",
  ],
  finance: [
    "Капитал",
    "Реестр",
    "Хранилище",
    "Актив",
    "Доверие",
    "Резерв",
    "Доход",
  ],
  education: [
    "Академия",
    "Знание",
    "Идея",
    "Наставник",
    "Кампус",
    "Лицей",
    "Маяк",
  ],
};

const STYLE_SUFFIXES: Record<AiBusinessNameStyleRu, readonly string[]> = {
  modern: ["Лаб", "Ко", "Студия", "Групп"],
  playful: ["Хаб", "Клуб", "Гнездо", "Компания"],
  elegant: ["Дом", "и Ко", "Ателье", "Мезон"],
  bold: ["Групп", "Коллектив", "Индастриз", "Венчурс"],
  minimal: ["", "", "Ко", ""],
};

export function validateAiBusinessNameOptionsRu(
  options: AiBusinessNameOptionsRu,
): AiBusinessNameValidationResultRu {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Количество названий должно быть целым числом от ${MIN_COUNT} до ${MAX_COUNT}.`,
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
 * Normalizes a keyword into a safe fragment for name generation. Keeps
 * Cyrillic/Latin letters, digits, and spaces (title-cased and joined),
 * stripping anything else so the result can never introduce unsafe
 * characters.
 */
export function sanitizeAiBusinessKeywordRu(keyword: string): string {
  const cleaned = keyword
    .trim()
    .replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s]/g, "")
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

function wordPoolFor(industry: AiBusinessIndustryRu): readonly string[] {
  if (industry === "general") return GENERAL_WORDS;
  return [...INDUSTRY_WORDS[industry], ...GENERAL_WORDS];
}

function buildCandidate(
  options: AiBusinessNameOptionsRu,
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

export function generateAiBusinessNamesRu(
  options: AiBusinessNameOptionsRu,
): AiBusinessNameGenerationResultRu {
  const validation = validateAiBusinessNameOptionsRu(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiBusinessKeywordRu(options.keyword);
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

export function formatAiBusinessNameResultsRu(names: readonly string[]): string {
  return names.join("\n");
}
