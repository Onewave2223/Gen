import type { Metadata } from "next";
import { CakeCalendarIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { AgeCalculator } from "@/components/calculators/AgeCalculator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/calculators/age-calculator";
const NAME = "Age Calculator";
const SHORT_DESCRIPTION =
  "Enter your date of birth to find your exact age in years, months, and days — plus when your next birthday is.";

const faqItems: FaqItem[] = [
  {
    question: "How is the age calculated?",
    answer:
      "Your exact age is calculated by comparing your date of birth to today's date, accounting for the number of days in each month and leap years.",
  },
  {
    question: "What is 'days until birthday'?",
    answer:
      "This is the number of calendar days remaining until your next birthday. If today is your birthday, it shows 'Today!'.",
  },
  {
    question: "Is my date of birth stored?",
    answer:
      "No. The calculation runs entirely in your browser. Your date of birth is never sent to any server.",
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
  title: "Age Calculator – Find Your Exact Age in Years, Months & Days",
  description:
    "Free age calculator. Enter your date of birth to find your exact age and your next birthday. Works instantly in your browser.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/kalkulyator-vozrasta" },
  },
  openGraph: {
    title: "Age Calculator – Find Your Exact Age in Years, Months & Days",
    description: "Calculate your exact age and find your next birthday. Free, instant, no sign-up.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Date Difference Calculator", href: "/calculators/date-difference", description: "Find the difference between two dates." },
  { name: "Percentage Calculator", href: "/calculators/percentage-calculator", description: "Calculate percentages and percent change." },
  { name: "Tip Calculator", href: "/calculators/tip-calculator", description: "Calculate tips and split bills." },
  { name: "BMI Calculator", href: "/calculators/bmi-calculator", description: "Calculate your Body Mass Index." },
];

export default function AgeCalculatorPage() {
  return (
    <ToolShell icon={<CakeCalendarIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Calculators", href: "/calculators" }]}
    >
      <JsonLd data={schemas} />
      <AgeCalculator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the age calculator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Select your date of birth using the date picker.</li>
            <li>2. Click Calculate Age.</li>
            <li>3. See your exact age in years, months, and days, plus your next birthday date.</li>
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
