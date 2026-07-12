export type GeneratorCategory = "random" | "security" | "names";

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
