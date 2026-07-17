import { generators } from "@/data/generators";
import { tools } from "@/data/tools";
import { calculators } from "@/data/calculators";
import { funTools } from "@/data/fun-en";
import { funToolsRu } from "@/data/fun-ru";
import { fortuneTools } from "@/data/fortune";
import { gadaniyaTools } from "@/data/gadaniya";
import { instrumentyTools } from "@/data/instrumenty";

export interface SearchItem {
  id: string;
  name: string;
  description: string;
  category: string;
  href: string;
  keywords: readonly string[];
}

/** Global, client-side search index for the English site. */
export const searchIndexEn: readonly SearchItem[] = [
  ...generators
    .filter((g) => g.status === "available")
    .map((g) => ({
      id: `generators-${g.id}`,
      name: g.name,
      description: g.shortDescription,
      category: "Generators",
      href: g.href,
      keywords: g.keywords,
    })),
  ...tools.map((t) => ({
    id: `tools-${t.id}`,
    name: t.name,
    description: t.shortDescription,
    category: "Text Tools",
    href: t.href,
    keywords: [t.name, t.shortDescription],
  })),
  ...calculators.map((c) => ({
    id: `calculators-${c.id}`,
    name: c.name,
    description: c.shortDescription,
    category: "Calculators",
    href: c.href,
    keywords: [c.name, c.shortDescription],
  })),
  ...funTools.map((f) => ({
    id: `fun-${f.id}`,
    name: f.name,
    description: f.description,
    category: "Fun",
    href: f.href,
    keywords: [f.name, f.description],
  })),
  ...fortuneTools.map((f) => ({
    id: `fortune-${f.id}`,
    name: f.name,
    description: f.shortDescription,
    category: "Fortune",
    href: f.href,
    keywords: f.keywords,
  })),
  {
    id: "iq-test",
    name: "IQ Test",
    description: "35 questions across 7 reasoning categories. Instant result.",
    category: "IQ Test",
    href: "/iq-test",
    keywords: ["iq test", "iq", "intelligence test"],
  },
  {
    id: "tarot",
    name: "Tarot Reading",
    description: "Explore the 78 Tarot cards and their meanings.",
    category: "Fortune",
    href: "/tarot/cards",
    keywords: ["tarot", "tarot cards", "tarot reading"],
  },
] as const;

/** Global, client-side search index for the Russian site. */
export const searchIndexRu: readonly SearchItem[] = [
  ...instrumentyTools.map((t) => ({
    id: `instrumenty-${t.id}`,
    name: t.name,
    description: t.shortDescription,
    category: "Инструменты",
    href: t.href,
    keywords: t.keywords,
  })),
  ...gadaniyaTools.map((g) => ({
    id: `gadaniya-${g.id}`,
    name: g.name,
    description: g.shortDescription,
    category: "Гадания",
    href: g.href,
    keywords: g.keywords,
  })),
  ...funToolsRu.map((f) => ({
    id: `razvlecheniya-${f.id}`,
    name: f.name,
    description: f.description,
    category: "Развлечения",
    href: f.href,
    keywords: [f.name, f.description],
  })),
  {
    id: "test-na-iq",
    name: "Тест на IQ",
    description: "35 вопросов, мгновенный результат.",
    category: "Тест на IQ",
    href: "/ru/test-na-iq",
    keywords: ["тест на iq", "айкью", "тест интеллекта"],
  },
  {
    id: "tarot-ru",
    name: "Таро",
    description: "78 карт Таро и их значения.",
    category: "Гадания",
    href: "/ru/tarot/cards",
    keywords: ["таро", "карты таро", "гадание на таро"],
  },
] as const;

export function searchItems(
  index: readonly SearchItem[],
  query: string,
): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter((item) => {
    if (item.name.toLowerCase().includes(q)) return true;
    if (item.description.toLowerCase().includes(q)) return true;
    return item.keywords.some((k) => k.toLowerCase().includes(q));
  });
}
