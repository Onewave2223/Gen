import type { Metadata } from "next";
import { ShuffleIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { RandomChoice } from "@/components/instrumenty/RandomChoice";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { GeneratorAd } from "@/components/ads/GeneratorAd";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/instrumenty/sluchaynyy-vybor";
const NAME = "Случайный выбор из списка";
const SHORT_DESCRIPTION =
  "Введите варианты, каждый с новой строки, и получите один случайный выбор.";

const faqItems: FaqItem[] = [
  {
    question: "Сколько вариантов можно ввести?",
    answer:
      "Практически неограниченное количество — введите столько строк, сколько нужно, минимум два варианта для случайного выбора.",
  },
  {
    question: "Можно ли выбирать несколько раз подряд?",
    answer:
      "Да, нажмите «Выбрать ещё раз», чтобы получить новый случайный результат без повторного ввода списка.",
  },
  {
    question: "Используются ли внешние сервисы для выбора?",
    answer:
      "Нет, выбор происходит полностью локально в браузере без обращения к внешним API.",
  },
  {
    question: "Как очистить список вариантов?",
    answer: "Нажмите кнопку «Очистить», чтобы удалить весь введённый текст.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "UtilitiesApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Инструменты", path: "/ru/instrumenty" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: `${NAME} онлайн`,
  description:
    "Случайный выбор из списка онлайн бесплатно. Введите варианты и получите один случайный выбор с анимацией.",
  alternates: {
    canonical: PATH,
    languages: { en: "/generators/random-picker", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Введите варианты и получите один случайный выбор.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${NAME} онлайн`,
    description: "Получите один случайный выбор из вашего списка.",
  },
};

export default function SluchaynyyVyborPage() {
  return (
    <InstrumentyShell icon={<ShuffleIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🎯">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <RandomChoice />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как сделать случайный выбор
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введите варианты, каждый с новой строки.</li>
            <li>2. Нажмите «Выбрать случайно».</li>
            <li>3. Дождитесь короткой анимации выбора.</li>
            <li>4. Посмотрите результат или выберите ещё раз.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Когда пригодится случайный выбор
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Инструмент помогает быстро решить, что съесть на обед,
            какой фильм посмотреть, кто идёт первым в игре или как
            честно распределить задачи между участниками, когда
            сложно определиться самостоятельно.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Частые вопросы
          </h2>

          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </section>

        <OtherInstrumenty currentId="sluchaynyy-vybor" />
      </div>
    </InstrumentyShell>
  );
}
