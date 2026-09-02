import { NextRequest, NextResponse } from "next/server";
import { buildContactFormspreePayload } from "@/lib/form-payloads";
import { getFormspreeEndpoint, submitToFormspree } from "@/lib/formspree";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const business = String(body?.business ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const endpoint = getFormspreeEndpoint("contact");
    if (!endpoint) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Contact email is not connected yet. Set FORMSPREE_CONTACT_ID or NEXT_PUBLIC_FORMSPREE_CONTACT in the hosting environment.",
        },
        { status: 503 }
      );
    }

    const result = await submitToFormspree(
      endpoint,
      buildContactFormspreePayload({ name, email, phone, business, message })
    );

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? "Could not send the message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not send the message." }, { status: 400 });
  }
}
