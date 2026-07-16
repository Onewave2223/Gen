export type Locale = "en" | "ru";

export interface LocalizedText {
  en: string;
  ru: string;
}

export type QuestionCategory =
  | "pattern" // Pattern Recognition (visual sequences)
  | "matrix" // Visual Matrices (3x3 grids)
  | "numerical" // Numerical Reasoning
  | "logical" // Logical Reasoning
  | "spatial" // Spatial Reasoning (rotation / folding)
  | "verbal" // Verbal Analogies
  | "classification"; // Classification & Attention

export type DifficultyLevel = "easy" | "medium" | "hard";

export const DIFFICULTY_WEIGHTS: Record<DifficultyLevel, number> = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};

export type OptionId = "A" | "B" | "C" | "D";

export interface AnswerOption {
  id: OptionId;
  text: LocalizedText;
}

// ── Structured, data-driven visual specs ────────────────────────────────────
// These describe what to draw declaratively so a single generic SVG renderer
// can render every visual question. Rendering logic never hand-encodes a
// specific question's correct answer — it just draws whatever shape data
// is provided, keeping the visuals and the answer key guaranteed consistent.

export type ShapeKind = "circle" | "square" | "triangle" | "pentagon" | "diamond";

export interface ShapeSpec {
  shape: ShapeKind;
  filled?: boolean;
  half?: boolean;
  rotate?: number; // degrees
  size?: number; // relative size, 1 = default
  count?: number; // for grouped shapes (1-4 repeated copies)
}

export interface BlankMarker {
  blank: true;
}

export type CellSpec = ShapeSpec | BlankMarker | null;

export type VisualSpec =
  | { kind: "sequence"; cells: CellSpec[] }
  | { kind: "matrix"; rows: CellSpec[][] }
  | { kind: "arrowRotation"; steps: (number | "blank")[] } // degrees, clockwise from pointing right
  | { kind: "lineMatrix"; rows: { count: number; angle: number }[][]; blankAt: [number, number] }
  | { kind: "custom"; id: string }; // hand-illustrated diagrams (folding, cube, L-shape) rendered by name

export interface Question {
  id: number;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  prompt: LocalizedText;
  options: AnswerOption[];
  correctAnswer: OptionId;
  explanation: LocalizedText;
  visual?: VisualSpec;
  weight: number;
}

export interface TestState {
  version: number;
  status: "idle" | "in_progress" | "finished";
  locale: Locale;
  startedAt: number | null; // timestamp ms
  finishedAt: number | null;
  currentQuestion: number; // 0-based index
  answers: Record<number, OptionId>;
  questionIds: number[]; // the balanced 35-question draw for this attempt
  seed: number;
}

export interface CategoryScore {
  category: QuestionCategory;
  correct: number;
  total: number;
  percentage: number;
}

export interface TestResult {
  iqScore: number;
  rawCorrect: number;
  rawTotal: number;
  rawPercentage: number;
  weightedScore: number;
  maxWeightedScore: number;
  categoryScores: CategoryScore[];
  strongestCategory: CategoryScore | null;
  weakestCategory: CategoryScore | null;
  durationSeconds: number;
  interpretation: IQInterpretation;
}

export interface IQInterpretation {
  label: LocalizedText;
  description: LocalizedText;
  range: string;
}
