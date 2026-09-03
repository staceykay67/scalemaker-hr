import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import {
  assessmentRateLimitedPayload,
  CONTACT_PATH,
  consumeAssessmentRateLimit,
  getClientIp,
  peekAssessmentRateLimit,
} from "@/lib/assessment-rate-limit";
import { buildAssessmentFormspreePayload } from "@/lib/form-payloads";
import { getFormspreeEndpoint, submitToFormspree } from "@/lib/formspree";

function rateLimitedResponse(decision: Awaited<ReturnType<typeof consumeAssessmentRateLimit>>) {
  return NextResponse.json(assessmentRateLimitedPayload(decision), {
    status: 429,
    headers: {
      "Cache-Control": "no-store",
      "Retry-After": String(decision.retryAfterSeconds || 1),
    },
  });
}

export async function GET(request: NextRequest) {
  const decision = await peekAssessmentRateLimit(getClientIp(request.headers));
  return NextResponse.json(
    {
      ok: true,
      limited: decision.limited,
      remaining: decision.remaining,
      limit: decision.limit,
      retryAfterSeconds: decision.retryAfterSeconds,
      contactPath: CONTACT_PATH,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contact = body?.contact ?? {};
    if (
      typeof contact.firstName !== "string" ||
      typeof contact.email !== "string" ||
      !contact.firstName.trim() ||
      !contact.email.trim()
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing required lead details." },
        { status: 400 }
      );
    }

    const endpoint = getFormspreeEndpoint("assessment");
    if (!endpoint) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Assessment email is not connected yet. Set FORMSPREE_ASSESSMENT_ID or NEXT_PUBLIC_FORMSPREE_ASSESSMENT in the hosting environment.",
        },
        { status: 503 }
      );
    }

    const decision = await consumeAssessmentRateLimit(getClientIp(request.headers));
    if (decision.limited) {
      return rateLimitedResponse(decision);
    }

    const result = await submitToFormspree(
      endpoint,
      buildAssessmentFormspreePayload({
        contact: {
          firstName: String(contact.firstName ?? ""),
          lastName: String(contact.lastName ?? ""),
          businessName: String(contact.businessName ?? ""),
          email: String(contact.email ?? ""),
          phone: String(contact.phone ?? ""),
          issue: String(contact.issue ?? ""),
          schedule: String(contact.schedule ?? ""),
        },
        profile: body?.profile ?? {},
        likert: body?.likert ?? {},
        risks: Array.isArray(body?.risks) ? body.risks.map(String) : [],
        impact: body?.impact ?? {},
        outcomes: Array.isArray(body?.outcomes) ? body.outcomes.map(String) : [],
        outcomeOther:
          typeof body?.outcomeOther === "string" ? body.outcomeOther : "",
        timeline: typeof body?.timeline === "string" ? body.timeline : "",
        completedAt: body?.completedAt ?? null,
      })
    );

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? "Could not send the assessment lead." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not send the assessment lead." },
      { status: 400 }
    );
  }
}
