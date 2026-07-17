"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

export function RandomWinnerRu() {
  const textId = React.useId();
  const [text, setText] = React.useState("");
  const [participants, setParticipants] = React.useState<string[]>([]);
  const [remaining, setRemaining] = React.useState<string[]>([]);
  const [winner, setWinner] = React.useState<string | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [history, setHistory] = React.useState<string[]>([]);
  const [started, setStarted] = React.useState(false);
  const [error, setError] = React.useState("");

  const initList = () => {
    const list = text.split("\n").map((l) => l.trim()).filter(Boolean);
    if (list.length < 2) {
      setError("Введите минимум двух участников.");
      return;
    }
    setError("");
    setParticipants(list);
    setRemaining([...list]);
    setWinner(null);
    setHistory([]);
    setStarted(true);
  };

  const pickWinner = () => {
    if (remaining.length === 0) return;
    setIsAnimating(true);
    setWinner(null);

    let ticks = 0;
    const maxTicks = 15;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * remaining.length);
      setWinner(remaining[idx]);
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        const finalIdx = Math.floor(Math.random() * remaining.length);
        const chosen = remaining[finalIdx];
        setWinner(chosen);
        setIsAnimating(false);
      }
    }, 80);
  };

  const removeWinner = () => {
    if (!winner) return;
    setHistory((h) => [...h, winner]);
    setRemaining((r) => r.filter((p) => p !== winner));
    setWinner(null);
  };

  const reset = () => {
    setStarted(false);
    setWinner(null);
    setRemaining([]);
    setHistory([]);
    setParticipants([]);
    setError("");
  };

  if (!started) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={textId} className="text-sm font-medium text-[var(--foreground)]">
            Список участников (каждый с новой строки)
          </label>
          <textarea
            id={textId}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"Алексей\nМария\nИван\nЕлена\nДмитрий"}
            rows={8}
            className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          />
        </div>
        {error && <p role="alert" className="text-sm font-medium text-[var(--danger)]">{error}</p>}
        <Button onClick={initList}>Начать жеребьёвку</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-[var(--muted)]">
          Осталось участников: <span className="font-semibold text-[var(--foreground)]">{remaining.length}</span> из {participants.length}
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] underline"
        >
          Начать заново
        </button>
      </div>

      <div className={`flex min-h-[100px] items-center justify-center rounded-[var(--radius)] border-2 p-6 text-center transition-all duration-150 ${
        winner && !isAnimating
          ? "border-[var(--primary)] bg-[var(--surface)]"
          : "border-[var(--border)] bg-[var(--background)]"
      }`}>
        {winner ? (
          <p className={`text-2xl font-bold ${isAnimating ? "text-[var(--muted)]" : "text-[var(--foreground)]"}`}>
            {isAnimating ? winner : `🏆 ${winner}`}
          </p>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            {remaining.length === 0 ? "Все победители выбраны!" : "Нажмите кнопку, чтобы выбрать победителя"}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={pickWinner} disabled={isAnimating || remaining.length === 0}>
          {isAnimating ? "Выбираем..." : "Выбрать победителя"}
        </Button>
        {winner && !isAnimating && (
          <Button variant="secondary" onClick={removeWinner}>
            Удалить и выбрать следующего
          </Button>
        )}
      </div>

      {history.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-[var(--foreground)]">Предыдущие победители:</p>
          <ul className="flex flex-col gap-1">
            {history.map((p, i) => (
              <li key={i} className="text-sm text-[var(--muted)]">
                #{i + 1} — {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

RandomWinnerRu.displayName = "RandomWinnerRu";
