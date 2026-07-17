"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generateAiDomainNames,
  formatAiDomainNameResults,
  type AiDomainNameOptions,
  type AiDomainVibe,
  type AiDomainExtension,
} from "@/lib/generators/ai-domain-name";

const VIBE_OPTIONS: { value: AiDomainVibe; label: string }[] = [
  { value: "ai", label: "AI / Futuristic" },
  { value: "startup", label: "Startup" },
  { value: "creative", label: "Creative" },
  { value: "short", label: "Short" },
  { value: "professional", label: "Professional" },
];

const EXTENSION_OPTIONS: { value: AiDomainExtension; label: string }[] = [
  { value: ".com", label: ".com" },
  { value: ".io", label: ".io" },
  { value: ".ai", label: ".ai" },
  { value: ".co", label: ".co" },
  { value: ".net", label: ".net" },
  { value: ".app", label: ".app" },
];

const DEFAULT_KEYWORD = "";
const DEFAULT_VIBE: AiDomainVibe = "ai";
const DEFAULT_EXTENSION: AiDomainExtension = ".com";
const DEFAULT_COUNT = 10;
const DEFAULT_ALLOW_HYPHENS = false;

const MIN_COUNT = 1;
const MAX_COUNT = 100;

function parseCountInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function AiDomainNameGenerator() {
  const keywordId = React.useId();
  const vibeId = React.useId();
  const extensionId = React.useId();
  const countId = React.useId();

  const [keyword, setKeyword] = React.useState(DEFAULT_KEYWORD);
  const [vibe, setVibe] = React.useState<AiDomainVibe>(DEFAULT_VIBE);
  const [extension, setExtension] = React.useState<AiDomainExtension>(
    DEFAULT_EXTENSION,
  );
  const [countInput, setCountInput] = React.useState(String(DEFAULT_COUNT));
  const [allowHyphens, setAllowHyphens] = React.useState(
    DEFAULT_ALLOW_HYPHENS,
  );

  const [results, setResults] = React.useState<string[] | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: AiDomainNameOptions = {
      keyword,
      vibe,
      extension,
      count: parseCountInput(countInput),
      allowHyphens,
    };

    try {
      const generated = generateAiDomainNames(options);
      setResults(generated.domains);
      setError("");
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setKeyword(DEFAULT_KEYWORD);
    setVibe(DEFAULT_VIBE);
    setExtension(DEFAULT_EXTENSION);
    setCountInput(String(DEFAULT_COUNT));
    setAllowHyphens(DEFAULT_ALLOW_HYPHENS);
    setResults(null);
    setError("");
  };

  const hasResults = results !== null && results.length > 0;
  const copyText = hasResults ? formatAiDomainNameResults(results) : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={keywordId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Keyword
          </label>
          <Input
            id={keywordId}
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Optional business or topic word"
          />
          <p className="text-sm text-[var(--muted)]">
            Add an optional word to inspire your AI-style domain ideas.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={vibeId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Vibe
          </label>
          <Select
            id={vibeId}
            options={VIBE_OPTIONS}
            value={vibe}
            onChange={(event) => setVibe(event.target.value as AiDomainVibe)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={extensionId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Extension
          </label>
          <Select
            id={extensionId}
            options={EXTENSION_OPTIONS}
            value={extension}
            onChange={(event) =>
              setExtension(event.target.value as AiDomainExtension)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={countId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            How many domain ideas?
          </label>
          <Input
            id={countId}
            type="number"
            inputMode="numeric"
            min={MIN_COUNT}
            max={MAX_COUNT}
            value={countInput}
            onChange={(event) => setCountInput(event.target.value)}
          />
        </div>

        <Checkbox
          checked={allowHyphens}
          onChange={(event) => setAllowHyphens(event.target.checked)}
          label="Allow hyphens"
          description="Allow a hyphen between parts of generated domain ideas."
        />

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            {hasResults ? "Regenerate domain ideas" : "Generate domain ideas"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResults}
        emptyMessage="Your AI domain name ideas will appear here."
        actions={
          <CopyButton
            text={copyText}
            disabled={!hasResults}
            size="sm"
            variant="secondary"
          />
        }
      >
        {hasResults && (
          <ul className="flex flex-wrap gap-2">
            {results.map((domain, index) => (
              <li
                key={`${domain}-${index}`}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-sm font-medium text-[var(--foreground)]"
              >
                {domain}
              </li>
            ))}
          </ul>
        )}
      </ResultBox>
    </div>
  );
}

AiDomainNameGenerator.displayName = "AiDomainNameGenerator";
