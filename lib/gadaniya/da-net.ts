import { pickRandomDistinct } from "./random";

export type DaNetTone = "yes" | "no" | "maybe";

export interface DaNetAnswer {
  text: string;
  tone: DaNetTone;
}

/**
 * A deliberately varied set of answers so the tool feels less like a
 * blunt coin flip and more like a real "yes or no" oracle. Tone is
 * used only for lightweight visual styling (color accent).
 */
export const DA_NET_ANSWERS: readonly DaNetAnswer[] = [
  { text: "Да", tone: "yes" },
  { text: "Нет", tone: "no" },
  { text: "Скорее да", tone: "yes" },
  { text: "Скорее нет", tone: "no" },
  { text: "Определённо да", tone: "yes" },
  { text: "Определённо нет", tone: "no" },
  { text: "Пока неясно", tone: "maybe" },
  { text: "Всё зависит от тебя", tone: "maybe" },
  { text: "Время ещё не пришло", tone: "maybe" },
  { text: "Да, но не сразу", tone: "yes" },
  { text: "Нет, ищи другой путь", tone: "no" },
  { text: "Спроси ещё раз позже", tone: "maybe" },
  { text: "Да, доверься этому", tone: "yes" },
  { text: "Нет, это не твой путь", tone: "no" },
  { text: "Шансы на твоей стороне", tone: "yes" },
  { text: "Сейчас не лучший момент", tone: "no" },
];

export function getDaNetAnswer(previous: DaNetAnswer | null): DaNetAnswer {
  return pickRandomDistinct(DA_NET_ANSWERS, previous);
}
