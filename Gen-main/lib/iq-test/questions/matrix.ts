import type { CellSpec, Question, VisualSpec } from "../types";

const P = (en: string, ru: string) => ({ en, ru });

function matrix(rows: CellSpec[][]): VisualSpec {
  return { kind: "matrix", rows };
}

export const matrixQuestions: Question[] = [
  {
    id: 301,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Each row contains the same shape repeated 1, 2, then 3 times. What belongs in the missing cell?",
      "В каждой строке одна и та же фигура повторяется 1, 2, затем 3 раза. Что должно быть в пропущенной ячейке?",
    ),
    visual: matrix([
      [{ shape: "circle", count: 1 }, { shape: "circle", count: 2 }, { shape: "circle", count: 3 }],
      [{ shape: "square", count: 1 }, { shape: "square", count: 2 }, { shape: "square", count: 3 }],
      [{ shape: "triangle", count: 1 }, { shape: "triangle", count: 2 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("1 triangle", "1 треугольник") },
      { id: "B", text: P("2 triangles", "2 треугольника") },
      { id: "C", text: P("3 triangles", "3 треугольника") },
      { id: "D", text: P("4 triangles", "4 треугольника") },
    ],
    correctAnswer: "C",
    explanation: P(
      "Each row uses one shape repeated 1, 2, 3 times across the columns. Row 3 uses triangles, so the missing cell needs 3 triangles.",
      "В каждой строке фигура повторяется 1, 2, 3 раза по столбцам. В 3-й строке — треугольники, значит нужно 3 треугольника.",
    ),
    weight: 1,
  },
  {
    id: 302,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Each row shows a shape becoming more filled left to right: hollow, half, full. What is missing?",
      "В каждой строке фигура становится всё более закрашенной слева направо: пусто, наполовину, полностью. Что пропущено?",
    ),
    visual: matrix([
      [{ shape: "circle", filled: false }, { shape: "circle", half: true }, { shape: "circle", filled: true }],
      [{ shape: "square", filled: false }, { shape: "square", half: true }, { shape: "square", filled: true }],
      [{ shape: "pentagon", filled: false }, { shape: "pentagon", half: true }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Fully filled pentagon", "Полностью закрашенный пятиугольник") },
      { id: "B", text: P("Hollow pentagon", "Незакрашенный пятиугольник") },
      { id: "C", text: P("Half-filled pentagon", "Наполовину закрашенный пятиугольник") },
      { id: "D", text: P("Hollow hexagon", "Незакрашенный шестиугольник") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Every row progresses hollow → half → full. Row 3's missing cell must be a fully filled pentagon.",
      "Каждая строка проходит путь пусто → наполовину → полностью. В пропущенной ячейке 3-й строки должен быть полностью закрашенный пятиугольник.",
    ),
    weight: 1,
  },
  {
    id: 303,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Shapes grow larger left to right, and rotate 45° more with each row down. What belongs in the bottom-right cell?",
      "Фигуры увеличиваются слева направо и поворачиваются на 45° больше с каждой строкой вниз. Что должно быть в нижней правой ячейке?",
    ),
    visual: matrix([
      [{ shape: "square", size: 0.6, rotate: 0 }, { shape: "square", size: 0.9, rotate: 0 }, { shape: "square", size: 1.2, rotate: 0 }],
      [{ shape: "square", size: 0.6, rotate: 45 }, { shape: "square", size: 0.9, rotate: 45 }, { shape: "square", size: 1.2, rotate: 45 }],
      [{ shape: "square", size: 0.6, rotate: 90 }, { shape: "square", size: 0.9, rotate: 90 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Small square rotated 90°", "Маленький квадрат, повёрнутый на 90°") },
      { id: "B", text: P("Large square rotated 90°", "Большой квадрат, повёрнутый на 90°") },
      { id: "C", text: P("Large square rotated 45°", "Большой квадрат, повёрнутый на 45°") },
      { id: "D", text: P("Large upright square", "Большой квадрат без поворота") },
    ],
    correctAnswer: "B",
    explanation: P(
      "Columns grow left to right (small, medium, large); rows rotate 0°, 45°, 90° top to bottom. Bottom-right needs large size at 90° rotation.",
      "Столбцы растут слева направо (маленький, средний, большой); строки поворачиваются на 0°, 45°, 90° сверху вниз. В нижней правой ячейке нужен большой размер с поворотом на 90°.",
    ),
    weight: 1.5,
  },
  {
    id: 304,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "The outer shape cycles square → circle → triangle across each row, and the number of inner dots equals (row × column). What belongs at row 3, column 3?",
      "Внешняя фигура меняется квадрат → круг → треугольник в каждой строке, а число внутренних точек равно (строка × столбец). Что должно быть в строке 3, столбце 3?",
    ),
    visual: matrix([
      [{ shape: "square", count: 1 }, { shape: "circle", count: 2 }, { shape: "triangle", count: 3 }],
      [{ shape: "square", count: 2 }, { shape: "circle", count: 4 }, { shape: "triangle", count: 6 }],
      [{ shape: "square", count: 3 }, { shape: "circle", count: 6 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Triangle with 6 dots", "Треугольник с 6 точками") },
      { id: "B", text: P("Triangle with 9 dots", "Треугольник с 9 точками") },
      { id: "C", text: P("Circle with 9 dots", "Круг с 9 точками") },
      { id: "D", text: P("Square with 9 dots", "Квадрат с 9 точками") },
    ],
    correctAnswer: "B",
    explanation: P(
      "Column 3 always uses a triangle. Dot count = row × column = 3 × 3 = 9. Answer: triangle with 9 dots.",
      "В 3-м столбце всегда треугольник. Число точек = строка × столбец = 3 × 3 = 9. Ответ: треугольник с 9 точками.",
    ),
    weight: 1.5,
  },
  {
    id: 305,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each cell's shape rotates 45° more than the cell to its left, and each row starts one fill-step further along (hollow, half, full). What is missing?",
      "Фигура в каждой ячейке повёрнута на 45° больше, чем слева, а каждая строка начинается на один шаг заливки дальше (пусто, наполовину, полностью). Что пропущено?",
    ),
    visual: matrix([
      [{ shape: "diamond", rotate: 0, filled: false }, { shape: "diamond", rotate: 45, filled: false }, { shape: "diamond", rotate: 90, filled: false }],
      [{ shape: "diamond", rotate: 0, half: true }, { shape: "diamond", rotate: 45, half: true }, { shape: "diamond", rotate: 90, half: true }],
      [{ shape: "diamond", rotate: 0, filled: true }, { shape: "diamond", rotate: 45, filled: true }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Fully filled diamond rotated 90°", "Полностью закрашенный ромб, повёрнутый на 90°") },
      { id: "B", text: P("Half-filled diamond rotated 90°", "Наполовину закрашенный ромб, повёрнутый на 90°") },
      { id: "C", text: P("Hollow diamond rotated 90°", "Незакрашенный ромб, повёрнутый на 90°") },
      { id: "D", text: P("Fully filled diamond rotated 135°", "Полностью закрашенный ромб, повёрнутый на 135°") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Every row keeps a constant fill (hollow, half, full by row) while rotation increases 0°, 45°, 90° across columns. Row 3 is fully filled, column 3 is 90°.",
      "В каждой строке заливка постоянна (пусто, наполовину, полностью по строкам), а поворот растёт 0°, 45°, 90° по столбцам. Строка 3 полностью закрашена, столбец 3 — поворот 90°.",
    ),
    weight: 1.5,
  },
  {
    id: 306,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "In this grid, the shape rotates 45° each step AND gains one inner dot each step, reading left-to-right then top-to-bottom as one continuous sequence. What is in the last cell?",
      "В этой сетке фигура поворачивается на 45° и получает одну внутреннюю точку на каждом шаге, если читать слева направо и сверху вниз как единую последовательность. Что в последней ячейке?",
    ),
    visual: matrix([
      [{ shape: "square", rotate: 0, count: 1 }, { shape: "square", rotate: 45, count: 2 }, { shape: "square", rotate: 90, count: 3 }],
      [{ shape: "square", rotate: 135, count: 4 }, { shape: "square", rotate: 180, count: 5 }, { shape: "square", rotate: 225, count: 6 }],
      [{ shape: "square", rotate: 270, count: 7 }, { shape: "square", rotate: 315, count: 8 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Square rotated 0° (360°) with 9 dots", "Квадрат повёрнут на 0° (360°) с 9 точками") },
      { id: "B", text: P("Square rotated 360° with 8 dots", "Квадрат повёрнут на 360° с 8 точками") },
      { id: "C", text: P("Square rotated 315° with 9 dots", "Квадрат повёрнут на 315° с 9 точками") },
      { id: "D", text: P("Square rotated 45° with 9 dots", "Квадрат повёрнут на 45° с 9 точками") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Reading all 9 cells in order, rotation increases 45° per step (cell 9 = 8×45° = 360°, visually the same as 0°) and the dot count increases by 1 per step (cell 9 = 9 dots).",
      "Читая все 9 ячеек по порядку, поворот увеличивается на 45° за шаг (9-я ячейка = 8×45° = 360°, визуально то же, что 0°), а число точек растёт на 1 за шаг (9-я ячейка = 9 точек).",
    ),
    weight: 2,
  },
  {
    id: 307,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "The number of lines in each cell equals (row + column − 1), and each line set is rotated 30° more moving left to right. What is in the bottom-right cell?",
      "Число линий в каждой ячейке равно (строка + столбец − 1), а каждый набор линий повёрнут на 30° больше при движении слева направо. Что в нижней правой ячейке?",
    ),
    options: [
      { id: "A", text: P("4 lines at 60° from horizontal", "4 линии под углом 60° к горизонтали") },
      { id: "B", text: P("5 lines at 60° from horizontal", "5 линий под углом 60° к горизонтали") },
      { id: "C", text: P("5 lines at 90° from horizontal", "5 линий под углом 90° к горизонтали") },
      { id: "D", text: P("4 lines at 30° from horizontal", "4 линии под углом 30° к горизонтали") },
    ],
    correctAnswer: "B",
    explanation: P(
      "Row 3, column 3: line count = 3 + 3 − 1 = 5. Rotation increases 30° per column, so column 3 is 2×30° = 60°. Answer: 5 lines at 60°.",
      "Строка 3, столбец 3: число линий = 3 + 3 − 1 = 5. Поворот растёт на 30° на столбец, значит столбец 3 — это 2×30° = 60°. Ответ: 5 линий под углом 60°.",
    ),
    weight: 2,
  },
  {
    id: 308,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "Each row's shape count doubles moving left to right (1, 2, 4), while the shape itself cycles down each row (circle, square, triangle). What belongs at row 2, column 3?",
      "Число фигур в каждой строке удваивается слева направо (1, 2, 4), а сама фигура меняется по строкам (круг, квадрат, треугольник). Что должно быть в строке 2, столбце 3?",
    ),
    visual: matrix([
      [{ shape: "circle", count: 1 }, { shape: "circle", count: 2 }, { shape: "circle", count: 4 }],
      [{ shape: "square", count: 1 }, { shape: "square", count: 2 }, { blank: true }],
      [{ shape: "triangle", count: 1 }, { shape: "triangle", count: 2 }, { shape: "triangle", count: 4 }],
    ]),
    options: [
      { id: "A", text: P("3 squares", "3 квадрата") },
      { id: "B", text: P("4 squares", "4 квадрата") },
      { id: "C", text: P("4 triangles", "4 треугольника") },
      { id: "D", text: P("2 squares", "2 квадрата") },
    ],
    correctAnswer: "B",
    explanation: P(
      "Row 2 uses squares. Count doubles across columns: 1, 2, 4. The missing cell is 4 squares.",
      "В строке 2 — квадраты. Количество удваивается по столбцам: 1, 2, 4. В пропущенной ячейке — 4 квадрата.",
    ),
    weight: 2,
  },
  {
    id: 309,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each column uses a fixed shape, and fill increases top to bottom (hollow, half, full). What belongs in the missing cell?",
      "В каждом столбце фигура фиксирована, а заливка растёт сверху вниз (пусто, наполовину, полностью). Что должно быть в пропущенной ячейке?",
    ),
    visual: matrix([
      [{ shape: "circle", filled: false }, { shape: "square", filled: false }, { shape: "triangle", filled: false }],
      [{ shape: "circle", half: true }, { shape: "square", half: true }, { shape: "triangle", half: true }],
      [{ shape: "circle", filled: true }, { blank: true }, { shape: "triangle", filled: true }],
    ]),
    options: [
      { id: "A", text: P("Fully filled square", "Полностью закрашенный квадрат") },
      { id: "B", text: P("Hollow square", "Незакрашенный квадрат") },
      { id: "C", text: P("Half-filled square", "Наполовину закрашенный квадрат") },
      { id: "D", text: P("Fully filled circle", "Полностью закрашенный круг") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Column 2 always uses a square. Row 3 is fully filled for every column, so the missing cell is a fully filled square.",
      "Во 2-м столбце всегда квадрат. В строке 3 везде полная заливка, значит пропущенная ячейка — полностью закрашенный квадрат.",
    ),
    weight: 1.5,
  },
  {
    id: 310,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Each row has one small and two large copies of the same shape, always with the small one on a different side. Based on the pattern, where should the small triangle be?",
      "В каждой строке одна маленькая и две больших копии одной фигуры, при этом маленькая — всегда с другой стороны. По этой закономерности, где должен быть маленький треугольник?",
    ),
    visual: matrix([
      [{ shape: "circle", size: 0.5 }, { shape: "circle", size: 1.2 }, { shape: "circle", size: 1.2 }],
      [{ shape: "square", size: 1.2 }, { shape: "square", size: 0.5 }, { shape: "square", size: 1.2 }],
      [{ shape: "triangle", size: 1.2 }, { shape: "triangle", size: 1.2 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Small triangle (right cell)", "Маленький треугольник (правая ячейка)") },
      { id: "B", text: P("Large triangle (right cell)", "Большой треугольник (правая ячейка)") },
      { id: "C", text: P("Small circle (right cell)", "Маленький круг (правая ячейка)") },
      { id: "D", text: P("Small square (right cell)", "Маленький квадрат (правая ячейка)") },
    ],
    correctAnswer: "A",
    explanation: P(
      "The small shape shifts one position right each row: column 1, then column 2, then column 3. Row 3's small shape belongs in the missing (3rd) cell.",
      "Маленькая фигура сдвигается на одну позицию вправо в каждой строке: столбец 1, затем 2, затем 3. В строке 3 маленькая фигура должна быть в пропущенной (3-й) ячейке.",
    ),
    weight: 1,
  },
  {
    id: 311,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Shapes alternate between two types down each column, and rotate 90° across each row. What belongs at row 3, column 2 (circle/square alternation, column 2 is always square)?",
      "Фигуры чередуются между двумя типами по столбцам вниз и поворачиваются на 90° по строкам. Что должно быть в строке 3, столбце 2 (чередование круг/квадрат, во 2-м столбце всегда квадрат)?",
    ),
    visual: matrix([
      [{ shape: "circle", rotate: 0 }, { shape: "square", rotate: 0 }, { shape: "circle", rotate: 0 }],
      [{ shape: "square", rotate: 90 }, { shape: "circle", rotate: 90 }, { shape: "square", rotate: 90 }],
      [{ shape: "circle", rotate: 180 }, { blank: true }, { shape: "circle", rotate: 180 }],
    ]),
    options: [
      { id: "A", text: P("Square rotated 180°", "Квадрат, повёрнутый на 180°") },
      { id: "B", text: P("Circle rotated 180°", "Круг, повёрнутый на 180°") },
      { id: "C", text: P("Square rotated 90°", "Квадрат, повёрнутый на 90°") },
      { id: "D", text: P("Square rotated 0°", "Квадрат без поворота") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Column 2 alternates opposite to columns 1 and 3, so it is always a square. Row 3 rotates every shape 180°. Answer: square rotated 180°.",
      "Столбец 2 чередуется в противофазе со столбцами 1 и 3, поэтому там всегда квадрат. В строке 3 все фигуры повёрнуты на 180°. Ответ: квадрат, повёрнутый на 180°.",
    ),
    weight: 1.5,
  },
  {
    id: 312,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "The dot count in each cell equals the row number squared minus the column number (row² − column). What belongs at row 3, column 2?",
      "Число точек в каждой ячейке равно квадрату номера строки минус номер столбца (строка² − столбец). Что должно быть в строке 3, столбце 2?",
    ),
    options: [
      { id: "A", text: P("6 dots", "6 точек") },
      { id: "B", text: P("7 dots", "7 точек") },
      { id: "C", text: P("8 dots", "8 точек") },
      { id: "D", text: P("9 dots", "9 точек") },
    ],
    correctAnswer: "B",
    explanation: P(
      "Row 3, column 2: 3² − 2 = 9 − 2 = 7 dots.",
      "Строка 3, столбец 2: 3² − 2 = 9 − 2 = 7 точек.",
    ),
    weight: 2,
  },
  {
    id: 313,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Every cell shows a shape and, beside it, a smaller copy of the NEXT shape in the cycle (circle→square→triangle→circle). What pairing belongs in the missing cell if the main shape is a triangle?",
      "В каждой ячейке показана фигура и рядом — уменьшенная копия СЛЕДУЮЩЕЙ фигуры в цикле (круг→квадрат→треугольник→круг). Какая пара должна быть в пропущенной ячейке, если основная фигура — треугольник?",
    ),
    options: [
      { id: "A", text: P("Triangle with a small circle", "Треугольник с маленьким кругом") },
      { id: "B", text: P("Triangle with a small square", "Треугольник с маленьким квадратом") },
      { id: "C", text: P("Triangle with a small triangle", "Треугольник с маленьким треугольником") },
      { id: "D", text: P("Circle with a small triangle", "Круг с маленьким треугольником") },
    ],
    correctAnswer: "A",
    explanation: P(
      "The cycle is circle→square→triangle→circle. The shape following triangle is circle, so a triangle cell must be paired with a small circle.",
      "Цикл: круг→квадрат→треугольник→круг. После треугольника идёт круг, значит рядом с треугольником должен быть маленький круг.",
    ),
    weight: 1.5,
  },
  {
    id: 314,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Each column keeps the same shape, and each row keeps the same fill level. What belongs in the missing cell (column 1 = circle, row 2 = half-filled)?",
      "В каждом столбце фигура одна и та же, а в каждой строке — одинаковая заливка. Что должно быть в пропущенной ячейке (столбец 1 = круг, строка 2 = наполовину)?",
    ),
    visual: matrix([
      [{ shape: "circle", filled: false }, { shape: "square", filled: false }, { shape: "triangle", filled: false }],
      [{ blank: true }, { shape: "square", half: true }, { shape: "triangle", half: true }],
      [{ shape: "circle", filled: true }, { shape: "square", filled: true }, { shape: "triangle", filled: true }],
    ]),
    options: [
      { id: "A", text: P("Half-filled circle", "Наполовину закрашенный круг") },
      { id: "B", text: P("Hollow circle", "Незакрашенный круг") },
      { id: "C", text: P("Fully filled circle", "Полностью закрашенный круг") },
      { id: "D", text: P("Half-filled square", "Наполовину закрашенный квадрат") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Column 1 is always a circle, and row 2 is always half-filled. The missing cell must be a half-filled circle.",
      "В 1-м столбце всегда круг, а во 2-й строке всегда наполовину закрашено. В пропущенной ячейке должен быть наполовину закрашенный круг.",
    ),
    weight: 1,
  },
  {
    id: 315,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Each row uses a different shape, and size increases left to right: small, medium, large. What belongs in the missing cell?",
      "В каждой строке своя фигура, а размер растёт слева направо: маленький, средний, большой. Что должно быть в пропущенной ячейке?",
    ),
    visual: matrix([
      [{ shape: "circle", size: 0.6 }, { shape: "circle", size: 1.0 }, { shape: "circle", size: 1.4 }],
      [{ shape: "square", size: 0.6 }, { shape: "square", size: 1.0 }, { shape: "square", size: 1.4 }],
      [{ shape: "diamond", size: 0.6 }, { shape: "diamond", size: 1.0 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Large diamond", "Большой ромб") },
      { id: "B", text: P("Small diamond", "Маленький ромб") },
      { id: "C", text: P("Medium diamond", "Средний ромб") },
      { id: "D", text: P("Large circle", "Большой круг") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 3 uses diamonds, and every row grows small→medium→large left to right. The missing cell is a large diamond.",
      "В 3-й строке — ромбы, и в каждой строке размер растёт маленький→средний→большой. В пропущенной ячейке должен быть большой ромб.",
    ),
    weight: 1,
  },
  {
    id: 316,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Each column keeps the same rotation, and each row keeps the same shape. What belongs in the missing cell (row 2 = square, column 3 = rotated 90°)?",
      "В каждом столбце один и тот же поворот, а в каждой строке одна и та же фигура. Что должно быть в пропущенной ячейке (строка 2 = квадрат, столбец 3 = поворот 90°)?",
    ),
    visual: matrix([
      [{ shape: "triangle", rotate: 0 }, { shape: "triangle", rotate: 45 }, { shape: "triangle", rotate: 90 }],
      [{ shape: "square", rotate: 0 }, { shape: "square", rotate: 45 }, { blank: true }],
      [{ shape: "pentagon", rotate: 0 }, { shape: "pentagon", rotate: 45 }, { shape: "pentagon", rotate: 90 }],
    ]),
    options: [
      { id: "A", text: P("Square rotated 90°", "Квадрат, повёрнутый на 90°") },
      { id: "B", text: P("Square rotated 45°", "Квадрат, повёрнутый на 45°") },
      { id: "C", text: P("Square rotated 0°", "Квадрат, повёрнутый на 0°") },
      { id: "D", text: P("Pentagon rotated 90°", "Пятиугольник, повёрнутый на 90°") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 2 is always a square, and column 3 is always rotated 90°. The missing cell must be a square rotated 90°.",
      "Строка 2 всегда содержит квадрат, а столбец 3 всегда повёрнут на 90°. В пропущенной ячейке должен быть квадрат, повёрнутый на 90°.",
    ),
    weight: 1,
  },
  {
    id: 317,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "The count of shapes equals the row number plus the column number, minus 1. What belongs in the missing cell (row 3, column 3)?",
      "Число фигур равно номеру строки плюс номер столбца, минус 1. Что должно быть в пропущенной ячейке (строка 3, столбец 3)?",
    ),
    visual: matrix([
      [{ shape: "circle", count: 1 }, { shape: "circle", count: 2 }, { shape: "circle", count: 3 }],
      [{ shape: "circle", count: 2 }, { shape: "circle", count: 3 }, { shape: "circle", count: 4 }],
      [{ shape: "circle", count: 3 }, { shape: "circle", count: 4 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("5 circles", "5 кругов") },
      { id: "B", text: P("4 circles", "4 круга") },
      { id: "C", text: P("6 circles", "6 кругов") },
      { id: "D", text: P("3 circles", "3 круга") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Count = row + column − 1. For row 3, column 3: 3 + 3 − 1 = 5.",
      "Количество = строка + столбец − 1. Для строки 3, столбца 3: 3 + 3 − 1 = 5.",
    ),
    weight: 1.5,
  },
  {
    id: 318,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each row's shape rotates by an additional 30° per column, restarting each row at 0°, while the shape itself cycles down each row (triangle, square, pentagon). What belongs in the missing cell?",
      "Фигура в каждой строке поворачивается на дополнительные 30° в каждом столбце, начиная заново с 0° в каждой строке, а сама фигура меняется по строкам (треугольник, квадрат, пятиугольник). Что должно быть в пропущенной ячейке?",
    ),
    visual: matrix([
      [{ shape: "triangle", rotate: 0 }, { shape: "triangle", rotate: 30 }, { shape: "triangle", rotate: 60 }],
      [{ shape: "square", rotate: 0 }, { shape: "square", rotate: 30 }, { shape: "square", rotate: 60 }],
      [{ shape: "pentagon", rotate: 0 }, { shape: "pentagon", rotate: 30 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Pentagon rotated 60°", "Пятиугольник, повёрнутый на 60°") },
      { id: "B", text: P("Pentagon rotated 90°", "Пятиугольник, повёрнутый на 90°") },
      { id: "C", text: P("Square rotated 60°", "Квадрат, повёрнутый на 60°") },
      { id: "D", text: P("Pentagon rotated 30°", "Пятиугольник, повёрнутый на 30°") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 3 uses pentagons, and rotation increases 0°, 30°, 60° across each row. The missing cell is a pentagon rotated 60°.",
      "В строке 3 — пятиугольники, а поворот растёт 0°, 30°, 60° по столбцам. В пропущенной ячейке — пятиугольник, повёрнутый на 60°.",
    ),
    weight: 1.5,
  },
  {
    id: 319,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each cell's value is the product of its row and column numbers. What number belongs in the missing cell (row 3, column 2)?",
      "Значение в каждой ячейке — это произведение номера строки и номера столбца. Какое число должно быть в пропущенной ячейке (строка 3, столбец 2)?",
    ),
    options: [
      { id: "A", text: P("6", "6") },
      { id: "B", text: P("5", "5") },
      { id: "C", text: P("9", "9") },
      { id: "D", text: P("8", "8") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Value = row × column. For row 3, column 2: 3 × 2 = 6.",
      "Значение = строка × столбец. Для строки 3, столбца 2: 3 × 2 = 6.",
    ),
    weight: 1.5,
  },
  {
    id: 320,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each row's fill level rises hollow → half → full moving down the grid within each column, while shape stays constant per column. What belongs in the missing cell (column 2, row 3)?",
      "Заливка в каждом столбце растёт сверху вниз: пусто → наполовину → полностью, а фигура в столбце неизменна. Что должно быть в пропущенной ячейке (столбец 2, строка 3)?",
    ),
    visual: matrix([
      [{ shape: "circle", filled: false }, { shape: "square", filled: false }, { shape: "triangle", filled: false }],
      [{ shape: "circle", half: true }, { shape: "square", half: true }, { shape: "triangle", half: true }],
      [{ shape: "circle", filled: true }, { blank: true }, { shape: "triangle", filled: true }],
    ]),
    options: [
      { id: "A", text: P("Fully filled square", "Полностью закрашенный квадрат") },
      { id: "B", text: P("Hollow square", "Незакрашенный квадрат") },
      { id: "C", text: P("Half-filled square", "Наполовину закрашенный квадрат") },
      { id: "D", text: P("Fully filled circle", "Полностью закрашенный круг") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Column 2 is always a square, and row 3 (bottom row) is always fully filled. The missing cell is a fully filled square.",
      "В столбце 2 всегда квадрат, а нижняя строка (3) всегда полностью закрашена. В пропущенной ячейке — полностью закрашенный квадрат.",
    ),
    weight: 1.5,
  },
  {
    id: 321,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "Each cell's dot count is the row number squared minus the column number. What number belongs in the missing cell (row 3, column 1)?",
      "Число точек в каждой ячейке равно квадрату номера строки минус номер столбца. Какое число должно быть в пропущенной ячейке (строка 3, столбец 1)?",
    ),
    options: [
      { id: "A", text: P("8", "8") },
      { id: "B", text: P("9", "9") },
      { id: "C", text: P("7", "7") },
      { id: "D", text: P("6", "6") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Value = row² − column. For row 3, column 1: 3² − 1 = 9 − 1 = 8.",
      "Значение = строка² − столбец. Для строки 3, столбца 1: 3² − 1 = 9 − 1 = 8.",
    ),
    weight: 2,
  },
  {
    id: 322,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each row's shape shrinks left to right: large, medium, small, while the shape cycles down rows (pentagon, diamond, circle). What belongs in the missing cell?",
      "Фигура в каждой строке уменьшается слева направо: большая, средняя, маленькая, а сама фигура меняется по строкам (пятиугольник, ромб, круг). Что должно быть в пропущенной ячейке?",
    ),
    visual: matrix([
      [{ shape: "pentagon", size: 1.4 }, { shape: "pentagon", size: 1.0 }, { shape: "pentagon", size: 0.6 }],
      [{ shape: "diamond", size: 1.4 }, { shape: "diamond", size: 1.0 }, { shape: "diamond", size: 0.6 }],
      [{ shape: "circle", size: 1.4 }, { blank: true }, { shape: "circle", size: 0.6 }],
    ]),
    options: [
      { id: "A", text: P("Medium circle", "Средний круг") },
      { id: "B", text: P("Large circle", "Большой круг") },
      { id: "C", text: P("Small circle", "Маленький круг") },
      { id: "D", text: P("Medium diamond", "Средний ромб") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 3 uses circles, and every row shrinks large→medium→small left to right. The missing (middle) cell is a medium circle.",
      "В строке 3 — круги, и в каждой строке размер уменьшается большой→средний→маленький слева направо. В пропущенной (средней) ячейке — средний круг.",
    ),
    weight: 1.5,
  },
  {
    id: 323,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "The shape in each cell follows the cycle circle→triangle→pentagon→diamond→square→circle, advancing one step for each column moved right and two steps for each row moved down. Starting from a circle at row 1, column 1, what shape is at row 3, column 3?",
      "Фигура в каждой ячейке следует циклу круг→треугольник→пятиугольник→ромб→квадрат→круг, продвигаясь на один шаг при сдвиге на столбец вправо и на два шага при сдвиге на строку вниз. Начиная с круга в строке 1, столбце 1, какая фигура в строке 3, столбце 3?",
    ),
    options: [
      { id: "A", text: P("Triangle", "Треугольник") },
      { id: "B", text: P("Square", "Квадрат") },
      { id: "C", text: P("Diamond", "Ромб") },
      { id: "D", text: P("Pentagon", "Пятиугольник") },
    ],
    correctAnswer: "A",
    explanation: P(
      "The 5-shape cycle is: circle(0), triangle(1), pentagon(2), diamond(3), square(4). Moving from (1,1) to (3,3) is 2 columns right (2×1=2 steps) plus 2 rows down (2×2=4 steps), totaling 6 steps from circle. 6 mod 5 = 1, which is position 1 in the cycle: triangle.",
      "Цикл из 5 фигур: круг(0), треугольник(1), пятиугольник(2), ромб(3), квадрат(4). Переход от (1,1) к (3,3) — это 2 столбца вправо (2×1=2 шага) плюс 2 строки вниз (2×2=4 шага), итого 6 шагов от круга. 6 mod 5 = 1, что соответствует позиции 1 в цикле: треугольник.",
    ),
    weight: 2,
  },
  {
    id: 324,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Every column has a fixed shape, and every row has a fixed count. What belongs in the missing cell (column 1 = pentagon, row 3 = count 3)?",
      "В каждом столбце фигура фиксирована, а в каждой строке фиксировано количество. Что должно быть в пропущенной ячейке (столбец 1 = пятиугольник, строка 3 = количество 3)?",
    ),
    visual: matrix([
      [{ shape: "pentagon", count: 1 }, { shape: "diamond", count: 1 }, { shape: "circle", count: 1 }],
      [{ shape: "pentagon", count: 2 }, { shape: "diamond", count: 2 }, { shape: "circle", count: 2 }],
      [{ blank: true }, { shape: "diamond", count: 3 }, { shape: "circle", count: 3 }],
    ]),
    options: [
      { id: "A", text: P("3 pentagons", "3 пятиугольника") },
      { id: "B", text: P("2 pentagons", "2 пятиугольника") },
      { id: "C", text: P("3 diamonds", "3 ромба") },
      { id: "D", text: P("1 pentagon", "1 пятиугольник") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Column 1 is always pentagons, and row 3 is always count 3. The missing cell needs 3 pentagons.",
      "В столбце 1 всегда пятиугольники, а в строке 3 всегда количество 3. В пропущенной ячейке нужно 3 пятиугольника.",
    ),
    weight: 1.5,
  },
  {
    id: 325,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "Each cell's dot count follows: count = 2 × row + column − 2. What number belongs in the missing cell (row 3, column 3)?",
      "Число точек в каждой ячейке: количество = 2 × строка + столбец − 2. Какое число должно быть в пропущенной ячейке (строка 3, столбец 3)?",
    ),
    options: [
      { id: "A", text: P("7", "7") },
      { id: "B", text: P("8", "8") },
      { id: "C", text: P("6", "6") },
      { id: "D", text: P("9", "9") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Count = 2×row + column − 2. For row 3, column 3: 2×3 + 3 − 2 = 6 + 3 − 2 = 7.",
      "Количество = 2×строка + столбец − 2. Для строки 3, столбца 3: 2×3 + 3 − 2 = 6 + 3 − 2 = 7.",
    ),
    weight: 2,
  },
  {
    id: 326,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Each row uses the same fill, and each column uses the same shape. What belongs in the missing cell (row 1 = hollow, column 2 = square)?",
      "В каждой строке одинаковая заливка, а в каждом столбце одна и та же фигура. Что должно быть в пропущенной ячейке (строка 1 = пусто, столбец 2 = квадрат)?",
    ),
    visual: matrix([
      [{ shape: "circle", filled: false }, { blank: true }, { shape: "triangle", filled: false }],
      [{ shape: "circle", half: true }, { shape: "square", half: true }, { shape: "triangle", half: true }],
      [{ shape: "circle", filled: true }, { shape: "square", filled: true }, { shape: "triangle", filled: true }],
    ]),
    options: [
      { id: "A", text: P("Hollow square", "Незакрашенный квадрат") },
      { id: "B", text: P("Half-filled square", "Наполовину закрашенный квадрат") },
      { id: "C", text: P("Fully filled square", "Полностью закрашенный квадрат") },
      { id: "D", text: P("Hollow circle", "Незакрашенный круг") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 1 is always hollow, and column 2 is always a square. The missing cell must be a hollow square.",
      "Строка 1 всегда пуста, а столбец 2 всегда содержит квадрат. В пропущенной ячейке должен быть незакрашенный квадрат.",
    ),
    weight: 1,
  },
  {
    id: 327,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Rotation increases by 15° per column and by 45° per row. Starting at 0° in the top-left, what rotation belongs in the missing cell (row 3, column 3)?",
      "Поворот растёт на 15° с каждым столбцом и на 45° с каждой строкой. Начиная с 0° в верхнем левом углу, какой поворот должен быть в пропущенной ячейке (строка 3, столбец 3)?",
    ),
    visual: matrix([
      [{ shape: "square", rotate: 0 }, { shape: "square", rotate: 15 }, { shape: "square", rotate: 30 }],
      [{ shape: "square", rotate: 45 }, { shape: "square", rotate: 60 }, { shape: "square", rotate: 75 }],
      [{ shape: "square", rotate: 90 }, { shape: "square", rotate: 105 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Rotated 120°", "Повёрнут на 120°") },
      { id: "B", text: P("Rotated 135°", "Повёрнут на 135°") },
      { id: "C", text: P("Rotated 105°", "Повёрнут на 105°") },
      { id: "D", text: P("Rotated 150°", "Повёрнут на 150°") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Rotation = (row−1)×45° + (column−1)×15°. For row 3, column 3: 2×45 + 2×15 = 90 + 30 = 120°.",
      "Поворот = (строка−1)×45° + (столбец−1)×15°. Для строки 3, столбца 3: 2×45 + 2×15 = 90 + 30 = 120°.",
    ),
    weight: 1.5,
  },
  {
    id: 328,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each row's shape count doubles left to right, starting from a row-specific value (1, 2, 3). What belongs in the missing cell (row 3, column 3)?",
      "Количество фигур в каждой строке удваивается слева направо, начиная с числа, характерного для строки (1, 2, 3). Что должно быть в пропущенной ячейке (строка 3, столбец 3)?",
    ),
    visual: matrix([
      [{ shape: "diamond", count: 1 }, { shape: "diamond", count: 2 }, { shape: "diamond", count: 4 }],
      [{ shape: "diamond", count: 2 }, { shape: "diamond", count: 4 }, { shape: "diamond", count: 4 }],
      [{ shape: "diamond", count: 3 }, { shape: "diamond", count: 4 }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("4 diamonds (capped visual max)", "4 ромба (максимум для отображения)") },
      { id: "B", text: P("6 diamonds", "6 ромбов") },
      { id: "C", text: P("2 diamonds", "2 ромба") },
      { id: "D", text: P("12 diamonds", "12 ромбов") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 3 starts at 3 and doubles: 3, 6, 12. Since the display caps at 4 shapes maximum, the visual shows the capped value of 4 diamonds.",
      "Строка 3 начинается с 3 и удваивается: 3, 6, 12. Так как максимум отображения — 4 фигуры, на изображении показано ограниченное значение — 4 ромба.",
    ),
    weight: 1.5,
  },
  {
    id: 329,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "Fill level advances one stage (hollow→half→full→hollow...) for every column moved right, and two stages for every row moved down. Starting hollow at row 1, column 1, what fill is at row 3, column 2?",
      "Уровень заливки продвигается на одну стадию (пусто→наполовину→полностью→пусто...) при сдвиге на столбец вправо и на две стадии при сдвиге на строку вниз. Начиная с «пусто» в строке 1, столбце 1, какая заливка в строке 3, столбце 2?",
    ),
    options: [
      { id: "A", text: P("Fully filled", "Полностью закрашено") },
      { id: "B", text: P("Hollow", "Не закрашено") },
      { id: "C", text: P("Half-filled", "Наполовину закрашено") },
      { id: "D", text: P("Cannot be determined", "Невозможно определить") },
    ],
    correctAnswer: "A",
    explanation: P(
      "From (1,1) to (3,2): 2 rows down × 2 stages = 4 stages, plus 1 column right × 1 stage = 1 stage, total 5 stages. With a 3-stage cycle (hollow, half, full), 5 mod 3 = 2 stages past hollow: hollow→half→full. Landing on full.",
      "От (1,1) до (3,2): 2 строки вниз × 2 стадии = 4 стадии, плюс 1 столбец вправо × 1 стадия = 1 стадия, итого 5 стадий. При трёхстадийном цикле (пусто, наполовину, полностью) 5 mod 3 = 2 стадии после «пусто»: пусто→наполовину→полностью. Итог — полностью закрашено.",
    ),
    weight: 2,
  },
  {
    id: 330,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Every row keeps the same shape, and count increases by 1 down each column left to right: 2, 3, 4. What belongs in the missing cell?",
      "В каждой строке одна и та же фигура, а количество увеличивается на 1 слева направо: 2, 3, 4. Что должно быть в пропущенной ячейке?",
    ),
    visual: matrix([
      [{ shape: "triangle", count: 2 }, { shape: "triangle", count: 3 }, { shape: "triangle", count: 4 }],
      [{ shape: "square", count: 2 }, { shape: "square", count: 3 }, { shape: "square", count: 4 }],
      [{ shape: "circle", count: 2 }, { blank: true }, { shape: "circle", count: 4 }],
    ]),
    options: [
      { id: "A", text: P("3 circles", "3 круга") },
      { id: "B", text: P("2 circles", "2 круга") },
      { id: "C", text: P("4 circles", "4 круга") },
      { id: "D", text: P("5 circles", "5 кругов") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 3 uses circles, and the counts across every row go 2, 3, 4. The missing (middle) cell needs 3 circles.",
      "В строке 3 — круги, и количество по столбцам в каждой строке идёт 2, 3, 4. В пропущенной (средней) ячейке нужно 3 круга.",
    ),
    weight: 1,
  },
  {
    id: 331,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "The shape rotates 90° per column and stays fixed per row, while size grows down each row. What belongs in the missing cell (row 3, column 2)?",
      "Фигура поворачивается на 90° по столбцам и неизменна по строкам, а размер растёт вниз по строкам. Что должно быть в пропущенной ячейке (строка 3, столбец 2)?",
    ),
    visual: matrix([
      [{ shape: "pentagon", rotate: 0, size: 0.6 }, { shape: "pentagon", rotate: 90, size: 0.6 }, { shape: "pentagon", rotate: 180, size: 0.6 }],
      [{ shape: "pentagon", rotate: 0, size: 1.0 }, { shape: "pentagon", rotate: 90, size: 1.0 }, { shape: "pentagon", rotate: 180, size: 1.0 }],
      [{ shape: "pentagon", rotate: 0, size: 1.4 }, { blank: true }, { shape: "pentagon", rotate: 180, size: 1.4 }],
    ]),
    options: [
      { id: "A", text: P("Large pentagon rotated 90°", "Большой пятиугольник, повёрнутый на 90°") },
      { id: "B", text: P("Medium pentagon rotated 90°", "Средний пятиугольник, повёрнутый на 90°") },
      { id: "C", text: P("Large pentagon rotated 0°", "Большой пятиугольник, повёрнутый на 0°") },
      { id: "D", text: P("Small pentagon rotated 90°", "Маленький пятиугольник, повёрнутый на 90°") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Column 2 is always rotated 90°, and row 3 is always the large size. The missing cell is a large pentagon rotated 90°.",
      "Столбец 2 всегда повёрнут на 90°, а строка 3 всегда большого размера. В пропущенной ячейке — большой пятиугольник, повёрнутый на 90°.",
    ),
    weight: 1.5,
  },
  {
    id: 332,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "Each cell's value equals its row number cubed divided by its column number. What number belongs in the missing cell (row 2, column 4 — imagine a 2×4 extension of the pattern using values 8÷1, 8÷2, 8÷4, and the missing one is 8÷ column 3)?",
      "Значение в каждой ячейке равно кубу номера строки, делённому на номер столбца. Какое число должно быть в пропущенной ячейке (строка 2, столбец 3, где значение = 2³ ÷ 3)?",
    ),
    options: [
      { id: "A", text: P("2.67", "2.67") },
      { id: "B", text: P("4", "4") },
      { id: "C", text: P("8", "8") },
      { id: "D", text: P("1.33", "1.33") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Value = row³ ÷ column. For row 2, column 3: 2³ ÷ 3 = 8 ÷ 3 ≈ 2.67.",
      "Значение = строка³ ÷ столбец. Для строки 2, столбца 3: 2³ ÷ 3 = 8 ÷ 3 ≈ 2.67.",
    ),
    weight: 2,
  },
  {
    id: 333,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each column's fill stays constant, and each row's shape stays constant. What belongs in the missing cell (row 2 = square, column 3 = fully filled)?",
      "В каждом столбце заливка неизменна, а в каждой строке неизменна фигура. Что должно быть в пропущенной ячейке (строка 2 = квадрат, столбец 3 = полностью закрашено)?",
    ),
    visual: matrix([
      [{ shape: "circle", filled: false }, { shape: "circle", half: true }, { shape: "circle", filled: true }],
      [{ shape: "square", filled: false }, { shape: "square", half: true }, { blank: true }],
      [{ shape: "triangle", filled: false }, { shape: "triangle", half: true }, { shape: "triangle", filled: true }],
    ]),
    options: [
      { id: "A", text: P("Fully filled square", "Полностью закрашенный квадрат") },
      { id: "B", text: P("Half-filled square", "Наполовину закрашенный квадрат") },
      { id: "C", text: P("Hollow square", "Незакрашенный квадрат") },
      { id: "D", text: P("Fully filled triangle", "Полностью закрашенный треугольник") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 2 is always a square, and column 3 is always fully filled. The missing cell must be a fully filled square.",
      "Строка 2 всегда содержит квадрат, а столбец 3 всегда полностью закрашен. В пропущенной ячейке должен быть полностью закрашенный квадрат.",
    ),
    weight: 1.5,
  },
  {
    id: 334,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each cell's dot count is the row number multiplied by 2, plus the column number multiplied by 0 (i.e. it only depends on the row): row 1 → 2, row 2 → 4, row 3 → 6. What number belongs in the missing cell (row 3, any column)?",
      "Число точек в каждой ячейке равно номеру строки, умноженному на 2 (столбец не влияет): строка 1 → 2, строка 2 → 4, строка 3 → 6. Какое число должно быть в пропущенной ячейке (строка 3, любой столбец)?",
    ),
    options: [
      { id: "A", text: P("6", "6") },
      { id: "B", text: P("5", "5") },
      { id: "C", text: P("8", "8") },
      { id: "D", text: P("3", "3") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Value depends only on the row: value = row × 2. For row 3: 3 × 2 = 6.",
      "Значение зависит только от строки: значение = строка × 2. Для строки 3: 3 × 2 = 6.",
    ),
    weight: 1.5,
  },
  {
    id: 335,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "The shape cycles diamond→pentagon→square (period 3) reading left-to-right then top-to-bottom (like reading text), continuing across row boundaries. What shape belongs in the missing 9th (bottom-right) cell?",
      "Фигура следует циклу ромб→пятиугольник→квадрат (период 3), если читать слева направо и сверху вниз (как текст), продолжая цикл через границы строк. Какая фигура должна быть в пропущенной 9-й (нижней правой) ячейке?",
    ),
    visual: matrix([
      [{ shape: "diamond" }, { shape: "pentagon" }, { shape: "square" }],
      [{ shape: "diamond" }, { shape: "pentagon" }, { shape: "square" }],
      [{ shape: "diamond" }, { shape: "pentagon" }, { blank: true }],
    ]),
    options: [
      { id: "A", text: P("Square", "Квадрат") },
      { id: "B", text: P("Diamond", "Ромб") },
      { id: "C", text: P("Pentagon", "Пятиугольник") },
      { id: "D", text: P("Circle", "Круг") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Reading left-to-right, top-to-bottom, cell 9 is the 9th item in the repeating 3-cycle (diamond, pentagon, square). 9 mod 3 = 0, which corresponds to the last item of the cycle: square.",
      "При чтении слева направо, сверху вниз, ячейка 9 — это 9-й элемент повторяющегося цикла из 3 (ромб, пятиугольник, квадрат). 9 mod 3 = 0, что соответствует последнему элементу цикла: квадрат.",
    ),
    weight: 2,
  },
  {
    id: 336,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Every column keeps the same size, and every row keeps the same shape. What belongs in the missing cell (row 2 = diamond, column 1 = large)?",
      "В каждом столбце размер неизменен, а в каждой строке неизменна фигура. Что должно быть в пропущенной ячейке (строка 2 = ромб, столбец 1 = большой)?",
    ),
    visual: matrix([
      [{ shape: "circle", size: 1.4 }, { shape: "circle", size: 1.0 }, { shape: "circle", size: 0.6 }],
      [{ blank: true }, { shape: "diamond", size: 1.0 }, { shape: "diamond", size: 0.6 }],
      [{ shape: "square", size: 1.4 }, { shape: "square", size: 1.0 }, { shape: "square", size: 0.6 }],
    ]),
    options: [
      { id: "A", text: P("Large diamond", "Большой ромб") },
      { id: "B", text: P("Small diamond", "Маленький ромб") },
      { id: "C", text: P("Medium diamond", "Средний ромб") },
      { id: "D", text: P("Large circle", "Большой круг") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 2 is always a diamond, and column 1 is always the large size. The missing cell must be a large diamond.",
      "Строка 2 всегда содержит ромб, а столбец 1 всегда большого размера. В пропущенной ячейке должен быть большой ромб.",
    ),
    weight: 1,
  },
  {
    id: 337,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each cell's dot count is the absolute difference between the row and column numbers, plus 1. What number belongs in the missing cell (row 1, column 3)?",
      "Число точек в каждой ячейке равно модулю разности номера строки и столбца плюс 1. Какое число должно быть в пропущенной ячейке (строка 1, столбец 3)?",
    ),
    options: [
      { id: "A", text: P("3", "3") },
      { id: "B", text: P("2", "2") },
      { id: "C", text: P("1", "1") },
      { id: "D", text: P("4", "4") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Value = |row − column| + 1. For row 1, column 3: |1 − 3| + 1 = 2 + 1 = 3.",
      "Значение = |строка − столбец| + 1. Для строки 1, столбца 3: |1 − 3| + 1 = 2 + 1 = 3.",
    ),
    weight: 1.5,
  },
  {
    id: 338,
    category: "matrix",
    difficulty: "medium",
    prompt: P(
      "Each row's shape changes, and fill increases hollow→half→full moving right, but the shape resets each row (triangle, diamond, pentagon). What belongs in the missing cell (row 3, column 2)?",
      "Фигура в каждой строке своя, а заливка растёт пусто→наполовину→полностью слева направо, при этом фигура меняется по строкам (треугольник, ромб, пятиугольник). Что должно быть в пропущенной ячейке (строка 3, столбец 2)?",
    ),
    visual: matrix([
      [{ shape: "triangle", filled: false }, { shape: "triangle", half: true }, { shape: "triangle", filled: true }],
      [{ shape: "diamond", filled: false }, { shape: "diamond", half: true }, { shape: "diamond", filled: true }],
      [{ shape: "pentagon", filled: false }, { blank: true }, { shape: "pentagon", filled: true }],
    ]),
    options: [
      { id: "A", text: P("Half-filled pentagon", "Наполовину закрашенный пятиугольник") },
      { id: "B", text: P("Hollow pentagon", "Незакрашенный пятиугольник") },
      { id: "C", text: P("Fully filled pentagon", "Полностью закрашенный пятиугольник") },
      { id: "D", text: P("Half-filled diamond", "Наполовину закрашенный ромб") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 3 uses pentagons, and every row goes hollow, half, full left to right. The missing (middle) cell is a half-filled pentagon.",
      "В строке 3 — пятиугольники, и в каждой строке заливка идёт пусто, наполовину, полностью слева направо. В пропущенной (средней) ячейке — наполовину закрашенный пятиугольник.",
    ),
    weight: 1.5,
  },
  {
    id: 339,
    category: "matrix",
    difficulty: "hard",
    prompt: P(
      "Each cell's dot count is the row number squared plus the column number squared, minus 8. What number belongs in the missing cell (row 3, column 1)?",
      "Число точек в каждой ячейке равно квадрату номера строки плюс квадрат номера столбца, минус 8. Какое число должно быть в пропущенной ячейке (строка 3, столбец 1)?",
    ),
    options: [
      { id: "A", text: P("2", "2") },
      { id: "B", text: P("3", "3") },
      { id: "C", text: P("1", "1") },
      { id: "D", text: P("4", "4") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Value = row² + column² − 8. For row 3, column 1: 9 + 1 − 8 = 2.",
      "Значение = строка² + столбец² − 8. Для строки 3, столбца 1: 9 + 1 − 8 = 2.",
    ),
    weight: 2,
  },
  {
    id: 340,
    category: "matrix",
    difficulty: "easy",
    prompt: P(
      "Each row keeps the same rotation, and each column keeps the same shape. What belongs in the missing cell (row 3 = rotated 180°, column 2 = diamond)?",
      "В каждой строке один и тот же поворот, а в каждом столбце одна и та же фигура. Что должно быть в пропущенной ячейке (строка 3 = поворот 180°, столбец 2 = ромб)?",
    ),
    visual: matrix([
      [{ shape: "triangle", rotate: 0 }, { shape: "diamond", rotate: 0 }, { shape: "square", rotate: 0 }],
      [{ shape: "triangle", rotate: 90 }, { shape: "diamond", rotate: 90 }, { shape: "square", rotate: 90 }],
      [{ shape: "triangle", rotate: 180 }, { blank: true }, { shape: "square", rotate: 180 }],
    ]),
    options: [
      { id: "A", text: P("Diamond rotated 180°", "Ромб, повёрнутый на 180°") },
      { id: "B", text: P("Diamond rotated 90°", "Ромб, повёрнутый на 90°") },
      { id: "C", text: P("Triangle rotated 180°", "Треугольник, повёрнутый на 180°") },
      { id: "D", text: P("Diamond rotated 0°", "Ромб, повёрнутый на 0°") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Row 3 is always rotated 180°, and column 2 is always a diamond. The missing cell must be a diamond rotated 180°.",
      "Строка 3 всегда повёрнута на 180°, а столбец 2 всегда содержит ромб. В пропущенной ячейке должен быть ромб, повёрнутый на 180°.",
    ),
    weight: 1.5,
  },
];
