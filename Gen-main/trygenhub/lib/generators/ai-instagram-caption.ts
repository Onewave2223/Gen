export type AiCaptionCategory =
  | "selfie"
  | "travel"
  | "food"
  | "fitness"
  | "fashion"
  | "love"
  | "business"
  | "motivation"
  | "funny"
  | "random";

export type AiCaptionLength = "short" | "medium" | "long";

export type AiCaptionOptions = {
  category: AiCaptionCategory;
  length: AiCaptionLength;
  emojiMode: boolean;
  hashtagMode: boolean;
  count: number;
};

export type AiCaptionValidationResult =
  | { valid: true }
  | { valid: false; error: string };

export type AiCaptionGenerationResult = {
  captions: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const ALL_CATEGORIES: readonly Exclude<AiCaptionCategory, "random">[] = [
  "selfie",
  "travel",
  "food",
  "fitness",
  "fashion",
  "love",
  "business",
  "motivation",
  "funny",
];

type CaptionBank = {
  short: readonly string[];
  medium: readonly string[];
  long: readonly string[];
  emojis: readonly string[];
  hashtags: readonly string[];
};

const CAPTION_BANKS: Record<Exclude<AiCaptionCategory, "random">, CaptionBank> = {
  selfie: {
    short: [
      "Feeling myself today.",
      "New angle, who dis?",
      "Just me being me.",
      "Confidence is the best filter.",
      "Main character energy.",
      "Mirror, mirror.",
      "Golden hour glow.",
      "Selfie mode: activated.",
      "Not a filter, just good lighting.",
      "Say cheese, or don't.",
    ],
    medium: [
      "Some days you just have to take the picture and let the confidence do the talking.",
      "Still figuring life out, but at least this angle is working for me.",
      "A little glow, a little chaos, a whole lot of me.",
      "Not every selfie needs a reason — this one's just for fun.",
      "Caught myself smiling for no reason, so I took a picture.",
      "This is my face when everything is finally going right.",
      "Sometimes the best therapy is a good hair day and a camera.",
      "Proof that I can, in fact, take a decent photo of myself.",
      "Living for the little moments that make you stop and smile.",
      "Just here vibing with myself, one selfie at a time.",
    ],
    long: [
      "It took me a while to feel comfortable in front of the camera, but somewhere between the bad lighting and the awkward angles, I found a version of myself I actually like.",
      "This isn't just a picture — it's a reminder that growth looks different for everyone, and mine happens to look like a slightly better selfie game.",
      "I used to delete photos of myself without even looking twice, but today I looked, and I actually liked what I saw.",
      "Some selfies are about vanity and some are about survival — this one is proof that I made it through another day looking like this.",
      "There's something powerful about learning to like the person staring back at you in the camera, even on the days that felt hard.",
      "This photo took twenty tries and zero regrets, because sometimes chasing the right shot is really just chasing a little bit of confidence.",
    ],
    emojis: ["📸", "✨", "😎", "💫", "🤳", "🔥", "💛", "😌"],
    hashtags: [
      "#selfie", "#selfielove", "#me", "#confidence", "#goodvibes",
      "#instaselfie", "#portrait", "#mood", "#glow", "#selfiegame",
    ],
  },
  travel: {
    short: [
      "Wander often.",
      "New place, new me.",
      "Passport ready.",
      "Somewhere far from home.",
      "Chasing horizons.",
      "Take me back here.",
      "Lost in the best way.",
      "Wish you were here.",
      "Adventure awaits.",
      "Another stamp, another story.",
    ],
    medium: [
      "Somewhere between the flights and the wrong turns, I found the best version of this trip.",
      "Every new city teaches you something the guidebooks never mention.",
      "This is what happens when you say yes to the trip you almost talked yourself out of.",
      "Collecting moments, not things, one destination at a time.",
      "The best souvenirs are the stories you can't quite explain to anyone who wasn't there.",
      "Somewhere far from my usual routine, and exactly where I needed to be.",
      "Getting lost here was easily the best decision of the whole trip.",
      "This view made every delayed flight and long layover completely worth it.",
      "Still not over how good this place felt to wake up in.",
      "Travel light, come back heavy with memories.",
    ],
    long: [
      "There's a version of me that only exists when I'm somewhere unfamiliar, figuring out a new city with a half-charged phone and zero plan, and honestly, I like that version a lot.",
      "I almost didn't book this trip, and standing here now, I can't believe how close I came to missing this entirely.",
      "Traveling alone taught me more about myself in one week than months of staying comfortable at home ever could.",
      "This place looked exactly like the photos online, except somehow it felt like more, like something you can only understand once you're actually standing in it.",
      "I came here chasing a view, but I left with a completely different perspective on what I actually want out of life.",
      "Every trip ends the same way — tired, broke, and already planning the next one, and I wouldn't have it any other way.",
    ],
    emojis: ["✈️", "🌍", "🗺️", "🌅", "🏖️", "🧳", "📍", "🌄"],
    hashtags: [
      "#travel", "#wanderlust", "#explore", "#travelgram", "#adventure",
      "#vacation", "#instatravel", "#traveling", "#travelphotography", "#trip",
    ],
  },
  food: {
    short: [
      "Fork, meet mouth.",
      "Taste the moment.",
      "Foodie forever.",
      "This one's a keeper.",
      "Better than a filter.",
      "Cheat day, no regrets.",
      "Chef's kiss.",
      "Plated perfection.",
      "Hungry now.",
      "Made with love, eaten with joy.",
    ],
    medium: [
      "Some meals just deserve to be documented before the first bite is taken.",
      "This is what happiness looks like on a plate.",
      "Good food, good company, no notes.",
      "Trying new places one plate at a time and loving every bite of it.",
      "The kind of meal that makes you forgive an entire bad day.",
      "Homemade and completely worth the mess in the kitchen.",
      "This dish had absolutely no business tasting that good.",
      "Comfort food hits different when it's this good.",
      "Recipe tested, approved, and already planning the next one.",
      "Food this good deserves its own photo shoot.",
    ],
    long: [
      "There's something about a home-cooked meal that no restaurant can quite replicate, and this one took three tries and a lot of patience, but it was worth every failed attempt.",
      "I've eaten in a lot of places, but this dish stopped the conversation at the table completely, which almost never happens.",
      "Cooking has become one of the few things that actually slows my brain down, and this plate is proof it's paying off.",
      "This meal reminded me why I started caring about food in the first place — it's never really just about eating.",
      "I took way too many photos of this dish before actually eating it, and honestly, no regrets at all.",
      "Some recipes take a few tries to get right, and this one finally, finally came together exactly how I imagined it.",
    ],
    emojis: ["🍽️", "😋", "🔥", "🍴", "🧑‍🍳", "🍕", "🥘", "👌"],
    hashtags: [
      "#foodie", "#foodphotography", "#instafood", "#foodstagram", "#yum",
      "#delicious", "#homemade", "#foodlover", "#tasty", "#eatwell",
    ],
  },
  fitness: {
    short: [
      "Earned, not given.",
      "One more rep.",
      "Sweat now, shine later.",
      "Stronger than yesterday.",
      "No excuses today.",
      "Grind never stops.",
      "Progress over perfection.",
      "Showed up anyway.",
      "Discipline over motivation.",
      "Consistency wins.",
    ],
    medium: [
      "Some days the hardest part is just showing up, and today I showed up anyway.",
      "Progress isn't always visible, but it's always happening.",
      "This workout wasn't about a personal record, it was about proving I could still show up on a hard day.",
      "Small wins add up faster than people think, and today counted.",
      "Every session gets me a little closer to the person I'm trying to become.",
      "Not every day feels good, but every day counts toward something.",
      "Trained hard, ate well, slept better — building this one habit at a time.",
      "The version of me from a year ago wouldn't believe this session was possible.",
      "Discipline is doing it even when motivation completely disappears.",
      "Some workouts are for your body, some are for your mind — today was both.",
    ],
    long: [
      "A year ago I couldn't get through a single session without stopping, and today I finished this one feeling stronger than I've ever felt in my life.",
      "This isn't about chasing a certain look anymore — training has become the one hour of the day where my mind is completely quiet.",
      "I used to think motivation would carry me through this journey, but it's discipline that actually shows up when motivation doesn't.",
      "There were plenty of mornings I almost skipped this, and every single time I didn't, I was glad I pushed through.",
      "Progress isn't linear, and some weeks feel like standing still, but looking back at where I started, none of it was wasted.",
      "This journey taught me that strength isn't just physical — it's showing up on the days you really don't feel like it.",
    ],
    emojis: ["💪", "🔥", "🏋️", "🏃", "🥇", "⚡", "🎯", "🧘"],
    hashtags: [
      "#fitness", "#fitfam", "#workout", "#gymlife", "#training",
      "#strong", "#fitnessmotivation", "#health", "#grind", "#nopainnogain",
    ],
  },
  fashion: {
    short: [
      "Dressed to impress.",
      "Style speaks louder.",
      "Outfit on point.",
      "Confidence is the best accessory.",
      "New fit, who dis?",
      "Details make the difference.",
      "Fashion is a mood.",
      "Wearing my personality today.",
      "Simple, but make it iconic.",
      "Look good, feel good.",
    ],
    medium: [
      "Some outfits just make the whole day feel a little more put together.",
      "Found this look while cleaning out my closet, and it deserved a re-debut.",
      "Style isn't about trends, it's about knowing exactly what feels like you.",
      "This fit took ten minutes to plan and made the whole day feel intentional.",
      "Getting dressed up for absolutely no reason is still one of my favorite things.",
      "A good outfit is basically armor for whatever the day throws at you.",
      "Mixing old pieces with new ones and somehow it just worked today.",
      "Some days call for comfort, today called for a statement.",
      "This color combination shouldn't have worked, but somehow it did.",
      "Dressing for the mood I want, not the mood I'm actually in.",
    ],
    long: [
      "It took me years to stop dressing for other people and start dressing for myself, and this outfit is finally, completely, unapologetically me.",
      "I used to think style was about following every trend, but the pieces that actually make me feel good are the ones that never go out of style.",
      "This look came together from three different eras of my closet, and somehow that's exactly why I love it so much.",
      "Getting dressed used to just be a chore, but somewhere along the way it became one of the small ways I take care of myself.",
      "This isn't just an outfit, it's proof that confidence really is the best thing you can wear, no matter what's actually in the closet.",
      "I almost didn't buy this piece, talked myself out of it twice, and now I can't imagine my wardrobe without it.",
    ],
    emojis: ["👗", "✨", "💅", "🕶️", "👠", "🖤", "💫", "🛍️"],
    hashtags: [
      "#fashion", "#ootd", "#style", "#outfitoftheday", "#fashionista",
      "#lookbook", "#streetstyle", "#instastyle", "#trendy", "#stylish",
    ],
  },
  love: {
    short: [
      "Found my favorite person.",
      "Love looks good on us.",
      "Us, always.",
      "My whole heart.",
      "Home is wherever you are.",
      "Better together.",
      "Still my favorite hello.",
      "Grateful for you.",
      "Falling for you, again.",
      "Every day with you counts.",
    ],
    medium: [
      "Some people just make ordinary days feel like something worth remembering.",
      "Still choosing you, every single day, without a second thought.",
      "This is my favorite kind of chaos — the kind we build together.",
      "Grateful for the little moments that somehow turn into a lifetime.",
      "Every year with you keeps proving I made the right choice.",
      "Not every love story is loud, but ours is exactly the kind I wanted.",
      "You make the hard days easier and the good days even better.",
      "This picture doesn't capture it fully, but it's a start.",
      "Some connections just feel like they were always meant to happen.",
      "Thankful for someone who feels like home, no matter where we are.",
    ],
    long: [
      "I didn't expect to find someone who makes even the boring, ordinary days feel like they're worth holding onto, but somehow that's exactly what happened.",
      "There's a version of love that's quiet and steady, the kind that doesn't need grand gestures to feel real, and that's exactly what we've built together.",
      "I used to think love was supposed to feel complicated, until I met someone who made it feel simple instead.",
      "This relationship has taught me more about patience, growth, and showing up than anything else in my life ever has.",
      "Every year I think I understand what it means to love someone, and every year this person somehow teaches me something new about it.",
      "I'm not always great at putting feelings into words, but this photo, this moment, this person — it's everything I'd choose again.",
    ],
    emojis: ["❤️", "💕", "😍", "💫", "🥰", "💛", "✨", "💍"],
    hashtags: [
      "#love", "#couplegoals", "#together", "#relationshipgoals", "#soulmate",
      "#loveyou", "#happytogether", "#myperson", "#grateful", "#us",
    ],
  },
  business: {
    short: [
      "Built from scratch.",
      "Hustle in progress.",
      "Small steps, big goals.",
      "Working on something big.",
      "Results over excuses.",
      "Vision becoming reality.",
      "Growth mode.",
      "Focused on the mission.",
      "Doing the work.",
      "Building the dream, one day at a time.",
    ],
    medium: [
      "Started with a single idea, and every day we're one step closer to making it real.",
      "This business is proof that consistency beats talent when talent doesn't show up.",
      "Every setback this year taught us something we couldn't have learned any other way.",
      "Grateful for every client, every lesson, and every late night that got us here.",
      "Building something from nothing is hard, but seeing it grow makes it worth it.",
      "Behind every product launch is a hundred quiet decisions nobody ever sees.",
      "This milestone didn't happen overnight, it happened one decision at a time.",
      "Still learning, still building, still showing up every single day.",
      "The best business advice I ever got was to just start before I felt ready.",
      "Proud of how far this idea has come since the very first sketch.",
    ],
    long: [
      "This company started as a spreadsheet and a lot of doubt, and today it's something I genuinely can't believe we built from nothing.",
      "There were more months of uncertainty than anyone on the outside ever saw, and every single one of them taught us something we needed to learn.",
      "I used to think success would feel like relief, but it actually feels more like momentum — proof that the next challenge is worth taking on too.",
      "Building this business taught me more about resilience than any job I've ever had, mostly because there was no one else to hand the hard problems to.",
      "We didn't get here because we had it all figured out, we got here because we kept showing up on the days we didn't.",
      "Every client who trusted us early on is a big part of why this milestone even exists, and we don't take that for granted.",
    ],
    emojis: ["💼", "🚀", "📈", "💡", "🔥", "🎯", "🏆", "⚙️"],
    hashtags: [
      "#business", "#entrepreneur", "#startup", "#hustle", "#smallbusiness",
      "#growth", "#success", "#businessowner", "#motivation", "#goals",
    ],
  },
  motivation: {
    short: [
      "Keep going.",
      "Progress, not perfection.",
      "Do it scared.",
      "Small steps still count.",
      "Bet on yourself.",
      "Discipline over feelings.",
      "Show up anyway.",
      "One day or day one.",
      "Trust the process.",
      "Make today count.",
    ],
    medium: [
      "Some days motivation shows up, and some days you just have to show up without it.",
      "Every small step forward is still a step forward, even on the slow days.",
      "You don't need to see the whole staircase, just take the next step.",
      "Growth is quiet most of the time, but it's still happening.",
      "The version of you that you're becoming is worth every hard day.",
      "Nobody sees the effort behind the result, but it's always there.",
      "You're allowed to go slow, just don't stop completely.",
      "This is your reminder that starting again still counts as progress.",
      "Consistency beats motivation every single time.",
      "Trust the timeline you're on, even when it feels behind.",
    ],
    long: [
      "There are days when nothing feels like it's working, and this is your reminder that those days are part of the process too, not a sign that you should stop.",
      "I used to wait for motivation before starting anything, and the truth is, motivation almost never shows up first — it shows up after you've already started.",
      "Growth doesn't always look dramatic, most of the time it looks like showing up on an average Tuesday when nobody's watching and nothing feels special.",
      "You are allowed to be proud of how far you've come while still working toward how far you want to go — both things are true at once.",
      "Every person you admire had a version of themselves that almost gave up, and the only difference is they kept going one more day.",
      "This is your sign to stop waiting for the perfect moment, because the perfect moment usually only shows up after you've already started moving.",
    ],
    emojis: ["🔥", "💪", "✨", "🌟", "🚀", "🎯", "💛", "🧠"],
    hashtags: [
      "#motivation", "#mindset", "#growth", "#inspiration", "#selfimprovement",
      "#discipline", "#nevergiveup", "#positivity", "#hustle", "#dedication",
    ],
  },
  funny: {
    short: [
      "Send help, or snacks.",
      "10/10, would nap again.",
      "Professional overthinker.",
      "Running on coffee and vibes.",
      "This is fine.",
      "Adulting is hard, send tacos.",
      "My bed and I are in a committed relationship.",
      "Chaotic but make it cute.",
      "Currently avoiding my responsibilities.",
      "I put the 'pro' in procrastination.",
    ],
    medium: [
      "I looked in the mirror and decided today was going to be chaotic, and it was, and I'd do it again.",
      "This photo was taken right before I made a series of questionable decisions.",
      "My life is basically a sitcom without the laugh track, but I'm still the main character.",
      "Someone said 'smile for the camera' and this is the best I could do under pressure.",
      "This is what happens when you say 'just one more episode' at 2 AM.",
      "Not a morning person, not an afternoon person, honestly just tired all the time.",
      "Tried to be productive today, ended up here instead, no regrets.",
      "This caption is doing a lot more work than my actual plans for the day.",
      "My personality is 90% snacks and 10% questionable life choices.",
      "Filed this photo under 'things I'll definitely regret explaining later.'",
    ],
    long: [
      "I want to say this photo represents growth and self-improvement, but honestly it just represents me trying five different angles until one of them didn't look terrible.",
      "There's a whole backstory to this photo involving a dropped phone, a stranger's dog, and a very confused barista, and honestly it's a better story than the picture itself.",
      "I told myself I'd post something inspirational today, and instead you get this, which is probably a more accurate representation of my actual personality anyway.",
      "This is what happens when you tell your friends you'll 'just take one quick photo' and forty-five minutes later everyone's still arguing about angles.",
      "In my head I look effortlessly cool in this photo, in reality I definitely tripped on the way to this exact spot two minutes earlier.",
      "This caption was supposed to be deep and meaningful, but then I remembered I'm the person who tripped over nothing yesterday, so here we are instead.",
    ],
    emojis: ["😂", "🤣", "😅", "🙃", "😆", "🫠", "💀", "😜"],
    hashtags: [
      "#funny", "#comedy", "#lol", "#humor", "#relatable",
      "#memes", "#instafunny", "#funnypost", "#chaosgremlin", "#nofilterneeded",
    ],
  },
};

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[randomIndex(pool.length)];
}

function pickMultiple<T>(pool: readonly T[], countToPick: number): T[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(countToPick, pool.length));
}

function resolveCategory(
  category: AiCaptionCategory,
): Exclude<AiCaptionCategory, "random"> {
  if (category === "random") {
    return pick(ALL_CATEGORIES);
  }
  return category;
}

function decorateCaption(
  base: string,
  bank: CaptionBank,
  emojiMode: boolean,
  hashtagMode: boolean,
): string {
  let result = base;

  if (emojiMode) {
    const emojiCount = 1 + randomIndex(2);
    const emojis = pickMultiple(bank.emojis, emojiCount).join(" ");
    result = `${result} ${emojis}`;
  }

  if (hashtagMode) {
    const hashtagCount = 3 + randomIndex(4);
    const hashtags = pickMultiple(bank.hashtags, hashtagCount).join(" ");
    result = `${result}\n${hashtags}`;
  }

  return result;
}

function buildCandidate(options: AiCaptionOptions): string {
  const resolvedCategory = resolveCategory(options.category);
  const bank = CAPTION_BANKS[resolvedCategory];
  const base = pick(bank[options.length]);
  return decorateCaption(base, bank, options.emojiMode, options.hashtagMode);
}

export function validateAiCaptionOptions(
  options: AiCaptionOptions,
): AiCaptionValidationResult {
  const { count } = options;

  if (!Number.isSafeInteger(count) || count < MIN_COUNT || count > MAX_COUNT) {
    return {
      valid: false,
      error: `Number of captions must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
    };
  }

  return { valid: true };
}

export function generateAiCaptions(
  options: AiCaptionOptions,
): AiCaptionGenerationResult {
  const validation = validateAiCaptionOptions(options);

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

  return { captions: Array.from(results) };
}

export function formatAiCaptionResults(captions: readonly string[]): string {
  return captions.join("\n\n");
}
