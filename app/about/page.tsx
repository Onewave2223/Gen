import type { Metadata } from "next";
import Link from "next/link";
import { generators } from "@/data/generators";
import { tools } from "@/data/tools";
import { calculators } from "@/data/calculators";
import { siteConfig } from "@/lib/site";

const PATH = "/about";
const TITLE = "About TryGenHub";
const DESCRIPTION =
  "Learn about TryGenHub — a free collection of online generators, tools, calculators, and fun features designed to make everyday tasks faster and easier.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const availableGenerators = generators.filter(
  (g) => g.status === "available",
);

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          About TryGenHub
        </h1>
        <p className="max-w-xl text-base text-[var(--muted)]">
          TryGenHub is a collection of free, browser-based online generators,
          utility tools, calculators, and entertainment features — built
          around a few simple ideas: keep each tool focused, keep the
          interface clear, and make useful results available in a click.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          What you&apos;ll find here
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub groups its tools into several categories:
        </p>
        <ul className="flex flex-col gap-2 text-sm text-[var(--muted)]">
          <li>
            <Link href="/generators" className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]">
              Generators
            </Link>{" "}
            — random numbers, dice, coin flips, colors, dates, emoji,
            passwords, usernames, company names, domain ideas, teams,
            wheel spinner, QR codes, and more.
          </li>
          <li>
            <Link href="/tools" className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]">
              Text tools
            </Link>{" "}
            — word counter, character counter, case converter, sort lines,
            remove duplicate lines, and QR code generator.
          </li>
          <li>
            <Link href="/calculators" className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]">
              Calculators
            </Link>{" "}
            — age calculator, BMI calculator, tip calculator, date difference
            calculator, and percentage calculator.
          </li>
          <li>
            <Link href="/fun" className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]">
              Fun & Random
            </Link>{" "}
            — would you rather, truth or dare, random questions, daily ideas,
            conversation starters, movie night picker, decision maker, and
            more.
          </li>
          <li>
            <Link href="/ru" className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]">
              Русский раздел (Russian)
            </Link>{" "}
            — a dedicated Russian-language section with instruments,
            divination features, and entertainment tools.
          </li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          Most tools run directly in your browser — no data is sent to a
          server. No account or registration is needed to use any tool.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Our approach
        </h2>
        <ul className="flex flex-col gap-2 text-sm text-[var(--muted)]">
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Focused tools
            </span>{" "}
            — each generator is built to do one job well, rather than
            bundling unrelated features together.
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Clear interfaces
            </span>{" "}
            — options are labeled plainly, with input validation and
            straightforward error messages when something needs adjusting.
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              No registration
            </span>{" "}
            — every tool works without creating an account or signing in.
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Transparent limitations
            </span>{" "}
            — where a tool has a real limitation, such as not checking
            domain or username availability, that is stated directly on
            the tool&apos;s page rather than left unsaid.
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              No fake guarantees
            </span>{" "}
            — TryGenHub does not claim availability, accuracy, or
            suitability it cannot back up, and does not present generated
            ideas as professional, legal, or medical advice.
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Privacy-conscious
            </span>{" "}
            — user input is processed locally where possible. Analytics
            (Google Analytics) is only loaded with your explicit consent.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Generators ({availableGenerators.length} available)
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {availableGenerators.map((generator) => (
            <li key={generator.id}>
              <Link
                href={generator.href}
                className="flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {generator.name}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {generator.shortDescription}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Text tools ({tools.length} available)
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tools.map((tool) => (
            <li key={tool.id}>
              <Link
                href={tool.href}
                className="flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {tool.name}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {tool.shortDescription}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Calculators ({calculators.length} available)
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {calculators.map((calc) => (
            <li key={calc.id}>
              <Link
                href={calc.href}
                className="flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {calc.name}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {calc.shortDescription}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-sm text-[var(--muted)]">
          Have a question, found a bug, or want to suggest a new tool?
          Visit the{" "}
          <Link
            href="/contact"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Contact page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
