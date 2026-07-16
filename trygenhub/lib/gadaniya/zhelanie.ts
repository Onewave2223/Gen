import { pickRandomDistinct } from "./random";

export type WishTone = "positive" | "negative" | "neutral";

export interface WishAnswer {
  text: string;
  tone: WishTone;
}

export const WISH_ANSWERS: readonly WishAnswer[] = [
  { text: "Да, вероятность высокая", tone: "positive" },
  { text: "Желание сбудется, если не сдашься", tone: "positive" },
  { text: "Всё складывается в твою пользу", tone: "positive" },
  { text: "Да, но сначала нужно сделать первый шаг", tone: "positive" },
  { text: "Возможно, но потребуется время", tone: "neutral" },
  { text: "Всё зависит от твоих действий", tone: "neutral" },
  { text: "Сейчас есть препятствия", tone: "neutral" },
  { text: "Попробуй вернуться к этому позже", tone: "neutral" },
  { text: "Ответ пока скрыт — прислушайся к себе", tone: "neutral" },
  { text: "Не сейчас, но не теряй надежду", tone: "negative" },
  { text: "Стоит пересмотреть само желание", tone: "negative" },
  { text: "Путь к цели будет непростым", tone: "negative" },
  { text: "Лучше направить силы в другую сторону", tone: "negative" },
];

export function getWishAnswer(previous: WishAnswer | null): WishAnswer {
  return pickRandomDistinct(WISH_ANSWERS, previous);
}
