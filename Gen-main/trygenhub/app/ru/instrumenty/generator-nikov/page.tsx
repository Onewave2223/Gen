import type { Metadata } from "next";
import { NameBadgeIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { NicknameGeneratorRu } from "@/components/instrumenty/NicknameGeneratorRu";
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

const PATH = "/ru/instrumenty/generator-nikov";
const NAME = "Генератор никнеймов";
const SHORT_DESCRIPTION =
  "Случайные никнеймы в нескольких стилях — прилагательное+существительное, игровой и с суффиксом. Без API, всё локально.";

const faqItems: FaqItem[] = [
  {
    question: "Откуда берутся слова для никнеймов?",
    answer:
      "Никнеймы генерируются из встроенных наборов русских прилагательных, существительных и игровых элементов прямо в браузере — без обращения к внешним сервисам.",
  },
  {
    question: "Можно ли использовать сгенерированный никнейм?",
    answer:
      "Сгенерированные никнеймы носят информационный характер. Перед использованием проверьте доступность никнейма на нужной платформе.",
  },
  {
    question: "Сколько никнеймов можно создать за раз?",
    answer:
      "От 1 до 20 никнеймов одновременно. При необходимости нажмите «Сгенерировать» ещё раз для нового набора.",
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
  title: `${NAME} онлайн бесплатно`,
  description:
    "Генератор никнеймов онлайн: придумайте уникальный ник для игры, соцсетей или форума. Три стиля, без регистрации, всё локально.",
  alternates: {
    canonical: PATH,
    languages: { en: "/generators/username", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Придумайте случайный никнейм в нескольких стилях — быстро и бесплатно.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function GeneratorNikovPage() {
  return (
    <InstrumentyShell icon={<NameBadgeIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🎮">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <NicknameGeneratorRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как придумать никнейм
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Выберите стиль никнейма: прилагательное+существительное, игровой или с числом.</li>
            <li>2. Укажите количество вариантов (1–20).</li>
            <li>3. Нажмите «Сгенерировать» и выберите понравившийся.</li>
            <li>4. Скопируйте нужный ник кнопкой «Копировать» рядом с ним.</li>
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

        <OtherInstrumenty currentId="generator-nikov" />
      </div>
    </InstrumentyShell>
  );
}
