export interface LifePathProfile {
  number: number;
  title: string;
  description: string;
  strengths: readonly string[];
  traits: readonly string[];
}

export interface LifePathInput {
  day: number;
  month: number;
  year: number;
}

export type LifePathValidationResult =
  | { valid: true }
  | { valid: false; error: string };

const MIN_YEAR = 1900;

export function validateLifePathInput(
  input: LifePathInput,
): LifePathValidationResult {
  const { day, month, year } = input;

  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) {
    return { valid: false, error: "Please enter a complete date of birth." };
  }

  if (month < 1 || month > 12) {
    return { valid: false, error: "Month must be between 1 and 12." };
  }

  const daysInMonth = new Date(year, month, 0).getDate();

  if (day < 1 || day > daysInMonth) {
    return { valid: false, error: "Please check the day you entered." };
  }

  const currentYear = new Date().getFullYear();

  if (year < MIN_YEAR || year > currentYear) {
    return {
      valid: false,
      error: `Year must be between ${MIN_YEAR} and ${currentYear}.`,
    };
  }

  return { valid: true };
}

function sumDigits(value: number): number {
  return String(Math.abs(value))
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
}

function reduceToLifePathNumber(value: number): number {
  let result = value;
  while (result > 9 && result !== 11 && result !== 22) {
    result = sumDigits(result);
  }
  return result;
}

export function calculateLifePathNumber(input: LifePathInput): number {
  const validation = validateLifePathInput(input);
  if (!validation.valid) {
    throw new Error(validation.error);
  }
  const total =
    sumDigits(input.day) + sumDigits(input.month) + sumDigits(input.year);
  return reduceToLifePathNumber(total);
}

export const LIFE_PATH_PROFILES: Readonly<Record<number, LifePathProfile>> = {
  1: {
    number: 1,
    title: "The Leader",
    description:
      "Number 1 is associated with independence and the drive to forge your own path. People with this life path number often become initiators and pioneers in their circles.",
    strengths: ["Determination", "Independence", "Boldness in new endeavors"],
    traits: ["Can rush into decisions", "Reluctant to ask for help"],
  },
  2: {
    number: 2,
    title: "The Diplomat",
    description:
      "Number 2 speaks to sensitivity toward others and an ability to find balance. These people read the mood of those around them well and often become the connecting link in a team or family.",
    strengths: ["Empathy", "Active listening", "Diplomacy"],
    traits: ["Tendency to avoid conflict", "Reliance on others' opinions"],
  },
  3: {
    number: 3,
    title: "The Creator",
    description:
      "Number 3 reflects a vivid imagination and a drive for self-expression. People with this number are often drawn to creativity, communication, and anything that lets their inner world shine outward.",
    strengths: ["Creative thinking", "Charm", "Optimism"],
    traits: ["Scattered attention", "Sensitivity to criticism"],
  },
  4: {
    number: 4,
    title: "The Builder",
    description:
      "Number 4 symbolizes reliability and a love of order. These people know how to see things through to completion and build a solid foundation — in work, relationships, and everyday life.",
    strengths: ["Discipline", "Practicality", "Dependability"],
    traits: ["Resistance to change", "Overly strict with themselves"],
  },
  5: {
    number: 5,
    title: "The Seeker",
    description:
      "Number 5 is linked to freedom and a thirst for change. People with this life path number love new experiences, adapt easily, and handle routine and rigid structures poorly.",
    strengths: ["Flexibility", "Curiosity", "Quick adaptation"],
    traits: ["Inconsistency", "Difficulty finishing what they started"],
  },
  6: {
    number: 6,
    title: "The Nurturer",
    description:
      "Number 6 speaks to care and responsibility for those close to you. These people often become a pillar of support for family and friends, valuing harmony at home and stable relationships.",
    strengths: [
      "Caring for loved ones",
      "Sense of responsibility",
      "Loyalty",
    ],
    traits: [
      "Tendency to sacrifice their own interests",
      "Perfectionism in daily life",
    ],
  },
  7: {
    number: 7,
    title: "The Thinker",
    description:
      "Number 7 is connected to an inner search and a hunger for knowledge. People with this number love to analyze and reflect, and often need solitude to understand themselves.",
    strengths: ["Analytical mind", "Intuition", "Depth of thought"],
    traits: ["Tendency toward withdrawal", "Prone to self-doubt"],
  },
  8: {
    number: 8,
    title: "The Achiever",
    description:
      "Number 8 symbolizes a drive for results and material well-being. These people know how to organize processes and reach their goals.",
    strengths: [
      "Ambition",
      "Organizational ability",
      "Persistence",
    ],
    traits: [
      "Tendency to overwork",
      "Difficulty delegating",
    ],
  },
  9: {
    number: 9,
    title: "The Humanitarian",
    description:
      "Number 9 reflects broad perspective and a desire to contribute to the world around them. People with this life path number are often sensitive to others' pain and strive for something beyond personal gain.",
    strengths: ["Generosity", "Wide perspective", "Ability to inspire"],
    traits: ["Idealism", "Difficulty with personal boundaries"],
  },
  11: {
    number: 11,
    title: "The Visionary (Master Number)",
    description:
      "Number 11 is considered one of the master numbers in numerology. It amplifies intuition and inner sensitivity, often giving a person a special ability to inspire others.",
    strengths: [
      "Heightened intuition",
      "Inspiring influence on people",
      "Inner depth",
    ],
    traits: ["Heightened anxiety", "High personal expectations"],
  },
  22: {
    number: 22,
    title: "The Master Builder",
    description:
      "Number 22 is the second master number, combining the practicality of four with a grand vision. These people are capable of bringing large and ambitious ideas to life.",
    strengths: [
      "Big-picture thinking",
      "Practical implementation of ideas",
      "Perseverance",
    ],
    traits: [
      "Weight of their own expectations",
      "Difficulty delegating large tasks",
    ],
  },
};

export function getLifePathProfile(number: number): LifePathProfile {
  return (
    LIFE_PATH_PROFILES[number] ?? {
      number,
      title: "Life Path Number",
      description: "Could not determine a profile for this number.",
      strengths: [],
      traits: [],
    }
  );
}
