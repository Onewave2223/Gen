"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

type GenerateMode = "paragraphs" | "sentences" | "words";

const MODE_LABELS: Record<GenerateMode, string> = {
  paragraphs: "Абзацы",
  sentences: "Предложения",
  words: "Слова",
};

const LOREM_WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do",
  "eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim",
  "ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi",
  "aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit",
  "voluptate","velit","esse","cillum","eu","fugiat","nulla","pariatur","excepteur","sint",
  "occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit",
  "anim","id","est","laborum","perspiciatis","unde","omnis","iste","natus","error",
  "accusantium","doloremque","laudantium","totam","rem","aperiam","eaque","ipsa","ab",
  "inventore","veritatis","quasi","architecto","beatae","vitae","dicta","explicabo",
  "nemo","ipsam","voluptatem","quia","voluptas","aspernatur","aut","odit","fugit",
];

function pickWords(n: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < n; i++) {
    result.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  return result;
}

function makeSentence(): string {
  const wc = 6 + Math.floor(Math.random() * 12);
  const words = pickWords(wc);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function makeParagraph(): string {
  const sc = 3 + Math.floor(Math.random() * 5);
  return Array.from({ length: sc }, () => makeSentence()).join(" ");
}

function generate(mode: GenerateMode, count: number): string {
  switch (mode) {
    case "paragraphs":
      return Array.from({ length: count }, () => makeParagraph()).join("\n\n");
    case "sentences":
      return Array.from({ length: count }, () => makeSentence()).join(" ");
    case "words":
      return pickWords(count).join(" ");
  }
}

export function LoremIpsumRu() {
  const countId = React.useId();
  const [mode, setMode] = React.useState<GenerateMode>("paragraphs");
  const [count, setCount] = React.useState(3);
  const [output, setOutput] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleGenerate = () => {
    setOutput(generate(mode, count));
  };

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const maxCount = mode === "paragraphs" ? 20 : mode === "sentences" ? 50 : 500;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MODE_LABELS) as GenerateMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setOutput(""); }}
            className={`rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={countId} className="text-sm font-medium text-[var(--foreground)]">
          Количество {MODE_LABELS[mode].toLowerCase()} (1–{maxCount})
        </label>
        <input
          id={countId}
          type="number"
          min={1}
          max={maxCount}
          value={count}
          onChange={(e) => setCount(Math.min(maxCount, Math.max(1, parseInt(e.target.value) || 1)))}
          className="w-32 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>

      <Button onClick={handleGenerate}>Сгенерировать</Button>

      {output && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--foreground)]">Результат</span>
            <button
              type="button"
              onClick={copyResult}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {copied ? "Скопировано ✓" : "Копировать"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          />
        </div>
      )}
    </div>
  );
}

LoremIpsumRu.displayName = "LoremIpsumRu";
