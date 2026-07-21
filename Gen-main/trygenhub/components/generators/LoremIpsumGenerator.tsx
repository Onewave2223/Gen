"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { CopyButton } from "@/components/generators/CopyButton";

const LOREM_WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit",
  "sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore",
  "magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation",
  "ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis",
  "aute","irure","in","reprehenderit","voluptate","velit","esse","cillum",
  "fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non",
  "proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id",
  "est","laborum","curabitur","pretium","tincidunt","lacus","nunc","pulvinar",
  "sapien","nunc","tortor","posuere","condimentum","scelerisque","nibh","leo",
  "diam","accumsan","laoreet","ridiculus","mus","vivamus","vestibulum","sagittis",
  "felis","mi","blandit","phasellus","porttitor","ligula","ornare","purus",
  "ultricies","dignissim","proin","facilisis","augue","rutrum","maximus",
];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function randomWord() {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(wordCount = 8 + Math.floor(Math.random() * 10)) {
  const words = Array.from({ length: wordCount }, randomWord);
  return capitalize(words.join(" ")) + ".";
}

function generateParagraph() {
  const sentenceCount = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentenceCount }, generateSentence).join(" ");
}

const TYPE_OPTIONS = [
  { value: "paragraphs", label: "Paragraphs" },
  { value: "sentences", label: "Sentences" },
  { value: "words", label: "Words" },
];

const COUNT_OPTIONS = [1, 2, 3, 5, 10, 20].map((n) => ({
  value: String(n),
  label: String(n),
}));

export function LoremIpsumGenerator() {
  const typeId = React.useId();
  const countId = React.useId();

  const [type, setType] = React.useState("paragraphs");
  const [count, setCount] = React.useState("3");
  const [output, setOutput] = React.useState("");

  const handleGenerate = () => {
    const n = parseInt(count, 10);
    let result = "";

    if (type === "paragraphs") {
      result = Array.from({ length: n }, generateParagraph).join("\n\n");
    } else if (type === "sentences") {
      result = Array.from({ length: n }, generateSentence).join(" ");
    } else {
      const words = Array.from({ length: n }, randomWord);
      result = capitalize(words.join(" ")) + ".";
    }

    setOutput(result);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={typeId} className="text-sm font-medium text-[var(--foreground)]">
            Type
          </label>
          <Select
            id={typeId}
            options={TYPE_OPTIONS}
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-[150px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={countId} className="text-sm font-medium text-[var(--foreground)]">
            Count
          </label>
          <Select
            id={countId}
            options={COUNT_OPTIONS}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-[100px]"
          />
        </div>
      </div>

      <Button type="button" onClick={handleGenerate} className="self-start">
        Generate
      </Button>

      {output && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              Result
            </span>
            <CopyButton text={output} size="sm" variant="secondary" />
          </div>
          <div className="whitespace-pre-wrap text-sm text-[var(--foreground)] leading-relaxed">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}

LoremIpsumGenerator.displayName = "LoremIpsumGenerator";
