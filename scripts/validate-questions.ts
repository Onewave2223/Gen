/**
 * Development-only validation script for the IQ test question bank.
 * Not part of the production bundle — run manually via `npx tsx scripts/validate-questions.ts`.
 */
import { questions, questionsByCategory, TOTAL_TEST_QUESTIONS, QUESTIONS_PER_CATEGORY } from "../lib/iq-test/questions/index";
import type { Question } from "../lib/iq-test/types";

let errors = 0;
const warn = (msg: string) => {
  console.error("ERROR:", msg);
  errors++;
};

// 1. Unique IDs across the whole bank
const idCounts = new Map<number, number>();
for (const q of questions) {
  idCounts.set(q.id, (idCounts.get(q.id) ?? 0) + 1);
}
for (const [id, count] of idCounts) {
  if (count > 1) warn(`Duplicate question id ${id} appears ${count} times`);
}

// 2. Per-question structural checks
for (const q of questions as Question[]) {
  const label = `Question #${q.id} (${q.category})`;

  if (!q.options || q.options.length === 0) {
    warn(`${label}: has no options`);
    continue;
  }

  const optionIds = q.options.map((o) => o.id);
  const uniqueOptionIds = new Set(optionIds);
  if (uniqueOptionIds.size !== optionIds.length) {
    warn(`${label}: duplicate option ids ${optionIds.join(",")}`);
  }

  for (const opt of q.options) {
    if (!opt.text.en?.trim()) warn(`${label}: option ${opt.id} missing EN text`);
    if (!opt.text.ru?.trim()) warn(`${label}: option ${opt.id} missing RU text`);
  }

  if (!optionIds.includes(q.correctAnswer)) {
    warn(`${label}: correctAnswer "${q.correctAnswer}" not among options [${optionIds.join(",")}]`);
  }

  if (!q.prompt.en?.trim()) warn(`${label}: missing EN prompt`);
  if (!q.prompt.ru?.trim()) warn(`${label}: missing RU prompt`);
  if (!q.explanation.en?.trim()) warn(`${label}: missing EN explanation`);
  if (!q.explanation.ru?.trim()) warn(`${label}: missing RU explanation`);

  if (typeof q.weight !== "number" || q.weight <= 0) {
    warn(`${label}: invalid weight ${q.weight}`);
  }
}

// 3. True duplicates within the same category: same prompt AND same option set
// (identical prompt text alone is fine — e.g. classification reuses a generic
// "which does not belong" template with different word/number sets each time).
for (const [category, list] of Object.entries(questionsByCategory)) {
  const seen = new Map<string, number>();
  for (const q of list) {
    const key = [
      q.prompt.en.trim().toLowerCase(),
      ...q.options.map((o) => o.text.en.trim().toLowerCase()).sort(),
    ].join("|");
    if (seen.has(key)) {
      warn(`Category ${category}: question #${q.id} is a full duplicate (prompt + options) of #${seen.get(key)}`);
    } else {
      seen.set(key, q.id);
    }
  }
  if (list.length < QUESTIONS_PER_CATEGORY) {
    warn(`Category ${category}: only ${list.length} questions, need at least ${QUESTIONS_PER_CATEGORY} per attempt`);
  }
}

// 4. Enough total questions to draw a balanced attempt
const categoryCount = Object.keys(questionsByCategory).length;
const minRequired = categoryCount * QUESTIONS_PER_CATEGORY;
if (questions.length < minRequired) {
  warn(`Total question bank has ${questions.length} questions, need at least ${minRequired} (${categoryCount} categories x ${QUESTIONS_PER_CATEGORY})`);
}
if (minRequired !== TOTAL_TEST_QUESTIONS) {
  warn(`TOTAL_TEST_QUESTIONS (${TOTAL_TEST_QUESTIONS}) does not match categories x per-category (${minRequired})`);
}

console.log(`Checked ${questions.length} questions across ${categoryCount} categories.`);
if (errors === 0) {
  console.log("All IQ test question bank checks passed.");
  process.exit(0);
} else {
  console.error(`${errors} issue(s) found in the question bank.`);
  process.exit(1);
}
