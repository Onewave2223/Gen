import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FULL_DECK, getCardBySlug, getAdjacentCards } from "@/lib/tarot/deck";
import { CardArt } from "@/components/tarot/CardArt";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { JsonLd } from "@/components/seo/JsonLd";
import { GeneratorAd } from "@/components/ads/GeneratorAd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface PageParams {
  slug: string;
}

export function generateStaticParams(): PageParams[] {
  return FULL_DECK.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) return {};

  const path = `/ru/tarot/cards/${card.slug}`;
  const title = `Значение карты Таро ${card.nameRu} — прямое и перевёрнутое`;
  const description = `Значение карты Таро ${card.nameRu}: толкование в прямом и перевёрнутом положении, а также что карта говорит о любви, карьере, деньгах и духовном росте. Ключевые слова: ${card.keywordsRu.join(", ")}.`;

  return {
    title: `${title} | TryGenHub`,
    description,
    alternates: {
      canonical: path,
      languages: { en: `/tarot/cards/${card.slug}`, ru: path },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "ru_RU",
      type: "article",
    },
  };
}

export default async function TarotCardDetailPageRu({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) notFound();

  const path = `/ru/tarot/cards/${card.slug}`;
  const { prev, next } = getAdjacentCards(card);

  const suitLabels: Record<string, string> = {
    wands: "Жезлы",
    cups: "Кубки",
    swords: "Мечи",
    pentacles: "Пентакли",
  };

  const faqItems: FaqItem[] = [
    {
      question: `Что означает карта ${card.nameRu} в прямом положении?`,
      answer: card.uprightRu,
    },
    {
      question: `Что означает карта ${card.nameRu} в перевёрнутом положении?`,
      answer: card.reversedRu,
    },
    {
      question: `Что означает ${card.nameRu} для любви?`,
      answer: card.loveRu,
    },
    {
      question: `Что означает ${card.nameRu} для карьеры и финансов?`,
      answer: `${card.careerRu} ${card.financeRu}`,
    },
  ];

  const schemas = [
    createWebApplicationSchema({
      name: `Значение карты Таро ${card.nameRu}`,
      description: card.uprightRu,
      path,
      category: "LifestyleApplication",
    }),
    createBreadcrumbListSchema([
      { name: "Home", path: "/ru" },
      { name: "Гадания", path: "/ru/gadaniya" },
      { name: "Значения карт Таро", path: "/ru/tarot/cards" },
      { name: card.nameRu, path },
    ]),
    createFaqPageSchema(faqItems),
  ];

  const suitLabel = card.suit ? suitLabels[card.suit] : "Старший Аркан";

  return (
    <div className="mystic-scope mystic-bg">
      <RuLangSetter />
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <JsonLd data={schemas} />

        <nav aria-label="Хлебные крошки">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/ru" className="hover:text-[var(--foreground)]">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/ru/tarot/cards" className="hover:text-[var(--foreground)]">
                Значения карт Таро
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              {card.nameRu}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <CardArt card={card} className="h-56 w-auto flex-none drop-shadow-lg" />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
              {suitLabel}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {card.nameRu}
            </h1>
            <p className="text-sm text-[var(--muted)]">{card.keywordsRu.join(" · ")}</p>
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] mystic-glow sm:p-6">
          <div className="flex flex-col gap-10">
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Значение в прямом положении</h2>
              <p className="text-sm text-[var(--foreground)]">{card.uprightRu}</p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Значение в перевёрнутом положении</h2>
              <p className="text-sm text-[var(--foreground)]">{card.reversedRu}</p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Послание на сегодня</h2>
              <p className="text-sm text-[var(--foreground)]">{card.dailyMessageRu}</p>
            </section>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Любовь</h2>
                <p className="text-sm text-[var(--muted)]">{card.loveRu}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Карьера</h2>
                <p className="text-sm text-[var(--muted)]">{card.careerRu}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Деньги и финансы</h2>
                <p className="text-sm text-[var(--muted)]">{card.financeRu}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Духовное значение</h2>
                <p className="text-sm text-[var(--muted)]">{card.spiritualRu}</p>
              </div>
            </section>

            <GeneratorAd />

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Вытяни эту карту сама</h2>
              <p className="text-sm text-[var(--muted)]">
                Хочешь узнать, что готовит колода тебе сегодня? Попробуй бесплатное гадание{" "}
                <Link href="/ru/gadaniya/karta-dnya" className="font-medium text-[var(--primary)] hover:underline">
                  Карта дня
                </Link>{" "}
                или посмотри{" "}
                <Link href="/ru/tarot/cards" className="font-medium text-[var(--primary)] hover:underline">
                  значения всех 78 карт
                </Link>
                .
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Также доступно на английском</h2>
              <p className="text-sm text-[var(--muted)]">
                Английская версия этой страницы:{" "}
                <Link href={`/tarot/cards/${card.slug}`} className="font-medium text-[var(--primary)] hover:underline">
                  {card.nameEn} →
                </Link>
              </p>
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

            <nav className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
              <Link href={`/ru/tarot/cards/${prev.slug}`} className="font-medium text-[var(--primary)] hover:underline">
                ← {prev.nameRu}
              </Link>
              <Link href={`/ru/tarot/cards/${next.slug}`} className="font-medium text-[var(--primary)] hover:underline">
                {next.nameRu} →
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
