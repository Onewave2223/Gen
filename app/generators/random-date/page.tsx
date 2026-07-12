import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RandomDateGenerator } from "@/components/generators/RandomDateGenerator";
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

const PATH = "/generators/random-date";
const NAME = "Random Date Generator";
const SHORT_DESCRIPTION =
  "Generate random calendar dates within a custom range with options for unique results and sorting.";

const faqItems: FaqItem[] = [
  {
    question: "Are the start and end dates included?",
    answer:
      "Yes. The range is inclusive, so both the start date and the end date can be part of the generated results.",
  },
  {
    question: "Can I generate dates without duplicates?",
    answer:
      "Yes. Enable Unique dates, as long as the number of dates you request does not exceed the number of calendar days in your selected range.",
  },
  {
    question: "How many dates can I generate at once?",
    answer: "You can generate up to 1,000 dates in a single generation.",
  },
  {
    question: "Are leap years supported?",
    answer:
      "Yes. The generator validates real calendar dates, so leap days such as February 29 are only accepted in years where they actually exist.",
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
  title: "Random Date Generator",
  description:
    "Generate one or multiple random dates between two calendar dates. Choose unique results, sort dates, and copy them instantly.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Random Date Generator",
    description:
      "Generate one or multiple random dates between two calendar dates. Choose unique results, sort dates, and copy them instantly.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function RandomDatePage() {
  return (
    <GeneratorShell title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <RandomDateGenerator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the random date generator
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose a start date and an end date.</li>
            <li>2. Choose how many dates to generate.</li>
            <li>3. Enable unique results if you do not want duplicates.</li>
            <li>4. Choose a sorting option if needed.</li>
            <li>5. Generate and copy your results.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What can random dates be used for?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Random dates are useful for scheduling ideas, testing
            date-related features, sampling, giveaways, and any task
            that calls for picking one or more dates from a range
            without bias.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How date ranges work
          </h2>
          <p className="text-sm text-[var(--muted)]">
            The selected range is inclusive, meaning both the start date
            and the end date can appear in your results. Calendar rules,
            including leap years, are respected when validating and
            generating dates.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently asked questions
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Are the start and end dates included?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. The range is inclusive, so both the start date and
              the end date can be part of the generated results.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I generate dates without duplicates?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Enable Unique dates, as long as the number of dates
              you request does not exceed the number of calendar days in
              your selected range.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              How many dates can I generate at once?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              You can generate up to 1,000 dates in a single generation.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Are leap years supported?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. The generator validates real calendar dates, so leap
              days such as February 29 are only accepted in years where
              they actually exist.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="random-date" />
      </div>
    </GeneratorShell>
  );
}
