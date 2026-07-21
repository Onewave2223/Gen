"use client";

export type EngagementLocale = "en" | "ru";

const RECENT_LIMIT = 8;

/**
 * Key/event names are namespaced by locale so EN and RU favorites /
 * recently-used lists never collide, since they're backed by two
 * different catalogs (different ids, different hrefs). The "en"
 * locale keeps the original (pre-i18n) key names so existing
 * localStorage data isn't lost for current users.
 */
function favoritesKey(locale: EngagementLocale): string {
  return locale === "ru" ? "tgh:favorites:ru:v1" : "tgh:favorites:v1";
}

function recentKey(locale: EngagementLocale): string {
  return locale === "ru" ? "tgh:recent:ru:v1" : "tgh:recent:v1";
}

function favoritesEvent(locale: EngagementLocale): string {
  return locale === "ru" ? "tgh:favorites-changed:ru" : "tgh:favorites-changed";
}

function recentEvent(locale: EngagementLocale): string {
  return locale === "ru" ? "tgh:recent-changed:ru" : "tgh:recent-changed";
}

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // localStorage may be unavailable (private mode, quota, etc.) — fail silently.
  }
}

export function getFavoriteIds(locale: EngagementLocale = "en"): string[] {
  return readIds(favoritesKey(locale));
}

export function isFavorite(id: string, locale: EngagementLocale = "en"): boolean {
  return getFavoriteIds(locale).includes(id);
}

export function toggleFavorite(id: string, locale: EngagementLocale = "en"): string[] {
  const current = getFavoriteIds(locale);
  const next = current.includes(id)
    ? current.filter((existing) => existing !== id)
    : [id, ...current];
  writeIds(favoritesKey(locale), next);
  window.dispatchEvent(new CustomEvent(favoritesEvent(locale)));
  return next;
}

export function subscribeFavorites(
  callback: () => void,
  locale: EngagementLocale = "en",
): () => void {
  window.addEventListener(favoritesEvent(locale), callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(favoritesEvent(locale), callback);
    window.removeEventListener("storage", callback);
  };
}

export function getRecentIds(locale: EngagementLocale = "en"): string[] {
  return readIds(recentKey(locale));
}

export function recordRecentlyUsed(id: string, locale: EngagementLocale = "en"): void {
  const current = getRecentIds(locale);
  const next = [id, ...current.filter((existing) => existing !== id)].slice(
    0,
    RECENT_LIMIT,
  );
  writeIds(recentKey(locale), next);
  window.dispatchEvent(new CustomEvent(recentEvent(locale)));
}

export function subscribeRecent(
  callback: () => void,
  locale: EngagementLocale = "en",
): () => void {
  window.addEventListener(recentEvent(locale), callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(recentEvent(locale), callback);
    window.removeEventListener("storage", callback);
  };
}
