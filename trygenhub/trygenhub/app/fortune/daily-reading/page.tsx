import type { Metadata } from "next";
import { FortuneShell } from "@/components/fortune/FortuneShell";
import { DailyReading } from "@/components/fortune/DailyReading";
import { SunburstIcon } from "@/components/icons/ToolIcons";
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

const PATH = "/fortune/daily-reading";
const NAME = "What Awaits You Today?";
const SHORT_DESCRIPTION =
  "A cinematic daily reading with an energy, symbol, number, color, focus, and message of the day — the same for everyone today, new again tomorrow.";

const faqItems: FaqItem[] = [
  {
    question: "How is the daily reading generated?",
    answer:
      "It's calculated deterministically from today's calendar date — everyone who opens the page today sees the same reading, and it changes automatically at midnight. No account or personal data is used.",
  },
  {
    question: "Will I get a different reading if I refresh the page?",
    answer:
      "No. The reading is fixed for the whole calendar day, so refreshing or reopening the page later today shows the same result. Come back tomorrow for a new one.",
  },
  {
    question: "What is the Lucky Moment?",
    answer:
      "It's an optional extra field — a loose window of time to stay a little more open or attentive today. Reveal it after your main reading if you're curious.",
  },
  {
    question: "Is any of my data collected for this?",
    answer:
      "No. The reading only depends on today's date, computed entirely in your browser. Nothing about you is sent to a server to generate it.",
  },
  {
    question: "Is this a real prediction of what will happen?",
    answer:
      "No — it's an entertainment prompt for reflection, not a forecast. Treat it as a lens for the day, not a guarantee of outcomes.",
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
  title: "What Awaits You Today? — Free Daily Reading",
  description:
    "Free daily reading: get today's energy, symbol, number, color, focus, and message of the day. Same for everyone today, changes tomorrow. No sign-up.",
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/gadaniya/chto-zhdet-tebya-segodnya",
    },
  },
  openGraph: {
    title: "What Awaits You Today? — Free Daily Reading",
    description:
      "A cinematic daily reading with an energy, symbol, number, color, focus, and message of the day.",
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "What Awaits You Today? — Free Daily Reading",
    description: "Get today's energy, symbol, number, color, focus, and message of the day.",
  },
};

export default function DailyReadingPage() {
  return (
    <FortuneShell title={NAME} description={SHORT_DESCRIPTION} icon={<SunburstIcon className="h-7 w-7" />}>
      <JsonLd data={schemas} />
      <DailyReading />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How the daily reading works
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Tap &quot;Reveal My Day&quot;.</li>
            <li>2. Watch the short reveal as each part of today&apos;s reading appears.</li>
            <li>3. Read your energy, symbol, number, color, focus, and message of the day.</li>
            <li>4. Optionally reveal your lucky moment, then copy or share the result.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Why everyone sees the same reading today
          </h2>
          <p className="text-sm text-[var(--muted)]">
            The reading is generated from today&apos;s calendar date rather than
            from anything about you personally, so it stays exactly the same
            all day and changes automatically at midnight — a shared daily
            theme rather than a personalized forecast.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Also available in Russian
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This tool has a Russian-language version:{" "}
            <Link
              href="/ru/gadaniya/chto-zhdet-tebya-segodnya"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              Что ждёт тебя сегодня? →
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

        <OtherFortune currentId="daily-reading" />
      </div>
    </FortuneShell>
  );
}
