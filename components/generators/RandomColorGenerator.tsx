"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateRandomColor,
  formatRgb,
  formatHsl,
  type RandomColor,
} from "@/lib/generators/random-color";

/**
 * Estimates relative luminance to pick a readable light/dark text
 * color for the preview swatch. This is a simple heuristic, not a
 * formal WCAG contrast calculation.
 */
function getReadableTextColor(color: RandomColor): string {
  const { r, g, b } = color.rgb;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000000" : "#FFFFFF";
}

export function RandomColorGenerator() {
  const [color, setColor] = React.useState<RandomColor | null>(null);

  const handleGenerate = () => {
    setColor(generateRandomColor());
  };

  const handleReset = () => {
    setColor(null);
  };

  const hasColor = color !== null;
  const textColor = hasColor ? getReadableTextColor(color) : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleGenerate}>
          Generate color
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <ResultBox empty={!hasColor} emptyMessage="Your color will appear here.">
        {hasColor && (
          <div className="flex flex-col gap-4">
            <div
              className="flex h-32 w-full items-center justify-center rounded-[var(--radius)] border border-[var(--border)] sm:h-40"
              style={{ backgroundColor: color.hex, color: textColor }}
            >
              <span className="font-mono text-xl font-semibold">
                {color.hex}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3">
                <span className="font-mono text-sm text-[var(--foreground)]">
                  {color.hex}
                </span>
                <CopyButton
                  text={color.hex}
                  label="Copy HEX"
                  size="sm"
                  variant="secondary"
                />
              </div>

              <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3">
                <span className="font-mono text-sm text-[var(--foreground)]">
                  {formatRgb(color.rgb)}
                </span>
                <CopyButton
                  text={formatRgb(color.rgb)}
                  label="Copy RGB"
                  size="sm"
                  variant="secondary"
                />
              </div>

              <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3">
                <span className="font-mono text-sm text-[var(--foreground)]">
                  {formatHsl(color.hsl)}
                </span>
                <CopyButton
                  text={formatHsl(color.hsl)}
                  label="Copy HSL"
                  size="sm"
                  variant="secondary"
                />
              </div>
            </div>
          </div>
        )}
      </ResultBox>
    </div>
  );
}

RandomColorGenerator.displayName = "RandomColorGenerator";
