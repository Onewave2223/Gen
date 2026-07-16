"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Index within a group — used to derive a small, capped stagger delay. */
  index?: number;
}

const MAX_STAGGER_ITEMS = 8;

/**
 * Reveals its children with a short fade/slide once they scroll into view.
 *
 * SEO/accessibility note: children are always present in the DOM. The
 * "hidden" state is only ever applied after mount, and only when
 * IntersectionObserver is available — so search engines, no-JS clients, and
 * reduced-motion users all see the fully visible content immediately.
 */
export function ScrollReveal({
  children,
  index = 0,
  className,
  style,
  ...props
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [state, setState] = React.useState<"visible" | "hidden">("visible");

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const node = ref.current;
    if (!node) return;

    // Start hidden only once we know we can actually observe + reveal it.
    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const staggerIndex = Math.min(index, MAX_STAGGER_ITEMS);
  const mergedStyle = {
    ...style,
    "--stagger-index": staggerIndex,
    "--reveal-delay": `${staggerIndex * 40}ms`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      data-reveal-state={state}
      className={cn("scroll-reveal", className)}
      style={mergedStyle}
      {...props}
    >
      {children}
    </div>
  );
}

ScrollReveal.displayName = "ScrollReveal";
