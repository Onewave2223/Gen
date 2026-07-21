import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface TrustItem {
  title: string;
  description: string;
  icon: "shield" | "no-signup" | "free" | "bolt" | "mobile" | "devices";
}

const ICONS: Record<TrustItem["icon"], ReactNode> = {
  shield: (
    <path d="M12 2 4 5v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V5l-8-3Z" />
  ),
  "no-signup": (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      <path d="m17 4 4 4M21 4l-4 4" />
    </>
  ),
  free: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.2c0 1.7-2.5 1.9-2.5 3.8M12 17h.01" />
    </>
  ),
  bolt: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  mobile: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  devices: (
    <>
      <rect x="2" y="4" width="14" height="10" rx="1" />
      <path d="M6 18h6" />
      <rect x="17" y="9" width="5" height="8" rx="1" />
    </>
  ),
};

const ITEMS_EN: readonly TrustItem[] = [
  { icon: "shield", title: "Privacy First", description: "Your data stays yours — most tools run entirely in your browser." },
  { icon: "no-signup", title: "No Registration", description: "Jump straight in. No accounts, no email, no passwords." },
  { icon: "free", title: "Free Forever", description: "Every tool on TryGenHub is free to use, with no hidden costs." },
  { icon: "bolt", title: "Instant Results", description: "Generate, calculate, or reveal your result the moment you click." },
  { icon: "mobile", title: "Mobile Friendly", description: "A smooth, responsive experience on phones and tablets." },
  { icon: "devices", title: "Works Everywhere", description: "No installs required — just open a browser on any device." },
];

const ITEMS_RU: readonly TrustItem[] = [
  { icon: "shield", title: "Приватность прежде всего", description: "Ваши данные остаются у вас — большинство инструментов работает прямо в браузере." },
  { icon: "no-signup", title: "Без регистрации", description: "Начните пользоваться сразу. Никаких аккаунтов, email и паролей." },
  { icon: "free", title: "Бесплатно навсегда", description: "Все инструменты TryGenHub бесплатны, без скрытых платежей." },
  { icon: "bolt", title: "Мгновенный результат", description: "Генерация, расчёт или ответ появляются сразу же по клику." },
  { icon: "mobile", title: "Удобно с телефона", description: "Плавный адаптивный интерфейс на телефонах и планшетах." },
  { icon: "devices", title: "На любом устройстве", description: "Ничего устанавливать не нужно — просто откройте браузер." },
];

const COPY = {
  en: { heading: "Built for trust", items: ITEMS_EN },
  ru: { heading: "Создано для доверия", items: ITEMS_RU },
} as const;

export interface TrustSectionProps {
  locale?: "en" | "ru";
}

export function TrustSection({ locale = "en" }: TrustSectionProps = {}) {
  const { heading, items } = COPY[locale];

  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          {heading}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <ScrollReveal
              key={item.title}
              index={index}
              className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--primary-soft)] text-[var(--primary)]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[item.icon]}
                </svg>
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  {item.title}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {item.description}
                </span>
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

TrustSection.displayName = "TrustSection";
