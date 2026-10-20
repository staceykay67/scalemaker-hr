import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

import { claimResultsEmail, finishResultsEmail } from "@/lib/results-email-guard";
import { deliverProspectEmail, prospectEmailForLead } from "@/lib/results-email";

const FAILURE =
  "We couldn't email your results just now. Please try again.";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contact = body?.contact ?? {};
    const email = typeof contact.email === "string" ? contact.email.trim() : "";
    const firstName = typeof contact.firstName === "string" ? contact.firstName : "";
    const submissionId = typeof body?.submissionId === "string" ? body.submissionId.trim() : "";
    if (!email || !submissionId) {
      return NextResponse.json(
        { ok: false, error: "Missing the email or submission id.", retryAllowed: false },
        { status: 400 }
      );
    }

    const claim = await claimResultsEmail(submissionId);
    if (claim.action === "already-sent") {
      return NextResponse.json({ ok: true, alreadySent: true, sentTo: email });
    }
    if (claim.action === "exhausted") {
      return NextResponse.json(
        {
          ok: false,
          error: "These results could not be emailed again from this page.",
          retryAllowed: false,
        },
        { status: 409 }
      );
    }
    if (claim.action === "in-flight") {
      return NextResponse.json(
        { ok: false, error: FAILURE, retryAllowed: true },
        { status: 409 }
      );
    }

    const likert =
      body?.likert && typeof body.likert === "object" ? (body.likert as Record<string, string>) : {};
    const risks = Array.isArray(body?.risks) ? body.risks.map(String) : [];
    const message = prospectEmailForLead({ firstName, likert, risks });

    try {
      const result = await deliverProspectEmail(message, email);
      if (!result.ok) {
        const finished = await finishResultsEmail(submissionId, "failed");
        return NextResponse.json(
          { ok: false, error: result.error ?? FAILURE, retryAllowed: finished.attempts < 2 },
          { status: 502 }
        );
      }
      await finishResultsEmail(submissionId, "sent");
      return NextResponse.json({ ok: true, sentTo: email });
    } catch (error) {
      console.info("Prospect results email failed.", error);
      const finished = await finishResultsEmail(submissionId, "failed");
      return NextResponse.json(
        { ok: false, error: FAILURE, retryAllowed: finished.attempts < 2 },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not email these results.", retryAllowed: true },
      { status: 400 }
    );
  }
}
