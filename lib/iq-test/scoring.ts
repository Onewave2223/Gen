import type {
  CategoryScore,
  IQInterpretation,
  Locale,
  OptionId,
  Question,
  QuestionCategory,
  TestResult,
} from "./types";
import { CATEGORY_LIST } from "./questions";

export const TEST_DURATION_SECONDS = 25 * 60; // suggested pacing only, not enforced

interface Band {
  min: number;
  range: string;
  label: { en: string; ru: string };
  description: { en: string; ru: string };
}

const BANDS: Band[] = [
  {
    min: 130,
    range: "130+",
    label: { en: "Well above the typical range", ru: "Значительно выше типичного диапазона" },
    description: {
      en: "You answered a notably high proportion of questions correctly across most categories on this particular question set.",
      ru: "Вы правильно ответили на заметно большую долю вопросов в большинстве категорий этого конкретного набора вопросов.",
    },
  },
  {
    min: 115,
    range: "115–129",
    label: { en: "Above the typical range", ru: "Выше типичного диапазона" },
    description: {
      en: "You performed above the typical range for this test, with solid accuracy across several categories.",
      ru: "Вы показали результат выше типичного диапазона для этого теста, с хорошей точностью в нескольких категориях.",
    },
  },
  {
    min: 95,
    range: "95–114",
    label: { en: "Typical range", ru: "Типичный диапазон" },
    description: {
      en: "Your performance falls within the typical range for this question set, with a mix of strengths across categories.",
      ru: "Ваш результат находится в типичном диапазоне для этого набора вопросов, с разной успешностью по категориям.",
    },
  },
  {
    min: 80,
    range: "80–94",
    label: { en: "Below the typical range", ru: "Ниже типичного диапазона" },
    description: {
      en: "You scored below the typical range for this test. Reviewing the categories where you missed the most questions may help you improve on a retake.",
      ru: "Ваш результат ниже типичного диапазона для этого теста. Разбор категорий, где было больше всего ошибок, может помочь улучшить результат при повторном прохождении.",
    },
  },
  {
    min: 0,
    range: "70–79",
    label: { en: "Well below the typical range", ru: "Значительно ниже типичного диапазона" },
    description: {
      en: "Your score on this attempt was well below the typical range. Factors like time pressure, fatigue, or unfamiliarity with these puzzle types can strongly affect this kind of result.",
      ru: "Ваш результат в этой попытке значительно ниже типичного диапазона. На такой результат сильно влияют нехватка времени, усталость или незнакомость с этим типом задач.",
    },
  },
];

export function getIQInterpretation(score: number): IQInterpretation {
  const band = BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];
  return { label: band.label, description: band.description, range: band.range };
}

export function calculateResult(
  answers: Record<number, OptionId>,
  attemptQuestions: Question[],
  durationSeconds: number,
): TestResult {
  let rawCorrect = 0;
  let weightedScore = 0;
  let maxWeightedScore = 0;

  const categoryMap: Record<QuestionCategory, { correct: number; total: number }> = {
    pattern: { correct: 0, total: 0 },
    matrix: { correct: 0, total: 0 },
    numerical: { correct: 0, total: 0 },
    logical: { correct: 0, total: 0 },
    spatial: { correct: 0, total: 0 },
    verbal: { correct: 0, total: 0 },
    classification: { correct: 0, total: 0 },
  };

  for (const q of attemptQuestions) {
    maxWeightedScore += q.weight;
    categoryMap[q.category].total += 1;

    const given = answers[q.id];
    if (given && given === q.correctAnswer) {
      rawCorrect += 1;
      weightedScore += q.weight;
      categoryMap[q.category].correct += 1;
    }
  }

  const rawTotal = attemptQuestions.length;
  const rawPercentage = rawTotal > 0 ? (rawCorrect / rawTotal) * 100 : 0;
  const weightedPercentage = maxWeightedScore > 0 ? weightedScore / maxWeightedScore : 0;

  // Map weighted percentage (0-1) onto an estimated 70-145 "IQ-style" score.
  // 0.5 (average performance on this question set) maps to 100.
  // The mapping is intentionally gentle in the middle and steep at the
  // extremes is avoided — a simple linear scale keeps it transparent and
  // non-clinical, per the requirement to avoid pseudo-precise formulas.
  const iqScore = Math.round(Math.min(145, Math.max(70, 70 + weightedPercentage * 75)));

  const categoryScores: CategoryScore[] = CATEGORY_LIST.map((category) => {
    const { correct, total } = categoryMap[category];
    return {
      category,
      correct,
      total,
      percentage: total > 0 ? (correct / total) * 100 : 0,
    };
  });

  const withAnswers = categoryScores.filter((c) => c.total > 0);
  const strongestCategory =
    withAnswers.length > 0
      ? withAnswers.reduce((a, b) => (b.percentage > a.percentage ? b : a))
      : null;
  const weakestCategory =
    withAnswers.length > 0
      ? withAnswers.reduce((a, b) => (b.percentage < a.percentage ? b : a))
      : null;

  return {
    iqScore,
    rawCorrect,
    rawTotal,
    rawPercentage,
    weightedScore,
    maxWeightedScore,
    categoryScores,
    strongestCategory,
    weakestCategory,
    durationSeconds,
    interpretation: getIQInterpretation(iqScore),
  };
}

export function formatDuration(seconds: number, locale: Locale): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (locale === "ru") {
    return `${mins} мин ${secs.toString().padStart(2, "0")} сек`;
  }
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

export function formatElapsedTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
