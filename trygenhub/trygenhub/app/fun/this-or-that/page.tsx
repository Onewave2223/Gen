import type { Metadata } from "next";
import { VersusIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { ThisOrThat } from "@/components/fun/ThisOrThat";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { thisOrThatPairs } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/this-or-that";
const TITLE = "This or That – Pick Your Preference Game";
const DESCRIPTION =
  "Play This or That online! Choose between two options and see how many choices you make. 100+ pairs. No sign-up needed.";

const faqItems = [
  { question: "How many pairs are there?", answer: "Over 100 unique This or That pairs." },
  { question: "Does it save my choices?", answer: "No. Only a session counter is tracked in memory. Nothing is saved or sent anywhere." },
  { question: "Can I play this alone or with friends?", answer: "Both! You can play alone to discover your own preferences, or compare answers with friends." },
  { question: "Is it free?", answer: "Yes, fully free and no registration needed." },
];

const schemas = [
  createWebApplicationSchema({ name: "This or That Game", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "This or That", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/to-ili-eto" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const RELATED = funTools.filter((t) => ["would-you-rather", "never-have-i-ever", "truth-or-dare", "random-question"].includes(t.id));

export default function ThisOrThatPage() {
  return (
    <FunShell icon={<VersusIcon className="h-6 w-6" />}
      title="This or That"
      description="Pick your preference from two options. 100+ pairs — discover what you like more."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "This or That" },
      ]}
    >
      <JsonLd data={schemas} />
      <ThisOrThat
        pairs={thisOrThatPairs}
        labels={{ next: "Next", choices: "choices", thisRound: "This or That?" }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to play</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Two options appear on screen.</li>
            <li>2. Click the one you prefer.</li>
            <li>3. Click Next to see a new pair.</li>
            <li>4. Your session choice count is shown in the corner.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">FAQ</h2>
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.question}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Other fun tools</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {RELATED.map((tool) => (
              <Link key={tool.id} href={tool.href} className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]">
                <span>{tool.emoji}</span>
                <span className="font-medium text-[var(--foreground)]">{tool.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </FunShell>
  );
}
