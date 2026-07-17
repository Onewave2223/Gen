import type { Metadata } from "next";
import { FingerprintIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { UuidGenerator } from "@/components/generators/UuidGenerator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/uuid-generator";
const NAME = "UUID Generator";
const SHORT_DESCRIPTION =
  "Generate version 4 UUIDs (Universally Unique Identifiers) instantly in your browser. No server, no tracking.";

const faqItems: FaqItem[] = [
  {
    question: "What is a UUID v4?",
    answer:
      "UUID v4 is a randomly generated 128-bit identifier in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx. It is designed to be unique across time and space without requiring a central registry.",
  },
  {
    question: "Are these UUIDs cryptographically secure?",
    answer:
      "This generator uses the browser's built-in crypto.randomUUID() when available, which is cryptographically secure. On older browsers it falls back to Math.random().",
  },
  {
    question: "Can I use generated UUIDs in my production app?",
    answer:
      "Yes. UUID v4 values have extremely low collision probability and are suitable for use as database primary keys, session tokens, and unique identifiers in applications.",
  },
];

const schemas = [
  createWebApplicationSchema({ name: NAME, description: SHORT_DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Generators", path: "/generators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "UUID Generator – Free Online UUID v4 Tool",
  description:
    "Generate one or multiple UUID v4 values instantly. Free, no sign-up, works entirely in your browser.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/generator-uuid" },
  },
  openGraph: {
    title: "UUID Generator – Free Online UUID v4 Tool",
    description:
      "Generate one or multiple UUID v4 values instantly. Free, no sign-up, works entirely in your browser.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const RELATED = [
  { name: "Password Generator", href: "/generators/password", description: "Generate strong, random passwords." },
  { name: "Random Number Generator", href: "/generators/random-number", description: "Pick random numbers in any range." },
  { name: "Random Word Generator", href: "/generators/random-word", description: "Get random English words instantly." },
  { name: "Username Generator", href: "/generators/username", description: "Generate unique username ideas." },
];

export default function UuidGeneratorPage() {
  return (
    <GeneratorShell icon={<FingerprintIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <UuidGenerator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the UUID generator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose how many UUIDs you need (1–50).</li>
            <li>2. Click Generate.</li>
            <li>3. Copy individual UUIDs or use the Copy button to copy all at once.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">What are UUIDs used for?</h2>
          <p className="text-sm text-[var(--muted)]">
            UUIDs are used as unique identifiers in databases, APIs, distributed systems, and file names.
            Because they are generated independently without a central authority, they are ideal for
            identifying records in systems where multiple sources create data simultaneously.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">FAQ</h2>
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

        <RelatedToolLinks tools={RELATED} />
      </div>
    </GeneratorShell>
  );
}
