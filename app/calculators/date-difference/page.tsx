import type { Metadata } from "next";
import { CalendarRangeIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { DateDifference } from "@/components/calculators/DateDifference";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/calculators/date-difference";
const NAME = "Date Difference Calculator";
const SHORT_DESCRIPTION =
  "Find the difference between two dates in total days, weeks and days, and approximate months. Order doesn't matter.";

const faqItems: FaqItem[] = [
  {
    question: "Does the order of the two dates matter?",
    answer:
      "No. The calculator always returns the absolute difference between the two dates, regardless of which date comes first.",
  },
  {
    question: "How are months calculated?",
    answer:
      "Months are shown as an approximation based on 30.44 days per month (365.25 / 12). For exact month counts, use the Age Calculator.",
  },
  {
    question: "Are time zones taken into account?",
    answer:
      "No. The calculator uses calendar dates only and does not account for time zones. Enter the dates in the same reference timezone for accurate results.",
  },
];

const schemas = [
  createWebApplicationSchema({ name: NAME, description: SHORT_DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Date Difference Calculator – How Many Days Between Two Dates",
  description:
    "Calculate the number of days, weeks, and months between any two dates. Free, instant, works in your browser.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/raznitsa-mezhdu-datami" },
  },
  openGraph: {
    title: "Date Difference Calculator – How Many Days Between Two Dates",
    description: "Find days, weeks, and months between any two dates. Free and instant.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Age Calculator", href: "/calculators/age-calculator", description: "Calculate your exact age." },
  { name: "Percentage Calculator", href: "/calculators/percentage-calculator", description: "Calculate percentages." },
  { name: "Tip Calculator", href: "/calculators/tip-calculator", description: "Calculate tips and split bills." },
  { name: "Random Date Generator", href: "/generators/random-date", description: "Generate a random date in a range." },
];

export default function DateDifferencePage() {
  return (
    <ToolShell icon={<CalendarRangeIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Calculators", href: "/calculators" }]}
    >
      <JsonLd data={schemas} />
      <DateDifference />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the date difference calculator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Select the start date.</li>
            <li>2. Select the end date.</li>
            <li>3. Click Calculate Difference to see days, weeks, and months.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">FAQ</h2>
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.question}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <RelatedToolLinks tools={RELATED} />
      </div>
    </ToolShell>
  );
}
