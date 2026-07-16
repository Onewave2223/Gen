import Link from "next/link";
import { CookieSettingsLink } from "@/components/consent/CookieSettingsLink";

const FOOTER_SECTIONS: {
  title: string;
  links: { href: string; label: string }[];
}[] = [
  {
    title: "Tools",
    links: [
      { href: "/generators", label: "Generators" },
      { href: "/tools", label: "Text Tools" },
      { href: "/calculators", label: "Calculators" },
      { href: "/fun", label: "Fun & Random" },
      { href: "/fortune", label: "Fortune & Fun" },
      { href: "/iq-test", label: "IQ Test" },
      { href: "/generators/random-number", label: "Random Number Generator" },
      { href: "/generators/password", label: "Password Generator" },
      { href: "/how-it-works", label: "How It Works" },
    ],
  },
  {
    title: "Russian",
    links: [
      { href: "/ru", label: "Русский раздел" },
      { href: "/ru/test-na-iq", label: "Тест на IQ" },
      { href: "/ru/instrumenty", label: "Инструменты" },
      { href: "/ru/gadaniya", label: "Гадания" },
      { href: "/ru/razvlecheniya", label: "Развлечения" },
      { href: "/ru/kak-eto-rabotaet", label: "Как это работает" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/ru/o-proekte", label: "О проекте" },
      { href: "/ru/kontakty", label: "Контакты" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/ru/konfidencialnost", label: "Конфиденциальность" },
      { href: "/ru/usloviya", label: "Условия" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="brand-hairline" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-3 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-[var(--radius)] text-lg font-bold tracking-tight text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-[var(--primary)] to-[var(--accent-2)] text-xs font-extrabold text-white"
              >
                T
              </span>
              TryGenHub
            </Link>
            <p className="max-w-xs text-sm text-[var(--muted)]">
              Free, fast, and easy-to-use online generators and random tools.
            </p>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-[var(--foreground)]">
                {section.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block rounded-[var(--radius)] py-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--muted)]">
            © {year} TryGenHub. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {/* Cookie settings — opens the consent banner again so users
                can review or change their analytics choice at any time. */}
            <CookieSettingsLink label="Cookie settings" />
            <span aria-hidden="true" className="text-[var(--border)]">·</span>
            <CookieSettingsLink label="Настройки cookies" />
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";
