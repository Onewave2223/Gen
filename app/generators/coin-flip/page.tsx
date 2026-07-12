import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { CoinFlip } from "@/components/generators/CoinFlip";
import { RelatedGenerators } from "@/components/generators/RelatedGenerators";
import { GeneratorAd } from "@/components/ads/GeneratorAd";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/coin-flip";
const NAME = "Coin Flip";
const SHORT_DESCRIPTION =
  "Flip a virtual coin once or many times and instantly see heads, tails, and result statistics.";

const faqItems: FaqItem[] = [
  {
    question: "Is each flip independent?",
    answer:
      "Yes. Each flip is generated independently of the others, so previous results do not influence the next flip.",
  },
  {
    question: "Can I flip the coin multiple times?",
    answer:
      "Yes. You can flip the coin up to 1,000 times in a single generation and see the full breakdown of heads and tails.",
  },
  {
    question: "Will 100 flips always produce 50 heads and 50 tails?",
    answer:
      "Not necessarily. Random variation means the actual counts will often be close to an even split but rarely exactly 50/50.",
  },
  {
    question: "What can I use a coin flip for?",
    answer:
      "Coin flips are commonly used for quick decisions, games, classroom activities, or any situation calling for a simple, fair random choice between two options.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Generators", path: "/#generators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Coin Flip",
  description:
    "Flip a virtual coin once or up to 1,000 times. Instantly see heads, tails, counts, percentages, and copy your results.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Coin Flip",
    description:
      "Flip a virtual coin once or up to 1,000 times. Instantly see heads, tails, counts, percentages, and copy your results.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function CoinFlipPage() {
  return (
    <GeneratorShell title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <CoinFlip />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the coin flip
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter how many times you want to flip the coin.</li>
            <li>2. Flip the coin.</li>
            <li>3. Review the result, or the heads and tails counts.</li>
            <li>4. Copy your results if needed.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Why use a virtual coin flip?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            A virtual coin flip is a quick way to make a fair
            heads-or-tails decision without needing a physical coin. It
            is useful for settling small decisions, choosing who goes
            first in a game, or simply satisfying curiosity.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What happens when you flip a coin many times?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Each flip is generated independently, so a short series of
            flips is not guaranteed to land exactly 50% heads and 50%
            tails. As the number of flips grows larger, the results tend
            to even out closer to an even split, but some variation is
            expected in any individual run.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently asked questions
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Is each flip independent?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Each flip is generated independently of the others,
              so previous results do not influence the next flip.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I flip the coin multiple times?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. You can flip the coin up to 1,000 times in a single
              generation and see the full breakdown of heads and tails.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Will 100 flips always produce 50 heads and 50 tails?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Not necessarily. Random variation means the actual counts
              will often be close to an even split but rarely exactly
              50/50.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              What can I use a coin flip for?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Coin flips are commonly used for quick decisions, games,
              classroom activities, or any situation calling for a
              simple, fair random choice between two options.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="coin-flip" />
      </div>
    </GeneratorShell>
  );
}
