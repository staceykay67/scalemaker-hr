"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AssessmentRecord } from "@/lib/storage";

export function EmailResultsButton({
  record,
  onPersist,
}: {
  record: AssessmentRecord;
  onPersist: (next: AssessmentRecord) => void;
}) {
  const email = record.contact.email.trim();
  const storedAttempts = record.resultsEmailAttempts ?? 0;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    record.resultsEmailStatus === "sent"
      ? "sent"
      : storedAttempts >= 2
        ? "failed"
        : "idle"
  );
  const [attempts, setAttempts] = useState(storedAttempts);
  const [error, setError] = useState("");
  const exhausted = status === "failed" && attempts >= 2;
  const sent = status === "sent";
  const sending = status === "sending";

  async function send() {
    if (sent || sending || exhausted || !email) return;
    const nextAttempts = attempts + 1;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/results-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: record.submissionId,
          contact: record.contact,
          likert: record.likert,
          risks: record.risks,
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        retryAllowed?: boolean;
        sentTo?: string;
      } | null;
      if (!response.ok || !data?.ok) {
        const allowRetry = data?.retryAllowed !== false && nextAttempts < 2;
        const storedAttempts = allowRetry ? nextAttempts : Math.max(nextAttempts, 2);
        setAttempts(storedAttempts);
        setStatus("failed");
        setError(data?.error || "We couldn't email your results. Please try again.");
        onPersist({
          ...record,
          resultsEmailStatus: "failed",
          resultsEmailAttempts: storedAttempts,
        });
        return;
      }
      setStatus("sent");
      setAttempts(nextAttempts);
      setError("");
      onPersist({
        ...record,
        resultsEmailStatus: "sent",
        resultsEmailAttempts: nextAttempts,
      });
    } catch {
      const allowRetry = nextAttempts < 2;
      const storedAttempts = allowRetry ? nextAttempts : 2;
      setAttempts(storedAttempts);
      setStatus("failed");
      setError("We couldn't email your results. Please try again.");
      onPersist({
        ...record,
        resultsEmailStatus: "failed",
        resultsEmailAttempts: storedAttempts,
      });
    }
  }

  return (
    <div className="mt-4">
      <Button
        type="button"
        className="h-11 px-5 font-semibold"
        onClick={() => void send()}
        disabled={sending || sent || exhausted || !email}
      >
        {sent ? `Sent to ${email}` : sending ? "Sending…" : "Email results"}
      </Button>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Sends a copy of these results to {email || "the email you entered"}.
      </p>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
          {status === "failed" && attempts < 2 ? " You can try once more." : ""}
        </p>
      ) : null}
    </div>
  );
}
