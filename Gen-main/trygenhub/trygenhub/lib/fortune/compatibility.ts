import { seededRandom, pickInt } from "./prng";
import {
  METRICS,
  bucketForScore,
  metricLabel,
  METRIC_TEXT,
  OVERALL_TEXT,
  type RelationshipType,
  type CompatibilityLocale,
} from "./compatibility-data";

export interface MetricResult {
  id: string;
  label: string;
  score: number;
  text: string;
}

export interface CompatibilityResult {
  overallScore: number;
  overallText: string;
  metrics: MetricResult[];
}

/**
 * Normalizes a name for hashing: trims, lowercases, strips diacritics
 * and non-letter characters, and collapses internal whitespace. This
 * ensures "Anna" / " anna " / "ANNA" / "Анна" all hash identically,
 * and keeps the seed based purely on the name's letters, not
 * incidental formatting.
 */
export function normalizeName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

/**
 * Builds an order-independent seed from two names: sorting the
 * normalized names before joining means computeCompatibility("Anna",
 * "Max") and computeCompatibility("Max", "Anna") always produce the
 * exact same result.
 */
function buildSeed(nameA: string, nameB: string, relationship: RelationshipType): string {
  const normalized = [normalizeName(nameA), normalizeName(nameB)].sort();
  return `compat:${normalized[0]}|${normalized[1]}:${relationship}`;
}

export function computeCompatibility(
  nameA: string,
  nameB: string,
  relationship: RelationshipType,
  locale: CompatibilityLocale,
): CompatibilityResult {
  const seed = buildSeed(nameA, nameB, relationship);

  const metrics: MetricResult[] = METRICS.map((metric) => {
    const rng = seededRandom(`${seed}:metric:${metric.id}`);
    // Skew scores toward the middle-upper range (35-98) so results feel
    // encouraging rather than harshly negative, while still leaving
    // meaningful variation between pairs and between metrics.
    const score = pickInt(rng, 35, 98);
    const bucket = bucketForScore(score);
    const bank = METRIC_TEXT[metric.id][bucket];
    return {
      id: metric.id,
      label: metricLabel(metric, locale, relationship),
      score,
      text: locale === "ru" ? bank.ru : bank.en,
    };
  });

  const overallScore = Math.round(
    metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length,
  );
  const overallBucket = bucketForScore(overallScore);
  const overallBank = OVERALL_TEXT[overallBucket][relationship];

  return {
    overallScore,
    overallText: locale === "ru" ? overallBank.ru : overallBank.en,
    metrics,
  };
}

export function formatCompatibilityForShare(
  nameA: string,
  nameB: string,
  result: CompatibilityResult,
  locale: CompatibilityLocale,
): string {
  const title = locale === "ru" ? "Совместимость — TryGenHub" : "Compatibility — TryGenHub";
  const overallLabel = locale === "ru" ? "Общий результат" : "Overall score";
  const lines = [
    title,
    `${nameA.trim()} + ${nameB.trim()}`,
    `${overallLabel}: ${result.overallScore}%`,
    ...result.metrics.map((m) => `${m.label}: ${m.score}%`),
  ];
  return lines.join("\n");
}
