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
        {...props}
      >
        {copied ? copiedLabel : label}
      </Button>
    );
  },
);

CopyButton.displayName = "CopyButton";
