export type GeneratorCategory = "random" | "security" | "names" | "text";

export type GeneratorStatus = "available" | "coming-soon";

export interface Generator {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  href: string;
  category: GeneratorCategory;
  status: GeneratorStatus;
  keywords: readonly string[];
  featured: boolean;
  badge?: string;
}

export const generators: readonly Generator[] = [
  {
    id: "random-number",
    name: "Random Number Generator",
    shortDescription: "Generate random numbers within any range.",
    description:
      "Pick random numbers between a minimum and maximum value. Useful for games, raffles, sampling, or any situation where you need an unbiased number pick.",
    href: "/generators/random-number",
    category: "random",
    status: "available",
    keywords: [
      "random number generator",
      "random number",
      "number picker",
      "random integer",
    ],
    featured: true,
    badge: "Popular",
  },
  {
    id: "password",
    name: "Password Generator",
    shortDescription: "Create strong, random passwords.",
    description:
      "Generate strong, random passwords with customizable length and character sets to help keep your accounts secure.",
    href: "/generators/password",
    category: "security",
    status: "available",
    keywords: [
      "password generator",
      "strong password",
      "random password",
      "secure password generator",
    ],
    featured: true,
    badge: "Popular",
  },
  {
    id: "username",
    name: "Username Generator",
    shortDescription: "Generate unique username ideas.",
    description:
      "Come up with unique, memorable username ideas for social media, gaming, or online accounts.",
    href: "/generators/username",
    category: "names",
    status: "available",
    keywords: [
      "username generator",
      "random username",
      "username ideas",
      "unique username",
    ],
    featured: true,
  },
  {
    id: "dice-roller",
    name: "Dice Roller",
    shortDescription: "Roll virtual dice online.",
    description:
      "Roll one or more virtual dice online. A quick and simple way to make random decisions or play tabletop games without physical dice.",
    href: "/generators/dice-roller",
    category: "random",
    status: "available",
    keywords: ["dice roller", "roll dice", "online dice", "random dice"],
    featured: true,
  },
  {
    id: "coin-flip",
    name: "Coin Flip",
    shortDescription: "Flip a virtual coin instantly.",
    description:
      "Flip a virtual coin to make a quick heads-or-tails decision. Simple, fast, and fair.",
    href: "/generators/coin-flip",
    category: "random",
    status: "available",
    keywords: [
      "coin flip",
      "flip a coin",
      "heads or tails",
      "virtual coin toss",
    ],
    featured: true,
  },
  {
    id: "random-color",
    name: "Random Color Generator",
    shortDescription: "Generate random colors and palettes.",
    description:
      "Generate random colors with HEX, RGB, and HSL values. Handy for design inspiration, palettes, or picking a quick accent color.",
    href: "/generators/random-color",
    category: "random",
    status: "available",
    keywords: [
      "random color generator",
      "random color",
      "hex color generator",
      "color picker",
    ],
    featured: false,
  },
  {
    id: "random-date",
    name: "Random Date Generator",
    shortDescription: "Generate a random date within a range.",
    description:
      "Generate a random date between two chosen dates. Useful for testing, scheduling ideas, or random selection tasks.",
    href: "/generators/random-date",
    category: "random",
    status: "available",
    keywords: [
      "random date generator",
      "random date",
      "date picker",
      "random day generator",
    ],
    featured: false,
  },
  {
    id: "random-emoji",
    name: "Random Emoji Generator",
    shortDescription: "Discover a random emoji.",
    description:
      "Get a random emoji from a wide selection. A fun way to find new emoji for messages, posts, or a bit of daily inspiration.",
    href: "/generators/random-emoji",
    category: "random",
    status: "available",
    keywords: [
      "random emoji generator",
      "random emoji",
      "emoji picker",
      "emoji generator",
    ],
    featured: false,
  },
  {
    id: "company-name",
    name: "Company Name Generator",
    shortDescription: "Generate business name ideas.",
    description:
      "Generate business name ideas to help kickstart your brainstorming for a new company, product, or side project.",
    href: "/generators/company-name",
    category: "names",
    status: "available",
    keywords: [
      "company name generator",
      "business name generator",
      "brand name ideas",
      "startup name generator",
    ],
    featured: false,
  },
  {
    id: "domain-name",
    name: "Domain Name Generator",
    shortDescription: "Find domain name ideas for your project.",
    description:
      "Generate domain name ideas based on your keywords to help you find an available and memorable name for your website.",
    href: "/generators/domain-name",
    category: "names",
    status: "available",
    keywords: [
      "domain name generator",
      "domain name ideas",
      "website name generator",
      "domain generator",
    ],
    featured: false,
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    shortDescription: "Generate version 4 UUIDs instantly in your browser.",
    description:
      "Generate one or multiple UUID v4 values instantly. Uses the browser's built-in crypto.randomUUID() for cryptographically secure results.",
    href: "/generators/uuid-generator",
    category: "security",
    status: "available",
    keywords: ["uuid generator", "uuid v4", "unique identifier", "guid generator"],
    featured: true,
    badge: "New",
  },
  {
    id: "random-name",
    name: "Random Name Generator",
    shortDescription: "Generate random male, female, or mixed full names.",
    description:
      "Generate random full names from a built-in dataset of common first and last names. Choose male, female, or any gender.",
    href: "/generators/random-name",
    category: "names",
    status: "available",
    keywords: ["random name generator", "fake name", "name generator", "random full name"],
    featured: true,
    badge: "New",
  },
  {
    id: "random-teams",
    name: "Random Team Generator",
    shortDescription: "Split a list of participants into random, balanced teams.",
    description:
      "Enter names, choose how to divide (by number of teams or people per team), and get random balanced groups instantly.",
    href: "/generators/random-teams",
    category: "random",
    status: "available",
    keywords: ["team generator", "random teams", "group generator", "split into teams"],
    featured: true,
    badge: "New",
  },
  {
    id: "random-picker",
    name: "Random Picker",
    shortDescription: "Pick a random item from your list.",
    description:
      "Enter a list of options and pick one at random. Optionally exclude already-chosen items for sequential picking.",
    href: "/generators/random-picker",
    category: "random",
    status: "available",
    keywords: ["random picker", "random choice", "random selector", "pick random"],
    featured: false,
    badge: "New",
  },
  {
    id: "wheel-spinner",
    name: "Wheel Spinner",
    shortDescription: "Spin an interactive wheel to pick a random winner.",
    description:
      "Enter options, spin the animated wheel, and get a random winner. Remove winners and spin again for sequential draws.",
    href: "/generators/wheel-spinner",
    category: "random",
    status: "available",
    keywords: ["wheel spinner", "spin the wheel", "decision wheel", "random wheel"],
    featured: false,
    badge: "New",
  },
  {
    id: "yes-or-no",
    name: "Yes or No Generator",
    shortDescription: "Get a random yes or no answer to any question.",
    description:
      "Type your question and get a random yes or no answer. A fun tool for breaking decision paralysis.",
    href: "/generators/yes-or-no",
    category: "random",
    status: "available",
    keywords: ["yes or no generator", "yes no decision", "random answer", "flip a decision"],
    featured: false,
    badge: "New",
  },
  {
    id: "random-letter",
    name: "Random Letter Generator",
    shortDescription: "Generate random letters from A to Z.",
    description:
      "Generate random letters in uppercase, lowercase, or mixed. Allow or block repeated letters.",
    href: "/generators/random-letter",
    category: "random",
    status: "available",
    keywords: ["random letter generator", "random letter", "letter picker", "alphabet generator"],
    featured: false,
    badge: "New",
  },
  {
    id: "random-word",
    name: "Random Word Generator",
    shortDescription: "Generate random English words from a built-in word list.",
    description:
      "Generate random common English words for word games, brainstorming, writing prompts, or testing.",
    href: "/generators/random-word",
    category: "text",
    status: "available",
    keywords: ["random word generator", "random word", "word picker", "english words"],
    featured: false,
    badge: "New",
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    shortDescription: "Generate placeholder Lorem Ipsum text by paragraphs, sentences, or words.",
    description:
      "Generate Lorem Ipsum placeholder text for design mockups, prototypes, and development work. Choose paragraphs, sentences, or words.",
    href: "/generators/lorem-ipsum",
    category: "text",
    status: "available",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text", "filler text"],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-username",
    name: "AI Username Generator",
    shortDescription: "Generate unique, AI-style username ideas.",
    description:
      "Generate unique, AI-style username ideas with optional keywords, multiple vibes, numbers, and underscores.",
    href: "/username-generator",
    category: "names",
    status: "available",
    keywords: [
      "ai username generator",
      "username ideas",
      "unique username generator",
      "ai generated username",
    ],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-business-name",
    name: "AI Business Name Generator",
    shortDescription: "Generate AI-style business and company name ideas.",
    description:
      "Generate AI-style business and company name ideas using optional keywords, industries, and naming styles.",
    href: "/business-name-generator",
    category: "names",
    status: "available",
    keywords: [
      "ai business name generator",
      "company name ideas",
      "brand name generator",
      "startup name generator",
    ],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-domain-name",
    name: "AI Domain Name Generator",
    shortDescription: "Generate AI-style domain name ideas from a keyword.",
    description:
      "Generate AI-style domain name ideas using an optional keyword, naming vibe, and your preferred extension.",
    href: "/ai-domain-name-generator",
    category: "names",
    status: "available",
    keywords: [
      "ai domain name generator",
      "domain name ideas",
      "website name generator",
      "domain generator",
    ],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-fantasy-name",
    name: "AI Fantasy Name Generator",
    shortDescription: "Generate AI-style fantasy character names by race.",
    description:
      "Generate AI-style fantasy names for elves, dwarves, orcs, humans, and dark characters with optional epithets.",
    href: "/ai-fantasy-name-generator",
    category: "names",
    status: "available",
    keywords: [
      "ai fantasy name generator",
      "fantasy name ideas",
      "elf name generator",
      "rpg name generator",
    ],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-character-name",
    name: "AI Character Name Generator",
    shortDescription: "Generate AI-style character names by style.",
    description:
      "Generate AI-style character names in Fantasy, Sci-Fi, Medieval, Modern, or Random styles with optional surnames.",
    href: "/ai-character-name-generator",
    category: "names",
    status: "available",
    keywords: [
      "ai character name generator",
      "character name ideas",
      "fictional name generator",
      "story character names",
    ],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-pet-name",
    name: "AI Pet Name Generator",
    shortDescription: "Generate AI-style pet name ideas.",
    description:
      "Generate AI-style pet name ideas for dogs, cats, birds, rabbits, or any pet with an optional keyword.",
    href: "/ai-pet-name-generator",
    category: "names",
    status: "available",
    keywords: [
      "ai pet name generator",
      "pet name ideas",
      "dog name generator",
      "cat name generator",
    ],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-team-name",
    name: "AI Team Name Generator",
    shortDescription: "Generate AI-style team name ideas.",
    description:
      "Generate AI-style team name ideas for gaming, esports, business, or sports teams with an optional keyword.",
    href: "/ai-team-name-generator",
    category: "names",
    status: "available",
    keywords: [
      "ai team name generator",
      "team name ideas",
      "gaming team name generator",
      "esports name generator",
    ],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-slogan",
    name: "AI Slogan Generator",
    shortDescription: "Generate AI-style slogan and tagline ideas.",
    description:
      "Generate AI-style slogan and tagline ideas for your business, startup, product, or brand with an optional keyword.",
    href: "/ai-slogan-generator",
    category: "text",
    status: "available",
    keywords: [
      "ai slogan generator",
      "tagline generator",
      "business slogan ideas",
      "brand tagline generator",
    ],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-instagram-caption",
    name: "AI Instagram Caption Generator",
    shortDescription: "Generate AI-style Instagram captions for any mood.",
    description:
      "Generate AI-style Instagram captions for selfies, travel, food, fitness, fashion, love, business, motivation, and funny posts, with optional emoji and hashtags.",
    href: "/ai-instagram-caption-generator",
    category: "text",
    status: "available",
    keywords: [
      "ai instagram caption generator",
      "instagram captions",
      "caption ideas",
      "social media captions",
    ],
    featured: false,
    badge: "New",
  },
  {
    id: "ai-random-question",
    name: "AI Random Question Generator",
    shortDescription: "Generate interesting AI-style questions.",
    description:
      "Generate interesting AI-style questions for fun, deep talks, relationships, friends, icebreakers, would-you-rather, and personal reflection.",
    href: "/ai-random-question-generator",
    category: "text",
    status: "available",
    keywords: [
      "ai random question generator",
      "question generator",
      "conversation starter questions",
      "icebreaker questions",
    ],
    featured: false,
    badge: "New",
  },
] as const;

export interface GeneratorCategoryInfo {
  id: GeneratorCategory;
  name: string;
  description: string;
}

export const generatorCategories: readonly GeneratorCategoryInfo[] = [
  {
    id: "random",
    name: "Random Tools",
    description:
      "Tools for random selection, from numbers and colors to dice rolls and coin flips.",
  },
  {
    id: "security",
    name: "Security Tools",
    description:
      "Tools to help you generate strong, secure credentials for your accounts.",
  },
  {
    id: "names",
    name: "Name Generators",
    description:
      "Tools to help you find ideas for usernames, companies, and domain names.",
  },
] as const;

export function getGeneratorById(id: string): Generator | undefined {
  return generators.find((generator) => generator.id === id);
}

export function getGeneratorsByCategory(
  category: GeneratorCategory,
): Generator[] {
  return generators.filter((generator) => generator.category === category);
}

export function getFeaturedGenerators(): Generator[] {
  return generators.filter((generator) => generator.featured);
}

/**
 * Returns a deterministic list of other available generators related
 * to the given generator id. Same-category tools are preferred first
 * (in catalog order), then featured tools are used as a fallback to
 * fill remaining slots. The current generator is never included.
 */
export function getRelatedGenerators(
  currentId: string,
  limit = 4,
): Generator[] {
  const current = getGeneratorById(currentId);

  const available = generators.filter(
    (generator) =>
      generator.status === "available" && generator.id !== currentId,
  );

  const sameCategory = current
    ? available.filter((generator) => generator.category === current.category)
    : [];

  const related: Generator[] = [...sameCategory];

  if (related.length < limit) {
    const featuredFallback = available.filter(
      (generator) =>
        generator.featured &&
        !related.some((item) => item.id === generator.id),
    );

    for (const generator of featuredFallback) {
      if (related.length >= limit) break;
      related.push(generator);
    }
  }

  if (related.length < limit) {
    const remainingFallback = available.filter(
      (generator) => !related.some((item) => item.id === generator.id),
    );

    for (const generator of remainingFallback) {
      if (related.length >= limit) break;
      related.push(generator);
    }
  }

  return related.slice(0, limit);
}

export function searchGenerators(query: string): Generator[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === "") {
    return [...generators];
  }

  return generators.filter((generator) => {
    const haystack = [
      generator.name,
      generator.shortDescription,
      generator.description,
      ...generator.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
