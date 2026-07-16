export interface DestinyNumberInput {
  day: number;
  month: number;
  year: number;
}

export type DestinyNumberValidationResult =
  | { valid: true }
  | { valid: false; error: string };

export interface DestinyNumberProfile {
  number: number;
  title: string;
  description: string;
  strengths: readonly string[];
  traits: readonly string[];
}

const MIN_YEAR = 1900;

export function validateDestinyNumberInput(
  input: DestinyNumberInput,
): DestinyNumberValidationResult {
  const { day, month, year } = input;

  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) {
    return { valid: false, error: "Введите полную дату рождения." };
  }

  if (month < 1 || month > 12) {
    return { valid: false, error: "Месяц должен быть от 1 до 12." };
  }

  const daysInMonth = new Date(year, month, 0).getDate();

  if (day < 1 || day > daysInMonth) {
    return { valid: false, error: "Проверьте правильность введённого дня." };
  }

  const currentYear = new Date().getFullYear();

  if (year < MIN_YEAR || year > currentYear) {
    return {
      valid: false,
      error: `Год должен быть между ${MIN_YEAR} и ${currentYear}.`,
    };
  }

  return { valid: true };
}

function sumDigits(value: number): number {
  return String(Math.abs(value))
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
}

/**
 * Reduces a number to a single digit, preserving the "master
 * numbers" 11 and 22 along the way — a common convention in simple
 * numerology systems.
 */
function reduceToDestinyNumber(value: number): number {
  let result = value;

  while (result > 9 && result !== 11 && result !== 22) {
    result = sumDigits(result);
  }

  return result;
}

export function calculateDestinyNumber(input: DestinyNumberInput): number {
  const validation = validateDestinyNumberInput(input);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const total = sumDigits(input.day) + sumDigits(input.month) + sumDigits(input.year);

  return reduceToDestinyNumber(total);
}

export const DESTINY_NUMBER_PROFILES: Readonly<
  Record<number, DestinyNumberProfile>
> = {
  1: {
    number: 1,
    title: "Лидер",
    description:
      "Число 1 связано с самостоятельностью и стремлением идти собственным путём. Люди с этим числом судьбы часто становятся инициаторами дел и первопроходцами в своём окружении.",
    strengths: ["Целеустремлённость", "Независимость", "Смелость в начинаниях"],
    traits: ["Иногда торопится с решениями", "Не любит просить о помощи"],
  },
  2: {
    number: 2,
    title: "Дипломат",
    description:
      "Число 2 говорит о чуткости к людям и умении находить баланс. Такие люди хорошо чувствуют настроение окружающих и часто становятся связующим звеном в коллективе или семье.",
    strengths: ["Эмпатия", "Умение слушать", "Дипломатичность"],
    traits: ["Склонность избегать конфликтов", "Зависимость от чужого мнения"],
  },
  3: {
    number: 3,
    title: "Творец",
    description:
      "Число 3 отражает яркое воображение и тягу к самовыражению. Люди с этим числом часто тянутся к творчеству, общению и всему, что позволяет выразить внутренний мир вовне.",
    strengths: ["Творческое мышление", "Обаяние", "Оптимизм"],
    traits: ["Разбросанность внимания", "Чувствительность к критике"],
  },
  4: {
    number: 4,
    title: "Строитель",
    description:
      "Число 4 символизирует надёжность и любовь к порядку. Такие люди умеют доводить дела до конца и создавать прочный фундамент — в работе, отношениях и повседневной жизни.",
    strengths: ["Дисциплина", "Практичность", "Надёжность"],
    traits: ["Сопротивление переменам", "Излишняя строгость к себе"],
  },
  5: {
    number: 5,
    title: "Искатель",
    description:
      "Число 5 связано со свободой и жаждой перемен. Люди с этим числом судьбы любят новый опыт, легко адаптируются и плохо переносят рутину и жёсткие рамки.",
    strengths: ["Гибкость", "Любознательность", "Быстрая адаптация"],
    traits: ["Непостоянство", "Трудности с завершением начатого"],
  },
  6: {
    number: 6,
    title: "Хранитель",
    description:
      "Число 6 говорит о заботе и ответственности за близких. Такие люди часто становятся опорой для семьи и друзей, ценят гармонию в доме и стабильные отношения.",
    strengths: ["Забота о близких", "Чувство ответственности", "Верность"],
    traits: ["Склонность жертвовать своими интересами", "Перфекционизм в быту"],
  },
  7: {
    number: 7,
    title: "Мыслитель",
    description:
      "Число 7 связано с внутренним поиском и тягой к знаниям. Люди с этим числом любят анализировать, размышлять и часто нуждаются в уединении, чтобы разобраться в себе.",
    strengths: ["Аналитический ум", "Интуиция", "Глубина мышления"],
    traits: ["Замкнутость", "Склонность к сомнениям"],
  },
  8: {
    number: 8,
    title: "Управленец",
    description:
      "Число 8 символизирует стремление к результату и материальному благополучию. Такие люди умеют организовывать процессы и добиваться поставленных целей.",
    strengths: ["Целеустремлённость", "Организаторские способности", "Настойчивость"],
    traits: ["Склонность к переработкам", "Трудности с делегированием"],
  },
  9: {
    number: 9,
    title: "Гуманист",
    description:
      "Число 9 отражает широту взглядов и стремление приносить пользу окружающему миру. Люди с этим числом судьбы часто чувствительны к чужой боли и стремятся к чему-то большему, чем личная выгода.",
    strengths: ["Великодушие", "Широкий кругозор", "Способность вдохновлять"],
    traits: ["Идеализм", "Трудности с личными границами"],
  },
  11: {
    number: 11,
    title: "Вдохновитель (мастер-число)",
    description:
      "Число 11 считается одним из мастер-чисел в нумерологии. Оно усиливает интуицию и внутреннюю чувствительность, часто наделяя человека особой способностью вдохновлять других.",
    strengths: ["Обострённая интуиция", "Вдохновляющее влияние на людей", "Внутренняя глубина"],
    traits: ["Повышенная тревожность", "Высокие требования к себе"],
  },
  22: {
    number: 22,
    title: "Мастер-строитель",
    description:
      "Число 22 — второе мастер-число, сочетающее практичность четвёрки с масштабным видением. Такие люди способны воплощать в жизнь крупные и амбициозные идеи.",
    strengths: ["Масштабное мышление", "Практичность в реализации идей", "Упорство"],
    traits: ["Груз собственных ожиданий", "Трудности с делегированием крупных задач"],
  },
};

export function getDestinyNumberProfile(
  number: number,
): DestinyNumberProfile {
  return (
    DESTINY_NUMBER_PROFILES[number] ?? {
      number,
      title: "Число судьбы",
      description: "Не удалось определить профиль для этого числа.",
      strengths: [],
      traits: [],
    }
  );
}
