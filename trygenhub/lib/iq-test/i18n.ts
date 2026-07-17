import type { DifficultyLevel, Locale, QuestionCategory } from "./types";

export const CATEGORY_LABELS: Record<QuestionCategory, Record<Locale, string>> = {
  pattern: { en: "Pattern Recognition", ru: "Распознавание образов" },
  matrix: { en: "Visual Matrices", ru: "Визуальные матрицы" },
  numerical: { en: "Numerical Reasoning", ru: "Числовое мышление" },
  logical: { en: "Logical Reasoning", ru: "Логическое мышление" },
  spatial: { en: "Spatial Reasoning", ru: "Пространственное мышление" },
  verbal: { en: "Verbal Analogies", ru: "Вербальные аналогии" },
  classification: { en: "Classification & Attention", ru: "Классификация и внимание" },
};

export const CATEGORY_DESCRIPTIONS: Record<QuestionCategory, Record<Locale, string>> = {
  pattern: {
    en: "Identify the rule behind an evolving sequence of shapes.",
    ru: "Определите закономерность в последовательности фигур.",
  },
  matrix: {
    en: "Find the missing piece that completes a 3×3 grid.",
    ru: "Найдите недостающий элемент, дополняющий сетку 3×3.",
  },
  numerical: {
    en: "Discover the pattern in a series of numbers.",
    ru: "Найдите закономерность в числовом ряду.",
  },
  logical: {
    en: "Evaluate deductions and statements that must be true.",
    ru: "Оцените выводы и утверждения, которые обязательно верны.",
  },
  spatial: {
    en: "Mentally rotate, fold, or manipulate shapes.",
    ru: "Мысленно вращайте, складывайте и преобразуйте фигуры.",
  },
  verbal: {
    en: "Complete the relationship between a pair of words.",
    ru: "Определите связь между парой слов.",
  },
  classification: {
    en: "Spot the odd one out or track a repeating detail.",
    ru: "Найдите лишний элемент или отследите повторяющуюся деталь.",
  },
};

export const DIFFICULTY_LABELS: Record<DifficultyLevel, Record<Locale, string>> = {
  easy: { en: "Easy", ru: "Лёгкий" },
  medium: { en: "Medium", ru: "Средний" },
  hard: { en: "Hard", ru: "Сложный" },
};

export interface IqTestDictionary {
  heroTitlePrefix: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  statQuestions: string;
  statCategories: string;
  statTime: string;
  statFree: string;
  startButton: string;
  startFooterNote: string;
  termsLink: string;
  disclaimerTitle: string;
  disclaimerBody: string;
  howItWorksTitle: string;
  howItWorks: { title: string; desc: string }[];
  instructionsTitle: string;
  instructions: string[];
  categoriesTitle: string;
  whatMeasuresTitle: string;
  whatMeasuresBody: string[];
  averageScoreTitle: string;
  averageScoreIntro: string;
  averageScoreBands: { range: string; label: string; desc: string }[];
  averageScoreFootnote: string;
  accurateResultTitle: string;
  accurateResultTips: string[];
  vsOfficialTitle: string;
  vsOfficialBody: string[];
  faqTitle: string;
  faqItems: { q: string; a: string }[];
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  finalCtaButton: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  questionOf: string;
  timeElapsedLabel: string;
  previous: string;
  next: string;
  finishTest: string;
  jumpToQuestion: string;
  answered: string;
  current: string;
  unanswered: string;
  answeredCount: string;
  finishWithSkipsTitle: string;
  finishWithSkipsMessage: string;
  finishAnyway: string;
  goToSkipped: string;
  confirmFinishTitle: string;
  confirmFinishMessage: string;
  submitAndSeeResults: string;
  retakeConfirmTitle: string;
  retakeConfirmMessage: string;
  yesRetake: string;
  cancel: string;
  resultHeroLabel: string;
  correctAnswers: string;
  accuracy: string;
  timeTaken: string;
  scoreRange: string;
  resultDisclaimer: string;
  retakeButton: string;
  retakeNote: string;
  shareTitle: string;
  shareButton: string;
  shareCopied: string;
  copyButton: string;
  shareTemplate: (score: number, label: string) => string;
  reviewTitle: string;
  reviewHint: string;
  reviewCorrect: string;
  reviewIncorrect: string;
  reviewSkipped: string;
  yourAnswer: string;
  correctLabel: string;
  notAnswered: string;
  explanationLabel: string;
  categoryBreakdownTitle: string;
  strongestBadge: string;
  focusAreaBadge: string;
  strongestAreaTitle: string;
  focusAreaTitle: string;
  scaleTitle: string;
  scaleFootnote: string;
  scaleBandLabels: { label: string; min: number; max: number }[];
}

const en: IqTestDictionary = {
  heroTitlePrefix: "Free IQ Test",
  heroTitleSuffix: "35 Questions",
  heroSubtitle:
    "Measure your pattern, numerical, logical, spatial, and verbal reasoning across 7 categories. Get an instant estimated score — no sign-up required.",
  statQuestions: "Questions",
  statCategories: "Categories",
  statTime: "Suggested time",
  statFree: "No sign-up",
  startButton: "Start IQ Test",
  startFooterNote: "By starting the test you agree to the",
  termsLink: "Terms of Use",
  disclaimerTitle: "Disclaimer:",
  disclaimerBody:
    "This is an online test for reasoning and problem-solving skills — not an officially standardised or clinically validated IQ assessment. Your estimated score reflects your performance on this particular set of 35 questions, drawn from a larger question bank, on this occasion. Results can be influenced by concentration, fatigue, language, and prior experience with similar puzzles. For an official psychological assessment, consult a qualified professional.",
  howItWorksTitle: "How This Online IQ Test Works",
  howItWorks: [
    {
      title: "35 Questions, 7 Categories",
      desc: "Every attempt draws a balanced, randomised set of questions from a bank of 90+ original, verified items.",
    },
    {
      title: "Take Your Time",
      desc: "There is no hard cutoff — a suggested time helps you pace yourself without invalidating your result.",
    },
    {
      title: "Instant Detailed Results",
      desc: "Get your estimated score, category breakdown, and full answer review immediately.",
    },
  ],
  instructionsTitle: "Instructions",
  instructions: [
    "Read each question carefully before selecting your answer.",
    "Choose exactly one answer per question — you can change it at any time before finishing.",
    "Do not use a calculator, search engine, or external help for the best measure of your natural reasoning.",
    "You can navigate between questions freely and skip questions to return to later.",
    "Your progress is saved locally in your browser, so a page refresh will not reset your answers.",
    "When ready, press Finish Test. You will be warned if you have skipped any questions.",
  ],
  categoriesTitle: "7 Reasoning Categories",
  whatMeasuresTitle: "What Does an IQ Test Measure?",
  whatMeasuresBody: [
    "Traditional IQ (Intelligence Quotient) tests measure a range of cognitive abilities — most commonly logical reasoning, abstract thinking, numerical aptitude, spatial awareness, and verbal comprehension. Rather than testing knowledge or memory, these assessments focus on how efficiently you can process information, recognise patterns, and solve novel problems.",
    "Online tests like this one assess similar core skills in a structured format. While they cannot replicate the precision of a professional psychometric evaluation, they can provide an indicative snapshot of your reasoning performance at a given moment.",
  ],
  averageScoreTitle: "What Is Considered an Average Score?",
  averageScoreIntro:
    "On standardised professional IQ tests, 100 is defined as the average score for the general population, with roughly 68% of people scoring between 85 and 115. This test uses a comparable, purely descriptive reference scale for this question set only:",
  averageScoreBands: [
    { range: "130+", label: "Well above the typical range", desc: "for this test" },
    { range: "115–129", label: "Above the typical range", desc: "for this test" },
    { range: "95–114", label: "Typical range", desc: "for this test" },
    { range: "80–94", label: "Below the typical range", desc: "for this test" },
    { range: "70–79", label: "Well below the typical range", desc: "for this test" },
  ],
  averageScoreFootnote:
    "These ranges describe performance on this online test only and are not clinical IQ classifications.",
  accurateResultTitle: "How to Get the Most Indicative Result",
  accurateResultTips: [
    "Take the test when you are well-rested and free from distractions.",
    "Find a quiet environment and silence notifications.",
    "Work through questions at a steady pace — don't spend too long on any single question.",
    "Answer every question, even if you are uncertain. An educated guess can still be correct.",
    "Avoid using external tools such as calculators, the internet, or asking others for help.",
  ],
  vsOfficialTitle: "Online IQ Test vs. Professional IQ Assessment",
  vsOfficialBody: [
    "This online IQ test is a useful self-assessment tool, but it differs from a professional evaluation in important ways. Standardised IQ tests (such as the WAIS or Stanford-Binet) are administered by trained psychologists, normed on large representative population samples, and designed to control for many sources of variation. Online tests cannot replicate this level of rigour.",
    "If you need a score for official, medical, educational, or legal purposes, please seek a qualified psychologist or educational assessment specialist.",
  ],
  faqTitle: "Frequently Asked Questions",
  faqItems: [
    {
      q: "Is this IQ test free?",
      a: "Yes, completely free. No sign-up, payment, or subscription required.",
    },
    {
      q: "How long does the test take?",
      a: "Most people complete it in 15–20 minutes. There is no hard time limit — take as long as you need.",
    },
    {
      q: "Do I need to create an account?",
      a: "No. You can take the full test and see your result without registering. Nothing is sent to a server.",
    },
    {
      q: "Is this an official IQ test?",
      a: "No. This is an online reasoning test designed to give an indicative estimate of your pattern, logical, numerical, spatial, and verbal thinking skills. It is not a clinically standardised or professionally administered psychometric test.",
    },
    {
      q: "Will I get the same questions every time?",
      a: "No. Each attempt draws a balanced set of 35 questions from a larger bank of 90+ original questions, so retaking the test gives you a different but comparably difficult set.",
    },
    {
      q: "Can I take the test on my phone?",
      a: "Yes. The test is fully responsive and works on any device.",
    },
    {
      q: "Can I retake the test?",
      a: "Yes. After finishing, you can retake the test from scratch at any time.",
    },
    {
      q: "What is an average score?",
      a: "On standardised IQ tests, a score of 100 is typically defined as the population average. On this online test, scoring around 95–114 is considered the typical range based on the difficulty of these particular questions.",
    },
    {
      q: "How accurate are online IQ tests?",
      a: "Online tests provide a rough, indicative estimate of reasoning ability but are far less precise than professionally administered standardised tests. Factors such as fatigue, distraction, and unfamiliarity with puzzle types can affect the result.",
    },
  ],
  finalCtaTitle: "Ready to find out your estimated score?",
  finalCtaSubtitle: "35 questions · No time limit · Instant result · No registration",
  finalCtaButton: "Start Free IQ Test",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "IQ Test",
  questionOf: "Question",
  timeElapsedLabel: "Time elapsed",
  previous: "Previous",
  next: "Next",
  finishTest: "Finish Test",
  jumpToQuestion: "Jump to question",
  answered: "Answered",
  current: "Current",
  unanswered: "Unanswered",
  answeredCount: "answered",
  finishWithSkipsTitle: "question(s) unanswered",
  finishWithSkipsMessage:
    "You have left question(s) without an answer. Unanswered questions count as incorrect. Would you like to go back and answer them, or finish now?",
  finishAnyway: "Finish Anyway",
  goToSkipped: "Go to Skipped",
  confirmFinishTitle: "Submit your answers?",
  confirmFinishMessage: "You have answered all questions. Once submitted, you cannot change your answers.",
  submitAndSeeResults: "Submit & See Results",
  retakeConfirmTitle: "Retake the test?",
  retakeConfirmMessage:
    "This will clear your current result and all your answers. You will start fresh with a new set of questions.",
  yesRetake: "Yes, Retake",
  cancel: "Cancel",
  resultHeroLabel: "Your Estimated Score",
  correctAnswers: "Correct Answers",
  accuracy: "Accuracy",
  timeTaken: "Time Taken",
  scoreRange: "Score Range",
  resultDisclaimer:
    "This is an online reasoning test — not a clinical or professionally standardised IQ assessment. Your estimated score reflects your performance on this set of questions on this particular occasion. Results can be influenced by concentration, fatigue, time spent, and familiarity with puzzle types. For an official psychological assessment, please consult a qualified professional.",
  retakeButton: "Retake Test",
  retakeNote: "Your current progress will be cleared and a new question set will be drawn.",
  shareTitle: "Share Your Result",
  shareButton: "Share Result",
  shareCopied: "Copied!",
  copyButton: "Copy Result",
  shareTemplate: (score, label) =>
    `I got an estimated score of ${score} (${label}) on the TryGenHub IQ Test! Try it yourself at trygenhub.com/iq-test`,
  reviewTitle: "Review Your Answers",
  reviewHint: "Click any question to see the correct answer and explanation.",
  reviewCorrect: "Correct",
  reviewIncorrect: "Incorrect",
  reviewSkipped: "Skipped",
  yourAnswer: "Your answer",
  correctLabel: "Correct",
  notAnswered: "You did not answer this question.",
  explanationLabel: "Explanation:",
  categoryBreakdownTitle: "Performance by Category",
  strongestBadge: "Strongest",
  focusAreaBadge: "Focus area",
  strongestAreaTitle: "Your Strongest Area",
  focusAreaTitle: "Area to Improve",
  scaleTitle: "Where Your Result Falls",
  scaleFootnote: "Scale shows estimated ranges for this online reasoning test only. This is not a clinical IQ distribution.",
  scaleBandLabels: [
    { label: "Well below typical", min: 70, max: 79 },
    { label: "Below typical", min: 80, max: 94 },
    { label: "Typical range", min: 95, max: 114 },
    { label: "Above typical", min: 115, max: 129 },
    { label: "Well above typical", min: 130, max: 145 },
  ],
};

const ru: IqTestDictionary = {
  heroTitlePrefix: "Бесплатный тест на IQ",
  heroTitleSuffix: "35 вопросов",
  heroSubtitle:
    "Оцените своё образное, числовое, логическое, пространственное и вербальное мышление в 7 категориях. Мгновенный ориентировочный результат — без регистрации.",
  statQuestions: "Вопросов",
  statCategories: "Категорий",
  statTime: "Ориентировочное время",
  statFree: "Без регистрации",
  startButton: "Начать тест",
  startFooterNote: "Начиная тест, вы соглашаетесь с",
  termsLink: "условиями использования",
  disclaimerTitle: "Отказ от ответственности:",
  disclaimerBody:
    "Это онлайн-тест на мышление и решение задач — он не является официально стандартизированной или клинически подтверждённой оценкой IQ. Ваш ориентировочный результат отражает выполнение конкретного набора из 35 вопросов, выбранных из большего банка вопросов, в этот раз. На результат могут влиять концентрация, усталость, язык и предыдущий опыт с подобными задачами. Для официальной психологической оценки обратитесь к квалифицированному специалисту.",
  howItWorksTitle: "Как работает этот онлайн-тест на IQ",
  howItWorks: [
    {
      title: "35 вопросов, 7 категорий",
      desc: "Каждая попытка формирует сбалансированный случайный набор вопросов из банка более чем 90 оригинальных, проверенных заданий.",
    },
    {
      title: "Никакой спешки",
      desc: "Жёсткого ограничения по времени нет — ориентировочное время помогает задать темп, не делая результат недействительным.",
    },
    {
      title: "Мгновенный подробный результат",
      desc: "Сразу получите ориентировочный балл, разбивку по категориям и полный разбор ответов.",
    },
  ],
  instructionsTitle: "Инструкция",
  instructions: [
    "Внимательно прочитайте каждый вопрос перед выбором ответа.",
    "Выберите ровно один ответ на вопрос — вы можете изменить его в любой момент до завершения теста.",
    "Не используйте калькулятор, поисковик или посторонюю помощь — так результат точнее отразит ваше собственное мышление.",
    "Вы можете свободно переходить между вопросами и пропускать их, чтобы вернуться позже.",
    "Ваш прогресс сохраняется локально в браузере, поэтому обновление страницы не сбросит ответы.",
    "Когда будете готовы, нажмите «Завершить тест». Если вы пропустили вопросы, вас предупредят об этом.",
  ],
  categoriesTitle: "7 категорий мышления",
  whatMeasuresTitle: "Что измеряет тест на IQ?",
  whatMeasuresBody: [
    "Традиционные тесты на IQ (коэффициент интеллекта) измеряют ряд когнитивных способностей — чаще всего логическое мышление, абстрактное мышление, числовые способности, пространственное восприятие и понимание речи. Вместо проверки знаний или памяти такие тесты оценивают, насколько эффективно вы обрабатываете информацию, распознаёте закономерности и решаете новые задачи.",
    "Подобные онлайн-тесты оценивают похожие базовые навыки в структурированном формате. Они не заменяют точность профессиональной психометрической оценки, но могут дать ориентировочное представление о вашем мышлении в конкретный момент.",
  ],
  averageScoreTitle: "Что считается средним результатом?",
  averageScoreIntro:
    "В стандартизированных профессиональных тестах на IQ 100 баллов считается средним показателем для населения в целом, при этом около 68% людей набирают от 85 до 115 баллов. Этот тест использует похожую, чисто описательную шкалу только для данного набора вопросов:",
  averageScoreBands: [
    { range: "130+", label: "Значительно выше типичного диапазона", desc: "для этого теста" },
    { range: "115–129", label: "Выше типичного диапазона", desc: "для этого теста" },
    { range: "95–114", label: "Типичный диапазон", desc: "для этого теста" },
    { range: "80–94", label: "Ниже типичного диапазона", desc: "для этого теста" },
    { range: "70–79", label: "Значительно ниже типичного диапазона", desc: "для этого теста" },
  ],
  averageScoreFootnote:
    "Эти диапазоны описывают результат только на этом онлайн-тесте и не являются клинической классификацией IQ.",
  accurateResultTitle: "Как получить наиболее показательный результат",
  accurateResultTips: [
    "Проходите тест отдохнувшим и без отвлекающих факторов.",
    "Найдите тихое место и отключите уведомления.",
    "Двигайтесь в ровном темпе — не задерживайтесь слишком долго на одном вопросе.",
    "Отвечайте на каждый вопрос, даже если не уверены — обоснованное предположение тоже может быть верным.",
    "Не используйте калькулятор, интернет или помощь других людей.",
  ],
  vsOfficialTitle: "Онлайн-тест на IQ и профессиональная оценка IQ",
  vsOfficialBody: [
    "Этот онлайн-тест — полезный инструмент для самооценки, но он отличается от профессиональной оценки. Стандартизированные тесты на IQ (например, WAIS или Stanford-Binet) проводятся обученными психологами, нормированы на больших репрезентативных выборках населения и учитывают множество источников погрешности. Онлайн-тесты не могут повторить такой уровень строгости.",
    "Если вам нужен результат для официальных, медицинских, образовательных или юридических целей, обратитесь к квалифицированному психологу или специалисту по оценке.",
  ],
  faqTitle: "Часто задаваемые вопросы",
  faqItems: [
    {
      q: "Этот тест на IQ бесплатный?",
      a: "Да, полностью бесплатный. Не требуется регистрация, оплата или подписка.",
    },
    {
      q: "Сколько времени занимает тест?",
      a: "Большинство людей проходят его за 15–20 минут. Жёсткого ограничения по времени нет — уделите столько времени, сколько нужно.",
    },
    {
      q: "Нужно ли создавать аккаунт?",
      a: "Нет. Вы можете пройти весь тест и увидеть результат без регистрации. Данные никуда не отправляются.",
    },
    {
      q: "Это официальный тест на IQ?",
      a: "Нет. Это онлайн-тест на мышление, который даёт ориентировочную оценку образного, логического, числового, пространственного и вербального мышления. Он не является клинически стандартизированным или профессионально проводимым психометрическим тестом.",
    },
    {
      q: "Вопросы будут одинаковыми при повторном прохождении?",
      a: "Нет. Каждая попытка формирует сбалансированный набор из 35 вопросов из банка более чем 90 оригинальных вопросов, поэтому при повторном прохождении набор будет другим, но сопоставимым по сложности.",
    },
    {
      q: "Можно ли пройти тест с телефона?",
      a: "Да. Тест полностью адаптирован под любые устройства.",
    },
    {
      q: "Можно ли пройти тест повторно?",
      a: "Да. После завершения вы можете в любой момент пройти тест заново.",
    },
    {
      q: "Что считается средним результатом?",
      a: "В стандартизированных тестах на IQ 100 баллов обычно считается средним показателем населения. В этом онлайн-тесте результат в диапазоне 95–114 считается типичным для сложности этих вопросов.",
    },
    {
      q: "Насколько точны онлайн-тесты на IQ?",
      a: "Онлайн-тесты дают приблизительную, ориентировочную оценку мышления, но значительно менее точны, чем профессионально проводимые стандартизированные тесты. На результат могут влиять усталость, отвлечение внимания и незнакомость с типом задач.",
    },
  ],
  finalCtaTitle: "Готовы узнать свой ориентировочный результат?",
  finalCtaSubtitle: "35 вопросов · Без ограничения по времени · Мгновенный результат · Без регистрации",
  finalCtaButton: "Начать бесплатный тест",
  breadcrumbHome: "Главная",
  breadcrumbCurrent: "Тест на IQ",
  questionOf: "Вопрос",
  timeElapsedLabel: "Прошло времени",
  previous: "Назад",
  next: "Далее",
  finishTest: "Завершить тест",
  jumpToQuestion: "Перейти к вопросу",
  answered: "Отвечено",
  current: "Текущий",
  unanswered: "Без ответа",
  answeredCount: "отвечено",
  finishWithSkipsTitle: "вопрос(ов) без ответа",
  finishWithSkipsMessage:
    "Вы оставили вопрос(ы) без ответа. Вопросы без ответа засчитываются как неверные. Вернуться и ответить на них или завершить сейчас?",
  finishAnyway: "Всё равно завершить",
  goToSkipped: "К пропущенным",
  confirmFinishTitle: "Отправить ответы?",
  confirmFinishMessage: "Вы ответили на все вопросы. После отправки изменить ответы будет нельзя.",
  submitAndSeeResults: "Отправить и посмотреть результат",
  retakeConfirmTitle: "Пройти тест заново?",
  retakeConfirmMessage:
    "Это очистит текущий результат и все ваши ответы. Вы начнёте заново с новым набором вопросов.",
  yesRetake: "Да, заново",
  cancel: "Отмена",
  resultHeroLabel: "Ваш ориентировочный результат",
  correctAnswers: "Правильных ответов",
  accuracy: "Точность",
  timeTaken: "Затрачено времени",
  scoreRange: "Диапазон результата",
  resultDisclaimer:
    "Это онлайн-тест на мышление — не клиническая или официально стандартизированная оценка IQ. Ваш ориентировочный результат отражает выполнение этого набора вопросов в этот раз. На результат могут влиять концентрация, усталость, затраченное время и знакомство с типом задач. Для официальной психологической оценки обратитесь к квалифицированному специалисту.",
  retakeButton: "Пройти заново",
  retakeNote: "Текущий прогресс будет очищен, и будет сформирован новый набор вопросов.",
  shareTitle: "Поделиться результатом",
  shareButton: "Поделиться",
  shareCopied: "Скопировано!",
  copyButton: "Скопировать результат",
  shareTemplate: (score, label) =>
    `Я набрал ориентировочно ${score} баллов (${label}) в тесте на IQ от TryGenHub! Попробуй сам на trygenhub.com/ru/test-na-iq`,
  reviewTitle: "Разбор ваших ответов",
  reviewHint: "Нажмите на любой вопрос, чтобы увидеть правильный ответ и объяснение.",
  reviewCorrect: "Верно",
  reviewIncorrect: "Неверно",
  reviewSkipped: "Пропущено",
  yourAnswer: "Ваш ответ",
  correctLabel: "Верно",
  notAnswered: "Вы не ответили на этот вопрос.",
  explanationLabel: "Объяснение:",
  categoryBreakdownTitle: "Результаты по категориям",
  strongestBadge: "Сильная сторона",
  focusAreaBadge: "Есть куда расти",
  strongestAreaTitle: "Ваша сильная сторона",
  focusAreaTitle: "Область для развития",
  scaleTitle: "Где находится ваш результат",
  scaleFootnote: "Шкала показывает ориентировочные диапазоны только для этого онлайн-теста. Это не клиническое распределение IQ.",
  scaleBandLabels: [
    { label: "Значительно ниже типичного", min: 70, max: 79 },
    { label: "Ниже типичного", min: 80, max: 94 },
    { label: "Типичный диапазон", min: 95, max: 114 },
    { label: "Выше типичного", min: 115, max: 129 },
    { label: "Значительно выше типичного", min: 130, max: 145 },
  ],
};

export const DICTIONARIES: Record<Locale, IqTestDictionary> = { en, ru };

export function getDictionary(locale: Locale): IqTestDictionary {
  return DICTIONARIES[locale];
}
