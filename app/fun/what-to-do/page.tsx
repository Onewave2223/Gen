import type { Metadata } from "next";
import { CompassPinIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { ActivityGenerator } from "@/components/fun/ActivityGenerator";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { activities } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/what-to-do";
const TITLE = "Random Activity Generator – What to Do When Bored";
const DESCRIPTION =
  "Get a random activity idea filtered by who you're with, where you are, and your budget. Free, no sign-up, no API needed.";

const faqItems = [
  { question: "How many activities are available?", answer: "Over 40 activities across various filters for who, where, and budget." },
  { question: "What if no activity matches my filters?", answer: "The tool will let you know. Try relaxing one of the filters (e.g. switch to Anywhere or Any budget)." },
  { question: "Does this use any external service?", answer: "No. All activities are stored locally." },
  { question: "Is it free?", answer: "Yes, completely free and no login required." },
];

const schemas = [
  createWebApplicationSchema({ name: "Random Activity Generator", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "What to Do", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/chem-zanyatsya" },
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

const whoOptions = [
  { key: "alone", label: "Alone" },
  { key: "couple", label: "Couple" },
  { key: "friends", label: "Friends" },
  { key: "family", label: "Family" },
];

const whereOptions = [
  { key: "indoor", label: "Indoor" },
  { key: "outdoor", label: "Outdoor" },
  { key: "anywhere", label: "Anywhere" },
];

const budgetOptions = [
  { key: "free", label: "Free" },
  { key: "low", label: "Low Cost" },
  { key: "any", label: "Any Budget" },
];

const RELATED = funTools.filter((t) => ["random-challenge", "daily-idea", "movie-night-picker", "what-should-i-eat"].includes(t.id));

export default function WhatToDoPage() {
  return (
    <FunShell icon={<CompassPinIcon className="h-6 w-6" />}
      title="Random Activity Generator"
      description="Find something fun to do right now. Filter by who you're with, indoors or outdoors, and your budget."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "What to Do" },
      ]}
    >
      <JsonLd data={schemas} />
      <ActivityGenerator
        activities={activities}
        whoOptions={whoOptions}
        whereOptions={whereOptions}
        budgetOptions={budgetOptions}
        labels={{
          generate: "Find an Activity",
          generateAnother: "Find Another",
          result: "How about this",
          noMatch: "No perfect match found. Try relaxing one filter (e.g. switch to Anywhere or Any Budget).",
          who: "With who?",
          where: "Indoor or outdoor?",
          budget: "Budget?",
        }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to use</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose who you&apos;re spending time with.</li>
            <li>2. Select indoor, outdoor, or anywhere.</li>
            <li>3. Pick your budget preference.</li>
            <li>4. Click Find an Activity to get a matching suggestion.</li>
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
