import type { Metadata } from "next";
import { HandRaisedIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { NeverHaveIEver } from "@/components/fun/NeverHaveIEver";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { neverHaveIEver } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/never-have-i-ever";
const TITLE = "Never Have I Ever – 100+ Fun Statements Generator";
const DESCRIPTION =
  "Play Never Have I Ever online with 100+ fun, safe statements. Choose General, Funny, or Friends categories. No sign-up needed.";

const faqItems = [
  { question: "How many statements are included?", answer: "Over 100 statements across General, Funny, and Friends categories." },
  { question: "Is the content appropriate for all ages?", answer: "Yes. All statements are safe, fun, and appropriate for general audiences." },
  { question: "Can I play this at a party?", answer: "Absolutely! Never Have I Ever is a classic party and social game. Just take turns drawing cards." },
  { question: "Is it free?", answer: "Completely free. No account required." },
];

const schemas = [
  createWebApplicationSchema({ name: "Never Have I Ever Generator", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "Never Have I Ever", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/ya-nikogda-ne" },
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
  { key: "general", label: "General" },
  { key: "funny", label: "Funny" },
  { key: "friends", label: "Friends" },
];

const RELATED = funTools.filter((t) => ["would-you-rather", "truth-or-dare", "this-or-that", "random-question"].includes(t.id));

export default function NeverHaveIEverPage() {
  return (
    <FunShell icon={<HandRaisedIcon className="h-6 w-6" />}
      title="Never Have I Ever"
      description="Over 100 fun statements to play the classic party game. Choose a category and draw random statements."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "Never Have I Ever" },
      ]}
    >
      <JsonLd data={schemas} />
      <NeverHaveIEver statements={neverHaveIEver} categories={categories} labels={{ next: "Next Statement", category: "Category" }} />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to play</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Select a category: General, Funny, or Friends.</li>
            <li>2. Read the statement aloud to your group.</li>
            <li>3. Anyone who has done it admits it.</li>
            <li>4. Click Next Statement to continue.</li>
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
