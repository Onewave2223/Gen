"use client";

import { AdSlot } from "@/components/ads/AdSlot";
import { env } from "@/lib/env";
import type { Locale } from "@/lib/iq-test/types";
import { CATEGORY_LABELS, CATEGORY_DESCRIPTIONS, getDictionary } from "@/lib/iq-test/i18n";
import { CATEGORY_LIST, questionsByCategory, TOTAL_TEST_QUESTIONS } from "@/lib/iq-test/questions";

interface Props {
  locale: Locale;
  onStart: () => void;
}

export function IntroScreen({ locale, onStart }: Props) {
  const dict = getDictionary(locale);
  const termsHref = locale === "ru" ? "/ru/usloviya" : "/terms";

  return (
    <div className="motion-page-enter flex flex-col gap-12">
      {/* Hero section */}
      <section className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
          <svg aria-hidden="true" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {dict.heroTitlePrefix}
            <span className="ml-2 text-[var(--primary)]">–</span>{" "}
            {dict.heroTitleSuffix}
          </h1>
          <p className="mx-auto max-w-xl text-base text-[var(--muted)] sm:text-lg">
            {dict.heroSubtitle}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: String(TOTAL_TEST_QUESTIONS), label: dict.statQuestions },
            { value: String(CATEGORY_LIST.length), label: dict.statCategories },
            { value: locale === "ru" ? "15–20 мин" : "15–20 min", label: dict.statTime },
            { value: locale === "ru" ? "Бесплатно" : "Free", label: dict.statFree },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <span className="text-xl font-bold text-[var(--primary)]">{value}</span>
              <span className="text-xs text-[var(--muted)]">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onStart}
          className="motion-press inline-flex h-12 items-center gap-2.5 rounded-[var(--radius)] bg-[var(--primary)] px-8 py-3.5 text-base font-semibold text-[var(--primary-foreground)] shadow-md transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          {dict.startButton}
        </button>

        <p className="max-w-sm text-xs text-[var(--muted)]">
          {dict.startFooterNote}{" "}
          <a href={termsHref} className="underline underline-offset-2 hover:text-[var(--foreground)]">
            {dict.termsLink}
          </a>
          .
        </p>
      </section>

      {/* Disclaimer */}
      <section
        aria-label="Disclaimer"
        className="rounded-[var(--radius)] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-900/15 dark:text-amber-300"
      >
        <strong>{dict.disclaimerTitle}</strong> {dict.disclaimerBody}
      </section>

      {/* How it works */}
      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-bold text-[var(--foreground)]">{dict.howItWorksTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {dict.howItWorks.map(({ title, desc }) => (
            <div key={title} className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">{title}</h3>
              <p className="text-sm text-[var(--muted)]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instructions */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--foreground)]">{dict.instructionsTitle}</h2>
        <ul className="flex flex-col gap-2.5">
          {dict.instructions.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-[var(--primary-foreground)]">
                {i + 1}
              </span>
              <span className="text-sm text-[var(--muted)]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--foreground)]">{dict.categoriesTitle}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_LIST.map((category) => (
            <div key={category} className="flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--foreground)]">{CATEGORY_LABELS[category][locale]}</span>
                <span className="rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
                  {questionsByCategory[category].length} {locale === "ru" ? "вопр." : "Qs"}
                </span>
              </div>
              <p className="text-xs text-[var(--muted)]">{CATEGORY_DESCRIPTIONS[category][locale]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad slot */}
      <div className="w-full">
        <AdSlot
          slot={env.adsenseSlotHome}
          className="my-2 min-h-[90px] w-full p-2"
        />
      </div>

      {/* SEO content blocks */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--foreground)]">{dict.whatMeasuresTitle}</h2>
        {dict.whatMeasuresBody.map((p, i) => (
          <p key={i} className="text-sm text-[var(--muted)] leading-relaxed">{p}</p>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--foreground)]">{dict.averageScoreTitle}</h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">{dict.averageScoreIntro}</p>
        <ul className="flex flex-col gap-2 text-sm">
          {dict.averageScoreBands.map(({ range, label, desc }) => (
            <li key={range} className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
              <span className="w-24 flex-shrink-0 text-sm font-mono font-semibold text-[var(--primary)]">{range}</span>
              <span className="font-medium text-[var(--foreground)]">{label}</span>
              <span className="text-[var(--muted)]">— {desc}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-[var(--muted)] italic">{dict.averageScoreFootnote}</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--foreground)]">{dict.accurateResultTitle}</h2>
        <ul className="flex flex-col gap-2 text-sm text-[var(--muted)]">
          {dict.accurateResultTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0 text-[var(--primary)]">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--foreground)]">{dict.vsOfficialTitle}</h2>
        {dict.vsOfficialBody.map((p, i) => (
          <p key={i} className="text-sm text-[var(--muted)] leading-relaxed">{p}</p>
        ))}
      </section>

      {/* Ad slot */}
      <div className="w-full">
        <AdSlot
          slot={env.adsenseSlotGenerator}
          className="my-2 min-h-[90px] w-full p-2"
        />
      </div>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
        <h2 id="faq-heading" className="text-xl font-bold text-[var(--foreground)]">
          {dict.faqTitle}
        </h2>
        <div className="flex flex-col gap-2">
          {dict.faqItems.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 text-sm font-medium text-[var(--foreground)] marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--primary)]">
                {q}
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="border-t border-[var(--border)] px-4 py-3 text-sm text-[var(--muted)]">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-col items-center gap-4 rounded-[var(--radius)] border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-6 py-10 text-center">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">{dict.finalCtaTitle}</h2>
        <p className="max-w-sm text-sm text-[var(--muted)]">
          {dict.finalCtaSubtitle}
        </p>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex h-12 items-center gap-2 rounded-[var(--radius)] bg-[var(--primary)] px-7 text-base font-semibold text-[var(--primary-foreground)] shadow transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        >
          {dict.finalCtaButton}
        </button>
      </section>
    </div>
  );
}

IntroScreen.displayName = "IntroScreen";
