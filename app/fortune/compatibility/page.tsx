import type { Metadata } from "next";
import { FortuneShell } from "@/components/fortune/FortuneShell";
import { Compatibility } from "@/components/fortune/Compatibility";
import { HeartLinkIcon } from "@/components/icons/ToolIcons";
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

const PATH = "/fortune/compatibility";
const NAME = "Compatibility";
const SHORT_DESCRIPTION =
  "Enter two names and a relationship type for a fun, deterministic compatibility score across six categories.";

const faqItems: FaqItem[] = [
  {
    question: "Does the order of the names matter?",
    answer:
      "No. Entering \"Alex and Sam\" or \"Sam and Alex\" always produces the exact same result — the calculation doesn't depend on which name goes first.",
  },
  {
    question: "Will I get the same score if I try again later?",
    answer:
      "Yes, for the same two names and the same relationship type. Changing the relationship type (Love, Friendship, General) or either name changes the result.",
  },
  {
    question: "Are the names sent to a server or stored anywhere?",
    answer:
      "No. Everything is calculated locally in your browser. Names are never sent to a server, included in the page URL, saved to your device, or included in analytics.",
  },
  {
    question: "What are the six categories?",
    answer:
      "Emotional Connection, Communication, Trust, Shared Values, Chemistry (or Fun Together for friendships), and Long-Term Potential (or Lasting Bond for friendships).",
  },
  {
    question: "Is this a scientific measurement of compatibility?",
    answer:
      "No — it's a lighthearted, entertainment-only tool for fun with friends or a partner, not a psychological or scientific assessment.",
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
  title: "Compatibility Test — Free Two-Name Compatibility Reading",
  description:
    "Free compatibility test for two names. Choose Love, Friendship, or General and get an overall score plus six category breakdowns. No sign-up, no data stored.",
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/gadaniya/sovmestimost",
    },
  },
  openGraph: {
    title: "Compatibility Test — Free Two-Name Compatibility Reading",
    description:
      "Enter two names and a relationship type for a fun compatibility score across six categories.",
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Compatibility Test — Free Two-Name Compatibility Reading",
    description: "Get an overall compatibility score plus six category breakdowns.",
  },
};

export default function CompatibilityPage() {
  return (
    <FortuneShell title={NAME} description={SHORT_DESCRIPTION} icon={<HeartLinkIcon className="h-7 w-7" />}>
      <JsonLd data={schemas} />
      <Compatibility />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the compatibility test
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter both names and choose a relationship type.</li>
            <li>2. Tap &quot;Check Compatibility&quot; and watch the short analysis animation.</li>
            <li>3. Read the overall score and the six category breakdowns.</li>
            <li>4. Copy or share the result, or try another pair.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How privacy works here
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Everything runs locally: names are only used to calculate a
            result in your browser and are never sent to a server, placed in
            the page URL, saved to your device, or included in any analytics
            event.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Also available in Russian
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This tool has a Russian-language version:{" "}
            <Link href="/ru/gadaniya/sovmestimost" className="font-medium text-[var(--primary)] hover:underline">
              Совместимость двух людей →
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
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <FortuneDisclaimer />

        <OtherFortune currentId="compatibility" />
      </div>
    </FortuneShell>
  );
}
