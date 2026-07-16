import type { Metadata } from "next";
import { PeopleGroupIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { RandomTeamsRu } from "@/components/instrumenty/RandomTeamsRu";
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

const PATH = "/ru/instrumenty/sluchaynye-komandy";
const NAME = "Случайные команды";
const SHORT_DESCRIPTION =
  "Введите список участников, укажите количество команд — инструмент случайно и равномерно распределит всех.";

const faqItems: FaqItem[] = [
  {
    question: "Как распределяются участники по командам?",
    answer:
      "Список участников сначала случайно перемешивается, а затем равномерно распределяется по командам. Если число участников не делится на количество команд, оставшиеся распределяются поочерёдно.",
  },
  {
    question: "Можно ли перемешать ещё раз?",
    answer:
      "Да, нажмите «Перемешать заново» после первого распределения, чтобы получить новый случайный состав команд.",
  },
  {
    question: "Есть ли ограничение на количество участников?",
    answer:
      "Ограничений практически нет — вы можете ввести произвольное количество участников, каждого с новой строки.",
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
  title: `${NAME} онлайн — распределение по командам`,
  description:
    "Случайное распределение по командам онлайн: введите участников, укажите число команд — инструмент равномерно перемешает и разобьёт. Бесплатно.",
  alternates: {
    canonical: PATH,
    languages: { en: "/generators/random-teams", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Разбейте участников на случайные равные команды за секунду.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function SluchaynyyeKomandyPage() {
  return (
    <InstrumentyShell icon={<PeopleGroupIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="👥">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <RandomTeamsRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как распределить участников по командам
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введите имена участников в поле — каждое с новой строки.</li>
            <li>2. Укажите желаемое количество команд.</li>
            <li>3. Нажмите «Распределить по командам».</li>
            <li>4. При необходимости нажмите «Перемешать заново».</li>
            <li>5. Скопируйте результат кнопкой «Копировать результат».</li>
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

        <OtherInstrumenty currentId="sluchaynye-komandy" />
      </div>
    </InstrumentyShell>
  );
}
