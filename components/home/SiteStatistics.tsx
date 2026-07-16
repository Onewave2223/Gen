import { catalogStats, catalogStatsRu } from "@/lib/engagement/catalog";
import { TOTAL_TEST_QUESTIONS } from "@/lib/iq-test/questions";
import { gadaniyaTools } from "@/data/gadaniya";

type Locale = "en" | "ru";

const LANGUAGES_SUPPORTED = 2;

const LABELS = {
  en: {
    ariaLabel: "TryGenHub statistics",
    generators: "Generators",
    toolsAndCalculators: "Tools & Calculators",
    iqQuestions: "IQ Test Questions",
    languages: "Languages",
  },
  ru: {
    ariaLabel: "Статистика TryGenHub",
    instruments: "Инструментов",
    gadaniya: "Гаданий",
    iqQuestions: "Вопросов в IQ-тесте",
    languages: "Языков",
  },
} as const;

export interface SiteStatisticsProps {
  locale?: Locale;
}

export function SiteStatistics({ locale = "en" }: SiteStatisticsProps = {}) {
  const stats =
    locale === "ru"
      ? [
          { label: LABELS.ru.instruments, value: catalogStatsRu.toolCount },
          { label: LABELS.ru.gadaniya, value: gadaniyaTools.length },
          { label: LABELS.ru.iqQuestions, value: TOTAL_TEST_QUESTIONS },
          { label: LABELS.ru.languages, value: LANGUAGES_SUPPORTED },
        ]
      : [
          { label: LABELS.en.generators, value: catalogStats.generatorCount },
          {
            label: LABELS.en.toolsAndCalculators,
            value: catalogStats.toolCount + catalogStats.calculatorCount,
          },
          { label: LABELS.en.iqQuestions, value: TOTAL_TEST_QUESTIONS },
          { label: LABELS.en.languages, value: LANGUAGES_SUPPORTED },
        ];

  return (
    <section
      aria-label={LABELS[locale].ariaLabel}
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-center shadow-[var(--shadow)]"
          >
            <span className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
              {stat.value}+
            </span>
            <span className="text-xs text-[var(--muted)] sm:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

SiteStatistics.displayName = "SiteStatistics";
