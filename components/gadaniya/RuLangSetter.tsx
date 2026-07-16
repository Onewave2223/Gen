"use client";

import * as React from "react";

/**
 * The root layout sets <html lang="en"> for the whole site (see
 * app/layout.tsx). Since Next.js only allows a single root layout to
 * own the <html> tag, we can't give /ru/gadaniya its own server-side
 * lang attribute without restructuring the existing app shell.
 *
 * Instead, this small client-only component patches
 * document.documentElement.lang to "ru" while a gadaniya page is
 * mounted, and restores the previous value on unmount. This keeps
 * assistive technology and browser language detection accurate for
 * this section without touching the shared root layout or any
 * existing routes.
 */
export function RuLangSetter() {
  React.useEffect(() => {
    const previousLang = document.documentElement.lang;
    document.documentElement.lang = "ru";

    return () => {
      document.documentElement.lang = previousLang;
    };
  }, []);

  return null;
}

RuLangSetter.displayName = "RuLangSetter";
