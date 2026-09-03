import { Redis } from "@upstash/redis";

export const ASSESSMENT_RATE_LIMITED_CODE = "assessment_rate_limited";
export const CONTACT_PATH = "/contact";

export const ASSESSMENT_RATE_LIMIT_MESSAGE =
  "We've received several assessments from this connection recently. To keep follow-up personal, additional assessment submissions are paused for a little while. Please reach Stacey through the contact page — she'll be glad to help.";

const DEFAULT_MAX = 3;
const DEFAULT_WINDOW_HOURS = 24;
const MEMORY_KEY_PREFIX = "assessment-rl:";

type EnvMap = Record<string, string | undefined>;

export type RateLimitDecision = {
  limited: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
  resetAt: number;
};

export type RateLimitStore = {
  increment(key: string, windowMs: number): Promise<{ count: number; resetAt: number }>;
  peek(key: string): Promise<{ count: number; resetAt: number } | null>;
};

type MemoryEntry = { count: number; resetAt: number };

export function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value?.trim()) return fallback;
  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getAssessmentRateLimitConfig(env: EnvMap = process.env): {
  max: number;
  windowMs: number;
} {
  const max = parsePositiveInt(env.ASSESSMENT_RATE_LIMIT_MAX, DEFAULT_MAX);
  const windowMsFromMs = env.ASSESSMENT_RATE_LIMIT_WINDOW_MS
    ? parsePositiveInt(env.ASSESSMENT_RATE_LIMIT_WINDOW_MS, 0)
    : 0;
  const windowHours = parsePositiveInt(
    env.ASSESSMENT_RATE_LIMIT_WINDOW_HOURS,
    DEFAULT_WINDOW_HOURS
  );
  const windowMs = windowMsFromMs > 0 ? windowMsFromMs : windowHours * 60 * 60 * 1000;
  return { max, windowMs };
}

export function hasRedisEnv(env: EnvMap = process.env): boolean {
  const url = env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN;
  return Boolean(url?.trim() && token?.trim());
}

export function normalizeIp(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "unknown";
  if (trimmed.startsWith("::ffff:")) {
    return trimmed.slice("::ffff:".length);
  }
  return trimmed;
}

export function getClientIp(headers: Headers): string {
  const candidates = [
    headers.get("x-forwarded-for")?.split(",")[0],
    headers.get("x-real-ip"),
    headers.get("x-vercel-forwarded-for")?.split(",")[0],
    headers.get("cf-connecting-ip"),
  ];

  for (const candidate of candidates) {
    if (candidate?.trim()) return normalizeIp(candidate);
  }

  return "unknown";
}

export function createMemoryRateLimitStore(
  now: () => number = Date.now
): RateLimitStore {
  const entries = new Map<string, MemoryEntry>();

  function prune(at: number) {
    for (const [key, entry] of entries) {
      if (entry.resetAt <= at) entries.delete(key);
    }
  }

  return {
    async increment(key, windowMs) {
      const at = now();
      prune(at);
      const current = entries.get(key);
      if (!current || current.resetAt <= at) {
        const next = { count: 1, resetAt: at + windowMs };
        entries.set(key, next);
        return next;
      }
      const next = { count: current.count + 1, resetAt: current.resetAt };
      entries.set(key, next);
      return next;
    },
    async peek(key) {
      const at = now();
      prune(at);
      return entries.get(key) ?? null;
    },
  };
}

let memoryStore: RateLimitStore | undefined;
let redisStore: RateLimitStore | undefined;
let redisClient: Redis | undefined;
let warnedAboutMemoryFallback = false;

function getRedisClient(env: EnvMap = process.env): Redis | null {
  if (!hasRedisEnv(env)) return null;
  if (redisClient) return redisClient;
  redisClient = new Redis({
    url: (env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL) as string,
    token: (env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN) as string,
  });
  return redisClient;
}

export function createRedisRateLimitStore(
  redis: Redis,
  now: () => number = Date.now
): RateLimitStore {
  return {
    async increment(key, windowMs) {
      const windowSec = Math.max(1, Math.ceil(windowMs / 1000));
      const count = await redis.incr(key);
      let ttl = await redis.ttl(key);
      if (ttl < 0) {
        await redis.expire(key, windowSec);
        ttl = windowSec;
      }
      return {
        count: typeof count === "number" ? count : Number(count) || 0,
        resetAt: now() + ttl * 1000,
      };
    },
    async peek(key) {
      const [count, ttl] = await Promise.all([redis.get<number>(key), redis.ttl(key)]);
      if (count == null || ttl < 0) return null;
      const numeric = typeof count === "number" ? count : Number(count);
      if (!Number.isFinite(numeric) || numeric <= 0) return null;
      return { count: numeric, resetAt: now() + ttl * 1000 };
    },
  };
}

export function getRateLimitStore(env: EnvMap = process.env): RateLimitStore {
  const forced = env.ASSESSMENT_RATE_LIMIT_STORE?.trim().toLowerCase();
  if (forced === "memory") {
    memoryStore ??= createMemoryRateLimitStore();
    return memoryStore;
  }

  if (forced === "redis" || hasRedisEnv(env)) {
    const redis = getRedisClient(env);
    if (redis) {
      redisStore ??= createRedisRateLimitStore(redis);
      return redisStore;
    }
  }

  if (env.NODE_ENV === "production" && !warnedAboutMemoryFallback) {
    warnedAboutMemoryFallback = true;
    console.warn(
      "Assessment rate limiting is using in-memory storage. On Vercel this does not stay consistent across serverless instances. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (or Vercel KV equivalents) for durable limits."
    );
  }

  memoryStore ??= createMemoryRateLimitStore();
  return memoryStore;
}

function toDecision(
  count: number,
  resetAt: number,
  max: number,
  nowMs: number
): RateLimitDecision {
  const limited = count > max;
  const remaining = Math.max(0, max - count);
  const retryAfterSeconds = Math.max(0, Math.ceil((resetAt - nowMs) / 1000));
  return { limited, limit: max, remaining, retryAfterSeconds, resetAt };
}

export async function peekAssessmentRateLimit(
  ip: string,
  options?: { store?: RateLimitStore; env?: EnvMap; now?: () => number }
): Promise<RateLimitDecision> {
  const env = options?.env ?? process.env;
  const { max } = getAssessmentRateLimitConfig(env);
  const now = options?.now ?? Date.now;
  const store = options?.store ?? getRateLimitStore(env);
  const entry = await store.peek(`${MEMORY_KEY_PREFIX}${normalizeIp(ip)}`);
  if (!entry) {
    return {
      limited: false,
      limit: max,
      remaining: max,
      retryAfterSeconds: 0,
      resetAt: now(),
    };
  }
  return toDecision(entry.count, entry.resetAt, max, now());
}

export async function consumeAssessmentRateLimit(
  ip: string,
  options?: { store?: RateLimitStore; env?: EnvMap; now?: () => number }
): Promise<RateLimitDecision> {
  const env = options?.env ?? process.env;
  const { max, windowMs } = getAssessmentRateLimitConfig(env);
  const now = options?.now ?? Date.now;
  const store = options?.store ?? getRateLimitStore(env);

  try {
    const entry = await store.increment(
      `${MEMORY_KEY_PREFIX}${normalizeIp(ip)}`,
      windowMs
    );
    return toDecision(entry.count, entry.resetAt, max, now());
  } catch (error) {
    console.error("Assessment rate-limit store failed; allowing this request.", error);
    return {
      limited: false,
      limit: max,
      remaining: max,
      retryAfterSeconds: 0,
      resetAt: now() + windowMs,
    };
  }
}

export function assessmentRateLimitedPayload(decision: RateLimitDecision) {
  return {
    ok: false as const,
    code: ASSESSMENT_RATE_LIMITED_CODE,
    error: ASSESSMENT_RATE_LIMIT_MESSAGE,
    contactPath: CONTACT_PATH,
    retryAfterSeconds: decision.retryAfterSeconds,
    limit: decision.limit,
  };
}

export function isAssessmentRateLimitedResponse(
  status: number,
  data: unknown
): boolean {
  if (status !== 429) return false;
  if (!data || typeof data !== "object") return true;
  const code = "code" in data ? data.code : undefined;
  return code === undefined || code === ASSESSMENT_RATE_LIMITED_CODE;
}
