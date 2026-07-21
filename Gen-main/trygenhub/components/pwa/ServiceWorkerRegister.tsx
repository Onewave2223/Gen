"use client";

import * as React from "react";

/**
 * Registers /sw.js once the window has finished loading. This is what
 * makes the site installable (Chrome's install-prompt heuristic requires
 * a controlling service worker with a fetch handler) and gives already
 * visited pages basic offline availability.
 *
 * Deliberately renders nothing and never throws: unsupported browsers
 * (or registration failures) just silently skip this, no functional
 * difference to the rest of the site.
 */
export function ServiceWorkerRegister() {
  React.useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Non-fatal: the site works fully without offline support.
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
