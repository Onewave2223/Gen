export type AiSloganCategoryRu =
  | "business"
  | "startup"
  | "product"
  | "brand"
  | "marketing";

export type AiSloganOptionsRu = {
  keyword: string;
  category: AiSloganCategoryRu;
  count: number;
};

export type AiSloganValidationResultRu =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiSloganGenerationResultRu = {
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

// Adjectives are plural nominative so they agree with the plural nouns
// below. Nouns are abstract/inanimate plurals, so their accusative form
// matches the nominative — safe to drop into either grammatical slot used
// by the templates.
const WORD_BANKS: Record<AiSloganCategoryRu, WordBank> = {
  business: {
    adjectives: [
      "Смелые", "Надёжные", "Стратегические", "Проверенные", "Эффективные",
      "Устойчивые", "Профессиональные", "Целеустремлённые", "Прогрессивные",
      "Уверенные",
    ],
    nouns: [
      "Результаты", "Решения", "Возможности", "Партнёрства", "Достижения",
      "Перспективы", "Стратегии", "Показатели",
    ],
  },
  startup: {
    adjectives: [
      "Дерзкие", "Быстрые", "Амбициозные", "Смелые", "Неудержимые",
      "Прорывные", "Гибкие", "Дальновидные", "Решительные", "Свежие",
    ],
    nouns: [
      "Идеи", "Возможности", "Прорывы", "Перемены", "Амбиции", "Решения",
      "Горизонты", "Начинания",
    ],
  },
  product: {
    adjectives: [
      "Простые", "Мощные", "Продуманные", "Надёжные", "Изящные", "Точные",
      "Умные", "Совершенные", "Удобные", "Безупречные",
    ],
    nouns: [
      "Решения", "Детали", "Возможности", "Технологии", "Инструменты",
      "Функции", "Впечатления",
    ],
  },
  brand: {
    adjectives: [
      "Настоящие", "Яркие", "Запоминающиеся", "Смелые", "Искренние",
      "Уникальные", "Вдохновляющие", "Живые", "Оригинальные",
      "Незабываемые",
    ],
    nouns: [
      "Истории", "Эмоции", "Ценности", "Впечатления", "Традиции", "Смыслы",
      "Образы",
    ],
  },
  marketing: {
    adjectives: [
      "Точные", "Яркие", "Измеримые", "Целевые", "Творческие",
      "Эффективные", "Смелые", "Продуманные", "Убедительные",
      "Запоминающиеся",
    ],
    nouns: [
      "Результаты", "Охваты", "Кампании", "Идеи", "Показатели",
      "Впечатления", "Аудитории",
    ],
  },
};

const GENERIC_TEMPLATES: readonly string[] = [
  "{Adj} {noun}.",
  "{Noun}, которые говорят сами за себя.",
  "{Noun}, которые меняют правила игры.",
  "{Adj} и {adj2} — каждый день.",
  "Здесь {noun} становятся реальностью.",
  "{Noun}. {Adj}. Без компромиссов.",
  "Твои {noun} — наш приоритет.",
  "{Adj} {noun}, которые остаются с тобой.",
  "Создаём {noun}, которые работают на результат.",
  "{Adj} {noun} каждый день.",
];

const KEYWORD_TEMPLATES: readonly string[] = [
  "{Keyword}: {adj} {noun}.",
  "{Keyword} — там, где {noun} становятся реальностью.",
  "Выбирай {keyword}. Выбирай {noun}.",
  "{Keyword}: {noun}, которые говорят сами за себя.",
  "{Keyword}. {Noun} становятся реальностью.",
  "{Keyword} — {adj}, {adj2}, без границ.",
  "Только {keyword}. Только {noun}.",
  "{Keyword}: {adj} {noun} каждый день.",
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

function lowerFirst(value: string): string {
  if (value.length === 0) {
    return value;
  }
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function wordBankFor(category: AiSloganCategoryRu): WordBank {
  return WORD_BANKS[category];
}

export function validateAiSloganOptionsRu(
  options: AiSloganOptionsRu,
): AiSloganValidationResultRu {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Количество слоганов должно быть целым числом от ${MIN_COUNT} до ${MAX_COUNT}.`,
    };
  }

  if (keyword.trim().length > MAX_KEYWORD_LENGTH) {
    return {
      valid: false,
      error: `Название бренда или продукта должно быть не длиннее ${MAX_KEYWORD_LENGTH} символов.`,
    };
  }

  return { valid: true };
}

/**
 * Normalizes a keyword into a safe fragment for slogan generation. Keeps
 * Cyrillic/Latin letters, digits, spaces, apostrophes, and hyphens
 * (title-cased per word, spaces preserved) so a multi-word brand name
 * reads naturally inside a generated sentence.
 */
export function sanitizeAiSloganKeywordRu(keyword: string): string {
  const cleaned = keyword
    .trim()
    .replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s'-]/g, "")
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
  // Word banks store adjectives/nouns capitalized (they can start a
  // sentence on their own), so the lowercase tokens lowercase the first
  // letter for mid-sentence use instead of capitalizing an already-lower
  // value.
  return template
    .replace(/\{Adj2\}/g, capitalize(values.adj2))
    .replace(/\{adj2\}/g, lowerFirst(values.adj2))
    .replace(/\{Adj\}/g, capitalize(values.adj))
    .replace(/\{adj\}/g, lowerFirst(values.adj))
    .replace(/\{Noun\}/g, capitalize(values.noun))
    .replace(/\{noun\}/g, lowerFirst(values.noun))
    .replace(/\{Keyword\}/g, values.keyword)
    .replace(/\{keyword\}/g, values.keyword);
}

function buildCandidate(
  options: AiSloganOptionsRu,
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

export function generateAiSlogansRu(
  options: AiSloganOptionsRu,
): AiSloganGenerationResultRu {
  const validation = validateAiSloganOptionsRu(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiSloganKeywordRu(options.keyword);
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
    const candidate = `${base} (${fallbackSuffix})`;
    if (!results.has(candidate)) {
      results.add(candidate);
    }
    fallbackSuffix += 1;
  }

  return { slogans: Array.from(results) };
}

export function formatAiSloganResultsRu(slogans: readonly string[]): string {
  return slogans.join("\n");
}
