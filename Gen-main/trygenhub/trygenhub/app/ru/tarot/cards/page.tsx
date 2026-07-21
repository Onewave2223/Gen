import type { Metadata } from "next";
import Link from "next/link";
import { getCardGroups } from "@/lib/tarot/deck";
import { CardArt } from "@/components/tarot/CardArt";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";

const PATH = "/ru/tarot/cards";
const TITLE = "Значения карт Таро — все 78 карт";
const DESCRIPTION =
  "Значения всех 78 карт Таро: 22 Старших Аркана и 56 Младших (Жезлы, Кубки, Мечи, Пентакли). Прямое и перевёрнутое значение, а также толкование для любви, карьеры, финансов и духовного роста для каждой карты.";

const schemas = [
  createWebApplicationSchema({
    name: TITLE,
    description: DESCRIPTION,
    path: PATH,
    category: "LifestyleApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/ru" },
    { name: "Гадания", path: "/ru/gadaniya" },
    { name: "Значения карт Таро", path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: `${TITLE} | TryGenHub`,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/tarot/cards", ru: PATH },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function TarotCardsCatalogPageRu() {
  const groups = getCardGroups();

  return (
    <div className="mystic-scope mystic-bg">
      <RuLangSetter />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <JsonLd data={schemas} />

        <nav aria-label="Хлебные крошки" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/ru" className="hover:text-[var(--foreground)]">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/ru/gadaniya" className="hover:text-[var(--foreground)]">
                Гадания
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              Значения карт Таро
            </li>
          </ol>
        </nav>

        <div className="mb-10 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Значения карт Таро — все 78 карт
          </h1>
          <p className="max-w-2xl text-base text-[var(--muted)]">
            Каждая карта колоды с прямым и перевёрнутым значением, а также толкованием для любви,
            карьеры, денег и внутренней жизни. Нажми на карту, чтобы увидеть полное значение, или{" "}
            <Link href="/ru/gadaniya/karta-dnya" className="font-medium text-[var(--primary)] hover:underline">
              вытяни карту дня
            </Link>
            , чтобы получить свою карту.
          </p>
        </div>

        {groups.map((group) => (
          <section key={group.key} className="mb-14 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              {group.labelRu}
              <span className="ml-2 text-sm font-normal text-[var(--muted)]">
                ({group.cards.length} карт)
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {group.cards.map((card) => (
                <Link
                  key={card.id}
                  href={`/ru/tarot/cards/${card.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3 text-center transition-all hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  <CardArt card={card} className="h-28 w-auto drop-shadow-md sm:h-32" />
                  <span className="text-sm font-medium text-[var(--foreground)]">{card.nameRu}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
          Also available in English:{" "}
          <Link href="/tarot/cards" className="font-medium text-[var(--primary)] hover:underline">
            Tarot Card Meanings →
          </Link>
        </div>
      </div>
    </div>
  );
}
