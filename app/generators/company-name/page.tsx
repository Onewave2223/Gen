import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { CompanyNameGenerator } from "@/components/generators/CompanyNameGenerator";
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

const PATH = "/generators/company-name";
const NAME = "Company Name Generator";
const SHORT_DESCRIPTION =
  "Generate business and company name ideas using optional keywords, industries, and naming styles.";

const faqItems: FaqItem[] = [
  {
    question: "Can I use my own keyword?",
    answer:
      "Yes. Enter a word or idea in the keyword field and some of the generated names will incorporate it.",
  },
  {
    question: "Does the generator check trademarks?",
    answer:
      "No. This tool only generates name ideas and does not check trademark databases.",
  },
  {
    question: "Does it check whether a company name is legally available?",
    answer:
      "No. This tool does not check company registration availability in any jurisdiction. Verify availability with your local business registry before deciding on a name.",
  },
  {
    question: "How many company names can I generate?",
    answer:
      "You can generate between 1 and 100 name ideas in a single batch.",
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
  title: "Company Name Generator – Free Online Tool",
  description:
    "Generate company and business name ideas by industry and style for startups, creative projects, shops, services, and new ventures.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Company Name Generator – Free Online Tool",
    description:
      "Generate company and business name ideas by industry and style for startups, creative projects, shops, services, and new ventures.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function CompanyNameGeneratorPage() {
  return (
    <GeneratorShell title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <CompanyNameGenerator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the company name generator
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Optionally enter a keyword related to your idea.</li>
            <li>2. Choose the industry that fits your business.</li>
            <li>3. Choose a naming style.</li>
            <li>4. Choose how many name ideas to generate.</li>
            <li>5. Generate ideas and copy the ones you like.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What makes a good company name?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            A strong company name is usually memorable, easy to read
            and pronounce, and relevant to what your business does or
            the feeling you want it to convey. It also helps to leave
            room for your business to grow, rather than locking you
            into a single narrow product or service.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Before you commit to a name, it is worth researching
            whether it conflicts with an existing business in your
            area or industry.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Choose a name for your industry
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This generator offers word sets tuned to different
            industries, including technology, creative, food, fashion,
            finance, wellness, and education, alongside a general set
            of words that works for almost any type of business.
            Selecting an industry helps the generated names lean toward
            vocabulary that fits your field.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Important checks before choosing a company name
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Once you have a shortlist of names you like, take some time
            to search for existing businesses with a similar name,
            check your local company registration requirements, and
            look into trademark records that may apply. It is also a
            good idea to check whether a matching domain name and
            social media handles are available before you commit.
          </p>
          <p className="text-sm text-[var(--muted)]">
            This tool does not perform any of those checks and does not
            provide legal advice. Consider consulting a qualified
            professional for company registration and trademark
            questions.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently asked questions
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I use my own keyword?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Enter a word or idea in the keyword field and some
              of the generated names will incorporate it.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Does the generator check trademarks?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              No. This tool only generates name ideas and does not
              check trademark databases.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Does it check whether a company name is legally
              available?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              No. This tool does not check company registration
              availability in any jurisdiction. Verify availability
              with your local business registry before deciding on a
              name.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              How many company names can I generate?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              You can generate between 1 and 100 name ideas in a single
              batch.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="company-name" />
      </div>
    </GeneratorShell>
  );
}
