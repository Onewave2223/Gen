import type { Metadata } from "next";
import { FortuneShell } from "@/components/fortune/FortuneShell";
import { TarotCard } from "@/components/fortune/TarotCard";
import { TarotIcon } from "@/components/icons/ToolIcons";
import { OtherFortune } from "@/components/fortune/OtherFortune";
import { FortuneDisclaimer } from "@/components/fortune/FortuneDisclaimer";
import { GeneratorAd } from "@/components/ads/GeneratorAd";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";
import Link from "next/link";

const PATH = "/fortune/tarot-card";
const NAME = "Tarot Card of the Day";
const SHORT_DESCRIPTION =
  "Draw one Tarot card and discover its meaning and message for today.";

const faqItems: FaqItem[] = [
  {
    question: "How many cards are in the deck?",
    answer:
      "The tool uses a full 78-card deck — all 22 Major Arcana plus the 56 Minor Arcana (Wands, Cups, Swords, Pentacles) — each with its own upright and reversed meaning.",
  },
  {
    question: "What other reading modes are available?",
    answer:
      "Besides the daily card, you can switch to a Yes/No reading or a 3-card Past / Present / Future spread, right on this same page.",
  },
  {
    question: "Can I draw more than one card per day?",
    answer:
      "Yes, there are no limits. Many people prefer drawing one card at the start of the day as a daily ritual.",
  },
  {
    question: "What does the card of the day mean?",
    answer:
      "Each card shows a general meaning and a short daily message you can use as a theme or prompt for reflection today.",
  },
  {
    question: "Is a paid service used for the reading?",
    answer:
      "No, the card is drawn randomly (using your browser's secure random number generator) from a local dataset — no paid API, no server round-trip.",
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
    { name: "Home", path: "/" },
    { name: "Fortune & Fun", path: "/fortune" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Tarot Card of the Day — Free Online Reading",
  description:
    "Free daily Tarot card reading. Draw one Major Arcana card online and discover its meaning and message for today. No sign-up required.",
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/gadaniya/karta-dnya",
    },
  },
  openGraph: {
    title: "Tarot Card of the Day — Free Online Reading",
    description:
      "Draw one Major Arcana Tarot card online and discover its meaning and message for today. Free, no sign-up.",
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tarot Card of the Day — Free Online Reading",
    description: "Draw one Tarot card online and see today's message.",
  },
};

export default function TarotCardPage() {
  return (
    <FortuneShell title={NAME} description={SHORT_DESCRIPTION} icon={<TarotIcon className="h-7 w-7" />}>
      <JsonLd data={schemas} />
      <TarotCard />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the card of the day
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Tap &quot;Draw a card&quot;.</li>
            <li>2. Wait for the short card-flip animation.</li>
            <li>3. Read the card name, meaning, and today&apos;s message.</li>
            <li>4. Draw another card or copy the result if you like.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What is a tarot card of the day?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            The &quot;Card of the Day&quot; is a popular Tarot practice in which one
            card is drawn to set the theme or mood for the next 24 hours. The
            ritual needs no specialist knowledge of Tarot and suits both
            beginners and regular readers alike.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to read your card
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Each card comes with a general meaning and a short daily message.
            Try relating them to what is happening in your life right now —
            the card often highlights something you have already been noticing
            on some level.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Meanings of all 78 Tarot cards
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Want to look up a card&apos;s meaning ahead of time? Browse the{" "}
            <Link href="/tarot/cards" className="font-medium text-[var(--primary)] hover:underline">
              full Tarot card meanings catalog
            </Link>{" "}
            — upright and reversed interpretations plus love, career, money, and spiritual meanings for every card.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Also available in Russian
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This tool has a Russian-language version:{" "}
            <Link href="/ru/gadaniya/karta-dnya" className="font-medium text-[var(--primary)] hover:underline">
              Карта дня →
            </Link>
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently Asked Questions
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

        <FortuneDisclaimer />

        <OtherFortune currentId="tarot-card" />
      </div>
    </FortuneShell>
  );
}
