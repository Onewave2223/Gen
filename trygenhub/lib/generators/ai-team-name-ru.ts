export type AiTeamCategoryRu =
  | "gaming"
  | "esports"
  | "business"
  | "sports"
  | "random";

export type AiTeamNameOptionsRu = {
  keyword: string;
  category: AiTeamCategoryRu;
  count: number;
};

export type AiTeamNameValidationResultRu =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiTeamNameGenerationResultRu = {
  names: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

// All adjectives are in plural nominative form so they agree with the
// plural nominative nouns below regardless of the noun's own gender.
const GAMING_ADJECTIVES: readonly string[] = [
  "Теневые", "Призрачные", "Дикие", "Токсичные", "Тихие", "Багровые",
  "Стальные", "Ядовитые", "Свирепые", "Мрачные", "Безжалостные", "Кибер",
];

const GAMING_NOUNS: readonly string[] = [
  "Волки", "Жнецы", "Гадюки", "Призраки", "Вороны", "Фениксы", "Демоны",
  "Изгои", "Ниндзя", "Мародёры", "Мстители", "Охотники",
];

const ESPORTS_ADJECTIVES: readonly string[] = [
  "Элитные", "Топовые", "Быстрые", "Непобедимые", "Легендарные",
  "Молниеносные", "Профессиональные", "Стремительные", "Доминирующие",
  "Первые", "Ударные", "Альфа",
];

const ESPORTS_NOUNS: readonly string[] = [
  "Геймеры", "Соперники", "Профессионалы", "Чемпионы", "Легенды",
  "Стратеги", "Виртуозы", "Новаторы", "Претенденты", "Финалисты",
  "Игроки", "Мастера",
];

const BUSINESS_ADJECTIVES: readonly string[] = [
  "Надёжные", "Стратегические", "Успешные", "Проверенные", "Смелые",
  "Эффективные", "Устойчивые", "Ведущие", "Прогрессивные",
  "Профессиональные", "Инновационные", "Целеустремлённые",
];

const BUSINESS_NOUNS: readonly string[] = [
  "Партнёры", "Консультанты", "Решения", "Предприятия", "Компаньоны",
  "Инвесторы", "Эксперты", "Лидеры", "Специалисты", "Визионеры",
  "Профессионалы", "Стратеги",
];

const SPORTS_ADJECTIVES: readonly string[] = [
  "Громовые", "Стальные", "Быстрые", "Огненные", "Штормовые", "Золотые",
  "Дикие", "Непокорные", "Восходящие", "Могучие", "Стремительные",
  "Победные",
];

const SPORTS_NOUNS: readonly string[] = [
  "Орлы", "Львы", "Ястребы", "Быки", "Рейнджеры", "Воины", "Нападающие",
  "Титаны", "Соколы", "Медведи", "Волки", "Атлеты",
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

function adjectivesFor(category: AiTeamCategoryRu): readonly string[] {
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

function nounsFor(category: AiTeamCategoryRu): readonly string[] {
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

export function validateAiTeamNameOptionsRu(
  options: AiTeamNameOptionsRu,
): AiTeamNameValidationResultRu {
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
export function sanitizeAiTeamKeywordRu(keyword: string): string {
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

function buildCandidate(
  options: AiTeamNameOptionsRu,
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

export function generateAiTeamNamesRu(
  options: AiTeamNameOptionsRu,
): AiTeamNameGenerationResultRu {
  const validation = validateAiTeamNameOptionsRu(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiTeamKeywordRu(options.keyword);
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

export function formatAiTeamNameResultsRu(names: readonly string[]): string {
  return names.join("\n");
}
