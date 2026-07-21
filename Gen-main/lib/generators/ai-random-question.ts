export type AiQuestionCategory =
  | "fun"
  | "deep"
  | "relationship"
  | "friends"
  | "icebreaker"
  | "would-you-rather"
  | "personal"
  | "random";

export type AiQuestionOptions = {
  category: AiQuestionCategory;
  count: number;
};

export type AiQuestionValidationResult =
  | { valid: true }
  | { valid: false; error: string };

export type AiQuestionGenerationResult = {
  questions: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const ALL_CATEGORIES: readonly Exclude<AiQuestionCategory, "random">[] = [
  "fun",
  "deep",
  "relationship",
  "friends",
  "icebreaker",
  "would-you-rather",
  "personal",
];

const QUESTION_BANKS: Record<Exclude<AiQuestionCategory, "random">, readonly string[]> = {
  fun: [
    "If you could instantly master any skill, what would you pick?",
    "What's the weirdest food combination you actually enjoy?",
    "If your life had a theme song, what would it be?",
    "What's the most useless talent you have?",
    "If you could swap lives with any fictional character for a day, who would it be?",
    "What's a trend you never understood?",
    "If animals could talk, which one would be the rudest?",
    "What's your go-to karaoke song?",
    "If you had a warning label, what would it say?",
    "What's the most ridiculous thing you've Googled?",
    "If you could only eat one meal for the rest of your life, what would it be?",
    "What's a movie you can quote from start to finish?",
    "If you were a kitchen appliance, which one would you be?",
    "What's the best costume you've ever worn?",
    "If you could add one holiday to the calendar, what would it celebrate?",
    "What's a smell that instantly takes you back to childhood?",
    "If you had to give up either coffee or your phone for a month, which would you choose?",
    "What's the funniest nickname you've ever had?",
    "If you could time travel but only to embarrassing moments, would you go?",
    "What's your most irrational fear?",
  ],
  deep: [
    "What does happiness actually mean to you right now?",
    "What's a belief you held strongly that you no longer agree with?",
    "What does it mean to truly forgive someone?",
    "What's something you're still learning about yourself?",
    "If you knew you couldn't fail, what would you attempt?",
    "What's a moment that quietly changed who you are?",
    "What does success look like to you at the end of your life?",
    "What's something you fear people will discover about you?",
    "What's a lesson you had to learn the hard way?",
    "How do you want to be remembered by the people closest to you?",
    "What's something you've never told anyone but wish you had?",
    "What does it mean to live authentically?",
    "What's a question you're afraid to ask yourself?",
    "What part of your personality took the longest to accept?",
    "What does 'home' really mean to you?",
    "What's something you had to unlearn?",
    "What would you do differently if no one was watching or judging?",
    "What's a fear that used to control you but doesn't anymore?",
    "What do you think happens after we stop being afraid of failing?",
    "What's the difference between being alone and being lonely, for you?",
  ],
  relationship: [
    "What's something small your partner does that means a lot to you?",
    "What does trust look like in a relationship, to you?",
    "What's a compromise you're glad you made?",
    "What's the most important thing you've learned from a past relationship?",
    "How do you and your partner handle disagreements?",
    "What's something you appreciate about your partner that you don't say enough?",
    "What does emotional support look like for you?",
    "What's a habit that makes a relationship stronger?",
    "What's something you've had to communicate more clearly over time?",
    "What does 'quality time' actually look like for you two?",
    "What's a memory with your partner you'd relive if you could?",
    "How do you show love in ways that aren't obvious?",
    "What's something you admire about how your partner handles hard days?",
    "What does feeling truly understood by someone feel like?",
    "What's a small tradition that means a lot in your relationship?",
    "What's something you've learned about compromise that surprised you?",
    "How has your idea of love changed as you've gotten older?",
    "What's the kindest thing a partner has ever done for you?",
    "What does it take to feel safe being vulnerable with someone?",
    "What's one thing you wish more people understood about relationships?",
  ],
  friends: [
    "What's a memory with your friends that still makes you laugh?",
    "What quality do you value most in a friendship?",
    "Who's the friend you'd call at 3 AM without hesitation?",
    "What's the best trip you've ever taken with friends?",
    "What's an inside joke that still makes no sense to anyone else?",
    "What's something a friend taught you that changed how you think?",
    "What's the most spontaneous thing you've done with friends?",
    "How did you meet your closest friend?",
    "What's a tradition you have with your friend group?",
    "What's the best advice a friend has ever given you?",
    "What's something your friends know about you that most people don't?",
    "Who's the friend that always makes you laugh no matter what?",
    "What's a friendship that surprised you by how long it's lasted?",
    "What's the funniest thing that's ever happened on a friend hangout?",
    "What's something you appreciate about your friend group that you don't say enough?",
    "What's a moment a friend really showed up for you?",
    "What's a friendship lesson you learned the hard way?",
    "What's a small gesture from a friend that meant more than they realized?",
    "What's something you and your friends always argue about, playfully?",
    "What's the best group costume or theme you've ever done?",
  ],
  icebreaker: [
    "What's your go-to order at a coffee shop?",
    "If you could live anywhere in the world, where would you choose?",
    "What's a hobby you picked up recently?",
    "What's your favorite way to spend a weekend?",
    "What's a book or show you'd recommend to anyone?",
    "What's your comfort food?",
    "If you had an extra hour every day, what would you do with it?",
    "What's a place you've always wanted to visit?",
    "What's the last thing that made you laugh out loud?",
    "What's your favorite season and why?",
    "What's a small thing that instantly improves your mood?",
    "What's your dream job, realistically or not?",
    "What's a skill you'd love to learn someday?",
    "What's your favorite way to unwind after a long day?",
    "What's a food you refuse to eat?",
    "What's the best concert or event you've been to?",
    "What's your go-to weekend breakfast?",
    "What's something you're really good at that not many people know?",
    "What's a childhood show or movie you still love?",
    "What's your ideal way to spend a rainy day?",
  ],
  "would-you-rather": [
    "Would you rather have the ability to fly or be invisible?",
    "Would you rather always be 10 minutes late or 20 minutes early?",
    "Would you rather give up social media or give up coffee?",
    "Would you rather live without music or live without movies?",
    "Would you rather always know when someone is lying or always get away with lying?",
    "Would you rather have unlimited money or unlimited time?",
    "Would you rather live in the mountains or by the ocean?",
    "Would you rather be famous but always criticized, or unknown but respected?",
    "Would you rather never use your phone again or never drive again?",
    "Would you rather relive one year of your life or skip five years ahead?",
    "Would you rather be able to read minds or predict the future?",
    "Would you rather have a rewind button or a pause button on life?",
    "Would you rather lose your sense of taste or your sense of smell?",
    "Would you rather travel to the past or the future?",
    "Would you rather always have to say what you think or never speak again?",
    "Would you rather work your dream job with no vacation or a boring job with unlimited vacation?",
    "Would you rather have no internet for a year or no air conditioning/heat for a year?",
    "Would you rather be able to teleport or have super strength?",
    "Would you rather have all your search history exposed or all your text messages?",
    "Would you rather live one long life or ten short ones?",
  ],
  personal: [
    "What's a habit you're proud of building?",
    "What's something you'd tell your younger self?",
    "What's a goal you're currently working toward?",
    "What's something that recently made you feel proud of yourself?",
    "What's a fear you're actively trying to overcome?",
    "What's a decision you made that changed your path?",
    "What's something you do that makes you feel most like yourself?",
    "What's a value you refuse to compromise on?",
    "What's something about yourself you've learned to accept?",
    "What's a risk you took that paid off?",
    "What's something you're actively unlearning?",
    "What's a comfort zone you're trying to leave?",
    "What's a personal rule you live by?",
    "What's something you used to care about that you don't anymore?",
    "What's a version of yourself from the past you're proud of?",
    "What's something that always brings you back to yourself when you feel lost?",
    "What's a skill you've built that took real patience?",
    "What's something you want to be better at a year from now?",
    "What's a boundary you're glad you set?",
    "What's something you're currently curious about?",
  ],
};

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[randomIndex(pool.length)];
}

function resolveCategory(
  category: AiQuestionCategory,
): Exclude<AiQuestionCategory, "random"> {
  if (category === "random") {
    return pick(ALL_CATEGORIES);
  }
  return category;
}

function buildCandidate(options: AiQuestionOptions): string {
  const resolvedCategory = resolveCategory(options.category);
  const bank = QUESTION_BANKS[resolvedCategory];
  return pick(bank);
}

export function validateAiQuestionOptions(
  options: AiQuestionOptions,
): AiQuestionValidationResult {
  const { count } = options;

  if (!Number.isSafeInteger(count) || count < MIN_COUNT || count > MAX_COUNT) {
    return {
      valid: false,
      error: `Number of questions must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
    };
  }

  return { valid: true };
}

export function generateAiQuestions(
  options: AiQuestionOptions,
): AiQuestionGenerationResult {
  const validation = validateAiQuestionOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const { count } = options;
  const results = new Set<string>();
  const maxAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  let attempts = 0;

  while (results.size < count && attempts < maxAttempts) {
    const candidate = buildCandidate(options);
    if (candidate.length > 0) {
      results.add(candidate);
    }
    attempts += 1;
  }

  let fallbackSuffix = 1;
  const maxFallbackAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  while (results.size < count && fallbackSuffix <= maxFallbackAttempts) {
    const base = buildCandidate(options);
    const candidate = `${base} (${fallbackSuffix})`;
    if (!results.has(candidate)) {
      results.add(candidate);
    }
    fallbackSuffix += 1;
  }

  return { questions: Array.from(results) };
}

export function formatAiQuestionResults(questions: readonly string[]): string {
  return questions.join("\n");
}
