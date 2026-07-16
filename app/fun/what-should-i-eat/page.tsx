import type { Metadata } from "next";
import { ForkKnifeIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { FoodPicker } from "@/components/fun/FoodPicker";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { foodIdeas } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/what-should-i-eat";
const TITLE = "What Should I Eat? – Random Food Idea Generator";
const DESCRIPTION =
  "Can't decide what to eat? Get a random food idea based on how much time or energy you have. Quick, healthy, comfort food, vegetarian options. Free, no sign-up.";

const faqItems = [
  { question: "Is this a dietary recommendation?", answer: "No. This is a fun random generator, not medical or nutritional advice. Always make food choices that suit your own needs." },
  { question: "How many food ideas are included?", answer: "Over 80 ideas across Quick, Healthy, Comfort Food, Vegetarian, and Anything categories." },
  { question: "Does this use any external API?", answer: "No. All ideas are stored locally." },
  { question: "Is it free?", answer: "Yes, completely free." },
];

const schemas = [
  createWebApplicationSchema({ name: "What Should I Eat Random Food Picker", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "What Should I Eat", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/chto-poest" },
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

const categories = [
  { key: "quick", label: "Quick" },
  { key: "healthy", label: "Healthy" },
  { key: "comfort", label: "Comfort Food" },
  { key: "vegetarian", label: "Vegetarian" },
  { key: "any", label: "Anything" },
];

const RELATED = funTools.filter((t) => ["movie-night-picker", "what-to-do", "decision-maker", "daily-idea"].includes(t.id));

export default function WhatShouldIEatPage() {
  return (
    <FunShell icon={<ForkKnifeIcon className="h-6 w-6" />}
      title="What Should I Eat?"
      description="Can't decide what to eat? Pick a category and get a random food idea. Not dietary advice — just fun inspiration."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "What Should I Eat?" },
      ]}
    >
      <JsonLd data={schemas} />
      <FoodPicker
        ideas={foodIdeas}
        categories={categories}
        labels={{
          pick: "What Should I Eat?",
          pickAnother: "Try Another",
          result: "How about...",
          disclaimer: "This is a fun random generator, not dietary or medical advice.",
        }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to use</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Pick a food category based on how you feel or how much time you have.</li>
            <li>2. Click the button to get a random food idea.</li>
            <li>3. Not feeling it? Click again for another suggestion.</li>
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
