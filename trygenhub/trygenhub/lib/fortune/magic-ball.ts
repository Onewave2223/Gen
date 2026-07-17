import { pickRandomDistinct } from "@/lib/gadaniya/random";

export type MagicBallTone = "positive" | "negative" | "neutral";

export interface MagicBallAnswer {
  text: string;
  tone: MagicBallTone;
}

export const MAGIC_BALL_ANSWERS: readonly MagicBallAnswer[] = [
  { text: "The stars say yes", tone: "positive" },
  { text: "The ball sees a favorable outcome", tone: "positive" },
  { text: "The path is open — move forward", tone: "positive" },
  { text: "The universe is on your side", tone: "positive" },
  { text: "Yes, but be patient", tone: "positive" },
  { text: "Yes, if you change your approach", tone: "positive" },
  { text: "The answer is shrouded in mist — ask differently", tone: "neutral" },
  { text: "The ball is silent — listen to yourself", tone: "neutral" },
  { text: "Now is not the time for an answer", tone: "neutral" },
  { text: "Everything is in your hands", tone: "neutral" },
  { text: "Fate has not yet decided", tone: "neutral" },
  { text: "The answer lies hidden in the fog of the future", tone: "neutral" },
  { text: "Not now", tone: "negative" },
  { text: "The ball advises you to stop", tone: "negative" },
  { text: "Difficulties lie ahead on this path", tone: "negative" },
  { text: "Better to let go of this idea", tone: "negative" },
  { text: "The signs point to no", tone: "negative" },
];

export function getMagicBallAnswer(
  previous: MagicBallAnswer | null,
): MagicBallAnswer {
  return pickRandomDistinct(MAGIC_BALL_ANSWERS, previous);
}
