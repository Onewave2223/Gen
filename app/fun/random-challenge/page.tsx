import type { Metadata } from "next";
import { TrophyIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { RandomChallenge } from "@/components/fun/RandomChallenge";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { randomChallenges } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/random-challenge";
const TITLE = "Random Challenge Generator – Fun, Creative & Productivity Ideas";
const DESCRIPTION =
  "Get a random challenge in seconds. Fun, creative, productivity, and social categories. 80+ safe challenges with no sign-up required.";

const faqItems = [
  { question: "Are the challenges safe?", answer: "Yes. All challenges are safe, creative, fun, or productivity-focused. Nothing dangerous." },
  { question: "How many challenges are available?", answer: "Over 80 challenges across Fun, Creative, Productivity, and Social categories." },
  { question: "Is this free?", answer: "Completely free. No registration needed." },
  { question: "Can I use this daily?", answer: "Yes! Pick a challenge every day to stay motivated and inspired." },
];

const schemas = [
  createWebApplicationSchema({ name: "Random Challenge Generator", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "Random Challenge", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/sluchaynoe-zadanie" },
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
  { key: "fun", label: "Fun" },
  { key: "creative", label: "Creative" },
  { key: "productivity", label: "Productivity" },
  { key: "social", label: "Social" },
];

const RELATED = funTools.filter((t) => ["daily-idea", "what-to-do", "random-question", "decision-maker"].includes(t.id));

export default function RandomChallengePage() {
  return (
    <FunShell icon={<TrophyIcon className="h-6 w-6" />}
      title="Random Challenge Generator"
      description="Get a fun, creative, or productive random challenge to try right now. No sign-up needed."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "Random Challenge" },
      ]}
    >
      <JsonLd data={schemas} />
      <RandomChallenge
        challenges={randomChallenges}
        categories={categories}
        labels={{ generate: "Generate Challenge", category: "Category" }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to use</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Pick a category: Fun, Creative, Productivity, or Social.</li>
            <li>2. Click Generate Challenge.</li>
            <li>3. Complete the challenge and come back for another.</li>
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
