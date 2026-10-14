import { createHmac, timingSafeEqual } from "node:crypto";
import {
  createMemoryRateLimitStore,
  getClientIp,
  getRateLimitStore,
  normalizeIp,
  parsePositiveInt,
  type RateLimitDecision,
  type RateLimitStore,
} from "@/lib/assessment-rate-limit";

const ACCESS_CODE = "merlin";
const TOKEN_VERSION = "v1";
// Used when HRIS_GATE_SECRET is not set on the host. Preview deploys still sign
// the unlock cookie. Set HRIS_GATE_SECRET to override this.
const BUILT_IN_GATE_SECRET = "1Q8HcVMUTaRNbQ7/00STvBiasAXNKB1EAeiYlJfrQq0=";
const DEFAULT_MAX_ATTEMPTS = 8;
const DEFAULT_WINDOW_MS = 10 * 60 * 1000;
const KEY_PREFIX = "hris-gate:";

export const HRIS_UNLOCK_COOKIE = "hris_unlock";
export const HRIS_UNLOCK_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type EnvMap = Record<string, string | undefined>;

export function isHrisAccessCode(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  const actual = Buffer.from(normalized);
  const expected = Buffer.from(ACCESS_CODE);
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

export function getHrisGateSecret(env: EnvMap = process.env): string {
  const configured = env.HRIS_GATE_SECRET?.trim();
  if (!configured) return BUILT_IN_GATE_SECRET;
  if (configured.length < 16) {
    throw new Error("HRIS_GATE_SECRET must be at least 16 characters.");
  }
  return configured;
}

export function getHrisGateRateLimitConfig(env: EnvMap = process.env): {
  max: number;
  windowMs: number;
} {
  return {
    max: parsePositiveInt(env.HRIS_GATE_RATE_LIMIT_MAX, DEFAULT_MAX_ATTEMPTS),
    windowMs: parsePositiveInt(env.HRIS_GATE_RATE_LIMIT_WINDOW_MS, DEFAULT_WINDOW_MS),
  };
}

export function hrisUnlockCookieOptions() {
  return {
    httpOnly: true as const,
    secure: true as const,
    sameSite: "lax" as const,
    path: "/hris",
    maxAge: HRIS_UNLOCK_MAX_AGE_SECONDS,
  };
}

export function signHrisUnlockToken(
  secret: string,
  nowMs: number = Date.now()
): string {
  const exp = Math.floor(nowMs / 1000) + HRIS_UNLOCK_MAX_AGE_SECONDS;
  const payload = `${TOKEN_VERSION}.${exp}`;
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyHrisUnlockToken(
  token: string | undefined,
  secret: string,
  nowMs: number = Date.now()
): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [version, expRaw, signature] = parts;
  if (version !== TOKEN_VERSION || !expRaw || !signature) return false;
  if (!/^\d+$/.test(expRaw)) return false;
  const exp = Number(expRaw);
  const nowSec = Math.floor(nowMs / 1000);
  if (!Number.isFinite(exp) || exp <= nowSec) return false;
  const maxExp = nowSec + HRIS_UNLOCK_MAX_AGE_SECONDS + 60;
  if (exp > maxExp) return false;

  const payload = `${version}.${expRaw}`;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (actualBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(actualBuf, expectedBuf);
}

export async function consumeHrisGateRateLimit(
  ip: string,
  options?: { store?: RateLimitStore; env?: EnvMap; now?: () => number }
): Promise<RateLimitDecision> {
  const env = options?.env ?? process.env;
  const { max, windowMs } = getHrisGateRateLimitConfig(env);
  const now = options?.now ?? Date.now;
  const store = options?.store ?? getRateLimitStore(env);
  try {
    const entry = await store.increment(`${KEY_PREFIX}${normalizeIp(ip)}`, windowMs);
    const limited = entry.count > max;
    const remaining = Math.max(0, max - entry.count);
    const retryAfterSeconds = Math.max(0, Math.ceil((entry.resetAt - now()) / 1000));
    return {
      limited,
      limit: max,
      remaining,
      retryAfterSeconds,
      resetAt: entry.resetAt,
    };
  } catch (error) {
    console.error("HRis gate rate-limit store failed; allowing this check.", error);
    return {
      limited: false,
      limit: max,
      remaining: max,
      retryAfterSeconds: 0,
      resetAt: now() + windowMs,
    };
  }
}

export function hrisGateClientIp(headers: Headers): string {
  return getClientIp(headers);
}

export function createHrisGateMemoryStore(now?: () => number): RateLimitStore {
  return createMemoryRateLimitStore(now);
}
