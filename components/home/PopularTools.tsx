import type { ReactNode } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface PopularTool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: ReactNode;
  accent: string;
  accentSoft: string;
  badge?: string;
  featured?: boolean;
}

const BrainIcon = () => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.25A2.25 2.25 0 0 1 12 4.5a2.25 2.25 0 0 1-2.5-2.25V2Z" />
    <path d="M9.5 2C7 2 5 4 5 6.5c0 1.5.5 2.5 1 3.5C4.5 11 3 12.5 3 14.5 3 17 5 19 7.5 19c.9 0 1.7-.25 2.5-.7V22h4v-3.7c.8.45 1.6.7 2.5.7 2.5 0 4.5-2 4.5-4.5 0-2-1.5-3.5-3-4.5.5-1 1-2 1-3.5C19 4 17 2 14.5 2" />
  </svg>
);

const CrystalBallIcon = () => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="8" />
    <path d="M12 18v4M8 22h8" />
    <path d="M8 8c0-1 1-3 4-3" strokeOpacity="0.6" />
  </svg>
);

const DiceIcon = () => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="3" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    <circle cx="16" cy="16" r="1.2" fill="currentColor" />
    <circle cx="16" cy="8" r="1.2" fill="currentColor" />
    <circle cx="8" cy="16" r="1.2" fill="currentColor" />
  </svg>
);

const NumberIcon = () => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
  </svg>
);

const LockIcon = () => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

const CoinIcon = () => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M9 9.5c0-1.38 1.12-2.5 3-2.5s3 1.12 3 2.5c0 2.5-6 2-6 4.5s1.12 2.5 3 2.5 3-1.12 3-2.5" />
  </svg>
);

const WheelIcon = () => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" />
  </svg>
);

const POPULAR_TOOLS_EN: PopularTool[] = [
  {
    id: "fortune",
    name: "Fortune & Gadaniya",
    description: "Yes or No, crystal ball, tarot card of the day, coin flip, wish fortune — 6 tools.",
    href: "/ru/gadaniya",
    icon: <CrystalBallIcon />,
    accent: "#8b5cf6",
    accentSoft: "#f5f3ff",
    badge: "Fortune",
    featured: true,
  },
  {
    id: "iq-test",
    name: "IQ Test",
    description: "35 questions across 7 reasoning categories. Instant estimated score, no sign-up.",
    href: "/iq-test",
    icon: <BrainIcon />,
    accent: "var(--primary)",
    accentSoft: "var(--primary-soft)",
    badge: "Popular",
    featured: true,
  },
  {
    id: "random-picker",
    name: "Random Picker",
    description: "Pick a random item from your own list. Perfect for decisions.",
    href: "/generators/random-picker",
    icon: <DiceIcon />,
    accent: "var(--accent-2)",
    accentSoft: "var(--accent-2-soft)",
    badge: "Popular",
  },
  {
    id: "random-number",
    name: "Random Number",
    description: "Generate random numbers within any range. Fast and unbiased.",
    href: "/generators/random-number",
    icon: <NumberIcon />,
    accent: "var(--accent-2)",
    accentSoft: "var(--accent-2-soft)",
  },
  {
    id: "password",
    name: "Password Generator",
    description: "Create strong, random passwords with custom length and characters.",
    href: "/generators/password",
    icon: <LockIcon />,
    accent: "var(--success)",
    accentSoft: "var(--success-soft)",
    badge: "Popular",
  },
  {
    id: "coin-flip",
    name: "Coin Flip",
    description: "Virtual coin toss with animated flip. Heads or tails?",
    href: "/generators/coin-flip",
    icon: <CoinIcon />,
    accent: "#f59e0b",
    accentSoft: "#fffbeb",
  },
  {
    id: "wheel-spinner",
    name: "Wheel Spinner",
    description: "Spin a customizable wheel to pick a random winner or option.",
    href: "/generators/wheel-spinner",
    icon: <WheelIcon />,
    accent: "#ec4899",
    accentSoft: "#fdf2f8",
  },
  {
    id: "decision-maker",
    name: "Decision Maker",
    description: "Can't decide? Enter your options and let the tool choose for you.",
    href: "/fun/decision-maker",
    icon: <DiceIcon />,
    accent: "#0ea5e9",
    accentSoft: "#f0f9ff",
  },
];

const POPULAR_TOOLS_RU: PopularTool[] = [
  {
    id: "gadaniya",
    name: "Гадания и Таро",
    description: "Да или нет, шар судьбы, карта дня Таро, монетка, желание — 6 инструментов.",
    href: "/ru/gadaniya",
    icon: <CrystalBallIcon />,
    accent: "#8b5cf6",
    accentSoft: "#f5f3ff",
    badge: "Гадания",
    featured: true,
  },
  {
    id: "test-na-iq",
    name: "Тест на IQ",
    description: "35 вопросов на 7 типов мышления. Мгновенный результат, без регистрации.",
    href: "/ru/test-na-iq",
    icon: <BrainIcon />,
    accent: "var(--primary)",
    accentSoft: "var(--primary-soft)",
    badge: "Популярное",
    featured: true,
  },
  {
    id: "sluchaynyy-vybor",
    name: "Случайный выбор",
    description: "Выберите случайный элемент из своего списка. Идеально для решений.",
    href: "/ru/instrumenty/sluchaynyy-vybor",
    icon: <DiceIcon />,
    accent: "var(--accent-2)",
    accentSoft: "var(--accent-2-soft)",
    badge: "Популярное",
  },
  {
    id: "sluchaynoe-chislo",
    name: "Случайное число",
    description: "Генерируйте случайные числа в любом диапазоне. Быстро и честно.",
    href: "/ru/instrumenty/sluchaynoe-chislo",
    icon: <NumberIcon />,
    accent: "var(--accent-2)",
    accentSoft: "var(--accent-2-soft)",
  },
  {
    id: "generator-paroley",
    name: "Генератор паролей",
    description: "Создавайте надёжные пароли произвольной длины и состава.",
    href: "/ru/instrumenty/generator-paroley",
    icon: <LockIcon />,
    accent: "var(--success)",
    accentSoft: "var(--success-soft)",
    badge: "Популярное",
  },
  {
    id: "monetka",
    name: "Монетка",
    description: "Виртуальное подбрасывание монеты с анимацией. Орёл или решка?",
    href: "/ru/gadaniya/monetka",
    icon: <CoinIcon />,
    accent: "#f59e0b",
    accentSoft: "#fffbeb",
  },
  {
    id: "sluchaynyy-pobeditel",
    name: "Колесо фортуны",
    description: "Крутите настраиваемое колесо, чтобы выбрать случайного победителя.",
    href: "/ru/instrumenty/sluchaynyy-pobeditel",
    icon: <WheelIcon />,
    accent: "#ec4899",
    accentSoft: "#fdf2f8",
  },
  {
    id: "prinyat-reshenie",
    name: "Принять решение",
    description: "Не можете решить? Введите варианты — инструмент выберет за вас.",
    href: "/ru/razvlecheniya/prinyat-reshenie",
    icon: <DiceIcon />,
    accent: "#0ea5e9",
    accentSoft: "#f0f9ff",
  },
];

const COPY = {
  en: {
    eyebrow: "Popular tools",
    title: "Start with our most popular tools",
    subtitle:
      "IQ tests, fortune tools, random generators, and everyday utilities — all free, all instant.",
  },
  ru: {
    eyebrow: "Популярные инструменты",
    title: "Начните с самых популярных инструментов",
    subtitle:
      "IQ-тесты, гадания, генераторы случайных значений и повседневные утилиты — бесплатно и мгновенно.",
  },
} as const;

export interface PopularToolsProps {
  locale?: "en" | "ru";
}

export function PopularTools({ locale = "en" }: PopularToolsProps = {}) {
  const tools = locale === "ru" ? POPULAR_TOOLS_RU : POPULAR_TOOLS_EN;
  const copy = COPY[locale];

  return (
    <section
      id="popular-tools"
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14"
    >
      <div className="flex flex-col gap-1.5 text-center">
        <span className="text-sm font-medium text-[var(--primary)]">
          {copy.eyebrow}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mx-auto max-w-xl text-sm text-[var(--muted)] sm:text-base">
          {copy.subtitle}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool, index) => (
          <ScrollReveal key={tool.id} index={index}>
            <Link
              href={tool.href}
              className={`group relative flex h-full flex-col gap-3 rounded-[var(--radius)] border bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                tool.featured
                  ? "border-[var(--primary)]/30 hover:border-[var(--primary)]/60"
                  : "border-[var(--border)] hover:border-[var(--border-strong)]"
              }`}
            >
              {tool.badge && (
                <span
                  className="absolute right-4 top-4 rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: tool.accentSoft,
                    color: tool.accent,
                  }}
                >
                  {tool.badge}
                </span>
              )}

              <span
                className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] transition-transform duration-200 group-hover:scale-110"
                style={{
                  backgroundColor: tool.accentSoft,
                  color: tool.accent,
                }}
                aria-hidden="true"
              >
                {tool.icon}
              </span>

              <span className="flex flex-col gap-1 pr-12">
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  {tool.name}
                </span>
                <span className="text-xs leading-relaxed text-[var(--muted)]">
                  {tool.description}
                </span>
              </span>

              <span
                className="mt-auto text-xs font-medium"
                style={{ color: tool.accent }}
              >
                {locale === "ru" ? "Попробовать" : "Try it"}{" "}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

PopularTools.displayName = "PopularTools";
