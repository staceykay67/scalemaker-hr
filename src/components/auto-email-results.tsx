"use client";

import { useEffect, useState } from "react";
import type { AssessmentRecord } from "@/lib/storage";

export function AutoEmailResults({
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

  useEffect(() => {
    if (status !== "idle" || !email) return;
    
    let cancelled = false;
    const nextAttempts = attempts + 1;
    setStatus("sending");
    
    fetch("/api/results-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: record.submissionId,
        contact: record.contact,
        likert: record.likert,
        risks: record.risks,
      }),
    })
      .then((response) => response.json())
      .then((data: { ok?: boolean; error?: string; retryAllowed?: boolean; sentTo?: string }) => {
        if (cancelled) return;
        if (!data?.ok) {
          const allowRetry = data?.retryAllowed !== false && nextAttempts < 2;
          const storedAttempts = allowRetry ? nextAttempts : Math.max(nextAttempts, 2);
          setAttempts(storedAttempts);
          setStatus("failed");
          onPersist({
            ...record,
            resultsEmailStatus: "failed",
            resultsEmailAttempts: storedAttempts,
          });
          return;
        }
        setStatus("sent");
        setAttempts(nextAttempts);
        onPersist({
          ...record,
          resultsEmailStatus: "sent",
          resultsEmailAttempts: nextAttempts,
        });
      })
      .catch(() => {
        if (cancelled) return;
        const allowRetry = nextAttempts < 2;
        const storedAttempts = allowRetry ? nextAttempts : 2;
        setAttempts(storedAttempts);
        setStatus("failed");
        onPersist({
          ...record,
          resultsEmailStatus: "failed",
          resultsEmailAttempts: storedAttempts,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [status, email, attempts, record, onPersist]);

  async function retry() {
    if (status !== "failed" || attempts >= 2 || !email) return;
    setStatus("idle");
  }

  if (status === "sending") {
    return (
      <p className="text-sm text-muted-foreground">
        Emailing a copy of your results to {email}…
      </p>
    );
  }

  if (status === "sent") {
    return (
      <p className="text-sm text-muted-foreground">
        We&apos;ve emailed a copy of these results to {email}. If you don&apos;t see it in a few minutes, check your spam folder.
      </p>
    );
  }

  if (status === "failed") {
    if (attempts >= 2) {
      return (
        <div className="text-sm">
          <p className="text-destructive">
            We couldn&apos;t email your results. Your results are saved on this page, and you can reach us at staceykay@scalemakerhr.com.
          </p>
        </div>
      );
    }
    return (
      <div className="text-sm">
        <p className="text-destructive">
          We couldn&apos;t email your results just now.{" "}
          <button
            type="button"
            onClick={() => void retry()}
            className="font-semibold underline underline-offset-4 hover:no-underline"
          >
            Try again
          </button>
        </p>
      </div>
    );
  }

  return null;
}
