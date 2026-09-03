"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  CATEGORIES,
  IMPACT_QUESTIONS,
  LIKERT_OPTIONS,
  PROFILE_QUESTIONS,
  RISK_OPTIONS,
  SCHEDULE_OPTIONS,
  SCORED_QUESTIONS,
  type LikertValue,
} from "@/lib/assessment-data";
import { AssessmentRateLimitNotice } from "@/components/assessment-rate-limit-notice";
import { isAssessmentRateLimitedResponse } from "@/lib/assessment-rate-limit";
import {
  clearProgress,
  emptyRecord,
  loadProgress,
  saveProgress,
  saveResults,
  type AssessmentRecord,
} from "@/lib/storage";
import { cn } from "@/lib/utils";

const STEPS = [
  "About your business",
  "HR foundation and leadership",
  "Hiring and performance",
  "Systems and growth",
  "Current risks",
  "Receive your results",
];

const QUESTION_GROUPS = [
  SCORED_QUESTIONS.filter((question) =>
    ["foundation", "leadership"].includes(question.categoryId)
  ),
  SCORED_QUESTIONS.filter((question) =>
    ["hiring", "performance"].includes(question.categoryId)
  ),
  SCORED_QUESTIONS.filter((question) =>
    ["systems", "growth"].includes(question.categoryId)
  ),
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function AssessmentWizard() {
  const router = useRouter();
  const [record, setRecord] = useState<AssessmentRecord>(emptyRecord);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    setRecord(loadProgress());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveProgress(record);
  }, [record, ready]);

  useEffect(() => {
    if (!ready || record.step !== STEPS.length - 1) return;
    let cancelled = false;
    fetch("/api/leads", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { limited?: boolean }) => {
        if (!cancelled && data?.limited) setRateLimited(true);
      })
      .catch(() => {
        // Submit still checks the server-side limit.
      });
    return () => {
      cancelled = true;
    };
  }, [ready, record.step]);

  const step = record.step;
  const progressValue = ((step + 1) / STEPS.length) * 100;

  function update(partial: Partial<AssessmentRecord>) {
    setError("");
    setRecord((current) => ({ ...current, ...partial }));
  }

  function validate(): string | null {
    if (step === 0) {
      for (const question of PROFILE_QUESTIONS) {
        if (!record.profile[question.id]?.trim()) {
          return "Please answer each question about your business.";
        }
      }
    }

    if (step >= 1 && step <= 3) {
      const unanswered = QUESTION_GROUPS[step - 1].some(
        (question) => !record.likert[question.id]
      );
      if (unanswered) {
        return "Please rate every statement before continuing.";
      }
    }

    if (step === 4) {
      if (record.risks.length === 0) {
        return "Please select at least one option for what your business has experienced.";
      }
      for (const question of IMPACT_QUESTIONS) {
        if (!record.impact[question.id]) {
          return "Please answer each business-impact question.";
        }
      }
    }

    if (step === 5) {
      const { firstName, lastName, businessName, email, schedule } =
        record.contact;
      if (!firstName.trim() || !lastName.trim() || !businessName.trim()) {
        return "Please enter your name and business name.";
      }
      if (!isValidEmail(email)) {
        return "Please enter a valid work email address.";
      }
      if (!schedule) {
        return "Please tell us whether you would like to discuss your results.";
      }
    }

    return null;
  }

  async function next() {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }

    if (step < STEPS.length - 1) {
      update({ step: step + 1 });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    const completed: AssessmentRecord = {
      ...record,
      completedAt: new Date().toISOString(),
    };
    saveResults(completed);
    clearProgress();

    let limited = rateLimited;
    if (!limited) {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contact: completed.contact,
            profile: completed.profile,
            likert: completed.likert,
            risks: completed.risks,
            impact: completed.impact,
            outcomes: completed.outcomes,
            outcomeOther: completed.outcomeOther,
            timeline: completed.timeline,
            completedAt: completed.completedAt,
          }),
        });
        const data = await response.json().catch(() => null);
        if (isAssessmentRateLimitedResponse(response.status, data)) {
          limited = true;
          setRateLimited(true);
        }
      } catch {
        // Results still display from local storage if email delivery fails.
      }
    }

    router.push(limited ? "/assessment/results?limited=1" : "/assessment/results");
  }

  function back() {
    if (step === 0) return;
    update({ step: step - 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleRisk(id: string, exclusive?: boolean) {
    const selected = new Set(record.risks);
    if (exclusive) {
      update({ risks: selected.has(id) ? [] : [id] });
      return;
    }
    selected.delete("none");
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    update({ risks: Array.from(selected) });
  }

  const groupedQuestions = useMemo(() => {
    if (step < 1 || step > 3) return [];
    const ids = new Set(QUESTION_GROUPS[step - 1].map((question) => question.id));
    return CATEGORIES.filter((category) =>
      category.questionIds.some((id) => ids.has(id))
    ).map((category) => ({
      ...category,
      questions: SCORED_QUESTIONS.filter(
        (question) => question.categoryId === category.id && ids.has(question.id)
      ),
    }));
  }, [step]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted-foreground">
        Loading the assessment…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-sm font-medium text-sage">
        Step {step + 1} of {STEPS.length}
      </p>
      <h1 className="mt-2 font-heading text-2xl font-bold text-forest sm:text-3xl">
        {STEPS[step]}
      </h1>
      <Progress value={progressValue} className="mt-4" />

      <div className="mt-8 space-y-8">
        {step === 0 && (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              These questions help us place your results in the context of your
              business.
            </p>
            {PROFILE_QUESTIONS.map((question) => (
              <Field key={question.id} label={question.label}>
                {question.type === "text" ? (
                  <Input
                    className="h-11"
                    value={record.profile[question.id] ?? ""}
                    onChange={(event) =>
                      update({
                        profile: {
                          ...record.profile,
                          [question.id]: event.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  <select
                    className="h-11 w-full rounded-lg border border-input bg-white px-3 text-sm"
                    value={record.profile[question.id] ?? ""}
                    onChange={(event) =>
                      update({
                        profile: {
                          ...record.profile,
                          [question.id]: event.target.value,
                        },
                      })
                    }
                  >
                    <option value="">Select an option</option>
                    {question.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            ))}
          </div>
        )}

        {step >= 1 && step <= 3 && (
          <div className="space-y-8">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>How to answer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Consider how your business operates today—not how you intend
                    for it to operate.
                  </p>
                  <p>
                    Rate each statement from strongly disagree to strongly agree.
                    Choose Unsure if you do not have enough information.
                  </p>
                </CardContent>
              </Card>
            )}
            {groupedQuestions.map((category) => (
              <section key={category.id} className="space-y-4">
                <h2 className="font-heading text-lg font-semibold text-forest">
                  {category.name}
                </h2>
                {category.questions.map((question) => (
                  <Card key={question.id}>
                    <CardContent className="pt-1">
                      <p className="font-medium leading-relaxed">
                        {question.text}
                      </p>
                      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {LIKERT_OPTIONS.map((option) => {
                          const selected =
                            record.likert[question.id] === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                update({
                                  likert: {
                                    ...record.likert,
                                    [question.id]: option.value as LikertValue,
                                  },
                                })
                              }
                              className={cn(
                                "rounded-lg border px-3 py-3 text-left text-sm transition",
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-white hover:border-sage"
                              )}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div>
              <p className="mb-4 font-medium">
                During the past 12 months, which of the following has your
                business experienced? Select all that apply.
              </p>
              <div className="space-y-3">
                {RISK_OPTIONS.map((option) => {
                  const checked = record.risks.includes(option.id);
                  return (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-3"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() =>
                          toggleRisk(option.id, option.exclusive)
                        }
                        className="mt-0.5"
                      />
                      <span className="text-sm leading-relaxed">
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Please do not submit employee names, medical information or
                confidential details through this assessment.
              </p>
            </div>
            {IMPACT_QUESTIONS.map((question) => (
              <Field key={question.id} label={question.label}>
                <select
                  className="h-11 w-full rounded-lg border border-input bg-white px-3 text-sm"
                  value={record.impact[question.id] ?? ""}
                  onChange={(event) =>
                    update({
                      impact: {
                        ...record.impact,
                        [question.id]: event.target.value,
                      },
                    })
                  }
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <p className="text-muted-foreground">
              Enter your details to view your People &amp; Growth Readiness
              Score, results in six key areas, and recommended next steps.
            </p>
            {rateLimited && <AssessmentRateLimitNotice />}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name">
                <Input
                  className="h-11"
                  value={record.contact.firstName}
                  onChange={(event) =>
                    update({
                      contact: {
                        ...record.contact,
                        firstName: event.target.value,
                      },
                    })
                  }
                />
              </Field>
              <Field label="Last name">
                <Input
                  className="h-11"
                  value={record.contact.lastName}
                  onChange={(event) =>
                    update({
                      contact: {
                        ...record.contact,
                        lastName: event.target.value,
                      },
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Business name">
              <Input
                className="h-11"
                value={record.contact.businessName}
                onChange={(event) =>
                  update({
                    contact: {
                      ...record.contact,
                      businessName: event.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Work email">
              <Input
                type="email"
                className="h-11"
                value={record.contact.email}
                onChange={(event) =>
                  update({
                    contact: { ...record.contact, email: event.target.value },
                  })
                }
              />
            </Field>
            <Field label="Phone number (optional)">
              <Input
                type="tel"
                className="h-11"
                value={record.contact.phone}
                onChange={(event) =>
                  update({
                    contact: { ...record.contact, phone: event.target.value },
                  })
                }
              />
            </Field>
            <Field label="Is there a specific HR issue on your mind right now? (optional)">
              <Textarea
                value={record.contact.issue}
                onChange={(event) =>
                  update({
                    contact: { ...record.contact, issue: event.target.value },
                  })
                }
              />
            </Field>
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">
                Would you like to discuss your results?
              </legend>
              {SCHEDULE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-3 text-sm"
                >
                  <input
                    type="radio"
                    name="schedule"
                    className="mt-1"
                    checked={record.contact.schedule === option.value}
                    onChange={() =>
                      update({
                        contact: { ...record.contact, schedule: option.value },
                      })
                    }
                  />
                  {option.label}
                </label>
              ))}
            </fieldset>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-6 rounded-lg border border-destructive/30 bg-white px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          variant="outline"
          className="h-11 px-5"
          onClick={back}
          disabled={step === 0 || submitting}
        >
          Back
        </Button>
        <Button
          className="h-11 px-5 font-semibold"
          onClick={next}
          disabled={submitting}
        >
          {step === STEPS.length - 1
            ? submitting
              ? "Preparing your results…"
              : "View my results"
            : "Continue"}
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm leading-snug">{label}</Label>
      {children}
    </div>
  );
}
