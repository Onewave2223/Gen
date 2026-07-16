import { pickRandomDistinct } from "@/lib/gadaniya/random";

export type YesOrNoTone = "yes" | "no" | "maybe";

export interface YesOrNoAnswer {
  text: string;
  tone: YesOrNoTone;
}

export const YES_OR_NO_ANSWERS: readonly YesOrNoAnswer[] = [
  { text: "Yes", tone: "yes" },
  { text: "No", tone: "no" },
  { text: "Most likely yes", tone: "yes" },
  { text: "Most likely no", tone: "no" },
  { text: "Definitely yes", tone: "yes" },
  { text: "Definitely not", tone: "no" },
  { text: "Not clear yet", tone: "maybe" },
  { text: "It's up to you", tone: "maybe" },
  { text: "The time hasn't come yet", tone: "maybe" },
  { text: "Yes, but not right away", tone: "yes" },
  { text: "No — try a different path", tone: "no" },
  { text: "Ask again later", tone: "maybe" },
  { text: "Yes, trust this", tone: "yes" },
  { text: "No, this isn't your path", tone: "no" },
  { text: "The odds are in your favor", tone: "yes" },
  { text: "Now isn't the right moment", tone: "no" },
];

export function getYesOrNoAnswer(
  previous: YesOrNoAnswer | null,
): YesOrNoAnswer {
  return pickRandomDistinct(YES_OR_NO_ANSWERS, previous);
}
