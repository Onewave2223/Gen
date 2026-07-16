import { generators } from "@/data/generators";
import { tools } from "@/data/tools";
import { calculators } from "@/data/calculators";
import { instrumentyTools } from "@/data/instrumenty";

export type CatalogItemType = "generator" | "tool" | "calculator";
export type CatalogLocale = "en" | "ru";

export interface CatalogItem {
  /** Globally unique id, namespaced by type (e.g. "generator:password"). */
  id: string;
  type: CatalogItemType;
  name: string;
  description: string;
  href: string;
}

/**
 * Flat, deterministic (catalog-order) list of every available EN
 * generator, tool, and calculator. Used by the engagement features
 * (favorites, recently used, random generator, generator of the day,
 * site statistics) so they only need one source of truth to resolve
 * an id or href back to display info.
 */
export const catalog: readonly CatalogItem[] = [
  ...generators
    .filter((g) => g.status === "available")
    .map((g) => ({
      id: `generator:${g.id}`,
      type: "generator" as const,
      name: g.name,
      description: g.shortDescription,
      href: g.href,
    })),
  ...tools.map((t) => ({
    id: `tool:${t.id}`,
    type: "tool" as const,
    name: t.name,
    description: t.shortDescription,
    href: t.href,
  })),
  ...calculators.map((c) => ({
    id: `calculator:${c.id}`,
    type: "calculator" as const,
    name: c.name,
    description: c.shortDescription,
    href: c.href,
  })),
];

/**
 * Flat, deterministic (catalog-order) list of every available RU
 * "instrumenty" entry (generators, tools, and calculators are not
 * split into separate sections on the Russian site — they all live
 * under /ru/instrumenty). Mirrors `catalog` above so the same
 * engagement features (favorites, recently used, random generator,
 * generator of the day, site statistics) work identically on RU.
 */
export const catalogRu: readonly CatalogItem[] = instrumentyTools.map((t) => ({
  id: `instrument:${t.id}`,
  type: "tool" as const,
  name: t.name,
  description: t.shortDescription,
  href: t.href,
}));

function catalogFor(locale: CatalogLocale): readonly CatalogItem[] {
  return locale === "ru" ? catalogRu : catalog;
}

export function getCatalogItemById(
  id: string,
  locale: CatalogLocale = "en",
): CatalogItem | undefined {
  return catalogFor(locale).find((item) => item.id === id);
}

export function getCatalogItemByHref(
  href: string,
  locale: CatalogLocale = "en",
): CatalogItem | undefined {
  return catalogFor(locale).find((item) => item.href === href);
}

export const catalogStats = {
  generatorCount: generators.filter((g) => g.status === "available").length,
  toolCount: tools.length,
  calculatorCount: calculators.length,
} as const;

export const catalogStatsRu = {
  toolCount: instrumentyTools.length,
} as const;
