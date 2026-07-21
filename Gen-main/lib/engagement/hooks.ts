"use client";

import * as React from "react";
import { catalog, catalogRu, type CatalogItem } from "@/lib/engagement/catalog";
import {
  getFavoriteIds,
  toggleFavorite as toggleFavoriteInStore,
  subscribeFavorites,
  getRecentIds,
  recordRecentlyUsed as recordRecentlyUsedInStore,
  subscribeRecent,
  type EngagementLocale,
} from "@/lib/engagement/store";

function resolveItems(
  ids: readonly string[],
  items: readonly CatalogItem[],
): CatalogItem[] {
  const byId = new Map(items.map((item) => [item.id, item]));
  return ids
    .map((id) => byId.get(id))
    .filter((item): item is CatalogItem => Boolean(item));
}

function catalogFor(locale: EngagementLocale): readonly CatalogItem[] {
  return locale === "ru" ? catalogRu : catalog;
}

/**
 * Favorites, backed by localStorage. `ids`/`items` start empty on the
 * server and hydrate on mount (avoids SSR/client markup mismatches).
 * Pass locale="ru" to back this with the RU catalog + a separate,
 * namespaced localStorage key so EN and RU favorites never collide.
 */
export function useFavorites(locale: EngagementLocale = "en") {
  const [ids, setIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    setIds(getFavoriteIds(locale));
    return subscribeFavorites(() => setIds(getFavoriteIds(locale)), locale);
  }, [locale]);

  const toggle = React.useCallback(
    (id: string) => {
      setIds(toggleFavoriteInStore(id, locale));
    },
    [locale],
  );

  const items = React.useMemo(
    () => resolveItems(ids, catalogFor(locale)),
    [ids, locale],
  );

  return {
    ids,
    items,
    toggle,
    isFavorite: (id: string) => ids.includes(id),
  };
}

/** Recently-used items, backed by localStorage, most recent first. */
export function useRecentlyUsed(locale: EngagementLocale = "en") {
  const [ids, setIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    setIds(getRecentIds(locale));
    return subscribeRecent(() => setIds(getRecentIds(locale)), locale);
  }, [locale]);

  const items = React.useMemo(
    () => resolveItems(ids, catalogFor(locale)),
    [ids, locale],
  );

  return { ids, items };
}

/** Records a page visit. Call once per generator/tool/calculator page view. */
export function recordRecentlyUsed(id: string, locale: EngagementLocale = "en"): void {
  recordRecentlyUsedInStore(id, locale);
}
