import type { Metadata } from "next";
import Link from "next/link";
import { getCardGroups } from "@/lib/tarot/deck";
import { CardArt } from "@/components/tarot/CardArt";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";

const PATH = "/tarot/cards";
const TITLE = "Tarot Card Meanings — All 78 Cards Explained";
const DESCRIPTION =
  "Browse the meaning of all 78 Tarot cards: 22 Major Arcana and 56 Minor Arcana (Wands, Cups, Swords, Pentacles). Upright, reversed, love, career, finance, and spiritual meanings for every card.";

const schemas = [
  createWebApplicationSchema({
    name: TITLE,
    description: DESCRIPTION,
    path: PATH,
    category: "LifestyleApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fortune & Fun", path: "/fortune" },
    { name: "Tarot Card Meanings", path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: `${TITLE} | TryGenHub`,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/tarot/cards" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function TarotCardsCatalogPage() {
  const groups = getCardGroups();

  return (
    <div className="mystic-scope mystic-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <JsonLd data={schemas} />

        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--foreground)]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/fortune" className="hover:text-[var(--foreground)]">
                Fortune & Fun
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              Tarot Card Meanings
            </li>
          </ol>
        </nav>

        <div className="mb-10 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Tarot Card Meanings — All 78 Cards
          </h1>
          <p className="max-w-2xl text-base text-[var(--muted)]">
            Every card in the deck, with upright and reversed meanings plus what it says about love,
            career, money, and your inner life. Tap a card for the full reading, or{" "}
            <Link href="/fortune/tarot-card" className="font-medium text-[var(--primary)] hover:underline">
              draw a card of the day
            </Link>{" "}
            to see one picked for you.
          </p>
        </div>

        {groups.map((group) => (
          <section key={group.key} className="mb-14 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              {group.labelEn}
              <span className="ml-2 text-sm font-normal text-[var(--muted)]">
                ({group.cards.length} cards)
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {group.cards.map((card) => (
                <Link
                  key={card.id}
                  href={`/tarot/cards/${card.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3 text-center transition-all hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  <CardArt card={card} className="h-28 w-auto drop-shadow-md sm:h-32" />
                  <span className="text-sm font-medium text-[var(--foreground)]">{card.nameEn}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
          Also available in Russian:{" "}
          <Link href="/ru/tarot/cards" className="font-medium text-[var(--primary)] hover:underline">
            Значения карт Таро →
          </Link>
        </div>
      </div>
    </div>
  );
}
