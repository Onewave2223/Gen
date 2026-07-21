import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FULL_DECK, getCardBySlug, getAdjacentCards } from "@/lib/tarot/deck";
import { CardArt } from "@/components/tarot/CardArt";
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

  const path = `/tarot/cards/${card.slug}`;
  const title = `${card.nameEn} Tarot Card Meaning — Upright & Reversed`;
  const description = `${card.nameEn} tarot card meaning: upright and reversed interpretation, plus what it means for love, career, money, and spiritual growth. Keywords: ${card.keywordsEn.join(", ")}.`;

  return {
    title: `${title} | TryGenHub`,
    description,
    alternates: {
      canonical: path,
      languages: { en: path, ru: `/ru/tarot/cards/${card.slug}` },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function TarotCardDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) notFound();

  const path = `/tarot/cards/${card.slug}`;
  const { prev, next } = getAdjacentCards(card);

  const faqItems: FaqItem[] = [
    {
      question: `What does the ${card.nameEn} card mean upright?`,
      answer: card.uprightEn,
    },
    {
      question: `What does the ${card.nameEn} card mean reversed?`,
      answer: card.reversedEn,
    },
    {
      question: `What does ${card.nameEn} mean for love?`,
      answer: card.loveEn,
    },
    {
      question: `What does ${card.nameEn} mean for career and finances?`,
      answer: `${card.careerEn} ${card.financeEn}`,
    },
  ];

  const schemas = [
    createWebApplicationSchema({
      name: `${card.nameEn} Tarot Card Meaning`,
      description: card.uprightEn,
      path,
      category: "LifestyleApplication",
    }),
    createBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Fortune & Fun", path: "/fortune" },
      { name: "Tarot Card Meanings", path: "/tarot/cards" },
      { name: card.nameEn, path },
    ]),
    createFaqPageSchema(faqItems),
  ];

  const suitLabel = card.suit
    ? card.suit.charAt(0).toUpperCase() + card.suit.slice(1)
    : "Major Arcana";

  return (
    <div className="mystic-scope mystic-bg">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <JsonLd data={schemas} />

        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--foreground)]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/tarot/cards" className="hover:text-[var(--foreground)]">
                Tarot Card Meanings
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              {card.nameEn}
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
              {card.nameEn}
            </h1>
            <p className="text-sm text-[var(--muted)]">{card.keywordsEn.join(" · ")}</p>
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] mystic-glow sm:p-6">
          <div className="flex flex-col gap-10">
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Upright meaning</h2>
              <p className="text-sm text-[var(--foreground)]">{card.uprightEn}</p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Reversed meaning</h2>
              <p className="text-sm text-[var(--foreground)]">{card.reversedEn}</p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Today&apos;s message</h2>
              <p className="text-sm text-[var(--foreground)]">{card.dailyMessageEn}</p>
            </section>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Love</h2>
                <p className="text-sm text-[var(--muted)]">{card.loveEn}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Career</h2>
                <p className="text-sm text-[var(--muted)]">{card.careerEn}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Money & finances</h2>
                <p className="text-sm text-[var(--muted)]">{card.financeEn}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Spiritual meaning</h2>
                <p className="text-sm text-[var(--muted)]">{card.spiritualEn}</p>
              </div>
            </section>

            <GeneratorAd />

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Draw this card yourself</h2>
              <p className="text-sm text-[var(--muted)]">
                Want to see what the deck has in store for you today? Try the free{" "}
                <Link href="/fortune/tarot-card" className="font-medium text-[var(--primary)] hover:underline">
                  Tarot Card of the Day
                </Link>{" "}
                reading, or browse{" "}
                <Link href="/tarot/cards" className="font-medium text-[var(--primary)] hover:underline">
                  all 78 card meanings
                </Link>
                .
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Also available in Russian</h2>
              <p className="text-sm text-[var(--muted)]">
                This page has a Russian-language version:{" "}
                <Link href={`/ru/tarot/cards/${card.slug}`} className="font-medium text-[var(--primary)] hover:underline">
                  {card.nameRu} →
                </Link>
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Frequently Asked Questions</h2>
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
              <Link href={`/tarot/cards/${prev.slug}`} className="font-medium text-[var(--primary)] hover:underline">
                ← {prev.nameEn}
              </Link>
              <Link href={`/tarot/cards/${next.slug}`} className="font-medium text-[var(--primary)] hover:underline">
                {next.nameEn} →
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
