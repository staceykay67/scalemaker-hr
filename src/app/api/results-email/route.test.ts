import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/results-email/route";
import { resetResultsEmailGuard } from "@/lib/results-email-guard";
import { SCORED_QUESTIONS } from "@/lib/assessment-data";

const originalFetch = globalThis.fetch;
const originalKey = process.env.RESEND_API_KEY;

function request(body: Record<string, unknown>) {
  return new NextRequest("http://localhost/api/results-email", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function likert(value: string) {
  return Object.fromEntries(SCORED_QUESTIONS.map((question) => [question.id, value]));
}

const payload = {
  submissionId: "submission-1",
  contact: { firstName: "Jordan", email: "jordan@example.com" },
  likert: likert("agree"),
  risks: ["none"],
};

describe("POST /api/results-email", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    resetResultsEmailGuard();
  });

  it("does not call Resend when the key is missing and still returns an error", async () => {
    delete process.env.RESEND_API_KEY;
    let calls = 0;
    globalThis.fetch = (async () => {
      calls += 1;
      return new Response("{}", { status: 200 });
    }) as typeof fetch;
    const response = await POST(request({ ...payload, submissionId: "missing-key" }));
    const body = (await response.json()) as { ok?: boolean; retryAllowed?: boolean };
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.equal(body.retryAllowed, true);
    assert.equal(calls, 0);
  });

  it("sends once and treats a replay as already sent", async () => {
    process.env.RESEND_API_KEY = "test-key";
    const sent: unknown[] = [];
    globalThis.fetch = (async (_url: string | URL, init?: RequestInit) => {
      sent.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ id: "email_1" }), { status: 200 });
    }) as typeof fetch;

    const first = await POST(request({ ...payload, submissionId: "once" }));
    const firstBody = (await first.json()) as { ok?: boolean; sentTo?: string };
    const second = await POST(request({ ...payload, submissionId: "once" }));
    const secondBody = (await second.json()) as { ok?: boolean; alreadySent?: boolean };

    assert.equal(first.status, 200);
    assert.equal(firstBody.sentTo, "jordan@example.com");
    assert.equal(second.status, 200);
    assert.equal(secondBody.alreadySent, true);
    assert.equal(sent.length, 1);
    const message = sent[0] as { from: string; reply_to: string; to: string[]; html: string };
    assert.equal(message.from, "Scalemaker HR <results@scalemakerhr.com>");
    assert.equal(message.reply_to, "staceykay@scalemakerhr.com");
    assert.deepEqual(message.to, ["jordan@example.com"]);
    assert.match(message.html, /80% — Scale Ready/);
  });

  it("allows one retry after Resend fails", async () => {
    process.env.RESEND_API_KEY = "test-key";
    let calls = 0;
    globalThis.fetch = (async () => {
      calls += 1;
      return new Response(JSON.stringify({ message: "no" }), { status: 500 });
    }) as typeof fetch;

    const first = await POST(request({ ...payload, submissionId: "retry" }));
    const firstBody = (await first.json()) as { retryAllowed?: boolean };
    const second = await POST(request({ ...payload, submissionId: "retry" }));
    const secondBody = (await second.json()) as { retryAllowed?: boolean };
    const third = await POST(request({ ...payload, submissionId: "retry" }));

    assert.equal(first.status, 502);
    assert.equal(firstBody.retryAllowed, true);
    assert.equal(second.status, 502);
    assert.equal(secondBody.retryAllowed, false);
    assert.equal(third.status, 409);
    assert.equal(calls, 2);
  });
});
