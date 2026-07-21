import type { Metadata } from "next";
import { GlobeIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { DomainNameGenerator } from "@/components/generators/DomainNameGenerator";
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

const PATH = "/generators/domain-name";
const NAME = "Domain Name Generator";
const SHORT_DESCRIPTION =
  "Generate domain name ideas from a keyword using multiple naming styles and popular domain extensions.";

const faqItems: FaqItem[] = [
  {
    question: "Does TryGenHub check whether a domain is available?",
    answer:
      "No. This generator creates domain name ideas only. Always verify real availability with a domain registrar before making a decision.",
  },
  {
    question: "Can I choose a domain extension?",
    answer:
      "Yes. Choose from .com, .net, .org, .io, .co, and .ai, and the selected extension will be applied to every generated domain idea.",
  },
  {
    question: "Can I generate domain names without hyphens?",
    answer:
      "Yes. Leave Allow hyphens turned off and none of the generated domain ideas will include a hyphen.",
  },
  {
    question: "How many domain ideas can I generate at once?",
    answer:
      "You can generate between 1 and 100 domain ideas in a single batch.",
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
    { name: "Generators", path: "/generators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Domain Name Generator – Free Online Tool",
  description:
    "Generate domain name ideas from a keyword with brandable, short, keyword-focused, and creative naming styles across popular extensions.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Domain Name Generator – Free Online Tool",
    description:
      "Generate domain name ideas from a keyword with brandable, short, keyword-focused, and creative naming styles across popular extensions.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function DomainNameGeneratorPage() {
  return (
    <GeneratorShell icon={<GlobeIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <DomainNameGenerator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the domain name generator
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter a keyword that describes your project or brand.</li>
            <li>2. Choose a domain extension.</li>
            <li>3. Choose a naming style.</li>
            <li>4. Choose how many domain ideas to generate.</li>
            <li>5. Decide whether to allow hyphens.</li>
            <li>6. Generate ideas and copy the ones you like.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What makes a good domain name?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            A good domain name is typically memorable, easy to read,
            and easy to type without confusion. Shorter names tend to
            be easier to share verbally and less prone to typos.
            Relevance to your project also helps visitors immediately
            understand what your site is about.
          </p>
          <p className="text-sm text-[var(--muted)]">
            It generally helps to avoid unnecessary complexity, such as
            hard-to-spell words or long strings of hyphens, since these
            can make a domain harder for people to remember and type
            correctly.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Choosing a domain extension
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This generator supports several popular extensions,
            including .com, .net, .org, .io, .co, and .ai. No single
            extension is always the best choice; the right one depends
            on your audience, industry, and personal preference. A
            .com is often the most broadly recognized option, while
            extensions like .io and .ai have become popular within
            technology-focused projects.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Does TryGenHub check domain availability?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            No. This tool generates domain name ideas locally in your
            browser and does not check real-time availability with any
            domain registrar or registry. Before you decide on a
            domain, check its availability directly with a domain
            registrar.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently asked questions
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Does TryGenHub check whether a domain is available?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              No. This generator creates domain name ideas only. Always
              verify real availability with a domain registrar before
              making a decision.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I choose a domain extension?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Choose from .com, .net, .org, .io, .co, and .ai, and
              the selected extension will be applied to every generated
              domain idea.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I generate domain names without hyphens?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Leave Allow hyphens turned off and none of the
              generated domain ideas will include a hyphen.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              How many domain ideas can I generate at once?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              You can generate between 1 and 100 domain ideas in a
              single batch.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="domain-name" />
      </div>
    </GeneratorShell>
  );
}
