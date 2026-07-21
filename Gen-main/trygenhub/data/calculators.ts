export interface Calculator {
  id: string;
  name: string;
  shortDescription: string;
  href: string;
  featured: boolean;
}

export const calculators: readonly Calculator[] = [
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    shortDescription: "Calculate percentages, increases, and decreases.",
    href: "/calculators/percentage-calculator",
    featured: true,
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    shortDescription: "Find your exact age in years, months, and days.",
    href: "/calculators/age-calculator",
    featured: true,
  },
  {
    id: "date-difference",
    name: "Date Difference Calculator",
    shortDescription: "Calculate the difference between two dates.",
    href: "/calculators/date-difference",
    featured: true,
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    shortDescription: "Calculate your Body Mass Index with metric or imperial units.",
    href: "/calculators/bmi-calculator",
    featured: false,
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    shortDescription: "Calculate tips and split bills between people.",
    href: "/calculators/tip-calculator",
    featured: false,
  },
  {
    id: "discount-calculator",
    name: "Discount Calculator",
    shortDescription: "Find the sale price, savings, and price after tax.",
    href: "/calculators/discount-calculator",
    featured: true,
  },
] as const;

export function getCalculatorById(id: string): Calculator | undefined {
  return calculators.find((c) => c.id === id);
}

export function getFeaturedCalculators(): Calculator[] {
  return calculators.filter((c) => c.featured);
}
