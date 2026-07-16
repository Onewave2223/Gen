import type { Metadata } from "next";
import Link from "next/link";
import { funTools } from "@/data/fun-en";
import { TOOL_ICON_MAP, SparkleIcon } from "@/components/icons/ToolIcons";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/fun";
const TITLE = "Fun Random Games & Interactive Tools | TryGenHub";
const DESCRIPTION =
  "Free fun and random online tools: Would You Rather, Truth or Dare, random questions, decision maker, activity ideas and more. No sign-up required.";

const schemas = [
  createWebApplicationSchema({ name: "Fun & Random Tools", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya" },
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
  { label: "Party & Social", ids: ["would-you-rather", "never-have-i-ever", "truth-or-dare", "this-or-that"] },
  { label: "Questions & Conversation", ids: ["random-question", "conversation-starter"] },
  { label: "Decisions & Ideas", ids: ["movie-night-picker", "what-should-i-eat", "what-to-do", "decision-maker", "daily-idea"] },
  { label: "Challenges", ids: ["random-challenge"] },
];

const faqItems = [
  { q: "Do any of these tools require sign-up?", a: "No. All tools are completely free and work without registration." },
  { q: "Do these tools collect my answers or inputs?", a: "No. Everything runs locally in your browser. Nothing is sent to any server." },
  { q: "Can I use these at a party or group event?", a: "Absolutely! Would You Rather, Truth or Dare, and Never Have I Ever are perfect for groups." },
  { q: "Is there a Russian version?", a: "Yes! Visit /ru/razvlecheniya for Russian-language versions of all tools." },
];

export default function FunPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={schemas} />

      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          <li><Link href="/" className="hover:text-[var(--foreground)]">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-[var(--foreground)]">Fun & Random</li>
        </ol>
      </nav>

      <div className="mb-12 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Fun & Random Interactive Tools
        </h1>
        <p className="max-w-2xl text-base text-[var(--muted)]">
          Free interactive games and generators — Would You Rather, Truth or Dare, random questions, decision maker, activity ideas, and more. No sign-up. No ads. Works instantly.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/fun/would-you-rather" className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]">
            Would You Rather
          </Link>
          <Link href="/ru/razvlecheniya" className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]">
            🇷🇺 Русская версия
          </Link>
        </div>
      </div>

      {categories.map((cat) => {
        const tools = funTools.filter((t) => cat.ids.includes(t.id));
        return (
          <section key={cat.label} className="mb-12 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{cat.label}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => {
                const Icon = TOOL_ICON_MAP[tool.id as keyof typeof TOOL_ICON_MAP] ?? SparkleIcon;
                return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group flex items-start gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
                >
                  <span aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-sm)] bg-[var(--background)] text-[var(--primary)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-[var(--foreground)]">{tool.name}</span>
                    <span className="text-xs text-[var(--muted)]">{tool.description}</span>
                    <span className="mt-1 text-xs font-medium text-[var(--primary)]">Try now →</span>
                  </span>
                </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="mb-12 flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">FAQ</h2>
        {faqItems.map((item) => (
          <details key={item.q} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.q}</summary>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.a}</p>
          </details>
        ))}
      </section>

      <section className="flex flex-col gap-3 border-t border-[var(--border)] pt-8">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Related sections</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/generators" className="text-sm text-[var(--primary)] hover:underline">Random Generators →</Link>
          <Link href="/tools" className="text-sm text-[var(--primary)] hover:underline">Text Tools →</Link>
          <Link href="/calculators" className="text-sm text-[var(--primary)] hover:underline">Calculators →</Link>
          <Link href="/ru/razvlecheniya" className="text-sm text-[var(--primary)] hover:underline">Развлечения (RU) →</Link>
        </div>
      </section>
    </div>
  );
}
