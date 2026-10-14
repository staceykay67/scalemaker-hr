import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/hris/unlock/route";
import {
  HRIS_UNLOCK_COOKIE,
  HRIS_UNLOCK_MAX_AGE_SECONDS,
  verifyHrisUnlockToken,
} from "@/lib/hris-gate";

const originalEnv = { ...process.env };
const secret = "test-hris-gate-secret";

function unlockRequest(ip: string, code: string) {
  return new NextRequest("http://localhost/api/hris/unlock", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-forwarded-for": ip,
    },
    body: new URLSearchParams({ code }).toString(),
  });
}

describe("POST /api/hris/unlock", () => {
  beforeEach(() => {
    process.env.HRIS_GATE_SECRET = secret;
    process.env.HRIS_GATE_RATE_LIMIT_MAX = "8";
    process.env.HRIS_GATE_RATE_LIMIT_WINDOW_MS = "600000";
    process.env.ASSESSMENT_RATE_LIMIT_STORE = "memory";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("rejects a wrong code without setting the unlock cookie", async () => {
    const response = await POST(unlockRequest("203.0.113.80", "nope"));
    assert.equal(response.status, 303);
    assert.equal(new URL(response.headers.get("location") ?? "").searchParams.get("error"), "invalid");
    assert.equal(response.headers.get("set-cookie"), null);
    assert.equal(response.cookies.get(HRIS_UNLOCK_COOKIE), undefined);
  });

  it("sets a signed httpOnly cookie for MERLIN", async () => {
    const response = await POST(unlockRequest("203.0.113.81", "MERLIN"));
    assert.equal(response.status, 303);
    const location = new URL(response.headers.get("location") ?? "http://localhost/");
    assert.equal(location.pathname, "/hris");
    assert.equal(location.search, "");

    const setCookie = response.headers.get("set-cookie") ?? "";
    assert.match(setCookie, /hris_unlock=/);
    assert.match(setCookie, /HttpOnly/i);
    assert.match(setCookie, /Secure/i);
    assert.match(setCookie, /SameSite=Lax/i);
    assert.match(setCookie, new RegExp(`Max-Age=${HRIS_UNLOCK_MAX_AGE_SECONDS}`));
    assert.match(setCookie, /Path=\/hris/i);

    const token = response.cookies.get(HRIS_UNLOCK_COOKIE)?.value ?? "";
    assert.equal(verifyHrisUnlockToken(token, secret), true);
    assert.equal(setCookie.toLowerCase().includes("merlin"), false);
  });

  it("rate limits repeated code checks", async () => {
    process.env.HRIS_GATE_RATE_LIMIT_MAX = "2";
    const ip = "203.0.113.82";
    assert.equal((await POST(unlockRequest(ip, "no"))).status, 303);
    assert.equal((await POST(unlockRequest(ip, "MERLIN"))).status, 303);
    const blocked = await POST(unlockRequest(ip, "MERLIN"));
    assert.equal(blocked.status, 303);
    assert.equal(new URL(blocked.headers.get("location") ?? "").searchParams.get("error"), "limited");
    assert.equal(blocked.headers.get("set-cookie"), null);
    assert.equal(blocked.headers.get("retry-after") != null, true);
  });
});
