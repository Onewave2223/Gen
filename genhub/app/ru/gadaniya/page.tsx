import type { Metadata } from "next";
import Link from "next/link";
import { GadaniyaHubGrid } from "@/components/gadaniya/GadaniyaHubGrid";
import { GadaniyaDisclaimer } from "@/components/gadaniya/GadaniyaDisclaimer";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  type FaqItem,
  type JsonValue,
} from "@/lib/seo/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { gadaniyaTools } from "@/data/gadaniya";

const PATH = "/ru/gadaniya";
const TITLE = "Гадания онлайн бесплатно";
const DESCRIPTION =
  "Бесплатные онлайн-гадания: да или нет, шар судьбы, карта дня Таро, орёл или решка, число судьбы и гадание на желание. Без регистрации.";

const faqItems: FaqItem[] = [
  {
    question: "Гадания на сайте действительно бесплатные?",
    answer:
      "Да, все шесть инструментов полностью бесплатны, не требуют регистрации и работают прямо в браузере.",
  },
  {
    question: "Как рассчитываются результаты?",
    answer:
      "Все ответы и расчёты выполняются локально в браузере на основе случайного выбора или простых формул — без внешних платных сервисов.",
  },
  {
    question: "Можно ли гадать несколько раз подряд?",
    answer:
      "Да, на каждой странице есть кнопка повторного гадания, и вы можете возвращаться к инструментам сколько угодно раз.",
  },
  {
    question: "Насколько точны результаты гаданий?",
    answer:
      "Результаты предназначены для развлечения и размышления, а не как профессиональная рекомендация или гарантия будущих событий.",
  },
];

const collectionSchema: JsonValue = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: absoluteUrl(PATH),
  inLanguage: "ru",
  hasPart: gadaniyaTools.map((tool) => ({
    "@type": "WebApplication",
    name: tool.name,
    description: tool.shortDescription,
    url: absoluteUrl(tool.href),
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  })),
};

const schemas = [
  collectionSchema,
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Гадания", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function GadaniyaHubPage() {
  return (
    <div className="mystic-scope mystic-bg">
      <RuLangSetter />
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
        <JsonLd data={schemas} />

        <nav aria-label="Хлебные крошки">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link
                href="/"
                className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              Гадания
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Гадания онлайн бесплатно ✨
          </h1>
          <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
            Шесть простых и красивых онлайн-гаданий: спроси да или нет,
            загляни в шар судьбы, вытяни карту дня, подбрось монету
            судьбы, узнай своё число судьбы или проверь, сбудется ли
            желание. Всё бесплатно, без регистрации и SMS.
          </p>
        </div>

        <GadaniyaHubGrid />

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Значения карт Таро
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Хочешь узнать, что означает конкретная карта?{" "}
            <Link href="/ru/tarot/cards" className="font-medium text-[var(--primary)] hover:underline">
              Посмотри значения всех 78 карт Таро
            </Link>{" "}
            — прямое и перевёрнутое толкование, а также значение для любви, карьеры, денег и духовного роста.
          </p>
        </section>

        <section className="flex flex-col gap-3 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            О разделе «Гадания»
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Этот раздел TryGenHub собрал шесть лёгких и приятных
            инструментов для тех, кто любит время от времени спросить
            судьбу о чём-то важном или просто провести пару минут с
            интересом. Каждое гадание работает прямо в браузере: не
            нужно ничего скачивать, регистрироваться или платить —
            достаточно открыть страницу и получить ответ.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Используйте гадание «Да или нет» для быстрого ответа на
            конкретный вопрос, «Шар судьбы» — для более атмосферного
            предсказания, «Карту дня» — чтобы получить настрой на
            сегодня, «Орёл или решку» — для мгновенного случайного
            выбора, «Число судьбы» — чтобы взглянуть на себя через
            простую нумерологию, а «Сбудется ли желание?» — чтобы
            оценить шансы на исполнение задуманного.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Ищете что-то более практичное? В разделе{" "}
            <Link
              href="/ru/instrumenty"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              «Инструменты»
            </Link>{" "}
            собраны бесплатные калькуляторы и генераторы: возраст,
            разница между датами, случайные числа, пароли и другое.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Частые вопросы
          </h2>

          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4"
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
      </div>
    </div>
  );
}
