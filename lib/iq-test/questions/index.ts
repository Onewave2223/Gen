import type { Question, QuestionCategory } from "../types";
import { patternQuestions } from "./pattern";
import { matrixQuestions } from "./matrix";
import { numericalQuestions } from "./numerical";
import { logicalQuestions } from "./logical";
import { spatialQuestions } from "./spatial";
import { verbalQuestions } from "./verbal";
import { classificationQuestions } from "./classification";

export const QUESTIONS_PER_CATEGORY = 5;
export const TOTAL_TEST_QUESTIONS = 35;

export const questions: Question[] = [
  ...patternQuestions,
  ...matrixQuestions,
  ...numericalQuestions,
  ...logicalQuestions,
  ...spatialQuestions,
  ...verbalQuestions,
  ...classificationQuestions,
];

export const CATEGORY_LIST: QuestionCategory[] = [
  "pattern",
  "matrix",
  "numerical",
  "logical",
  "spatial",
  "verbal",
  "classification",
];

export const questionsByCategory: Record<QuestionCategory, Question[]> = {
  pattern: patternQuestions,
  matrix: matrixQuestions,
  numerical: numericalQuestions,
  logical: logicalQuestions,
  spatial: spatialQuestions,
  verbal: verbalQuestions,
  classification: classificationQuestions,
};

export const questionMap: Map<number, Question> = new Map(questions.map((q) => [q.id, q]));

function validateQuestionBank() {
  const ids = new Set<number>();
  for (const q of questions) {
    if (ids.has(q.id)) {
      throw new Error(`Duplicate question ID detected: ${q.id}`);
    }
    ids.add(q.id);

    if (q.options.length !== 4) {
      throw new Error(`Question ${q.id} must have exactly 4 options`);
    }
    const optionIds = q.options.map((o) => o.id).sort().join("");
    if (optionIds !== "ABCD") {
      throw new Error(`Question ${q.id} options must be labeled A, B, C, D`);
    }
    if (!q.options.some((o) => o.id === q.correctAnswer)) {
      throw new Error(`Question ${q.id} correctAnswer does not match any option`);
    }
    if (!q.explanation.en || !q.explanation.ru) {
      throw new Error(`Question ${q.id} is missing a bilingual explanation`);
    }
    if (!q.prompt.en || !q.prompt.ru) {
      throw new Error(`Question ${q.id} is missing a bilingual prompt`);
    }
    for (const opt of q.options) {
      if (!opt.text.en || !opt.text.ru) {
        throw new Error(`Question ${q.id} option ${opt.id} is missing bilingual text`);
      }
    }
  }

  for (const category of CATEGORY_LIST) {
    const count = questionsByCategory[category].length;
    if (count < QUESTIONS_PER_CATEGORY) {
      throw new Error(
        `Category "${category}" only has ${count} questions, needs at least ${QUESTIONS_PER_CATEGORY}`,
      );
    }
  }

  if (questions.length < 250) {
    throw new Error(`Question bank has ${questions.length} questions, expected at least 250`);
  }
}

if (process.env.NODE_ENV !== "production") {
  validateQuestionBank();
}

export { validateQuestionBank };
