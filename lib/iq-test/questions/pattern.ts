import type { CellSpec, Question, VisualSpec } from "../types";

const P = (en: string, ru: string) => ({ en, ru });

const seq = (cells: CellSpec[]): VisualSpec => ({
  kind: "sequence",
  cells,
});

export const patternQuestions: Question[] = [
  {
    id: 101,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "What shape comes next in the sequence?",
      "Какая фигура следующая в последовательности?",
    ),
    visual: seq([
      { shape: "circle" }, { shape: "square" }, { shape: "triangle" },
      { shape: "circle" }, { shape: "square" }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Circle", "Круг") },
      { id: "B", text: P("Square", "Квадрат") },
      { id: "C", text: P("Pentagon", "Пятиугольник") },
      { id: "D", text: P("Triangle", "Треугольник") },
    ],
    correctAnswer: "D",
    explanation: P(
      "The sequence repeats a 3-item cycle: circle, square, triangle. After the second square comes triangle.",
      "Последовательность повторяет цикл из трёх фигур: круг, квадрат, треугольник. После второго квадрата идёт треугольник.",
    ),
    weight: 1,
  },
  {
    id: 102,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "Which shape continues the sequence?",
      "Какая фигура продолжает последовательность?",
    ),
    visual: seq([
      { shape: "circle", filled: true }, { shape: "circle", filled: false },
      { shape: "circle", filled: true }, { shape: "circle", filled: false },
      { shape: "circle", filled: true }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Filled circle", "Закрашенный круг") },
      { id: "B", text: P("Hollow circle", "Незакрашенный круг") },
      { id: "C", text: P("Filled square", "Закрашенный квадрат") },
      { id: "D", text: P("Hollow square", "Незакрашенный квадрат") },
    ],
    correctAnswer: "B",
    explanation: P(
      "The fill alternates strictly between filled and hollow. The fifth circle is filled, so the sixth must be hollow.",
      "Заливка строго чередуется. Пятый круг закрашен, значит шестой должен быть незакрашенным.",
    ),
    weight: 1,
  },
  {
    id: 103,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The circles cycle through three sizes. What size comes next?",
      "Круги повторяют цикл из трёх размеров. Какой размер следующий?",
    ),
    visual: seq([
      { shape: "circle", size: 0.5 }, { shape: "circle", size: 1 }, { shape: "circle", size: 1.5 },
      { shape: "circle", size: 0.5 }, { shape: "circle", size: 1 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Small", "Маленький") },
      { id: "B", text: P("Medium", "Средний") },
      { id: "C", text: P("Large", "Большой") },
      { id: "D", text: P("Extra large", "Очень большой") },
    ],
    correctAnswer: "C",
    explanation: P(
      "The cycle is small, medium, large, repeating. After the second medium comes large.",
      "Цикл: маленький, средний, большой — и повторяется. После второго среднего идёт большой.",
    ),
    weight: 1,
  },
  {
    id: 104,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The triangle rotates by a fixed amount each step. What is its next orientation?",
      "Треугольник каждый раз поворачивается на фиксированный угол. Каково его следующее положение?",
    ),
    visual: seq([
      { shape: "triangle", rotate: 0 }, { shape: "triangle", rotate: 90 },
      { shape: "triangle", rotate: 180 }, { shape: "triangle", rotate: 270 },
      { shape: "triangle", rotate: 0 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Rotated 0°", "Повёрнут на 0°") },
      { id: "B", text: P("Rotated 90°", "Повёрнут на 90°") },
      { id: "C", text: P("Rotated 180°", "Повёрнут на 180°") },
      { id: "D", text: P("Rotated 270°", "Повёрнут на 270°") },
    ],
    correctAnswer: "B",
    explanation: P(
      "Each step rotates the triangle 90° clockwise, cycling 0°→90°→180°→270°→0°. After 0° comes 90°.",
      "Каждый шаг поворачивает треугольник на 90° по часовой стрелке: 0°→90°→180°→270°→0°. После 0° идёт 90°.",
    ),
    weight: 1,
  },
  {
    id: 105,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The number of dots increases by one each frame, and the fill alternates. How many dots appear in the missing frame, and are they filled or hollow?",
      "Число точек увеличивается на одну в каждом кадре, а заливка чередуется. Сколько точек в пропущенном кадре и закрашены ли они?",
    ),
    visual: seq([
      { shape: "circle", filled: true, count: 1 }, { shape: "circle", filled: false, count: 2 },
      { shape: "circle", filled: true, count: 3 }, { shape: "circle", filled: false, count: 4 },
      { shape: "circle", filled: true, count: 5 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("4 filled dots", "4 закрашенные точки") },
      { id: "B", text: P("5 hollow dots", "5 незакрашенных точек") },
      { id: "C", text: P("6 hollow dots", "6 незакрашенных точек") },
      { id: "D", text: P("6 filled dots", "6 закрашенных точек") },
    ],
    correctAnswer: "C",
    explanation: P(
      "Count increases by 1 each frame (1,2,3,4,5,6) and fill alternates filled/hollow. Frame 6 must have 6 hollow dots.",
      "Число точек растёт на 1 в каждом кадре (1,2,3,4,5,6), заливка чередуется. В 6-м кадре должно быть 6 незакрашенных точек.",
    ),
    weight: 1.5,
  },
  {
    id: 106,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "Each shape grows larger and gains one extra copy at the same time. What comes next?",
      "Каждая фигура становится крупнее и одновременно добавляется ещё одна копия. Что следующее?",
    ),
    visual: seq([
      { shape: "square", size: 0.6, count: 1 }, { shape: "square", size: 0.9, count: 2 },
      { shape: "square", size: 1.2, count: 3 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("3 medium squares", "3 средних квадрата") },
      { id: "B", text: P("4 large squares", "4 больших квадрата") },
      { id: "C", text: P("4 small squares", "4 маленьких квадрата") },
      { id: "D", text: P("5 large squares", "5 больших квадратов") },
    ],
    correctAnswer: "B",
    explanation: P(
      "Both the size and the count increase by one step each frame. After 3 medium-large squares comes 4 large squares.",
      "И размер, и количество увеличиваются на шаг в каждом кадре. После 3 крупных квадратов идут 4 крупных квадрата.",
    ),
    weight: 1.5,
  },
  {
    id: 107,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The shape cycles through hollow → half-filled → fully filled while cycling through circle → square → triangle. What is the missing shape?",
      "Фигура циклично проходит незакрашенная → наполовину → полностью закрашенная, одновременно меняясь круг → квадрат → треугольник. Какая фигура пропущена?",
    ),
    visual: seq([
      { shape: "circle", filled: false }, { shape: "square", half: true },
      { shape: "triangle", filled: true }, { shape: "circle", filled: false },
      { shape: "square", half: true }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Fully filled triangle", "Полностью закрашенный треугольник") },
      { id: "B", text: P("Hollow triangle", "Незакрашенный треугольник") },
      { id: "C", text: P("Half-filled triangle", "Наполовину закрашенный треугольник") },
      { id: "D", text: P("Fully filled circle", "Полностью закрашенный круг") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Both the shape cycle (circle, square, triangle) and fill cycle (hollow, half, filled) repeat with period 3. Position 6 matches position 3: fully filled triangle.",
      "Цикл фигур (круг, квадрат, треугольник) и цикл заливки (пусто, наполовину, полностью) повторяются с периодом 3. Позиция 6 совпадает с позицией 3: полностью закрашенный треугольник.",
    ),
    weight: 1.5,
  },
  {
    id: 108,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The pentagon's fill level increases while it also rotates by 36° each step. What describes the missing frame?",
      "Уровень заливки пятиугольника растёт, а сам он поворачивается на 36° на каждом шаге. Что соответствует пропущенному кадру?",
    ),
    visual: seq([
      { shape: "pentagon", filled: false, rotate: 0 }, { shape: "pentagon", half: true, rotate: 36 },
      { shape: "pentagon", filled: true, rotate: 72 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Hollow pentagon rotated 108°", "Незакрашенный пятиугольник, повёрнутый на 108°") },
      { id: "B", text: P("Half-filled pentagon rotated 108°", "Пятиугольник наполовину, повёрнутый на 108°") },
      { id: "C", text: P("Filled pentagon rotated 90°", "Закрашенный пятиугольник, повёрнутый на 90°") },
      { id: "D", text: P("Filled pentagon rotated 108°, restarting the fill cycle", "Закрашенный пятиугольник, повёрнутый на 108°, с новым циклом заливки") },
    ],
    correctAnswer: "A",
    explanation: P(
      "The fill cycle (hollow, half, filled) restarts every 3 steps while rotation keeps increasing by 36°. Step 4 restarts at hollow, rotated to 108°.",
      "Цикл заливки (пусто, наполовину, полностью) начинается заново каждые 3 шага, а поворот продолжает расти на 36°. Шаг 4 снова начинается с пустого, повёрнутого на 108°.",
    ),
    weight: 1.5,
  },
  {
    id: 109,
    category: "pattern",
    difficulty: "hard",
    prompt: P(
      "Two independent rules apply: the shape cycles circle → square → triangle → pentagon (period 4), and the count of shapes increases by 1 each frame, resetting to 1 after reaching 4. What is in frame 7?",
      "Действуют два независимых правила: фигура циклично меняется круг → квадрат → треугольник → пятиугольник (период 4), а количество растёт на 1 в каждом кадре, сбрасываясь до 1 после 4. Что в 7-м кадре?",
    ),
    options: [
      { id: "A", text: P("3 triangles", "3 треугольника") },
      { id: "B", text: P("3 squares", "3 квадрата") },
      { id: "C", text: P("2 pentagons", "2 пятиугольника") },
      { id: "D", text: P("4 triangles", "4 треугольника") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Shape cycles with period 4: frame 7 → position (7−1) mod 4 = 2 → triangle. Count cycles 1,2,3,4,1,2,3: frame 7 → 3. Answer: 3 triangles.",
      "Фигура повторяется с периодом 4: кадр 7 → позиция (7−1) mod 4 = 2 → треугольник. Количество: 1,2,3,4,1,2,3 — кадр 7 → 3. Ответ: 3 треугольника.",
    ),
    weight: 2,
  },
  {
    id: 110,
    category: "pattern",
    difficulty: "hard",
    prompt: P(
      "A square rotates 30° clockwise each frame while its fill alternates every frame starting filled. What is the 8th frame?",
      "Квадрат поворачивается на 30° по часовой стрелке в каждом кадре, а заливка чередуется, начиная с закрашенного. Каким будет 8-й кадр?",
    ),
    options: [
      { id: "A", text: P("Rotated 210°, hollow", "Повёрнут на 210°, не закрашен") },
      { id: "B", text: P("Rotated 240°, filled", "Повёрнут на 240°, закрашен") },
      { id: "C", text: P("Rotated 210°, filled", "Повёрнут на 210°, закрашен") },
      { id: "D", text: P("Rotated 240°, hollow", "Повёрнут на 240°, не закрашен") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Rotation at frame n is (n−1)×30°, so frame 8 is 7×30° = 210°. Fill alternates starting filled at frame 1, so odd frames are filled and even frames are hollow — frame 8 is hollow.",
      "Поворот в кадре n равен (n−1)×30°, значит кадр 8 — это 7×30° = 210°. Заливка чередуется, начиная с закрашенного в кадре 1, значит нечётные кадры закрашены, чётные — нет. Кадр 8 не закрашен.",
    ),
    weight: 2,
  },
  {
    id: 111,
    category: "pattern",
    difficulty: "hard",
    prompt: P(
      "The size doubles every other frame and stays the same otherwise, starting at size 1: 1, 1, 2, 2, 4, 4, __. What is the next size?",
      "Размер удваивается через кадр и остаётся прежним в промежуточном, начиная с 1: 1, 1, 2, 2, 4, 4, __. Каков следующий размер?",
    ),
    options: [
      { id: "A", text: P("4", "4") },
      { id: "B", text: P("6", "6") },
      { id: "C", text: P("8", "8") },
      { id: "D", text: P("16", "16") },
    ],
    correctAnswer: "C",
    explanation: P(
      "Sizes repeat each value once then double: 1,1,2,2,4,4,8,8... The 7th term is 8.",
      "Каждый размер повторяется дважды, затем удваивается: 1,1,2,2,4,4,8,8... 7-й член равен 8.",
    ),
    weight: 2,
  },
  {
    id: 112,
    category: "pattern",
    difficulty: "hard",
    prompt: P(
      "A shape cycle of circle → triangle (period 2) is combined with a fill cycle of filled → half → hollow (period 3). What shape and fill appear in frame 6?",
      "Цикл фигур круг → треугольник (период 2) сочетается с циклом заливки закрашено → наполовину → пусто (период 3). Какая фигура и заливка в 6-м кадре?",
    ),
    options: [
      { id: "A", text: P("Circle, hollow", "Круг, не закрашен") },
      { id: "B", text: P("Triangle, hollow", "Треугольник, не закрашен") },
      { id: "C", text: P("Triangle, filled", "Треугольник, закрашен") },
      { id: "D", text: P("Circle, filled", "Круг, закрашен") },
    ],
    correctAnswer: "B",
    explanation: P(
      "Frame 6: shape position (6−1) mod 2 = 1 → triangle. Fill position (6−1) mod 3 = 2 → hollow (0=filled,1=half,2=hollow). Answer: triangle, hollow.",
      "Кадр 6: позиция фигуры (6−1) mod 2 = 1 → треугольник. Позиция заливки (6−1) mod 3 = 2 → пусто (0=закрашено,1=наполовину,2=пусто). Ответ: треугольник, не закрашен.",
    ),
    weight: 2,
  },
  {
    id: 113,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The number of sides in the shape increases by one every frame: triangle, square, pentagon, __. What comes next?",
      "Число сторон фигуры увеличивается на одну в каждом кадре: треугольник, квадрат, пятиугольник, __. Что следующее?",
    ),
    visual: seq([
      { shape: "triangle" }, { shape: "square" }, { shape: "pentagon" }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Hexagon (6 sides)", "Шестиугольник (6 сторон)") },
      { id: "B", text: P("Circle", "Круг") },
      { id: "C", text: P("Another pentagon", "Ещё один пятиугольник") },
      { id: "D", text: P("Square", "Квадрат") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Sides increase by 1 each step: 3, 4, 5, so the next shape has 6 sides — a hexagon.",
      "Число сторон растёт на 1 на каждом шаге: 3, 4, 5, значит следующая фигура имеет 6 сторон — шестиугольник.",
    ),
    weight: 1.5,
  },
  {
    id: 114,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The diamond alternates large and small every other frame. What size is the 6th frame?",
      "Ромб чередует большой и маленький размер через кадр. Каков размер 6-го кадра?",
    ),
    visual: seq([
      { shape: "diamond", size: 1.4 }, { shape: "diamond", size: 0.7 },
      { shape: "diamond", size: 1.4 }, { shape: "diamond", size: 0.7 },
      { shape: "diamond", size: 1.4 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Large", "Большой") },
      { id: "B", text: P("Small", "Маленький") },
      { id: "C", text: P("Medium", "Средний") },
      { id: "D", text: P("Extra large", "Очень большой") },
    ],
    correctAnswer: "B",
    explanation: P(
      "The size strictly alternates large, small, large, small... Frame 5 is large, so frame 6 must be small.",
      "Размер строго чередуется: большой, маленький, большой, маленький... 5-й кадр большой, значит 6-й — маленький.",
    ),
    weight: 1,
  },
  {
    id: 115,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The square rotates by a fixed amount each step. What is its next orientation?",
      "Квадрат каждый раз поворачивается на фиксированный угол. Каково его следующее положение?",
    ),
    visual: seq([
      { shape: "square", rotate: 0 }, { shape: "square", rotate: 90 },
      { shape: "square", rotate: 180 }, { shape: "square", rotate: 270 },
      { shape: "square", rotate: 0 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Rotated 0°", "Повёрнут на 0°") },
      { id: "B", text: P("Rotated 90°", "Повёрнут на 90°") },
      { id: "C", text: P("Rotated 180°", "Повёрнут на 180°") },
      { id: "D", text: P("Rotated 270°", "Повёрнут на 270°") },
    ],
    correctAnswer: "B",
    explanation: P(
      "Each step rotates the square 90° clockwise, cycling 0°→90°→180°→270°→0°. After 0° comes 90°.",
      "Каждый шаг поворачивает квадрат на 90° по часовой стрелке: 0°→90°→180°→270°→0°. После 0° идёт 90°.",
    ),
    weight: 1,
  },
  {
    id: 116,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The diamond's fill strictly alternates. What comes next?",
      "Заливка ромба строго чередуется. Что следующее?",
    ),
    visual: seq([
      { shape: "diamond", filled: false }, { shape: "diamond", filled: true },
      { shape: "diamond", filled: false }, { shape: "diamond", filled: true },
      { shape: "diamond", filled: false }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Filled diamond", "Закрашенный ромб") },
      { id: "B", text: P("Hollow diamond", "Незакрашенный ромб") },
      { id: "C", text: P("Half-filled diamond", "Наполовину закрашенный ромб") },
      { id: "D", text: P("Filled square", "Закрашенный квадрат") },
    ],
    correctAnswer: "A",
    explanation: P(
      "The fill alternates strictly between hollow and filled. The fifth diamond is hollow, so the sixth must be filled.",
      "Заливка строго чередуется между пусто и закрашено. Пятый ромб не закрашен, значит шестой должен быть закрашен.",
    ),
    weight: 1,
  },
  {
    id: 117,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The pentagons cycle through three sizes. What size comes next?",
      "Пятиугольники повторяют цикл из трёх размеров. Какой размер следующий?",
    ),
    visual: seq([
      { shape: "pentagon", size: 0.5 }, { shape: "pentagon", size: 1 }, { shape: "pentagon", size: 1.5 },
      { shape: "pentagon", size: 0.5 }, { shape: "pentagon", size: 1 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Small", "Маленький") },
      { id: "B", text: P("Medium", "Средний") },
      { id: "C", text: P("Large", "Большой") },
      { id: "D", text: P("Extra large", "Очень большой") },
    ],
    correctAnswer: "C",
    explanation: P(
      "The cycle is small, medium, large, repeating. After the second medium comes large.",
      "Цикл: маленький, средний, большой — и повторяется. После второго среднего идёт большой.",
    ),
    weight: 1,
  },
  {
    id: 118,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The number of triangles cycles 1, 2, 3, and repeats. How many triangles appear next?",
      "Число треугольников повторяет цикл 1, 2, 3. Сколько треугольников в следующем кадре?",
    ),
    visual: seq([
      { shape: "triangle", count: 1 }, { shape: "triangle", count: 2 }, { shape: "triangle", count: 3 },
      { shape: "triangle", count: 1 }, { shape: "triangle", count: 2 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("1 triangle", "1 треугольник") },
      { id: "B", text: P("2 triangles", "2 треугольника") },
      { id: "C", text: P("3 triangles", "3 треугольника") },
      { id: "D", text: P("4 triangles", "4 треугольника") },
    ],
    correctAnswer: "C",
    explanation: P(
      "The count cycles 1, 2, 3, repeating with period 3. After the second cycle's '2' comes '3'.",
      "Количество повторяет цикл 1, 2, 3 с периодом 3. После «2» второго цикла идёт «3».",
    ),
    weight: 1,
  },
  {
    id: 119,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The circle's fill cycles hollow, half, full, and repeats. What comes next?",
      "Заливка круга повторяет цикл: пусто, наполовину, полностью. Что дальше?",
    ),
    visual: seq([
      { shape: "circle", filled: false }, { shape: "circle", half: true }, { shape: "circle", filled: true },
      { shape: "circle", filled: false }, { shape: "circle", half: true }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Fully filled circle", "Полностью закрашенный круг") },
      { id: "B", text: P("Hollow circle", "Незакрашенный круг") },
      { id: "C", text: P("Half-filled circle", "Наполовину закрашенный круг") },
      { id: "D", text: P("Fully filled square", "Полностью закрашенный квадрат") },
    ],
    correctAnswer: "A",
    explanation: P(
      "The fill cycle (hollow, half, full) repeats with period 3. After the second cycle's 'half' comes 'full'.",
      "Цикл заливки (пусто, наполовину, полностью) повторяется с периодом 3. После «наполовину» второго цикла идёт «полностью».",
    ),
    weight: 1.5,
  },
  {
    id: 120,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The square rotates 60° more each step. What is its next orientation?",
      "Квадрат каждый раз поворачивается на 60° больше. Каково его следующее положение?",
    ),
    visual: seq([
      { shape: "square", rotate: 0 }, { shape: "square", rotate: 60 },
      { shape: "square", rotate: 120 }, { shape: "square", rotate: 180 },
      { shape: "square", rotate: 240 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Rotated 270°", "Повёрнут на 270°") },
      { id: "B", text: P("Rotated 280°", "Повёрнут на 280°") },
      { id: "C", text: P("Rotated 300°", "Повёрнут на 300°") },
      { id: "D", text: P("Rotated 320°", "Повёрнут на 320°") },
    ],
    correctAnswer: "C",
    explanation: P(
      "Each step adds 60° to the previous rotation. 240° + 60° = 300°.",
      "Каждый шаг добавляет 60° к предыдущему повороту. 240° + 60° = 300°.",
    ),
    weight: 1.5,
  },
  {
    id: 121,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The triangle's size cycles large, medium, small, and repeats. What size comes next?",
      "Размер треугольника повторяет цикл: большой, средний, маленький. Какой размер следующий?",
    ),
    visual: seq([
      { shape: "triangle", size: 1.5 }, { shape: "triangle", size: 1.0 }, { shape: "triangle", size: 0.5 },
      { shape: "triangle", size: 1.5 }, { shape: "triangle", size: 1.0 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Large", "Большой") },
      { id: "B", text: P("Medium", "Средний") },
      { id: "C", text: P("Small", "Маленький") },
      { id: "D", text: P("Extra large", "Очень большой") },
    ],
    correctAnswer: "C",
    explanation: P(
      "The size cycle (large, medium, small) repeats with period 3. After the second cycle's medium comes small.",
      "Цикл размера (большой, средний, маленький) повторяется с периодом 3. После среднего из второго цикла идёт маленький.",
    ),
    weight: 1.5,
  },
  {
    id: 122,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The diamond gains one copy while its fill advances through hollow, half, full. What comes next?",
      "Число ромбов растёт, а заливка проходит стадии: пусто, наполовину, полностью. Что дальше?",
    ),
    visual: seq([
      { shape: "diamond", filled: false, count: 1 }, { shape: "diamond", half: true, count: 2 },
      { shape: "diamond", filled: true, count: 3 }, { shape: "diamond", filled: false, count: 1 },
      { shape: "diamond", half: true, count: 2 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("3 fully filled diamonds", "3 полностью закрашенных ромба") },
      { id: "B", text: P("1 fully filled diamond", "1 полностью закрашенный ромб") },
      { id: "C", text: P("2 fully filled diamonds", "2 полностью закрашенных ромба") },
      { id: "D", text: P("3 hollow diamonds", "3 незакрашенных ромба") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Both the count (1,2,3) and fill (hollow,half,full) cycle together with period 3. After the second cycle's 'half, count 2' comes 'full, count 3'.",
      "Количество (1,2,3) и заливка (пусто, наполовину, полностью) меняются вместе с периодом 3. После «наполовину, 2» второго цикла идёт «полностью, 3».",
    ),
    weight: 1.5,
  },
  {
    id: 123,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The pentagon rotates 24° more each step. What is its next orientation?",
      "Пятиугольник каждый раз поворачивается на 24° больше. Каково его следующее положение?",
    ),
    visual: seq([
      { shape: "pentagon", rotate: 0 }, { shape: "pentagon", rotate: 24 },
      { shape: "pentagon", rotate: 48 }, { shape: "pentagon", rotate: 72 },
      { shape: "pentagon", rotate: 96 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Rotated 100°", "Повёрнут на 100°") },
      { id: "B", text: P("Rotated 108°", "Повёрнут на 108°") },
      { id: "C", text: P("Rotated 120°", "Повёрнут на 120°") },
      { id: "D", text: P("Rotated 144°", "Повёрнут на 144°") },
    ],
    correctAnswer: "C",
    explanation: P(
      "Each step adds 24° to the previous rotation. 96° + 24° = 120°.",
      "Каждый шаг добавляет 24° к предыдущему повороту. 96° + 24° = 120°.",
    ),
    weight: 1.5,
  },
  {
    id: 124,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "Each shape both changes type and size at once, repeating a 3-step cycle. What comes next?",
      "Каждая фигура одновременно меняет тип и размер, повторяя цикл из 3 шагов. Что дальше?",
    ),
    visual: seq([
      { shape: "circle", size: 0.6 }, { shape: "square", size: 1.0 }, { shape: "triangle", size: 1.4 },
      { shape: "circle", size: 0.6 }, { shape: "square", size: 1.0 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Large triangle", "Большой треугольник") },
      { id: "B", text: P("Small circle", "Маленький круг") },
      { id: "C", text: P("Medium square", "Средний квадрат") },
      { id: "D", text: P("Large square", "Большой квадрат") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Both the shape cycle (circle, square, triangle) and the size cycle (small, medium, large) repeat together with period 3. Position 6 matches position 3: a large triangle.",
      "Цикл фигур (круг, квадрат, треугольник) и цикл размера (маленький, средний, большой) повторяются вместе с периодом 3. Позиция 6 совпадает с позицией 3: большой треугольник.",
    ),
    weight: 1.5,
  },
  {
    id: 125,
    category: "pattern",
    difficulty: "hard",
    prompt: P(
      "A shape cycle circle → square → triangle → pentagon (period 4) runs alongside a size cycle small → medium → large (period 3), advancing independently each frame. What shape and size appear in frame 10?",
      "Цикл фигур круг → квадрат → треугольник → пятиугольник (период 4) идёт одновременно с циклом размера маленький → средний → большой (период 3), каждый меняется независимо в каждом кадре. Какая фигура и размер в 10-м кадре?",
    ),
    options: [
      { id: "A", text: P("Small square", "Маленький квадрат") },
      { id: "B", text: P("Large square", "Большой квадрат") },
      { id: "C", text: P("Small triangle", "Маленький треугольник") },
      { id: "D", text: P("Medium circle", "Средний круг") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Frame 10: shape position (10−1) mod 4 = 1 → square. Size position (10−1) mod 3 = 0 → small. Answer: small square.",
      "Кадр 10: позиция фигуры (10−1) mod 4 = 1 → квадрат. Позиция размера (10−1) mod 3 = 0 → маленький. Ответ: маленький квадрат.",
    ),
    weight: 2,
  },
  {
    id: 126,
    category: "pattern",
    difficulty: "hard",
    prompt: P(
      "A shape's rotation is (n−1) × 50° at frame n, and its fill alternates every two frames starting filled (filled, filled, hollow, hollow, filled, filled...). What is the rotation and fill at frame 9?",
      "Поворот фигуры в кадре n равен (n−1) × 50°, а заливка чередуется каждые два кадра, начиная с закрашенного (закрашено, закрашено, пусто, пусто, закрашено, закрашено...). Каковы поворот и заливка в 9-м кадре?",
    ),
    options: [
      { id: "A", text: P("Rotated 40°, filled", "Повёрнута на 40°, закрашена") },
      { id: "B", text: P("Rotated 40°, hollow", "Повёрнута на 40°, не закрашена") },
      { id: "C", text: P("Rotated 400°, filled", "Повёрнута на 400°, закрашена") },
      { id: "D", text: P("Rotated 50°, hollow", "Повёрнута на 50°, не закрашена") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Rotation at frame 9: (9−1) × 50° = 400°, equivalent visually to 40° (400 − 360). Fill groups of two frames each: group index = floor((9−1)/2) = 4, which is even, so the fill is filled.",
      "Поворот в кадре 9: (9−1) × 50° = 400°, что визуально равно 40° (400 − 360). Группы заливки по два кадра: индекс группы = floor((9−1)/2) = 4 — чётный, значит заливка закрашена.",
    ),
    weight: 2,
  },
  {
    id: 127,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The size stays the same for three frames, then doubles, starting at 1: 1, 1, 1, 2, 2, 2, 4, 4, 4, __. What is the next size?",
      "Размер остаётся неизменным три кадра, затем удваивается, начиная с 1: 1, 1, 1, 2, 2, 2, 4, 4, 4, __. Каков следующий размер?",
    ),
    options: [
      { id: "A", text: P("4", "4") },
      { id: "B", text: P("6", "6") },
      { id: "C", text: P("8", "8") },
      { id: "D", text: P("16", "16") },
    ],
    correctAnswer: "C",
    explanation: P(
      "Each size value repeats for 3 frames before doubling: 1(×3), 2(×3), 4(×3), 8(×3)... The 10th term begins the next group: 8.",
      "Каждое значение размера повторяется 3 кадра перед удвоением: 1(×3), 2(×3), 4(×3), 8(×3)... 10-й член начинает новую группу: 8.",
    ),
    weight: 1.5,
  },
  {
    id: 128,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The number of dots follows the Fibonacci sequence: 1, 1, 2, 3, 5, 8, __. How many dots appear next?",
      "Число точек следует последовательности Фибоначчи: 1, 1, 2, 3, 5, 8, __. Сколько точек в следующем кадре?",
    ),
    options: [
      { id: "A", text: P("11", "11") },
      { id: "B", text: P("12", "12") },
      { id: "C", text: P("13", "13") },
      { id: "D", text: P("14", "14") },
    ],
    correctAnswer: "C",
    explanation: P(
      "Each Fibonacci term is the sum of the two before it. 5 + 8 = 13.",
      "Каждый член ряда Фибоначчи — сумма двух предыдущих. 5 + 8 = 13.",
    ),
    weight: 1.5,
  },
  {
    id: 129,
    category: "pattern",
    difficulty: "hard",
    prompt: P(
      "A shape cycle circle → square → triangle → pentagon → diamond (period 5) runs alongside a count cycle 1 → 3 (period 2), each advancing one step per frame. What shape and count appear in frame 11?",
      "Цикл фигур круг → квадрат → треугольник → пятиугольник → ромб (период 5) идёт одновременно с циклом количества 1 → 3 (период 2), каждый сдвигается на шаг за кадр. Какая фигура и количество в 11-м кадре?",
    ),
    options: [
      { id: "A", text: P("1 circle", "1 круг") },
      { id: "B", text: P("3 circles", "3 круга") },
      { id: "C", text: P("1 square", "1 квадрат") },
      { id: "D", text: P("3 diamonds", "3 ромба") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Frame 11: shape position (11−1) mod 5 = 0 → circle. Count position (11−1) mod 2 = 0 → 1. Answer: 1 circle.",
      "Кадр 11: позиция фигуры (11−1) mod 5 = 0 → круг. Позиция количества (11−1) mod 2 = 0 → 1. Ответ: 1 круг.",
    ),
    weight: 2,
  },
  {
    id: 130,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The circle's fill cycles full, half, hollow, and repeats. What comes next?",
      "Заливка круга повторяет цикл: полностью, наполовину, пусто. Что дальше?",
    ),
    visual: seq([
      { shape: "circle", filled: true }, { shape: "circle", half: true }, { shape: "circle", filled: false },
      { shape: "circle", filled: true }, { shape: "circle", half: true }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Hollow circle", "Незакрашенный круг") },
      { id: "B", text: P("Fully filled circle", "Полностью закрашенный круг") },
      { id: "C", text: P("Half-filled circle", "Наполовину закрашенный круг") },
      { id: "D", text: P("Hollow square", "Незакрашенный квадрат") },
    ],
    correctAnswer: "A",
    explanation: P(
      "The fill cycle (full, half, hollow) repeats with period 3. After the second cycle's 'half' comes 'hollow'.",
      "Цикл заливки (полностью, наполовину, пусто) повторяется с периодом 3. После «наполовину» второго цикла идёт «пусто».",
    ),
    weight: 1,
  },
  {
    id: 131,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The shape alternates square, triangle, square, triangle, growing larger with each pair. What comes next?",
      "Фигура чередуется: квадрат, треугольник, квадрат, треугольник, увеличиваясь с каждой парой. Что дальше?",
    ),
    visual: seq([
      { shape: "square", size: 0.6 }, { shape: "triangle", size: 0.6 },
      { shape: "square", size: 1.0 }, { shape: "triangle", size: 1.0 },
      { shape: "square", size: 1.4 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Triangle, size 1.4", "Треугольник, размер 1.4") },
      { id: "B", text: P("Square, size 1.4", "Квадрат, размер 1.4") },
      { id: "C", text: P("Triangle, size 1.8", "Треугольник, размер 1.8") },
      { id: "D", text: P("Square, size 1.8", "Квадрат, размер 1.8") },
    ],
    correctAnswer: "A",
    explanation: P(
      "The shape alternates square, triangle within each pair, and size grows by 0.4 with each new pair. After 'square, size 1.4' comes 'triangle, size 1.4'.",
      "Фигура чередуется квадрат, треугольник внутри каждой пары, а размер растёт на 0.4 с каждой новой парой. После «квадрат, размер 1.4» идёт «треугольник, размер 1.4».",
    ),
    weight: 1.5,
  },
  {
    id: 132,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The pentagon's fill and size both increase together each step. What describes the missing frame?",
      "Заливка и размер пятиугольника растут одновременно на каждом шаге. Что соответствует пропущенному кадру?",
    ),
    visual: seq([
      { shape: "pentagon", filled: false, size: 0.6 }, { shape: "pentagon", half: true, size: 1.0 },
      { shape: "pentagon", filled: true, size: 1.4 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Hollow pentagon, size 1.8", "Незакрашенный пятиугольник, размер 1.8") },
      { id: "B", text: P("Filled pentagon, size 1.8", "Закрашенный пятиугольник, размер 1.8") },
      { id: "C", text: P("Half-filled pentagon, size 1.8", "Наполовину закрашенный пятиугольник, размер 1.8") },
      { id: "D", text: P("Filled pentagon, size 1.4", "Закрашенный пятиугольник, размер 1.4") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Size keeps growing by 0.4 each step (0.6, 1.0, 1.4, 1.8), while the 3-step fill cycle (hollow, half, full) restarts. Step 4 restarts at hollow, with size 1.8.",
      "Размер продолжает расти на 0.4 на каждом шаге (0.6, 1.0, 1.4, 1.8), а трёхшаговый цикл заливки (пусто, наполовину, полностью) начинается заново. Шаг 4 снова начинается с «пусто», с размером 1.8.",
    ),
    weight: 1.5,
  },
  {
    id: 133,
    category: "pattern",
    difficulty: "hard",
    prompt: P(
      "A shape rotates +45° for three steps, then jumps −90°, and repeats this pattern starting at 0°. What is the rotation at frame 8?",
      "Фигура поворачивается на +45° три шага, затем скачком на −90°, и цикл повторяется, начиная с 0°. Каков поворот в 8-м кадре?",
    ),
    options: [
      { id: "A", text: P("45°", "45°") },
      { id: "B", text: P("90°", "90°") },
      { id: "C", text: P("135°", "135°") },
      { id: "D", text: P("0°", "0°") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Rotation sequence: 0°(f1), +45=45°(f2), +45=90°(f3), +45=135°(f4), −90=45°(f5), +45=90°(f6), +45=135°(f7), −90=45°(f8). Frame 8 is 45°.",
      "Последовательность поворотов: 0°(к1), +45=45°(к2), +45=90°(к3), +45=135°(к4), −90=45°(к5), +45=90°(к6), +45=135°(к7), −90=45°(к8). Кадр 8 — это 45°.",
    ),
    weight: 2,
  },
  {
    id: 134,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The diamond rotates 90° each step, and shrinks slightly every time it completes a full 360° turn. What is true about frame 5, given frame 1 starts at 0° rotation and size 1.4?",
      "Ромб поворачивается на 90° каждый шаг и немного уменьшается каждый раз, когда завершает полный оборот на 360°. Что верно для 5-го кадра, если 1-й кадр начинается с поворота 0° и размера 1.4?",
    ),
    visual: seq([
      { shape: "diamond", rotate: 0, size: 1.4 }, { shape: "diamond", rotate: 90, size: 1.4 },
      { shape: "diamond", rotate: 180, size: 1.4 }, { shape: "diamond", rotate: 270, size: 1.4 },
      { blank: true },
    ]),
    options: [
      { id: "A", text: P("Rotated 0°, size 1.0", "Поворот 0°, размер 1.0") },
      { id: "B", text: P("Rotated 0°, size 1.4", "Поворот 0°, размер 1.4") },
      { id: "C", text: P("Rotated 90°, size 1.0", "Поворот 90°, размер 1.0") },
      { id: "D", text: P("Rotated 90°, size 1.4", "Поворот 90°, размер 1.4") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Frame 5 completes the second full 360° cycle (rotation returns to 0°), triggering the size to shrink from 1.4 to 1.0.",
      "5-й кадр завершает второй полный оборот на 360° (поворот возвращается к 0°), что вызывает уменьшение размера с 1.4 до 1.0.",
    ),
    weight: 1.5,
  },
  {
    id: 135,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The number of triangles decreases 4, 3, 2, 1, then resets to 4. How many appear next?",
      "Число треугольников уменьшается: 4, 3, 2, 1, затем снова становится 4. Сколько их в следующем кадре?",
    ),
    visual: seq([
      { shape: "triangle", count: 4 }, { shape: "triangle", count: 3 },
      { shape: "triangle", count: 2 }, { shape: "triangle", count: 1 },
      { shape: "triangle", count: 4 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("1 triangle", "1 треугольник") },
      { id: "B", text: P("2 triangles", "2 треугольника") },
      { id: "C", text: P("3 triangles", "3 треугольника") },
      { id: "D", text: P("4 triangles", "4 треугольника") },
    ],
    correctAnswer: "C",
    explanation: P(
      "The cycle (4, 3, 2, 1) repeats with period 4. After the second cycle's '4' comes '3'.",
      "Цикл (4, 3, 2, 1) повторяется с периодом 4. После «4» второго цикла идёт «3».",
    ),
    weight: 1,
  },
  {
    id: 136,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "The number of dots in each frame is an odd number, increasing 1, 3, 5, 7, 9, __. How many dots appear next?",
      "Число точек в каждом кадре — нечётное, возрастающее: 1, 3, 5, 7, 9, __. Сколько точек в следующем кадре?",
    ),
    options: [
      { id: "A", text: P("10", "10") },
      { id: "B", text: P("11", "11") },
      { id: "C", text: P("12", "12") },
      { id: "D", text: P("13", "13") },
    ],
    correctAnswer: "B",
    explanation: P(
      "The sequence lists consecutive odd numbers, each 2 more than the last. 9 + 2 = 11.",
      "Это последовательные нечётные числа, каждое на 2 больше предыдущего. 9 + 2 = 11.",
    ),
    weight: 1.5,
  },
  {
    id: 137,
    category: "pattern",
    difficulty: "hard",
    prompt: P(
      "A shape rotates 72° each step, and its fill flips (hollow↔filled) only on every third frame. Starting hollow at frame 1 with rotation 0°, what is true at frame 7?",
      "Фигура поворачивается на 72° каждый шаг, а её заливка меняется (пусто↔закрашено) только на каждом третьем кадре. Начиная с «пусто» в кадре 1 с поворотом 0°, что верно для 7-го кадра?",
    ),
    options: [
      { id: "A", text: P("Rotated 72°, filled", "Поворот 72°, закрашена") },
      { id: "B", text: P("Rotated 72°, hollow", "Поворот 72°, не закрашена") },
      { id: "C", text: P("Rotated 144°, filled", "Поворот 144°, закрашена") },
      { id: "D", text: P("Rotated 0°, hollow", "Поворот 0°, не закрашена") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Rotation at frame n is (n−1 mod 5) × 72° (five orientations, since 5×72=360): frame 7 → (7−1) mod 5 = 1 → 72°. Fill flips at frames 3 and 6, so by frame 7 it has flipped twice from hollow: hollow→filled→hollow→filled again after the third flip would occur at frame 9, so at frame 7 (after 2 flips) it is filled.",
      "Поворот в кадре n равен ((n−1) mod 5) × 72° (пять положений, так как 5×72=360): кадр 7 → (7−1) mod 5 = 1 → 72°. Заливка меняется в кадрах 3 и 6, значит к 7-му кадру она изменилась 2 раза от «пусто»: пусто→закрашено→пусто... после второго изменения (на кадре 6) заливка закрашена, и остаётся такой до следующего изменения на кадре 9. Кадр 7: закрашена.",
    ),
    weight: 2,
  },
  {
    id: 138,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "Squares and circles alternate, with the circle always nested at half the square's size. If the pattern of square sizes is 0.8, 1.0, 1.2, what circle size pairs with the next square?",
      "Квадраты и круги чередуются, при этом круг всегда вдвое меньше квадрата. Если размеры квадратов идут 0.8, 1.0, 1.2, какой размер круга соответствует следующему квадрату?",
    ),
    options: [
      { id: "A", text: P("0.7 (square 1.4)", "0.7 (квадрат 1.4)") },
      { id: "B", text: P("0.6 (square 1.2)", "0.6 (квадрат 1.2)") },
      { id: "C", text: P("0.5 (square 1.0)", "0.5 (квадрат 1.0)") },
      { id: "D", text: P("0.8 (square 1.6)", "0.8 (квадрат 1.6)") },
    ],
    correctAnswer: "A",
    explanation: P(
      "The square sizes increase by 0.2 each time: 0.8, 1.0, 1.2, next 1.4. Since the circle is always half the square's size, it is 1.4 ÷ 2 = 0.7.",
      "Размеры квадратов растут на 0.2 каждый раз: 0.8, 1.0, 1.2, далее 1.4. Так как круг всегда вдвое меньше квадрата, он равен 1.4 ÷ 2 = 0.7.",
    ),
    weight: 1.5,
  },
  {
    id: 139,
    category: "pattern",
    difficulty: "easy",
    prompt: P(
      "The pentagon rotates by one-fifth of a full turn (72°) each step. What is its orientation after 5 steps from 0°?",
      "Пятиугольник каждый раз поворачивается на одну пятую полного оборота (72°). Каково его положение после 5 шагов от 0°?",
    ),
    visual: seq([
      { shape: "pentagon", rotate: 0 }, { shape: "pentagon", rotate: 72 },
      { shape: "pentagon", rotate: 144 }, { shape: "pentagon", rotate: 216 },
      { shape: "pentagon", rotate: 288 }, { blank: true },
    ]),
    options: [
      { id: "A", text: P("Rotated 0° (same as start)", "Повёрнут на 0° (как в начале)") },
      { id: "B", text: P("Rotated 72°", "Повёрнут на 72°") },
      { id: "C", text: P("Rotated 144°", "Повёрнут на 144°") },
      { id: "D", text: P("Rotated 360°, appears different", "Повёрнут на 360°, выглядит иначе") },
    ],
    correctAnswer: "A",
    explanation: P(
      "Five steps of 72° each total 360°, a full turn, so the pentagon returns to its starting orientation of 0°.",
      "Пять шагов по 72° в сумме дают 360° — полный оборот, поэтому пятиугольник возвращается к начальному положению 0°.",
    ),
    weight: 1,
  },
  {
    id: 140,
    category: "pattern",
    difficulty: "medium",
    prompt: P(
      "A shape's size doubles every step: 3, 6, 12, 24, __. What comes next?",
      "Размер фигуры удваивается на каждом шаге: 3, 6, 12, 24, __. Что дальше?",
    ),
    options: [
      { id: "A", text: P("36", "36") },
      { id: "B", text: P("40", "40") },
      { id: "C", text: P("48", "48") },
      { id: "D", text: P("54", "54") },
    ],
    correctAnswer: "C",
    explanation: P(
      "Each size is double the previous one. 24 × 2 = 48.",
      "Каждый размер вдвое больше предыдущего. 24 × 2 = 48.",
    ),
    weight: 1.5,
  },
];
