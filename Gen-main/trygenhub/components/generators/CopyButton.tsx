"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { copyToClipboard } from "@/lib/utils";

export interface CopyButtonProps
  extends Omit<ButtonProps, "onClick" | "children"> {
  text: string;
  label?: string;
  copiedLabel?: string;
}

const RESET_DELAY_MS = 2000;

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      text,
      label = "Copy",
      copiedLabel = "Copied!",
      disabled,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const handleClick = async () => {
      const success = await copyToClipboard(text);

      if (!success) return;

      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, RESET_DELAY_MS);
    };

    return (
      <Button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={copied ? "motion-success-pulse" : undefined}
        {...props}
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {copied ? (
            <path d="M5 13l4 4L19 7" />
          ) : (
            <>
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </>
          )}
        </svg>
        {copied ? copiedLabel : label}
      </Button>
    );
  },
);

CopyButton.displayName = "CopyButton";
