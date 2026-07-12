const BENEFITS = [
  {
    title: "Fast",
    description:
      "Get results instantly with lightweight tools built for everyday tasks.",
  },
  {
    title: "Free to use",
    description:
      "Use our core generators without creating an account or paying to get started.",
  },
  {
    title: "Privacy-friendly",
    description:
      "Many tools run directly in your browser, keeping simple generation tasks fast and private.",
  },
];

export function WhyGenHub() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Simple tools, without the friction
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {BENEFITS.map((benefit) => (
          <div key={benefit.title} className="flex flex-col gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-[var(--surface)] text-[var(--primary)]"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-base font-semibold text-[var(--foreground)]">
              {benefit.title}
            </span>
            <span className="text-sm text-[var(--muted)]">
              {benefit.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

WhyGenHub.displayName = "WhyGenHub";
