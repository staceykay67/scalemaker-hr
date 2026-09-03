import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ASSESSMENT_RATE_LIMITED_CODE,
  consumeAssessmentRateLimit,
  createMemoryRateLimitStore,
  getAssessmentRateLimitConfig,
  getClientIp,
  isAssessmentRateLimitedResponse,
  normalizeIp,
  peekAssessmentRateLimit,
} from "@/lib/assessment-rate-limit";

describe("assessment rate-limit config", () => {
  it("defaults to 3 submissions per 24 hours", () => {
    const config = getAssessmentRateLimitConfig({});
    assert.equal(config.max, 3);
    assert.equal(config.windowMs, 24 * 60 * 60 * 1000);
  });

  it("reads max and window hours from env", () => {
    const config = getAssessmentRateLimitConfig({
      ASSESSMENT_RATE_LIMIT_MAX: "5",
      ASSESSMENT_RATE_LIMIT_WINDOW_HOURS: "12",
    });
    assert.equal(config.max, 5);
    assert.equal(config.windowMs, 12 * 60 * 60 * 1000);
  });

  it("prefers an explicit window in milliseconds for tests", () => {
    const config = getAssessmentRateLimitConfig({
      ASSESSMENT_RATE_LIMIT_WINDOW_HOURS: "24",
      ASSESSMENT_RATE_LIMIT_WINDOW_MS: "1500",
    });
    assert.equal(config.windowMs, 1500);
  });
});

describe("client IP parsing", () => {
  it("uses the first x-forwarded-for hop", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.10, 10.0.0.1",
      "x-real-ip": "10.0.0.9",
    });
    assert.equal(getClientIp(headers), "203.0.113.10");
  });

  it("normalizes IPv6-mapped IPv4 addresses", () => {
    assert.equal(normalizeIp("::ffff:192.0.2.8"), "192.0.2.8");
    const headers = new Headers({ "x-real-ip": "::ffff:192.0.2.8" });
    assert.equal(getClientIp(headers), "192.0.2.8");
  });

  it("falls back to unknown when no proxy headers are present", () => {
    assert.equal(getClientIp(new Headers()), "unknown");
  });
});

describe("in-memory assessment rate limit", () => {
  it("allows three submissions from one IP, then cools down", async () => {
    const store = createMemoryRateLimitStore();
    const env = {
      ASSESSMENT_RATE_LIMIT_MAX: "3",
      ASSESSMENT_RATE_LIMIT_WINDOW_MS: "60000",
    };
    const ip = "198.51.100.20";

    const first = await consumeAssessmentRateLimit(ip, { store, env });
    const second = await consumeAssessmentRateLimit(ip, { store, env });
    const third = await consumeAssessmentRateLimit(ip, { store, env });
    const fourth = await consumeAssessmentRateLimit(ip, { store, env });

    assert.equal(first.limited, false);
    assert.equal(first.remaining, 2);
    assert.equal(second.limited, false);
    assert.equal(third.limited, false);
    assert.equal(third.remaining, 0);
    assert.equal(fourth.limited, true);
    assert.equal(fourth.remaining, 0);
    assert.equal(fourth.limit, 3);
    assert.ok(fourth.retryAfterSeconds > 0);
  });

  it("tracks IPs independently and does not use email", async () => {
    const store = createMemoryRateLimitStore();
    const env = {
      ASSESSMENT_RATE_LIMIT_MAX: "1",
      ASSESSMENT_RATE_LIMIT_WINDOW_MS: "60000",
    };

    const office = await consumeAssessmentRateLimit("203.0.113.1", { store, env });
    const home = await consumeAssessmentRateLimit("203.0.113.2", { store, env });
    const officeAgain = await consumeAssessmentRateLimit("203.0.113.1", {
      store,
      env,
    });

    assert.equal(office.limited, false);
    assert.equal(home.limited, false);
    assert.equal(officeAgain.limited, true);
  });

  it("peek does not consume a slot", async () => {
    const store = createMemoryRateLimitStore();
    const env = {
      ASSESSMENT_RATE_LIMIT_MAX: "2",
      ASSESSMENT_RATE_LIMIT_WINDOW_MS: "60000",
    };
    const ip = "203.0.113.50";

    assert.equal((await peekAssessmentRateLimit(ip, { store, env })).remaining, 2);
    await consumeAssessmentRateLimit(ip, { store, env });
    const peeked = await peekAssessmentRateLimit(ip, { store, env });
    assert.equal(peeked.limited, false);
    assert.equal(peeked.remaining, 1);
    await consumeAssessmentRateLimit(ip, { store, env });
    assert.equal((await peekAssessmentRateLimit(ip, { store, env })).limited, false);
    await consumeAssessmentRateLimit(ip, { store, env });
    assert.equal((await peekAssessmentRateLimit(ip, { store, env })).limited, true);
  });

  it("resets after the cooldown window", async () => {
    let nowMs = 1_000_000;
    const store = createMemoryRateLimitStore(() => nowMs);
    const env = {
      ASSESSMENT_RATE_LIMIT_MAX: "1",
      ASSESSMENT_RATE_LIMIT_WINDOW_MS: "1000",
    };
    const ip = "203.0.113.77";

    assert.equal(
      (await consumeAssessmentRateLimit(ip, { store, env, now: () => nowMs }))
        .limited,
      false
    );
    assert.equal(
      (await consumeAssessmentRateLimit(ip, { store, env, now: () => nowMs }))
        .limited,
      true
    );

    nowMs += 1001;
    assert.equal(
      (await consumeAssessmentRateLimit(ip, { store, env, now: () => nowMs }))
        .limited,
      false
    );
  });
});

describe("rate-limit response helper", () => {
  it("treats HTTP 429 as the assessment cooldown", () => {
    assert.equal(
      isAssessmentRateLimitedResponse(429, {
        code: ASSESSMENT_RATE_LIMITED_CODE,
      }),
      true
    );
    assert.equal(isAssessmentRateLimitedResponse(429, null), true);
    assert.equal(isAssessmentRateLimitedResponse(400, { code: ASSESSMENT_RATE_LIMITED_CODE }), false);
  });
});
