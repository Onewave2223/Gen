const BENEFITS = ["Free to use", "No sign-up required", "Fast and private"];

export function Hero() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
          Free online tools
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Generate anything. Instantly.
        </h1>

        <p className="max-w-xl text-lg text-[var(--muted)]">
          Fast, free, and easy-to-use generators for numbers, passwords,
          names, colors, dates, and more.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#generators"
            className="inline-flex h-11 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-6 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Browse generators
          </a>
          <a
            href="#popular"
            className="inline-flex h-11 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-6 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Explore popular tools
          </a>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-2 text-sm text-[var(--muted)]"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--primary)]"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

Hero.displayName = "Hero";
