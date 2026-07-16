import type { Metadata } from "next";
import { RouletteIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { RandomWinnerRu } from "@/components/instrumenty/RandomWinnerRu";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/instrumenty/sluchaynyy-pobeditel";
const NAME = "Случайный победитель";
const SHORT_DESCRIPTION =
  "Введите список участников и выберите случайного победителя с анимацией. Можно удалить победителя и провести следующий тур.";

const faqItems: FaqItem[] = [
  {
    question: "Можно ли проводить несколько туров?",
    answer:
      "Да, после выбора победителя нажмите «Удалить и выбрать следующего» — победитель будет убран из списка, и начнётся выбор среди оставшихся.",
  },
  {
    question: "Как выглядит анимация выбора?",
    answer:
      "На экране быстро мелькают имена участников, постепенно останавливаясь на победителе, что создаёт эффект случайного выбора.",
  },
  {
    question: "Как начать заново?",
    answer:
      "Нажмите ссылку «Начать заново» — вы вернётесь к экрану ввода списка участников.",
  },
  {
    question: "Данные отправляются на сервер?",
    answer:
      "Нет, весь процесс выбора происходит локально в браузере.",
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
  title: `${NAME} онлайн — жеребьёвка`,
  description:
    "Случайный победитель онлайн: введите участников и выберите победителя с анимацией. Несколько туров. Бесплатно, без регистрации.",
  alternates: {
    canonical: PATH,
    languages: { en: "/generators/wheel-spinner", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Выберите случайного победителя из списка участников с анимацией.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function SluchaynyyPobeditolPage() {
  return (
    <InstrumentyShell icon={<RouletteIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🏆">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <RandomWinnerRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как выбрать случайного победителя
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введите имена участников — каждое с новой строки.</li>
            <li>2. Нажмите «Начать жеребьёвку».</li>
            <li>3. Нажмите «Выбрать победителя» — начнётся анимация выбора.</li>
            <li>4. Чтобы провести следующий тур без этого участника, нажмите «Удалить и выбрать следующего».</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Частые вопросы</h2>
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <OtherInstrumenty currentId="sluchaynyy-pobeditel" />
      </div>
    </InstrumentyShell>
  );
}
