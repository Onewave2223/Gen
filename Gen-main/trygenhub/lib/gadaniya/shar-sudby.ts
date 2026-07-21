import { pickRandomDistinct } from "./random";

export type ShaSudbyTone = "positive" | "negative" | "neutral";

export interface ShaSudbyAnswer {
  text: string;
  tone: ShaSudbyTone;
}

/**
 * Answers for the "Шар судьбы" (magic ball) tool. Phrased with a more
 * mystical, oracle-like voice than the plainer Да/Нет tool so the two
 * tools don't feel like duplicates of each other.
 */
export const SHAR_SUDBY_ANSWERS: readonly ShaSudbyAnswer[] = [
  { text: "Звёзды говорят — да", tone: "positive" },
  { text: "Шар видит благоприятный исход", tone: "positive" },
  { text: "Путь открыт, иди вперёд", tone: "positive" },
  { text: "Вселенная на твоей стороне", tone: "positive" },
  { text: "Да, но будь терпелив", tone: "positive" },
  { text: "Ответ туманен, спроси иначе", tone: "neutral" },
  { text: "Шар молчит — прислушайся к себе", tone: "neutral" },
  { text: "Сейчас не время для ответа", tone: "neutral" },
  { text: "Всё в твоих руках", tone: "neutral" },
  { text: "Судьба ещё не решила", tone: "neutral" },
  { text: "Нет, не сейчас", tone: "negative" },
  { text: "Шар советует остановиться", tone: "negative" },
  { text: "На этом пути тебя ждут трудности", tone: "negative" },
  { text: "Лучше отпустить эту идею", tone: "negative" },
  { text: "Знаки указывают на отказ", tone: "negative" },
  { text: "Да, если изменишь подход", tone: "positive" },
  { text: "Ответ скрыт в тумане будущего", tone: "neutral" },
];

export function getShaSudbyAnswer(
  previous: ShaSudbyAnswer | null,
): ShaSudbyAnswer {
  return pickRandomDistinct(SHAR_SUDBY_ANSWERS, previous);
}
