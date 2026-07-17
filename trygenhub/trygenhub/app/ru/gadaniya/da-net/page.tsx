import type { Metadata } from "next";
import { SparkleIcon } from "@/components/icons/ToolIcons";
import { GadaniyaShell } from "@/components/gadaniya/GadaniyaShell";
import { DaNet } from "@/components/gadaniya/DaNet";
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

const PATH = "/ru/gadaniya/da-net";
const NAME = "Гадание Да или Нет";
const SHORT_DESCRIPTION =
  "Задай любой вопрос и получи короткий ответ — да, нет или что-то среднее.";

const faqItems: FaqItem[] = [
  {
    question: "Как работает гадание «Да или нет»?",
    answer:
      "Введите вопрос и нажмите кнопку — сайт случайным образом выберет один из расширенного набора ответов: от чёткого «да» до «пока неясно».",
  },
  {
    question: "Нужно ли регистрироваться, чтобы гадать?",
    answer:
      "Нет, гадание полностью бесплатно и доступно без регистрации — все расчёты происходят прямо в браузере.",
  },
  {
    question: "Можно ли спрашивать несколько раз подряд?",
    answer:
      "Да, вы можете нажимать «Спросить ещё раз» столько раз, сколько захотите — каждый ответ выбирается заново.",
  },
  {
    question: "Ответ всегда будет либо «да», либо «нет»?",
    answer:
      "Нет, помимо прямых ответов в наборе есть промежуточные варианты вроде «скорее да» или «время ещё не пришло», чтобы ответ звучал живее.",
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
  title: "Гадание Да или Нет онлайн бесплатно",
  description:
    "Онлайн-гадание Да или Нет. Задай вопрос и мгновенно получи ответ: да, нет или что-то среднее. Бесплатно, без регистрации.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Гадание Да или Нет онлайн бесплатно",
    description:
      "Онлайн-гадание Да или Нет. Задай вопрос и мгновенно получи ответ: да, нет или что-то среднее. Бесплатно, без регистрации.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Гадание Да или Нет онлайн бесплатно",
    description:
      "Онлайн-гадание Да или Нет. Задай вопрос и мгновенно получи ответ.",
  },
};

export default function DaNetPage() {
  return (
    <GadaniyaShell icon={<SparkleIcon className="h-7 w-7" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🔮">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <DaNet />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как пользоваться гаданием «Да или нет»
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Сформулируйте вопрос, на который хотите получить ответ.</li>
            <li>2. Впишите его в поле (необязательно) и нажмите «Получить ответ».</li>
            <li>3. Дождитесь короткой анимации и прочитайте ответ.</li>
            <li>4. При желании скопируйте результат или спросите ещё раз.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Для чего используют гадание «Да или нет»
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Это самый простой формат гадания: он не требует ввода
            даты рождения или сложных данных, а сразу даёт короткий
            ориентир. Многие используют его, чтобы посмотреть на
            вопрос со стороны, снять напряжение перед решением или
            просто ради интереса, когда хочется быстрого ответа.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как формулировать вопрос
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Лучше всего гадание работает с чёткими вопросами, на
            которые в принципе можно ответить «да» или «нет» —
            например, «стоит ли мне сделать этот шаг сейчас?». Помните,
            что ответ стоит воспринимать как повод задуматься, а не
            как готовое решение.
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

        <OtherGadaniya currentId="da-net" />
      </div>
    </GadaniyaShell>
  );
}
