"use client";

import * as React from "react";

const SCROLL_THRESHOLD = 8;

/**
 * Toggles `.header-scrolled` on the nearest ancestor <header> once the page
 * scrolls past a small threshold, giving the sticky header a subtle
 * shadow/background transition. Renders no DOM of its own.
 */
export function HeaderScrollState() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const header = ref.current?.closest("header");
    if (!header) return;

    let ticking = false;

    const update = () => {
      header.classList.toggle("header-scrolled", window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={ref} aria-hidden="true" className="hidden" />;
}

HeaderScrollState.displayName = "HeaderScrollState";
