import type { Locale, TestState } from "./types";

const STORAGE_KEY = "trygenhub_iq_test_v3";
const STATE_VERSION = 3;

// ── Recently-shown question history (anti-repeat) ───────────────────────────
// A small, bounded, client-only record of question IDs shown in recent
// attempts, so a repeat attempt mostly surfaces unseen questions instead of
// exact re-runs. This is purely a local convenience — no account/server
// involved — and is capped so it never grows unbounded in localStorage.
const HISTORY_KEY = "trygenhub_iq_test_history_v1";
const HISTORY_VERSION = 1;
// Keep roughly the last 4 attempts' worth of questions (4 x 35 = 140), which
// is comfortably below the ~273-question bank so "unseen" pools stay
// meaningful without ever fully emptying a category's pool.
const MAX_HISTORY_ENTRIES = 140;

interface HistoryPayload {
  version: number;
  ids: number[]; // most-recently-shown first
}

export function loadRecentQuestionIds(): number[] {
  const storage = safeGetStorage();
  if (!storage) return [];
  try {
    const raw = storage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      (parsed as { version?: unknown }).version !== HISTORY_VERSION ||
      !Array.isArray((parsed as HistoryPayload).ids)
    ) {
      return [];
    }
    return (parsed as HistoryPayload).ids.filter((id) => typeof id === "number");
  } catch {
    return [];
  }
}

/**
 * Records a freshly-drawn attempt's question IDs into the recent-history
 * list (most recent first), trimming to MAX_HISTORY_ENTRIES so storage
 * stays bounded. Silently no-ops if localStorage is unavailable.
 */
export function recordShownQuestionIds(ids: number[]): void {
  const storage = safeGetStorage();
  if (!storage) return;
  try {
    const previous = loadRecentQuestionIds();
    const deduped = [...ids, ...previous.filter((id) => !ids.includes(id))];
    const trimmed = deduped.slice(0, MAX_HISTORY_ENTRIES);
    const payload: HistoryPayload = { version: HISTORY_VERSION, ids: trimmed };
    storage.setItem(HISTORY_KEY, JSON.stringify(payload));
  } catch {
    // localStorage may be full or unavailable — ignore silently
  }
}

function safeGetStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadTestState(): TestState | null {
  const storage = safeGetStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      (parsed as { version?: unknown }).version !== STATE_VERSION
    ) {
      return null;
    }
    const state = parsed as TestState;
    if (
      typeof state.status !== "string" ||
      !["idle", "in_progress", "finished"].includes(state.status) ||
      !Array.isArray(state.questionIds)
    ) {
      return null;
    }
    return state;
  } catch {
    return null;
  }
}

export function saveTestState(state: TestState): void {
  const storage = safeGetStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({ ...state, version: STATE_VERSION }));
  } catch {
    // localStorage may be full or unavailable — ignore silently
  }
}

export function clearTestState(): void {
  const storage = safeGetStorage();
  if (!storage) return;
  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function createInitialState(locale: Locale): TestState {
  return {
    version: STATE_VERSION,
    status: "idle",
    locale,
    startedAt: null,
    finishedAt: null,
    currentQuestion: 0,
    answers: {},
    questionIds: [],
    seed: 0,
  };
}
