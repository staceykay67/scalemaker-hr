import type { Metadata } from "next";
import { cookies } from "next/headers";
import { HrisGateForm } from "@/components/hris-gate-form";
import {
  getHrisGateSecret,
  HRIS_UNLOCK_COOKIE,
  verifyHrisUnlockToken,
} from "@/lib/hris-gate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "HRis",
  description: "Private early-access page.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

function isUnlocked(token: string | undefined): boolean {
  if (!token) return false;
  try {
    return verifyHrisUnlockToken(token, getHrisGateSecret());
  } catch {
    return false;
  }
}

export default async function HrisPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const jar = await cookies();
  const unlocked = isUnlocked(jar.get(HRIS_UNLOCK_COOKIE)?.value);

  if (!unlocked) {
    return <HrisGateForm errorCode={params.error} />;
  }

  const { HrisContent } = await import("@/components/hris-content");
  return <HrisContent />;
}
