import type { Metadata } from "next";
import Link from "next/link";
import { FortuneHubGrid } from "@/components/fortune/FortuneHubGrid";
import { FortuneDisclaimer } from "@/components/fortune/FortuneDisclaimer";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  type FaqItem,
  type JsonValue,
} from "@/lib/seo/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { fortuneTools } from "@/data/fortune";

const PATH = "/fortune";
const TITLE = "Fortune & Fun — Free Online Fortune Tools";
const DESCRIPTION =
  "Explore six free interactive fortune tools: Yes or No oracle, magic ball, daily tarot card, coin flip, life path number and wish oracle. No sign-up needed.";

const faqItems: FaqItem[] = [
  {
    question: "Are these fortune tools really free?",
    answer:
      "Yes, all six tools are completely free, require no registration, and run entirely in your browser.",
  },
  {
    question: "How are the results generated?",
    answer:
      "All answers and calculations happen locally in your browser using random selection or simple formulas — no external paid services involved.",
  },
  {
    question: "Can I use the tools multiple times?",
    answer:
      "Absolutely. Each tool has a retry button and you can come back as many times as you like.",
  },
  {
    question: "Are the results scientifically accurate?",
    answer:
      "The tools are designed purely for entertainment and reflection, not as professional advice or guarantees of future events.",
  },
];

const collectionSchema: JsonValue = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: absoluteUrl(PATH),
  inLanguage: "en",
  hasPart: fortuneTools.map((tool) => ({
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
    { name: "Home", path: "/" },
    { name: "Fortune & Fun", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/gadaniya",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function FortuneHubPage() {
  return (
    <div className="mystic-scope mystic-bg">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
        <JsonLd data={schemas} />

        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link
                href="/"
                className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              Fortune & Fun
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Fortune & Fun ✨
          </h1>
          <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
            Explore six free interactive fortune tools: get a quick Yes or No
            answer, consult the magic ball, draw your tarot card of the day,
            flip a coin, discover your life path number, or check your wish.
            All free, no sign-up required.
          </p>
          <div className="flex flex-wrap gap-3 pt-1 sm:justify-start justify-center">
            <Link
              href="/ru/gadaniya"
              className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
            >
              🇷🇺 Русская версия
            </Link>
          </div>
        </div>

        <FortuneHubGrid />

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Explore Tarot card meanings
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Curious what a specific card means?{" "}
            <Link href="/tarot/cards" className="font-medium text-[var(--primary)] hover:underline">
              Browse the full meanings of all 78 Tarot cards
            </Link>
            , including upright, reversed, love, career, money, and spiritual interpretations.
          </p>
        </section>

        <section className="flex flex-col gap-3 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            About Fortune & Fun
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This section of TryGenHub brings together six lighthearted and
            interactive fortune tools for those who enjoy asking fate a
            question or spending a few playful minutes exploring a topic. Each
            tool runs entirely in your browser — nothing to download, no
            registration, no payment required.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Use <strong className="font-medium text-[var(--foreground)]">Yes or No Oracle</strong> for a
            fast answer to a burning question,{" "}
            <strong className="font-medium text-[var(--foreground)]">Magic Ball</strong> for a more
            atmospheric prediction,{" "}
            <strong className="font-medium text-[var(--foreground)]">Tarot Card of the Day</strong> to
            set a theme for today,{" "}
            <strong className="font-medium text-[var(--foreground)]">Coin Flip</strong> for an
            instant random decision,{" "}
            <strong className="font-medium text-[var(--foreground)]">Life Path Number</strong> to
            explore a simple numerology reading, and{" "}
            <strong className="font-medium text-[var(--foreground)]">Wish Oracle</strong> to check
            the chances of something you are hoping for.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Looking for something more practical? The{" "}
            <Link
              href="/generators"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              Generators
            </Link>{" "}
            and{" "}
            <Link
              href="/fun"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              Fun & Random
            </Link>{" "}
            sections have free tools for random choices, games, and everyday
            decisions.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently Asked Questions
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

        <FortuneDisclaimer />
      </div>
    </div>
  );
}
