import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RandomNumberGenerator } from "@/components/generators/RandomNumberGenerator";
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

const PATH = "/generators/random-number";
const NAME = "Random Number Generator";
const SHORT_DESCRIPTION =
  "Generate random integers from a custom range with options for multiple results, unique values, and sorting.";

const faqItems: FaqItem[] = [
  {
    question: "Are the minimum and maximum values included?",
    answer:
      "Yes. The range is inclusive, so both the minimum and maximum values can be part of the generated results.",
  },
  {
    question: "Can I generate numbers without duplicates?",
    answer:
      "Yes. Enable Unique results, as long as the number of results you request does not exceed the number of available values in your range.",
  },
  {
    question: "How many numbers can I generate at once?",
    answer: "You can generate up to 1000 numbers in a single generation.",
  },
  {
    question: "Is this random number generator cryptographically secure?",
    answer:
      "No. This tool is intended for general-purpose use, not for security-sensitive applications.",
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
  title: "Random Number Generator",
  description:
    "Generate one or multiple random numbers within any custom range. Choose unique results, sort your numbers, and copy them instantly.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Random Number Generator",
    description:
      "Generate one or multiple random numbers within any custom range. Choose unique results, sort your numbers, and copy them instantly.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function RandomNumberPage() {
  return (
    <GeneratorShell title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <RandomNumberGenerator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the random number generator
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter the minimum and maximum values.</li>
            <li>2. Choose how many numbers to generate.</li>
            <li>3. Enable unique results if you do not want duplicates.</li>
            <li>4. Choose a sorting option if needed.</li>
            <li>5. Generate and copy your results.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What can you use random numbers for?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Random numbers are useful for games and giveaways, classroom
            activities, random selections, testing, and everyday
            decision-making.
          </p>
          <p className="text-sm text-[var(--muted)]">
            This tool uses pseudorandom number generation and is intended
            for general-purpose random selection, not cryptographic
            security.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How random number generation works
          </h2>
          <p className="text-sm text-[var(--muted)]">
            The generator picks numbers from an inclusive range, meaning
            both the minimum and maximum values can appear in your results.
            When unique results are enabled, no number will repeat within a
            single generation. Sorting, if selected, is applied after the
            numbers are generated.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            FAQ
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Are the minimum and maximum values included?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. The range is inclusive, so both the minimum and maximum
              values can be part of the generated results.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I generate numbers without duplicates?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Enable Unique results, as long as the number of results
              you request does not exceed the number of available values in
              your range.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              How many numbers can I generate at once?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              You can generate up to 1000 numbers in a single generation.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Is this random number generator cryptographically secure?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              No. This tool is intended for general-purpose use, not for
              security-sensitive applications.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="random-number" />
      </div>
    </GeneratorShell>
  );
}
