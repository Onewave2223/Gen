export interface Tool {
  id: string;
  name: string;
  shortDescription: string;
  href: string;
  category: "text" | "qr" | "conversion";
  featured: boolean;
}

export const tools: readonly Tool[] = [
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    shortDescription: "Generate QR codes for any URL or text.",
    href: "/tools/qr-code-generator",
    category: "qr",
    featured: true,
  },
  {
    id: "word-counter",
    name: "Word Counter",
    shortDescription: "Count words, characters, sentences, and paragraphs.",
    href: "/tools/word-counter",
    category: "text",
    featured: true,
  },
  {
    id: "case-converter",
    name: "Case Converter",
    shortDescription: "Convert text to uppercase, lowercase, title case and more.",
    href: "/tools/case-converter",
    category: "text",
    featured: true,
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    shortDescription: "Remove repeated lines from any text instantly.",
    href: "/tools/remove-duplicate-lines",
    category: "text",
    featured: false,
  },
  {
    id: "sort-lines",
    name: "Sort Lines",
    shortDescription: "Sort lines alphabetically, by length, or randomly.",
    href: "/tools/sort-lines",
    category: "text",
    featured: false,
  },
  {
    id: "character-counter",
    name: "Character Counter",
    shortDescription: "Count characters, letters, digits, and spaces in real time.",
    href: "/tools/character-counter",
    category: "text",
    featured: false,
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    shortDescription: "Convert length, weight, temperature, and volume between units.",
    href: "/tools/unit-converter",
    category: "conversion",
    featured: true,
  },
] as const;

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}
