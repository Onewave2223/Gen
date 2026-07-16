export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export const siteFaqEn: readonly FaqEntry[] = [
  {
    id: "free",
    question: "Is TryGenHub really free to use?",
    answer:
      "Yes. Every generator, calculator, tool, and fun feature on TryGenHub is free to use, with no hidden fees or premium tiers.",
  },
  {
    id: "account",
    question: "Do I need to create an account?",
    answer:
      "No. You can use any tool on TryGenHub instantly without signing up, registering, or providing an email address.",
  },
  {
    id: "how-generators-work",
    question: "How do the generators work?",
    answer:
      "Most generators run directly in your browser using JavaScript, producing random numbers, names, or other values on the fly each time you click Generate.",
  },
  {
    id: "privacy",
    question: "Is my data private?",
    answer:
      "Many tools process everything locally in your browser without sending your input to a server. Check each tool's description for specifics, and see our Privacy Policy for full details.",
  },
  {
    id: "iq-test-how",
    question: "How does the IQ Test work?",
    answer:
      "The IQ Test presents a series of pattern, logic, and spatial reasoning questions. After you answer them, your responses are scored instantly to produce a result — no waiting and no sign-up required.",
  },
  {
    id: "iq-test-accuracy",
    question: "Is the IQ Test result an official score?",
    answer:
      "The IQ Test is designed for entertainment and casual self-assessment. It is not a clinically validated psychometric instrument and should not be treated as a formal or official IQ score.",
  },
  {
    id: "mobile",
    question: "Does TryGenHub work on mobile devices?",
    answer:
      "Yes. The site is fully responsive and every tool is designed to work smoothly on phones, tablets, and desktop browsers alike.",
  },
  {
    id: "results-random",
    question: "Are the results truly random?",
    answer:
      "Generators use standard randomization methods suitable for everyday use, such as games, naming, and decision-making. They are not intended for cryptographic or high-security purposes unless a tool specifically states otherwise.",
  },
  {
    id: "russian",
    question: "Is TryGenHub available in Russian?",
    answer:
      "Yes. TryGenHub has a dedicated Russian-language section with translated tools, calculators, and fortune features. You can switch languages using the language selector.",
  },
  {
    id: "save-results",
    question: "Can I save or share my results?",
    answer:
      "Most tools let you copy your result with one click. Some also support direct links so you can share a specific result or page with others.",
  },
  {
    id: "browser-support",
    question: "Which browsers are supported?",
    answer:
      "TryGenHub works on all modern browsers, including Chrome, Firefox, Safari, and Edge. Keeping your browser up to date helps ensure the best experience.",
  },
  {
    id: "new-tools",
    question: "Will more tools be added?",
    answer:
      "Yes. New generators, calculators, and fun features are added over time based on what's useful and popular with visitors.",
  },
] as const;

export const siteFaqRu: readonly FaqEntry[] = [
  {
    id: "free",
    question: "TryGenHub действительно бесплатен?",
    answer:
      "Да. Все генераторы, калькуляторы, инструменты и развлекательные функции на TryGenHub полностью бесплатны, без скрытых платежей и платных тарифов.",
  },
  {
    id: "account",
    question: "Нужно ли создавать аккаунт?",
    answer:
      "Нет. Вы можете пользоваться любым инструментом сразу, без регистрации и указания email.",
  },
  {
    id: "how-generators-work",
    question: "Как работают генераторы?",
    answer:
      "Большинство генераторов работают прямо в вашем браузере на JavaScript и создают случайные числа, имена или другие значения каждый раз, когда вы нажимаете «Сгенерировать».",
  },
  {
    id: "privacy",
    question: "Насколько конфиденциальны мои данные?",
    answer:
      "Многие инструменты полностью обрабатывают данные локально в браузере, не отправляя их на сервер. Подробности — в описании конкретного инструмента и в Политике конфиденциальности.",
  },
  {
    id: "iq-test-how",
    question: "Как работает тест на IQ?",
    answer:
      "Тест на IQ предлагает серию вопросов на логику, паттерны и пространственное мышление. После ответов результат рассчитывается мгновенно — без ожидания и регистрации.",
  },
  {
    id: "iq-test-accuracy",
    question: "Это официальный результат IQ?",
    answer:
      "Тест на IQ создан для развлечения и самопроверки. Это не клинически валидированный психометрический инструмент, и его не следует считать официальной оценкой IQ.",
  },
  {
    id: "mobile",
    question: "Работает ли TryGenHub на мобильных устройствах?",
    answer:
      "Да. Сайт полностью адаптивен, и каждый инструмент удобно работает на телефонах, планшетах и в браузерах компьютеров.",
  },
  {
    id: "results-random",
    question: "Результаты действительно случайны?",
    answer:
      "Генераторы используют стандартные методы случайного выбора, подходящие для повседневных задач: игр, выбора имён и принятия решений. Они не предназначены для криптографических или высокозащищённых целей, если это не указано отдельно.",
  },
  {
    id: "english",
    question: "Есть ли англоязычная версия сайта?",
    answer:
      "Да. У TryGenHub есть полноценная англоязычная версия со всеми инструментами. Переключить язык можно через переключатель языка.",
  },
  {
    id: "save-results",
    question: "Можно ли сохранить или поделиться результатом?",
    answer:
      "Большинство инструментов позволяют скопировать результат в один клик. Некоторые также поддерживают прямые ссылки, чтобы поделиться конкретным результатом или страницей.",
  },
  {
    id: "browser-support",
    question: "Какие браузеры поддерживаются?",
    answer:
      "TryGenHub работает во всех современных браузерах: Chrome, Firefox, Safari и Edge. Рекомендуем использовать актуальную версию браузера.",
  },
  {
    id: "new-tools",
    question: "Будут ли добавляться новые инструменты?",
    answer:
      "Да. Новые генераторы, калькуляторы и развлекательные функции добавляются со временем — в зависимости от того, что полезно и востребовано у посетителей.",
  },
] as const;
