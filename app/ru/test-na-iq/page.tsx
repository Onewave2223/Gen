import type { Metadata } from "next";
import Link from "next/link";
import { IQTestApp } from "@/components/iq-test/IQTestApp";
import { BrainIcon } from "@/components/icons/ToolIcons";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createWebApplicationSchema,
  createBreadcrumbListSchema,
  createFaqPageSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ru/test-na-iq";
const TITLE = "Бесплатный тест на IQ – 35 вопросов с мгновенным результатом";
const DESCRIPTION =
  "Пройдите бесплатный тест на IQ из 35 вопросов: закономерности, матрицы, числовые ряды, логика, пространственное и вербальное мышление, классификация. Мгновенный результат — без регистрации.";

const faqItems: FaqItem[] = [
  {
    question: "Этот тест на IQ бесплатный?",
    answer: "Да, полностью бесплатный. Регистрация, оплата или подписка не требуются.",
  },
  {
    question: "Сколько времени занимает тест?",
    answer:
      "Большинство людей проходят его за 15–20 минут. Жёсткого лимита времени нет — вы можете проходить тест в своём темпе.",
  },
  {
    question: "Нужно ли создавать аккаунт?",
    answer: "Нет. Вы можете пройти весь тест и увидеть результат без регистрации.",
  },
  {
    question: "Это официальный тест на IQ?",
    answer:
      "Нет. Это онлайн-тест на логическое, абстрактное, числовое, пространственное и вербальное мышление. Он не является клинически стандартизированной или профессионально проводимой психометрической методикой.",
  },
  {
    question: "Будут ли одинаковые вопросы при каждой попытке?",
    answer:
      "Нет. Каждая попытка формирует сбалансированный набор из 35 вопросов из общего банка более чем 90 оригинальных вопросов, поэтому при повторном прохождении вы получите другой, но сопоставимый по сложности набор.",
  },
  {
    question: "Можно ли проходить тест с телефона?",
    answer: "Да. Тест полностью адаптивен и работает на любом современном устройстве.",
  },
  {
    question: "Можно ли пройти тест повторно?",
    answer: "Да. После завершения теста вы можете пройти его снова с новым набором вопросов.",
  },
  {
    question: "Что считается средним значением IQ?",
    answer:
      "В стандартизированных профессиональных тестах 100 баллов — это средний показатель по популяции. В этом онлайн-тесте результат в диапазоне 95–114 считается типичным с учётом сложности данных вопросов.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: "Бесплатный тест на IQ – 35 вопросов",
    description: DESCRIPTION,
    path: PATH,
    category: "EducationalApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Тест на IQ", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: `${TITLE} | TryGenHub`,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      en: "/iq-test",
      ru: PATH,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "TryGenHub — бесплатный тест на IQ, 35 вопросов",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function RuIqTestPage() {
  return (
    <>
      <RuLangSetter />
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <JsonLd data={schemas} />

        {/* Breadcrumb */}
        <nav aria-label="Хлебные крошки">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link
                href="/ru"
                className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              >
                Русский раздел
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              Тест на IQ
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 flex-none items-center justify-center rounded-[var(--radius)] bg-[var(--surface-elevated)] text-[var(--primary)] shadow-[var(--shadow)]"
          >
            <BrainIcon className="h-6 w-6" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Тест на IQ</h1>
        </div>

        {/* Main client component — handles all test state */}
        <IQTestApp locale="ru" />
      </div>
    </>
  );
}
