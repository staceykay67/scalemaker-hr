import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  consumeHrisGateRateLimit,
  createHrisGateMemoryStore,
  getHrisGateSecret,
  hrisUnlockCookieOptions,
  HRIS_UNLOCK_MAX_AGE_SECONDS,
  isHrisAccessCode,
  signHrisUnlockToken,
  verifyHrisUnlockToken,
} from "@/lib/hris-gate";

describe("HRis access code", () => {
  it("accepts merlin in any case and with surrounding space", () => {
    assert.equal(isHrisAccessCode("merlin"), true);
    assert.equal(isHrisAccessCode("MERLIN"), true);
    assert.equal(isHrisAccessCode("  Merlin  "), true);
  });

  it("rejects anything else", () => {
    assert.equal(isHrisAccessCode("merlinn"), false);
    assert.equal(isHrisAccessCode("merli"), false);
    assert.equal(isHrisAccessCode(""), false);
    assert.equal(isHrisAccessCode(undefined), false);
  });
});

describe("HRis unlock cookie", () => {
  const secret = "test-hris-gate-secret";

  it("uses an httpOnly, secure, SameSite=Lax cookie for about 30 days", () => {
    const options = hrisUnlockCookieOptions();
    assert.equal(options.httpOnly, true);
    assert.equal(options.secure, true);
    assert.equal(options.sameSite, "lax");
    assert.equal(options.path, "/hris");
    assert.equal(options.maxAge, HRIS_UNLOCK_MAX_AGE_SECONDS);
    assert.equal(options.maxAge, 60 * 60 * 24 * 30);
  });

  it("accepts a signed token and rejects tampering or expiry", () => {
    const now = Date.parse("2026-10-14T12:00:00Z");
    const token = signHrisUnlockToken(secret, now);
    assert.equal(verifyHrisUnlockToken(token, secret, now + 1000), true);

    const [version, exp, signature] = token.split(".");
    assert.equal(verifyHrisUnlockToken(`${version}.${exp}.${signature}x`, secret, now), false);
    assert.equal(
      verifyHrisUnlockToken(token, secret, now + HRIS_UNLOCK_MAX_AGE_SECONDS * 1000 + 5000),
      false
    );
    assert.equal(verifyHrisUnlockToken(token, "another-long-secret-value", now), false);
    assert.equal(verifyHrisUnlockToken(undefined, secret, now), false);
  });

  it("uses a built-in signing secret unless a long HRIS_GATE_SECRET is set", () => {
    assert.throws(() => getHrisGateSecret({ HRIS_GATE_SECRET: "short" }));
    assert.equal(
      getHrisGateSecret({ NODE_ENV: "production", HRIS_GATE_SECRET: "a-sufficiently-long-secret" }),
      "a-sufficiently-long-secret"
    );
    const builtIn = getHrisGateSecret({ NODE_ENV: "production" });
    assert.equal(builtIn.length >= 16, true);
    const token = signHrisUnlockToken(builtIn, Date.parse("2026-10-14T12:00:00Z"));
    assert.equal(verifyHrisUnlockToken(token, builtIn, Date.parse("2026-10-14T12:00:00Z")), true);
  });
});

describe("HRis code-check rate limit", () => {
  it("blocks further checks after the light limit", async () => {
    const store = createHrisGateMemoryStore(() => 1_000);
    const env = { HRIS_GATE_RATE_LIMIT_MAX: "3", HRIS_GATE_RATE_LIMIT_WINDOW_MS: "60000" };
    const decisions = [];
    for (let attempt = 0; attempt < 4; attempt += 1) {
      decisions.push(
        await consumeHrisGateRateLimit("203.0.113.50", { store, env, now: () => 1_000 })
      );
    }
    assert.deepEqual(
      decisions.map((decision) => decision.limited),
      [false, false, false, true]
    );
    assert.equal(decisions[3].retryAfterSeconds > 0, true);
  });
});
