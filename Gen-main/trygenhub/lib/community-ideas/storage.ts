import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Storage for Community Ideas submissions.
 *
 * OWNER ACTION REQUIRED (for multi-instance production scale):
 * TryGenHub currently has no database configured — no Postgres,
 * Supabase, Turso, KV, etc. anywhere in this project. Rather than
 * inventing a fake integration, this module persists submissions as
 * newline-delimited JSON on local disk, which is correct for the
 * project's current single-instance deployment.
 *
 * If TryGenHub is ever deployed across multiple concurrent instances
 * (e.g. a horizontally-scaled serverless/autoscale target where each
 * instance has its own ephemeral filesystem), submissions written to
 * one instance won't be visible to the others, and rate-limit/duplicate
 * checks below will only see that instance's traffic. At that point,
 * swap the four functions below (`appendIdea`, `readRecentByIpHash`,
 * `countSubmissionsSince`, `hasDuplicateSuggestion`) for calls to a
 * real database — the call sites in route.ts don't need to change.
 */

export interface StoredIdea {
  id: string;
  suggestion: string;
  name: string | null;
  email: string | null;
  locale: "en" | "ru";
  pageUrl: string;
  userAgent: string | null;
  ipHash: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "community-ideas.ndjson");

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "", "utf8");
  }
}

// Simple in-process write queue so concurrent requests don't interleave
// partial writes to the ndjson file (single-instance safe).
let writeQueue: Promise<void> = Promise.resolve();

function normalizeSuggestion(suggestion: string): string {
  return suggestion.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function appendIdea(
  idea: Omit<StoredIdea, "id" | "createdAt">,
): Promise<StoredIdea> {
  const record: StoredIdea = {
    ...idea,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const task = writeQueue.then(async () => {
    await ensureDataFile();
    await fs.appendFile(DATA_FILE, JSON.stringify(record) + "\n", "utf8");
  });
  writeQueue = task.catch(() => undefined);
  await task;

  return record;
}

async function readAll(): Promise<StoredIdea[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  if (!raw.trim()) return [];

  const records: StoredIdea[] = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      records.push(JSON.parse(line) as StoredIdea);
    } catch {
      // Skip a corrupted line rather than failing the whole read.
    }
  }
  return records;
}

/** Submissions from a given hashed IP within the last `windowMs` milliseconds. */
export async function readRecentByIpHash(
  ipHash: string,
  windowMs: number,
): Promise<StoredIdea[]> {
  const all = await readAll();
  const since = Date.now() - windowMs;
  return all.filter(
    (idea) => idea.ipHash === ipHash && new Date(idea.createdAt).getTime() >= since,
  );
}

/** Count of submissions from a given hashed IP within the last `windowMs` milliseconds. */
export async function countSubmissionsSince(
  ipHash: string,
  windowMs: number,
): Promise<number> {
  const recent = await readRecentByIpHash(ipHash, windowMs);
  return recent.length;
}

/** True if this hashed IP already submitted the same suggestion text recently. */
export async function hasDuplicateSuggestion(
  ipHash: string,
  suggestion: string,
  windowMs: number,
): Promise<boolean> {
  const recent = await readRecentByIpHash(ipHash, windowMs);
  const normalized = normalizeSuggestion(suggestion);
  return recent.some((idea) => normalizeSuggestion(idea.suggestion) === normalized);
}
