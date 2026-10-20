import { Redis } from "@upstash/redis";
import { hasRedisEnv } from "@/lib/assessment-rate-limit";

const SENT_PREFIX = "results-email-sent:";
const ATTEMPTS_PREFIX = "results-email-attempts:";
const LOCK_PREFIX = "results-email-lock:";
const LOCK_SECONDS = 60;
const SENT_SECONDS = 60 * 60 * 24 * 120;

type MemoryRecord = {
  sent: boolean;
  attempts: number;
  locked: boolean;
};

const memory = new Map<string, MemoryRecord>();
const memoryChains = new Map<string, Promise<unknown>>();

export type ResultsEmailClaim =
  | { action: "send" }
  | { action: "already-sent" }
  | { action: "in-flight" }
  | { action: "exhausted" };

function normalizeId(submissionId: string): string {
  return submissionId.trim().slice(0, 80);
}

export function resetResultsEmailGuard(): void {
  memory.clear();
  memoryChains.clear();
}

function memoryRecord(id: string): MemoryRecord {
  const current = memory.get(id);
  if (current) return current;
  const created = { sent: false, attempts: 0, locked: false };
  memory.set(id, created);
  return created;
}

async function claimMemory(id: string): Promise<ResultsEmailClaim> {
  const previous = memoryChains.get(id) ?? Promise.resolve();
  const run = previous.then(async () => {
    const record = memoryRecord(id);
    if (record.sent) return { action: "already-sent" } as const;
    if (record.locked) return { action: "in-flight" } as const;
    if (record.attempts >= 2) return { action: "exhausted" } as const;
    record.locked = true;
    record.attempts += 1;
    return { action: "send" } as const;
  });
  memoryChains.set(
    id,
    run.then(
      () => undefined,
      () => undefined
    )
  );
  return run;
}

export async function finishResultsEmail(
  submissionId: string,
  outcome: "sent" | "failed"
): Promise<{ attempts: number }> {
  const id = normalizeId(submissionId);
  if (!id) return { attempts: 2 };
  if (hasRedisEnv()) {
    const redis = redisClient();
    if (outcome === "sent") {
      await redis.set(`${SENT_PREFIX}${id}`, "1", { ex: SENT_SECONDS });
    }
    await redis.del(`${LOCK_PREFIX}${id}`);
    const attempts = Number(await redis.get(`${ATTEMPTS_PREFIX}${id}`)) || 0;
    return { attempts };
  }
  const record = memoryRecord(id);
  record.locked = false;
  if (outcome === "sent") record.sent = true;
  return { attempts: record.attempts };
}

function redisClient(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return new Redis({ url: url!, token: token! });
}

async function claimRedis(id: string): Promise<ResultsEmailClaim> {
  const redis = redisClient();
  const sent = await redis.get(`${SENT_PREFIX}${id}`);
  if (sent) return { action: "already-sent" };
  const locked = await redis.set(`${LOCK_PREFIX}${id}`, "1", { nx: true, ex: LOCK_SECONDS });
  if (locked !== "OK") return { action: "in-flight" };
  const sentAgain = await redis.get(`${SENT_PREFIX}${id}`);
  if (sentAgain) {
    await redis.del(`${LOCK_PREFIX}${id}`);
    return { action: "already-sent" };
  }
  const attempts = await redis.incr(`${ATTEMPTS_PREFIX}${id}`);
  if (attempts === 1) {
    await redis.expire(`${ATTEMPTS_PREFIX}${id}`, SENT_SECONDS);
  }
  if (attempts > 2) {
    await redis.del(`${LOCK_PREFIX}${id}`);
    return { action: "exhausted" };
  }
  return { action: "send" };
}

export async function claimResultsEmail(submissionId: string): Promise<ResultsEmailClaim> {
  const id = normalizeId(submissionId);
  if (!id) return { action: "exhausted" };
  if (hasRedisEnv()) return claimRedis(id);
  return claimMemory(id);
}
