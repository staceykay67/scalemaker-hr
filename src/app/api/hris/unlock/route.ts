import { NextRequest, NextResponse } from "next/server";
import {
  consumeHrisGateRateLimit,
  getHrisGateSecret,
  hrisGateClientIp,
  hrisUnlockCookieOptions,
  HRIS_UNLOCK_COOKIE,
  isHrisAccessCode,
  signHrisUnlockToken,
} from "@/lib/hris-gate";

export const dynamic = "force-dynamic";

function gateUrl(request: NextRequest, error?: string) {
  const url = new URL("/hris", request.url);
  if (error) url.searchParams.set("error", error);
  return url;
}

function redirectToGate(request: NextRequest, error?: string, retryAfterSeconds?: number) {
  const response = NextResponse.redirect(gateUrl(request, error), 303);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  if (retryAfterSeconds && retryAfterSeconds > 0) {
    response.headers.set("Retry-After", String(retryAfterSeconds));
  }
  return response;
}

export async function POST(request: NextRequest) {
  const ip = hrisGateClientIp(request.headers);
  const decision = await consumeHrisGateRateLimit(ip);
  if (decision.limited) {
    return redirectToGate(request, "limited", decision.retryAfterSeconds);
  }

  let code = "";
  try {
    const form = await request.formData();
    const value = form.get("code");
    code = typeof value === "string" ? value : "";
  } catch {
    return redirectToGate(request, "invalid");
  }

  if (!isHrisAccessCode(code)) {
    return redirectToGate(request, "invalid");
  }

  let token = "";
  try {
    token = signHrisUnlockToken(getHrisGateSecret());
  } catch (error) {
    console.error("HRis unlock cookie could not be signed.", error);
    return redirectToGate(request, "unavailable");
  }

  const response = redirectToGate(request);
  response.cookies.set(HRIS_UNLOCK_COOKIE, token, hrisUnlockCookieOptions());
  return response;
}
