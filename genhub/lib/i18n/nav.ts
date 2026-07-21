/**
 * Primary navigation config for the Header/MobileMenu, localized for EN/RU.
 *
 * The RU site groups generators/calculators/text-tools into a single
 * "instrumenty" section (see lib/i18n/route-map.ts), so the RU nav has one
 * link where EN has three — this mirrors the real site structure instead of
 * pointing three separate labels at the same page.
 */

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS_EN: NavLink[] = [
  { href: "/fortune", label: "Fortune" },
  { href: "/generators", label: "Generators" },
  { href: "/calculators", label: "Calculators" },
  { href: "/tools", label: "Tools" },
  { href: "/iq-test", label: "IQ Test" },
  { href: "/fun", label: "Fun" },
];

export const NAV_LINKS_RU: NavLink[] = [
  { href: "/ru/gadaniya", label: "Гадания" },
  { href: "/ru/instrumenty", label: "Инструменты" },
  { href: "/ru/test-na-iq", label: "IQ-тест" },
  { href: "/ru/razvlecheniya", label: "Развлечения" },
];

export function getNavLinks(isRu: boolean): NavLink[] {
  return isRu ? NAV_LINKS_RU : NAV_LINKS_EN;
}

export interface HeaderCopy {
  browseTools: string;
  browseToolsHref: string;
  homeHref: string;
  openMenu: string;
  closeMenu: string;
  home: string;
  about: string;
  favoritesHref: string;
  favoritesLabel: string;
}

export function getHeaderCopy(isRu: boolean): HeaderCopy {
  return isRu
    ? {
        browseTools: "Все инструменты",
        browseToolsHref: "/ru#categories",
        homeHref: "/ru",
        openMenu: "Открыть меню",
        closeMenu: "Закрыть меню",
        home: "Главная",
        about: "О проекте",
        favoritesHref: "/ru/favorites",
        favoritesLabel: "Избранное",
      }
    : {
        browseTools: "Browse tools",
        browseToolsHref: "/#categories",
        homeHref: "/",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        home: "Home",
        about: "About",
        favoritesHref: "/favorites",
        favoritesLabel: "Favorites",
      };
}
