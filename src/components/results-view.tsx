"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { BookingCta, BookingSoonerNote } from "@/components/booking-cta";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  OTHER_OUTCOME,
  OUTCOME_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/assessment-data";
import { formatWhatMatters } from "@/lib/form-payloads";
import { BOOKING_LABEL } from "@/lib/site-contact";
import { resultCopy, scoreAssessment } from "@/lib/scoring";
import {
  clearProgress,
  clearResults,
  loadResults,
  saveResults,
  type AssessmentRecord,
} from "@/lib/storage";
import { cn } from "@/lib/utils";
import {
  buildAssessmentLeadBody,
  shouldSendWhatMattersOnSchedule,
  validateWhatMatters,
  type PrioritySendStatus,
} from "@/lib/what-matters";

export function ResultsView() {
  const [record, setRecord] = useState<AssessmentRecord | null>(null);
  const [ready, setReady] = useState(false);
  const [priorityStatus, setPriorityStatus] =
    useState<PrioritySendStatus>("idle");
  const [priorityError, setPriorityError] = useState("");
  const [whatMattersClosed, setWhatMattersClosed] = useState(false);

  useEffect(() => {
    const loaded = loadResults();
    setRecord(loaded);
    if (loaded?.prioritiesSubmittedAt) {
      setWhatMattersClosed(true);
      setPriorityStatus("sent");
    }
    setReady(true);
  }, []);

  const scores = useMemo(() => {
    if (!record?.completedAt) return null;
    return scoreAssessment(record.likert, record.risks);
  }, [record]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted-foreground">
        Preparing your results…
      </div>
    );
  }

  if (!record?.completedAt || !scores) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-forest">
          No completed assessment yet
        </h1>
        <p className="mt-3 text-muted-foreground">
          Complete the People &amp; Growth Readiness Assessment to see your
          score, category results, and recommended next steps.
        </p>
        <Link
          href="/assessment"
          className={cn(
            buttonVariants(),
            "mt-6 inline-flex h-11 px-5 font-semibold"
          )}
        >
          Begin the assessment
        </Link>
      </div>
    );
  }

  const copy = resultCopy(scores.tier);
  const firstName = record.contact.firstName.trim() || "there";

  function persist(next: AssessmentRecord) {
    setRecord(next);
    saveResults(next);
  }

  function setOutcome(label: string, nextChecked: boolean) {
    if (!record) return;
    const selected = new Set(record.outcomes);
    if (nextChecked) {
      if (selected.has(label) || selected.size >= 3) return;
      selected.add(label);
    } else {
      selected.delete(label);
    }
    persist({
      ...record,
      outcomes: Array.from(selected),
      outcomeOther: selected.has(OTHER_OUTCOME) ? record.outcomeOther : "",
    });
    if (priorityStatus !== "sending") {
      setPriorityStatus("idle");
      setPriorityError("");
    }
  }

  async function sendPriorities(current: AssessmentRecord) {
    setPriorityError("");
    setPriorityStatus("sending");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildAssessmentLeadBody(current)),
      });
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) {
        throw new Error(
          response.status === 503
            ? "We could not send your priorities just now. Please email staceykay@scalemakerhr.com or use the scheduling link below."
            : data?.error ||
                "Your priorities could not be sent. Please try again or email staceykay@scalemakerhr.com."
        );
      }
      persist({
        ...current,
        prioritiesSubmittedAt: new Date().toISOString(),
      });
      setPriorityStatus("sent");
      setWhatMattersClosed(true);
      return true;
    } catch (error) {
      setPriorityStatus("error");
      setPriorityError(
        error instanceof Error && error.message
          ? error.message
          : "Your priorities could not be sent. Please email staceykay@scalemakerhr.com or use the scheduling link below."
      );
      return false;
    }
  }

  async function submitPriorities(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!record) return;

    const validationError = validateWhatMatters(record);
    if (validationError) {
      setPriorityStatus("error");
      setPriorityError(validationError);
      return;
    }

    await sendPriorities(record);
  }

  function onScheduleClick() {
    setWhatMattersClosed(true);
    if (!record) return;
    if (!shouldSendWhatMattersOnSchedule(record, priorityStatus)) return;
    void sendPriorities(record);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-sm font-medium text-sage">
        People &amp; Growth Readiness Assessment
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-forest">
        {firstName}, your results
      </h1>
      <p className="mt-2 text-muted-foreground">
        {record.contact.businessName}
      </p>

      <Card className="mt-8">
        <CardContent className="space-y-3 pt-2">
          <p className="text-sm font-medium text-sage">{copy.name}</p>
          <p className="font-heading text-5xl font-bold text-forest">
            {scores.percent}%
          </p>
          <p className="text-sm text-muted-foreground">
            Overall People &amp; Growth Readiness Score
          </p>
        </CardContent>
      </Card>

      {scores.criticalAttention && (
        <Card className="mt-6 ring-destructive/30">
          <CardHeader>
            <CardTitle>An area may require prompt attention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              One or more of your responses identified an employee-relations,
              pay-practice, policy or documentation concern that may warrant
              prompt professional review.
            </p>
            <p>
              Your overall score measures the strength of your general people
              practices. It does not eliminate the importance of addressing a
              specific concern.
            </p>
            <p>
              We recommend discussing the matter confidentially with an
              experienced HR professional. Depending on the circumstances,
              consultation with qualified employment counsel may also be
              appropriate.
            </p>
            <p>
              Please do not submit employee names, medical information or
              confidential details through this assessment.
            </p>
            <BookingCta className="mt-2" onClick={onScheduleClick}>
              Schedule a confidential conversation
            </BookingCta>
          </CardContent>
        </Card>
      )}

      {scores.businessImpact && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              People issues may be affecting business performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Your responses suggest that recruiting, turnover, employee
              concerns or management workload may be affecting the
              business&apos;s performance, leadership capacity or ability to
              grow.
            </p>
            <p>A focused review can help determine whether the best response is:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>A defined HR project</li>
              <li>Development and support for an internal HR resource</li>
              <li>Ongoing fractional HR support</li>
              <li>Preparation for an internal HR position</li>
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 space-y-4 text-sm leading-relaxed whitespace-pre-line text-foreground">
        {copy.summary}
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold text-forest">
          Results in six key areas
        </h2>
        <div className="mt-4 space-y-4">
          {scores.categories.map((category) => (
            <div key={category.id}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium">{category.name}</p>
                <p className="text-sm tabular-nums text-muted-foreground">
                  {category.percent}%
                </p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-sage"
                  style={{ width: `${category.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold text-forest">
          Recommended next steps
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {copy.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            Recommended level of support:{" "}
          </span>
          {copy.support}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold text-forest">
          Tell us what matters most
        </h2>
        {whatMattersClosed || priorityStatus === "sent" ? (
          <div className="mt-4 space-y-4 rounded-xl border bg-white p-5">
            <p className="font-medium text-forest">
              {priorityStatus === "sent"
                ? "Thank you. We received your priorities."
                : priorityStatus === "sending"
                  ? "Saving your priorities…"
                  : "You’re all set."}
            </p>
            {(record.outcomes.length > 0 ||
              record.outcomeOther.trim() ||
              record.timeline.trim()) && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {formatWhatMatters(record.outcomes, record.outcomeOther)}
                {record.timeline ? ` · ${record.timeline}` : ""}
              </p>
            )}
            <p className="text-sm leading-relaxed text-muted-foreground">
              Schedule a 30-minute results review to talk through these outcomes.
            </p>
            {priorityError && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-white px-4 py-3 text-sm text-destructive"
              >
                {priorityError}
              </p>
            )}
            <BookingCta onClick={onScheduleClick}>{BOOKING_LABEL}</BookingCta>
            <BookingSoonerNote />
          </div>
        ) : (
          <form onSubmit={submitPriorities} className="mt-2">
            <p className="text-sm text-muted-foreground">
              Select up to three outcomes that would be most valuable to your
              business. Submit here, or choose Schedule a 30-minute results
              review — either one sends your priorities.
            </p>
            <div className="mt-4 space-y-2">
              {OUTCOME_OPTIONS.map((option) => {
                const checked = record.outcomes.includes(option);
                return (
                  <div key={option} className="space-y-2">
                    <div
                      className="flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-3 text-sm"
                      onClick={() => setOutcome(option, !checked)}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(value) =>
                          setOutcome(option, value === true)
                        }
                        onClick={(event) => event.stopPropagation()}
                        className="mt-0.5"
                      />
                      {option}
                    </div>
                    {option === OTHER_OUTCOME && checked && (
                      <label className="block space-y-2 text-sm font-medium">
                        What else matters most?
                        <Input
                          value={record.outcomeOther}
                          onChange={(event) => {
                            persist({
                              ...record,
                              outcomeOther: event.target.value,
                            });
                            if (priorityStatus !== "sending") {
                              setPriorityStatus("idle");
                              setPriorityError("");
                            }
                          }}
                          placeholder="Describe the outcome that matters most"
                          className="h-11"
                          maxLength={300}
                          autoComplete="off"
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
            <label className="mt-6 block space-y-2 text-sm font-medium">
              When would you ideally begin addressing these needs?
              <select
                className="mt-2 h-11 w-full rounded-lg border border-input bg-white px-3 text-sm font-normal"
                value={record.timeline}
                onChange={(event) => {
                  persist({ ...record, timeline: event.target.value });
                  if (priorityStatus !== "sending") {
                    setPriorityStatus("idle");
                    setPriorityError("");
                  }
                }}
              >
                <option value="">Select an option</option>
                {TIMELINE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {priorityError && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-destructive/30 bg-white px-4 py-3 text-sm text-destructive"
              >
                {priorityError}
              </p>
            )}
            <Button
              type="submit"
              className="mt-6 h-11 px-5 font-semibold"
              disabled={priorityStatus === "sending"}
            >
              {priorityStatus === "sending"
                ? "Sending…"
                : "Submit what matters most"}
            </Button>
          </form>
        )}
      </section>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Complimentary People &amp; Growth Results Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>Schedule a complimentary 30-minute conversation to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Review your assessment results</li>
            <li>Discuss your lowest-scoring areas</li>
            <li>Identify the most important immediate priorities</li>
            <li>
              Determine what level of HR support, if any, would be appropriate
            </li>
          </ul>
          <p>There is no obligation to purchase services.</p>
          <BookingCta className="mt-2" onClick={onScheduleClick}>
            {BOOKING_LABEL}
          </BookingCta>
          <BookingSoonerNote className="mt-3" />
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          className="h-11 px-5"
          onClick={() => {
            clearResults();
            clearProgress();
            window.location.href = "/assessment";
          }}
        >
          Start a new assessment
        </Button>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost" }), "h-11 px-5")}
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
