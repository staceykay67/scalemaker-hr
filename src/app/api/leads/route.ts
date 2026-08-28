import { NextRequest, NextResponse } from "next/server";

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
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
