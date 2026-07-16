"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const ANSWERS = [
  { text: "Yes", weight: 3, color: "text-green-500" },
  { text: "No", weight: 3, color: "text-red-500" },
  { text: "Definitely yes", weight: 2, color: "text-green-600" },
  { text: "Definitely not", weight: 2, color: "text-red-600" },
  { text: "Most likely yes", weight: 2, color: "text-green-500" },
  { text: "Probably not", weight: 2, color: "text-red-500" },
  { text: "Ask again later", weight: 1, color: "text-[var(--muted)]" },
  { text: "Without a doubt", weight: 1, color: "text-green-600" },
  { text: "Don't count on it", weight: 1, color: "text-red-600" },
  { text: "Signs point to yes", weight: 1, color: "text-green-500" },
  { text: "Outlook not so good", weight: 1, color: "text-red-500" },
  { text: "It is certain", weight: 1, color: "text-green-600" },
  { text: "Very doubtful", weight: 1, color: "text-red-600" },
];

function weightedRandom() {
  const totalWeight = ANSWERS.reduce((sum, a) => sum + a.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const answer of ANSWERS) {
    rand -= answer.weight;
    if (rand <= 0) return answer;
  }
  return ANSWERS[0];
}

export function YesOrNoGenerator() {
  const questionId = React.useId();
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState<(typeof ANSWERS)[0] | null>(null);
  const [animating, setAnimating] = React.useState(false);

  const handleGetAnswer = () => {
    setAnimating(true);
    setAnswer(null);
    setTimeout(() => {
      setAnswer(weightedRandom());
      setAnimating(false);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={questionId} className="text-sm font-medium text-[var(--foreground)]">
          Your question (optional)
        </label>
        <Input
          id={questionId}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Should I..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleGetAnswer();
          }}
        />
      </div>

      <Button type="button" onClick={handleGetAnswer} disabled={animating} className="self-start">
        Get Answer
      </Button>

      <div
        aria-live="polite"
        className={`flex min-h-32 flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-8 text-center transition-opacity duration-300 ${animating ? "opacity-20" : "opacity-100"}`}
      >
        {answer ? (
          <>
            <span className={`text-4xl font-bold ${answer.color}`}>
              {answer.text}
            </span>
            {question && (
              <span className="mt-2 text-sm text-[var(--muted)]">
                &ldquo;{question}&rdquo;
              </span>
            )}
          </>
        ) : (
          <span className="text-sm text-[var(--muted)]">
            Press Get Answer to reveal
          </span>
        )}
      </div>
    </div>
  );
}

YesOrNoGenerator.displayName = "YesOrNoGenerator";
