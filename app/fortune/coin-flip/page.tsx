import type { Metadata } from "next";
import { CoinIcon } from "@/components/icons/ToolIcons";
import { FortuneShell } from "@/components/fortune/FortuneShell";
import { CoinFlip } from "@/components/fortune/CoinFlip";
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

const PATH = "/fortune/coin-flip";
const NAME = "Coin Flip";
const SHORT_DESCRIPTION =
  "Flip a virtual coin online and instantly see — heads or tails?";

const faqItems: FaqItem[] = [
  {
    question: "Is the coin flip fair?",
    answer:
      "Yes, each flip is independent and unaffected by previous results — heads and tails have exactly equal probability.",
  },
  {
    question: "Can I flip the coin multiple times?",
    answer:
      "Absolutely. You can flip as many times in a row as you like.",
  },
  {
    question: "What do people use coin flipping for?",
    answer:
      "It is a simple way to make a quick decision between two options, settle turn order in a game, or just have fun.",
  },
  {
    question: "Do I need to download an app?",
    answer:
      "No, the coin works right in the browser on any device — desktop, tablet, or phone.",
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
  title: "Coin Flip Online — Heads or Tails",
  description:
    "Flip a coin online for free. See heads or tails with a satisfying animation. No sign-up required.",
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/gadaniya/monetka",
    },
  },
  openGraph: {
    title: "Coin Flip Online — Heads or Tails",
    description:
      "Flip a coin online for free — heads or tails with a satisfying animation.",
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Coin Flip Online — Heads or Tails",
    description: "Flip a virtual coin — heads or tails?",
  },
};

export default function CoinFlipPage() {
  return (
    <FortuneShell icon={<CoinIcon className="h-7 w-7" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🪙">
      <JsonLd data={schemas} />
      <CoinFlip />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to flip a coin online
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Tap &quot;Flip the coin&quot;.</li>
            <li>2. Wait for the flip animation.</li>
            <li>3. See the result — heads or tails.</li>
            <li>4. Flip again if needed.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Why use a virtual coin?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            A virtual coin is a quick way to make a random choice between two
            options when you don&apos;t have a real coin handy, or when you want to
            avoid any dispute about fairness. Each result is generated
            independently with equal probability.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Also available in Russian
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This tool has a Russian-language version:{" "}
            <Link href="/ru/gadaniya/monetka" className="font-medium text-[var(--primary)] hover:underline">
              Орёл или решка →
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

        <OtherFortune currentId="coin-flip" />
      </div>
    </FortuneShell>
  );
}
