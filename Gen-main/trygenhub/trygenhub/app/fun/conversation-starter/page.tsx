import type { Metadata } from "next";
import { ChatBubblesIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { ConversationStarter } from "@/components/fun/ConversationStarter";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { conversationStarters } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/conversation-starter";
const TITLE = "Random Conversation Starter Generator – Break the Ice";
const DESCRIPTION =
  "Get random conversation starters for any situation. General, Funny, Creative, and Deep categories. Copy and share. Free, no sign-up.";

const faqItems = [
  { question: "What categories are included?", answer: "General, Funny, Creative, and Deep — each with 20+ topics and questions." },
  { question: "Can I share a starter?", answer: "Yes. Use the Share button (Web Share API) or copy the link." },
  { question: "What's the difference from Random Question?", answer: "Conversation Starter focuses more on open-ended topics and prompts suited for starting or deepening a conversation, while Random Question is more game-oriented." },
  { question: "Is it free?", answer: "Yes, completely free." },
];

const schemas = [
  createWebApplicationSchema({ name: "Conversation Starter Generator", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "Conversation Starter", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/tema-dlya-razgovora" },
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
  { key: "creative", label: "Creative" },
  { key: "deep", label: "Deep" },
];

const RELATED = funTools.filter((t) => ["random-question", "would-you-rather", "this-or-that", "truth-or-dare"].includes(t.id));

export default function ConversationStarterPage() {
  return (
    <FunShell icon={<ChatBubblesIcon className="h-6 w-6" />}
      title="Conversation Starter"
      description="Break the ice or deepen any conversation with a random topic or question. Great for dates, meetings, parties, or just getting to know someone."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "Conversation Starter" },
      ]}
    >
      <JsonLd data={schemas} />
      <ConversationStarter
        starters={conversationStarters}
        categories={categories}
        labels={{
          next: "Next Topic",
          copy: "Copy",
          copied: "Copied!",
          share: "Share",
          shareSuccess: "Link copied!",
        }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to use</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Pick a category that fits the conversation.</li>
            <li>2. Read the starter aloud or share it.</li>
            <li>3. Click Next for a new topic.</li>
            <li>4. Copy any starter to use in a chat or message.</li>
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
