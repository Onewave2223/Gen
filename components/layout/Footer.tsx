import Link from "next/link";

const FOOTER_SECTIONS: {
  title: string;
  links: { href: string; label: string }[];
}[] = [
  {
    title: "Tools",
    links: [
      { href: "/#generators", label: "All generators" },
      { href: "/generators/random-number", label: "Random Number Generator" },
      { href: "/generators/password", label: "Password Generator" },
      { href: "/generators/username", label: "Username Generator" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-[var(--radius)] text-lg font-bold tracking-tight text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--primary)]"
              />
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

        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--muted)]">
            © {year} TryGenHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";
