import type { Metadata } from "next";
import { SparkleIcon } from "@/components/icons/ToolIcons";
import { FortuneShell } from "@/components/fortune/FortuneShell";
import { WishOracle } from "@/components/fortune/WishOracle";
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

const PATH = "/fortune/wish-oracle";
const NAME = "Will My Wish Come True?";
const SHORT_DESCRIPTION =
  "Make a wish and find out how likely it is to come true.";

const faqItems: FaqItem[] = [
  {
    question: "Do I have to write my wish in words?",
    answer:
      "No, the wish field is optional — you can simply make a silent wish and tap the button.",
  },
  {
    question: "What do the different answers mean?",
    answer:
      "Answers range from encouraging ('yes, the chances are high') to more cautious ('there are obstacles right now'), so the oracle feels varied and unpredictable.",
  },
  {
    question: "Can I check the same wish more than once?",
    answer:
      "Yes, but for a more meaningful result it is worth not coming back too often — for example, once a day.",
  },
  {
    question: "Does the site guarantee my wish will come true?",
    answer:
      "No, this is an entertainment tool, not a guarantee of future events or professional advice.",
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
  title: "Will My Wish Come True? — Free Wish Oracle",
  description:
    "Free wish fortune. Find out whether your wish will come true and check your chances. No sign-up required.",
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/gadaniya/zhelanie",
    },
  },
  openGraph: {
    title: "Will My Wish Come True? — Free Wish Oracle",
    description:
      "Find out whether your wish will come true. Free, no sign-up.",
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Will My Wish Come True? — Free Wish Oracle",
    description: "Make a wish and see if it will come true.",
  },
};

export default function WishOraclePage() {
  return (
    <FortuneShell icon={<SparkleIcon className="h-7 w-7" />} title={NAME} description={SHORT_DESCRIPTION} emoji="⭐">
      <JsonLd data={schemas} />
      <WishOracle />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to check your wish
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Make a wish silently or type it in the field.</li>
            <li>2. Tap &quot;Check the chances&quot;.</li>
            <li>3. Wait for the short animation and read the oracle&apos;s answer.</li>
            <li>4. Ask again or copy the result if you like.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Why check your wish
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This tool helps turn an abstract wish into a small ritual: you
            articulate it more clearly and receive a symbolic pointer — whether
            to act more actively or to wait a little longer.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Also available in Russian
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This tool has a Russian-language version:{" "}
            <Link href="/ru/gadaniya/zhelanie" className="font-medium text-[var(--primary)] hover:underline">
              Сбудется ли желание? →
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
              className="rounded-[var(--border)] border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </section>

        <FortuneDisclaimer />

        <OtherFortune currentId="wish-oracle" />
      </div>
    </FortuneShell>
  );
}
