import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/leads/route";
import { POST as contactPost } from "@/app/api/contact/route";
import { ASSESSMENT_RATE_LIMITED_CODE } from "@/lib/assessment-rate-limit";

const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;

function leadRequest(ip: string, body?: Record<string, unknown>) {
  return new NextRequest("http://localhost/api/leads", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(
      body ?? {
        contact: {
          firstName: "Jordan",
          lastName: "Lee",
          businessName: "Example Co",
          email: "jordan@example.com",
        },
      }
    ),
  });
}

function contactRequest(ip: string) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify({
      name: "Jordan Lee",
      email: "jordan@example.com",
      message: "Can we talk through a hiring issue?",
    }),
  });
}

describe("/api/leads assessment rate limit", () => {
  beforeEach(() => {
    process.env.ASSESSMENT_RATE_LIMIT_STORE = "memory";
    process.env.ASSESSMENT_RATE_LIMIT_MAX = "3";
    process.env.ASSESSMENT_RATE_LIMIT_WINDOW_MS = "600000";
    process.env.FORMSPREE_ASSESSMENT_ID = "test-assessment-form";
    process.env.FORMSPREE_CONTACT_ID = "test-contact-form";
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })) as typeof fetch;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    globalThis.fetch = originalFetch;
  });

  it("forwards the first three assessment leads from an IP and blocks the fourth", async () => {
    const ip = `198.51.100.${Math.floor(Math.random() * 200) + 1}`;
    let formspreeCalls = 0;
    globalThis.fetch = (async () => {
      formspreeCalls += 1;
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as typeof fetch;

    const allowed = [];
    for (let i = 0; i < 3; i += 1) {
      allowed.push(await POST(leadRequest(ip)));
    }
    const blocked = await POST(leadRequest(ip));
    const blockedBody = (await blocked.json()) as {
      code?: string;
      contactPath?: string;
      error?: string;
    };

    assert.deepEqual(
      allowed.map((response) => response.status),
      [200, 200, 200]
    );
    assert.equal(formspreeCalls, 3);
    assert.equal(blocked.status, 429);
    assert.equal(blockedBody.code, ASSESSMENT_RATE_LIMITED_CODE);
    assert.equal(blockedBody.contactPath, "/contact");
    assert.match(String(blockedBody.error), /contact page/i);
    assert.equal(blocked.headers.get("Retry-After") != null, true);
  });

  it("does not call Formspree after the IP is limited", async () => {
    const ip = "203.0.113.200";
    process.env.ASSESSMENT_RATE_LIMIT_MAX = "1";
    let formspreeCalls = 0;
    globalThis.fetch = (async () => {
      formspreeCalls += 1;
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as typeof fetch;

    assert.equal((await POST(leadRequest(ip))).status, 200);
    assert.equal((await POST(leadRequest(ip))).status, 429);
    assert.equal(formspreeCalls, 1);
  });

  it("does not apply the assessment limit to /api/contact", async () => {
    const ip = "203.0.113.201";
    process.env.ASSESSMENT_RATE_LIMIT_MAX = "1";
    let formspreeCalls = 0;
    globalThis.fetch = (async () => {
      formspreeCalls += 1;
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as typeof fetch;

    assert.equal((await POST(leadRequest(ip))).status, 200);
    assert.equal((await POST(leadRequest(ip))).status, 429);
    assert.equal((await contactPost(contactRequest(ip))).status, 200);
    assert.equal((await contactPost(contactRequest(ip))).status, 200);
    assert.equal(formspreeCalls, 3);
  });

  it("does not consume a slot for invalid assessment payloads", async () => {
    const ip = "203.0.113.202";
    process.env.ASSESSMENT_RATE_LIMIT_MAX = "1";

    const invalid = await POST(
      leadRequest(ip, { contact: { firstName: "", email: "" } })
    );
    assert.equal(invalid.status, 400);
    assert.equal((await POST(leadRequest(ip))).status, 200);
  });

  it("reports remaining quota on GET without consuming it", async () => {
    const ip = "203.0.113.203";
    process.env.ASSESSMENT_RATE_LIMIT_MAX = "2";

    const before = await GET(
      new NextRequest("http://localhost/api/leads", {
        headers: { "x-forwarded-for": ip },
      })
    );
    const beforeBody = (await before.json()) as { remaining?: number; limited?: boolean };
    assert.equal(beforeBody.remaining, 2);
    assert.equal(beforeBody.limited, false);

    assert.equal((await POST(leadRequest(ip))).status, 200);

    const after = await GET(
      new NextRequest("http://localhost/api/leads", {
        headers: { "x-forwarded-for": ip },
      })
    );
    const afterBody = (await after.json()) as { remaining?: number; limited?: boolean };
    assert.equal(afterBody.remaining, 1);
    assert.equal(afterBody.limited, false);
  });
});
