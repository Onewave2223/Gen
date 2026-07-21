"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

type SplitMode = "teams" | "perTeam";

function splitIntoTeams(participants: string[], teamCount: number): string[][] {
  const shuffled = [...participants];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const teams: string[][] = Array.from({ length: teamCount }, () => []);
  shuffled.forEach((p, i) => teams[i % teamCount].push(p));
  return teams;
}

export function RandomTeamsRu() {
  const textId = React.useId();
  const countId = React.useId();
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<SplitMode>("teams");
  const [teamCount, setTeamCount] = React.useState(2);
  const [teams, setTeams] = React.useState<string[][] | null>(null);
  const [error, setError] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleGenerate = () => {
    const participants = text.split("\n").map((l) => l.trim()).filter(Boolean);
    if (participants.length < 2) {
      setError("Введите минимум двух участников.");
      setTeams(null);
      return;
    }
    if (teamCount < 1) {
      setError("Введите корректное число.");
      setTeams(null);
      return;
    }

    if (mode === "teams") {
      if (teamCount < 2) {
        setError("Количество команд должно быть не менее 2.");
        setTeams(null);
        return;
      }
      if (teamCount > participants.length) {
        setError("Количество команд не может превышать количество участников.");
        setTeams(null);
        return;
      }
      setError("");
      setTeams(splitIntoTeams(participants, teamCount));
    } else {
      const numTeams = Math.ceil(participants.length / teamCount);
      setError("");
      setTeams(splitIntoTeams(participants, numTeams));
    }
  };

  const handleReset = () => {
    setText("");
    setMode("teams");
    setTeamCount(2);
    setTeams(null);
    setError("");
  };

  const copyResult = async () => {
    if (!teams) return;
    const text = teams
      .map((team, i) => `Команда ${i + 1}:\n${team.map((p) => `  • ${p}`).join("\n")}`)
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={textId} className="text-sm font-medium text-[var(--foreground)]">
          Участники (каждый с новой строки)
        </label>
        <textarea
          id={textId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"Алексей\nМария\nИван\nЕлена\nДмитрий\nОльга"}
          rows={8}
          className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">
            Способ разделения
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as SplitMode)}
            className="flex h-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            <option value="teams">По количеству команд</option>
            <option value="perTeam">По числу человек в команде</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={countId} className="text-sm font-medium text-[var(--foreground)]">
            {mode === "teams" ? "Количество команд" : "Человек в команде"}
          </label>
          <input
            id={countId}
            type="number"
            min={mode === "teams" ? 2 : 1}
            max={50}
            value={teamCount}
            onChange={(e) => setTeamCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-32 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          />
        </div>
      </div>

      {error && <p role="alert" className="text-sm font-medium text-[var(--danger)]">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleGenerate}>Распределить по командам</Button>
        {teams && (
          <Button variant="secondary" onClick={handleGenerate}>Перемешать заново</Button>
        )}
        {teams && (
          <Button variant="ghost" onClick={copyResult}>
            {copied ? "Скопировано ✓" : "Копировать результат"}
          </Button>
        )}
        <Button variant="ghost" onClick={handleReset}>Сбросить</Button>
      </div>

      {teams && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {teams.map((team, i) => (
            <div key={i} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
              <p className="mb-2 text-sm font-semibold text-[var(--foreground)]">
                Команда {i + 1} <span className="font-normal text-[var(--muted)]">({team.length} чел.)</span>
              </p>
              <ul className="flex flex-col gap-1">
                {team.map((p, j) => (
                  <li key={j} className="text-sm text-[var(--muted)]">• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

RandomTeamsRu.displayName = "RandomTeamsRu";
