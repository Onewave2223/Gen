import { pickRandomDistinct } from "@/lib/gadaniya/random";

export interface TarotCardEn {
  id: string;
  name: string;
  meaning: string;
  message: string;
}

/**
 * The 22 cards of the Major Arcana in English. IDs match the Russian
 * /ru/gadaniya/karta-dnya tool so the two versions stay in sync.
 * Names follow public-domain traditional titles; meanings and daily
 * messages are original summaries.
 */
export const TAROT_CARDS_EN: readonly TarotCardEn[] = [
  {
    id: "fool",
    name: "The Fool",
    meaning: "New beginnings, openness, willingness to take a leap.",
    message:
      "Today is a great day to take the first step, even without knowing everything in advance. Trust your curiosity.",
  },
  {
    id: "magician",
    name: "The Magician",
    meaning: "Willpower, action, using what you already have.",
    message:
      "You already have every resource you need for what you have in mind. All that remains is to begin.",
  },
  {
    id: "high-priestess",
    name: "The High Priestess",
    meaning: "Intuition, mystery, inner knowing.",
    message:
      "Today, listen to your inner voice more than outside advice. The answer is already within you.",
  },
  {
    id: "empress",
    name: "The Empress",
    meaning: "Abundance, nurturing, creativity.",
    message:
      "Today is favorable for creative work and caring for yourself and those close to you. Allow yourself a little luxury.",
  },
  {
    id: "emperor",
    name: "The Emperor",
    meaning: "Order, structure, confidence.",
    message:
      "Bring order to your affairs — it will give you confidence. Today is good for building plans and boundaries.",
  },
  {
    id: "hierophant",
    name: "The Hierophant",
    meaning: "Tradition, learning, wise counsel.",
    message:
      "It is worth listening to the experience of someone who has walked a similar path. A mentor's advice will come in handy.",
  },
  {
    id: "lovers",
    name: "The Lovers",
    meaning: "Choice, harmony, an important decision.",
    message:
      "A question of choice may arise today. Listen to both your mind and your heart — they should come to an agreement.",
  },
  {
    id: "chariot",
    name: "The Chariot",
    meaning: "Forward movement, willpower, overcoming obstacles.",
    message:
      "You have enough resolve to get through today's challenges. Don't turn back from your path.",
  },
  {
    id: "strength",
    name: "Strength",
    meaning: "Inner strength, patience, gentle confidence.",
    message:
      "Sometimes strength is calmness, not force. Today you can handle the situation gently yet firmly.",
  },
  {
    id: "hermit",
    name: "The Hermit",
    meaning: "Solitude, reflection, seeking the answer within.",
    message:
      "A good day to spend some time alone and sort through your thoughts without unnecessary noise around you.",
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    meaning: "Change, cycles, a turn of fate.",
    message:
      "Something in your life is ready to shift. Be open to change — it may turn out to be for the better.",
  },
  {
    id: "justice",
    name: "Justice",
    meaning: "Balance, honesty, measured decisions.",
    message:
      "Today it is important to be honest — first of all with yourself. Weigh all the pros and cons before deciding.",
  },
  {
    id: "hanged-man",
    name: "The Hanged Man",
    meaning: "Pause, a new perspective, accepting the situation.",
    message:
      "Sometimes the best move is to pause and look at the situation from a different angle. Don't rush today.",
  },
  {
    id: "death",
    name: "Death",
    meaning: "The end of one phase and the beginning of another.",
    message:
      "Something in your life is coming to a close — and that's perfectly fine. Every ending is followed by a new beginning.",
  },
  {
    id: "temperance",
    name: "Temperance",
    meaning: "Balance, harmony, patiently blending extremes.",
    message:
      "Today it's worth seeking the middle ground in everything — in work, in relationships, in emotions.",
  },
  {
    id: "devil",
    name: "The Devil",
    meaning: "Temptation, attachment, illusory limitations.",
    message:
      "Notice whether something is holding you by habit rather than genuine need. It's worth taking an honest look at that.",
  },
  {
    id: "tower",
    name: "The Tower",
    meaning: "Sudden change, breaking down the old, liberation.",
    message:
      "Sudden changes are scary, but sometimes they clear the way for something more real.",
  },
  {
    id: "star",
    name: "The Star",
    meaning: "Hope, inspiration, faith in better things.",
    message:
      "Today is a great day to believe in your goals again. There is more light ahead than it seems.",
  },
  {
    id: "moon",
    name: "The Moon",
    meaning: "Uncertainty, intuition, hidden feelings.",
    message:
      "Not everything will be immediately obvious today. Trust your intuition more than your first impression.",
  },
  {
    id: "sun",
    name: "The Sun",
    meaning: "Joy, success, clarity.",
    message:
      "The day promises to be bright and fortunate. Allow yourself to enjoy the simple things around you.",
  },
  {
    id: "judgement",
    name: "Judgement",
    meaning: "Rethinking, awakening, an important realization.",
    message:
      "An important insight about what truly matters may come today. Listen to it.",
  },
  {
    id: "world",
    name: "The World",
    meaning: "Completion of a cycle, wholeness, reaching a goal.",
    message:
      "One phase of your journey is nearing its end. Look back — you have gone further than you think.",
  },
];

export function getDailyCardEn(previous: TarotCardEn | null): TarotCardEn {
  return pickRandomDistinct(TAROT_CARDS_EN, previous);
}
