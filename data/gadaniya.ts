export interface GadaniyaTool {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  href: string;
  emoji: string;
  keywords: readonly string[];
}

/**
 * Catalog for the Russian-language /ru/gadaniya ("fortune telling")
 * section. Kept separate from data/generators.ts since this is a
 * distinct locale/content section with its own hub page, rather than
 * another entry in the English generator catalog.
 */
export const gadaniyaTools: readonly GadaniyaTool[] = [
  {
    id: "da-net",
    name: "Гадание Да или Нет",
    shortDescription: "Задай вопрос и получи короткий ответ — да или нет.",
    description:
      "Простое гадание для быстрого ответа на волнующий вопрос: да, нет или что-то среднее.",
    href: "/ru/gadaniya/da-net",
    emoji: "🔮",
    keywords: ["гадание да нет", "да или нет онлайн", "гадание онлайн"],
  },
  {
    id: "shar-sudby",
    name: "Шар судьбы",
    shortDescription: "Загадай вопрос и загляни в мистический шар судьбы.",
    description:
      "Интерактивный магический шар, который отвечает на твой вопрос коротким предсказанием.",
    href: "/ru/gadaniya/shar-sudby",
    emoji: "🌙",
    keywords: ["шар судьбы", "магический шар онлайн", "шар предсказаний"],
  },
  {
    id: "karta-dnya",
    name: "Карта дня",
    shortDescription: "Вытяни одну карту Таро и узнай послание на сегодня.",
    description:
      "Случайная карта из старших арканов Таро с кратким значением и посланием на день.",
    href: "/ru/gadaniya/karta-dnya",
    emoji: "🃏",
    keywords: ["карта дня таро", "таро онлайн", "карта дня"],
  },
  {
    id: "monetka",
    name: "Орёл или решка",
    shortDescription: "Подбрось монетку судьбы онлайн — орёл или решка.",
    description:
      "Виртуальная монета для быстрого решения: орёл или решка, с красивой анимацией броска.",
    href: "/ru/gadaniya/monetka",
    emoji: "🪙",
    keywords: ["орел или решка", "монетка онлайн", "подбросить монету"],
  },
  {
    id: "chislo-sudby",
    name: "Число судьбы",
    shortDescription: "Узнай своё число судьбы по дате рождения.",
    description:
      "Расчёт числа судьбы по простой нумерологической системе на основе даты рождения.",
    href: "/ru/gadaniya/chislo-sudby",
    emoji: "✨",
    keywords: ["число судьбы", "нумерология по дате рождения", "число судьбы рассчитать"],
  },
  {
    id: "zhelanie",
    name: "Сбудется ли желание?",
    shortDescription: "Загадай желание и узнай, насколько велики шансы.",
    description:
      "Гадание на желание: узнай, какова вероятность того, что оно сбудется.",
    href: "/ru/gadaniya/zhelanie",
    emoji: "⭐",
    keywords: ["сбудется ли желание", "гадание на желание", "исполнится ли желание"],
  },
  {
    id: "chto-zhdet-tebya-segodnya",
    name: "Что ждёт тебя сегодня?",
    shortDescription: "Предсказание дня: энергия, символ, число, цвет, фокус и послание дня.",
    description:
      "Детерминированное предсказание дня — одинаковое для всех сегодня и новое завтра: энергия, символ, число, цвет, фокус и послание дня.",
    href: "/ru/gadaniya/chto-zhdet-tebya-segodnya",
    emoji: "☀️",
    keywords: ["что ждет сегодня", "предсказание на день", "энергия дня"],
  },
  {
    id: "sovmestimost",
    name: "Совместимость двух людей",
    shortDescription: "Введи два имени и тип отношений, чтобы узнать совместимость.",
    description:
      "Детерминированный, не зависящий от порядка имён тест совместимости по шести показателям для Любви, Дружбы или Общего типа отношений.",
    href: "/ru/gadaniya/sovmestimost",
    emoji: "💞",
    keywords: ["совместимость по именам", "тест на совместимость", "совместимость двух людей"],
  },
];

export function getOtherGadaniyaTools(
  currentId: string,
  limit = 5,
): GadaniyaTool[] {
  return gadaniyaTools.filter((tool) => tool.id !== currentId).slice(0, limit);
}
