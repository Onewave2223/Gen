"use client";

/**
 * A button styled as a link that reopens the cookie consent banner.
 * Place this wherever users should be able to review or change their
 * analytics preference (e.g. in the footer).
 */
export function CookieSettingsLink({
  label = "Cookie settings",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("tgh:reopen_consent"));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "inline-block rounded-[var(--radius)] py-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      }
    >
      {label}
    </button>
  );
}

CookieSettingsLink.displayName = "CookieSettingsLink";
