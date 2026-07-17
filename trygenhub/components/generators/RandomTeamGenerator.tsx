"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CopyButton } from "@/components/generators/CopyButton";

type SplitMode = "teams" | "perTeam";

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function splitIntoTeams(members: string[], numTeams: number): string[][] {
  const shuffled = shuffleArray(members);
  const teams: string[][] = Array.from({ length: numTeams }, () => []);
  shuffled.forEach((member, i) => {
    teams[i % numTeams].push(member);
  });
  return teams;
}

export function RandomTeamGenerator() {
  const membersId = React.useId();
  const modeId = React.useId();
  const numId = React.useId();

  const [membersText, setMembersText] = React.useState("");
  const [mode, setMode] = React.useState<SplitMode>("teams");
  const [numValue, setNumValue] = React.useState("2");
  const [teams, setTeams] = React.useState<string[][]>([]);
  const [error, setError] = React.useState("");

  const handleGenerate = () => {
    const members = membersText
      .split("\n")
      .map((m) => m.trim())
      .filter(Boolean);

    if (members.length < 2) {
      setError("Enter at least 2 participants.");
      setTeams([]);
      return;
    }

    const num = parseInt(numValue, 10);
    if (!num || num < 1) {
      setError("Enter a valid number.");
      setTeams([]);
      return;
    }

    setError("");

    if (mode === "teams") {
      if (num >= members.length) {
        setError("Number of teams must be less than number of participants.");
        setTeams([]);
        return;
      }
      setTeams(splitIntoTeams(members, num));
    } else {
      const numTeams = Math.ceil(members.length / num);
      setTeams(splitIntoTeams(members, numTeams));
    }
  };

  const resultText = teams
    .map((team, i) => `Team ${i + 1}:\n${team.join("\n")}`)
    .join("\n\n");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={membersId} className="text-sm font-medium text-[var(--foreground)]">
          Participants (one per line)
        </label>
        <textarea
          id={membersId}
          value={membersText}
          onChange={(e) => setMembersText(e.target.value)}
          placeholder={"Alice\nBob\nCarol\nDave\nEve\nFrank"}
          rows={6}
          className="flex w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={modeId} className="text-sm font-medium text-[var(--foreground)]">
            Split by
          </label>
          <select
            id={modeId}
            value={mode}
            onChange={(e) => setMode(e.target.value as SplitMode)}
            className="flex h-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            <option value="teams">Number of teams</option>
            <option value="perTeam">People per team</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={numId} className="text-sm font-medium text-[var(--foreground)]">
            {mode === "teams" ? "Teams" : "Per team"}
          </label>
          <Input
            id={numId}
            type="number"
            min="1"
            max="50"
            value={numValue}
            onChange={(e) => setNumValue(e.target.value)}
            className="w-24"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleGenerate}>
          Generate Teams
        </Button>
        {teams.length > 0 && (
          <Button type="button" variant="secondary" onClick={handleGenerate}>
            Shuffle Again
          </Button>
        )}
        {(membersText || teams.length > 0) && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setMembersText("");
              setMode("teams");
              setNumValue("2");
              setTeams([]);
              setError("");
            }}
          >
            Reset
          </Button>
        )}
      </div>

      {teams.length > 0 && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              {teams.length} team{teams.length !== 1 ? "s" : ""}
            </span>
            <CopyButton text={resultText} size="sm" variant="secondary" />
          </div>
          <div className="flex flex-col gap-4">
            {teams.map((team, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  Team {i + 1}
                </span>
                <ul className="flex flex-col gap-0.5">
                  {team.map((member, j) => (
                    <li key={j} className="text-sm text-[var(--muted)]">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

RandomTeamGenerator.displayName = "RandomTeamGenerator";
