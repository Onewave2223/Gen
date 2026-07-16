import type { Metadata } from "next";
import { GadaniyaShell } from "@/components/gadaniya/GadaniyaShell";
import { SharSudby } from "@/components/gadaniya/SharSudby";
import { CrystalBallIcon } from "@/components/icons/ToolIcons";
import { OtherGadaniya } from "@/components/gadaniya/OtherGadaniya";
import { GadaniyaDisclaimer } from "@/components/gadaniya/GadaniyaDisclaimer";
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

const PATH = "/ru/gadaniya/shar-sudby";
const NAME = "Шар судьбы";
const SHORT_DESCRIPTION =
  "Загадай вопрос и загляни в мистический шар судьбы — узнай короткое предсказание.";

const faqItems: FaqItem[] = [
  {
    question: "Чем шар судьбы отличается от гадания «Да или нет»?",
    answer:
      "Шар судьбы использует более атмосферный, оракульский набор ответов и подходит для вопросов, где важен не только прямой ответ, но и настроение предсказания.",
  },
  {
    question: "Сколько раз можно спрашивать шар судьбы?",
    answer:
      "Сколько угодно — ограничений нет, каждый раз шар подбирает новый ответ.",
  },
  {
    question: "Нужно ли вводить вопрос текстом?",
    answer:
      "Нет, поле для вопроса необязательно — вопрос можно просто держать в голове и нажать кнопку.",
  },
  {
    question: "Используется ли платный сервис для предсказаний?",
    answer:
      "Нет, все ответы выбираются случайным образом из локального набора прямо в браузере, без внешних платных API.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "LifestyleApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Гадания", path: "/ru/gadaniya" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Шар судьбы онлайн — гадание бесплатно",
  description:
    "Онлайн-гадание на шаре судьбы. Загадай вопрос и получи мистическое предсказание бесплатно, без регистрации.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Шар судьбы онлайн — гадание бесплатно",
    description:
      "Онлайн-гадание на шаре судьбы. Загадай вопрос и получи мистическое предсказание бесплатно.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Шар судьбы онлайн — гадание бесплатно",
    description: "Загадай вопрос и получи мистическое предсказание.",
  },
};

export default function SharSudbyPage() {
  return (
    <GadaniyaShell title={NAME} description={SHORT_DESCRIPTION} icon={<CrystalBallIcon className="h-7 w-7" />}>
      <RuLangSetter />
      <JsonLd data={schemas} />
      <SharSudby />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как пользоваться шаром судьбы
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Мысленно или письменно сформулируйте вопрос.</li>
            <li>2. Нажмите «Спросить у шара» и дождитесь анимации.</li>
            <li>3. Прочитайте предсказание, которое покажет шар.</li>
            <li>4. При желании спросите снова или скопируйте ответ.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Откуда берутся предсказания
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Шар судьбы выбирает ответ из заранее подготовленного
            набора фраз, которые звучат более образно и атмосферно,
            чем обычное «да» или «нет». Это делает инструмент
            интересным для вопросов о настроении момента, а не только
            для чётких решений.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как относиться к ответу
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Воспринимайте предсказание шара как способ взглянуть на
            ситуацию под новым углом или просто как приятный ритуал.
            Итоговое решение в любом случае остаётся за вами.
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

        <GadaniyaDisclaimer />

        <OtherGadaniya currentId="shar-sudby" />
      </div>
    </GadaniyaShell>
  );
}
