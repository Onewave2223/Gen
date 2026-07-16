"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/generators/CopyButton";

function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
}

function toSentenceCase(text: string): string {
  return text
    .split(". ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(". ");
}

function toAlternatingCase(text: string): string {
  return text
    .split("")
    .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
    .join("");
}

export function CaseConverter() {
  const inputId = React.useId();
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [activeCase, setActiveCase] = React.useState("");

  const apply = (caseType: string) => {
    if (!input) return;
    let result = "";
    switch (caseType) {
      case "upper":
        result = input.toUpperCase();
        break;
      case "lower":
        result = input.toLowerCase();
        break;
      case "title":
        result = toTitleCase(input);
        break;
      case "sentence":
        result = toSentenceCase(input);
        break;
      case "alternating":
        result = toAlternatingCase(input);
        break;
      default:
        result = input;
    }
    setOutput(result);
    setActiveCase(caseType);
  };

  const caseButtons = [
    { id: "upper", label: "UPPERCASE" },
    { id: "lower", label: "lowercase" },
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
    { id: "alternating", label: "aLtErNaTiNg" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Input text
        </label>
        <textarea
          id={inputId}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput("");
            setActiveCase("");
          }}
          placeholder="Type or paste your text here…"
          rows={5}
          className="flex w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {caseButtons.map((btn) => (
          <Button
            key={btn.id}
            type="button"
            variant={activeCase === btn.id ? "primary" : "secondary"}
            size="sm"
            onClick={() => apply(btn.id)}
            disabled={!input}
          >
            {btn.label}
          </Button>
        ))}
        {(input || output) && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setInput("");
              setOutput("");
              setActiveCase("");
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {output && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              Result
            </span>
            <CopyButton text={output} size="sm" variant="secondary" />
          </div>
          <p className="whitespace-pre-wrap text-sm text-[var(--foreground)] leading-relaxed break-words">
            {output}
          </p>
        </div>
      )}
    </div>
  );
}

CaseConverter.displayName = "CaseConverter";
