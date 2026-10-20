import {
  IMPACT_QUESTIONS,
  LIKERT_OPTIONS,
  PROFILE_QUESTIONS,
  RISK_OPTIONS,
  OTHER_OUTCOME,
  SCHEDULE_OPTIONS,
  SCORED_QUESTIONS,
  type LikertValue,
} from "@/lib/assessment-data";
import { contactTopicLabel, hrisInterestLabel } from "@/lib/hris-interest";
import {
  coverageSummary,
  resultCopy,
  scoreAssessment,
  type AssessmentScores,
} from "@/lib/scoring";
import type { SystemsAnswers } from "@/lib/systems-data";
import { formatSystemsLead, systemsContextFromLead } from "@/lib/systems-score";

export type ContactPayloadInput = {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  message: string;
  topic?: string;
};

export type AssessmentLeadInput = {
  contact: {
    firstName: string;
    lastName: string;
    businessName: string;
    email: string;
    phone: string;
    issue: string;
    schedule: string;
  };
  profile?: Record<string, string>;
  likert?: Record<string, string>;
  risks?: string[];
  impact?: Record<string, string>;
  outcomes?: string[];
  outcomeOther?: string;
  timeline?: string;
  hrisInterest?: boolean;
  completedAt?: string | null;
  submissionId?: string | null;
  systems?: SystemsAnswers | null;
};

export function formatWhatMatters(
  outcomes: string[] | undefined,
  outcomeOther?: string
): string {
  const other = compact(outcomeOther);
  return (outcomes ?? [])
    .map(compact)
    .filter(Boolean)
    .map((item) =>
      item === OTHER_OUTCOME && other ? `${OTHER_OUTCOME}: ${other}` : item
    )
    .join("; ");
}

function compact(value: string | undefined): string {
  return (value ?? "").trim();
}

function likertLabel(value: string | undefined): string {
  return LIKERT_OPTIONS.find((option) => option.value === value)?.label ?? compact(value);
}

function scheduleLabel(value: string | undefined): string {
  return (
    SCHEDULE_OPTIONS.find((option) => option.value === value)?.label ?? compact(value)
  );
}

function formatCategoryScore(category: AssessmentScores["categories"][number]): string {
  if (!category.enough || category.displayPercent === null) {
    return `${category.name}: Not enough information`;
  }
  return category.note
    ? `${category.name}: ${category.displayPercent}% (${category.note})`
    : `${category.name}: ${category.displayPercent}%`;
}

function riskLabel(id: string): string {
  return RISK_OPTIONS.find((option) => option.id === id)?.label ?? id;
}

export function buildContactFormspreePayload(
  input: ContactPayloadInput
): Record<string, string> {
  const name = compact(input.name);
  const email = compact(input.email);
  const phone = compact(input.phone);
  const business = compact(input.business);
  const message = compact(input.message);
  const topic = contactTopicLabel(input.topic);

  const payload: Record<string, string> = {
    formType: "contact",
    _subject: topic
      ? `Scalemaker HR website contact — ${topic}`
      : "Scalemaker HR website contact",
    name,
    email,
    message,
  };

  if (topic) payload.topic = topic;

  if (phone) payload.phone = phone;
  if (business) payload.business = business;

  return payload;
}

export function buildAssessmentFormspreePayload(
  input: AssessmentLeadInput
): Record<string, string> {
  const contact = input.contact;
  const name = `${compact(contact.firstName)} ${compact(contact.lastName)}`.trim();
  const email = compact(contact.email);
  const phone = compact(contact.phone);
  const businessName = compact(contact.businessName);
  const issue = compact(contact.issue);
  const schedule = scheduleLabel(contact.schedule);
  const likert = (input.likert ?? {}) as Record<string, LikertValue>;
  const risks = input.risks ?? [];
  const outcomeOther = compact(input.outcomeOther);
  const outcomes = formatWhatMatters(input.outcomes, outcomeOther);
  const timeline = compact(input.timeline);
  const hrisInterest = hrisInterestLabel(input.hrisInterest);
  const scores = scoreAssessment(likert, risks);
  const band = scores.tier ? resultCopy(scores.tier) : null;
  const categoryScores = scores.categories
    .map((category) => formatCategoryScore(category))
    .join("; ");
  const exploring = scores.areasWorthExploring
    .map((category) => formatCategoryScore(category))
    .join("; ");
  const dontKnowList = scores.dontKnowStatements
    .map((item) => `${item.id}: ${item.text}`)
    .join("; ");
  const scoreLine = band
    ? `Score: ${scores.displayPercent}% — ${band.name}`
    : "Score: withheld — not enough information for an overall score";
  const scoreLabel = band ? `${band.name} (${scores.displayPercent}%)` : "not enough information";

  const profileLines = PROFILE_QUESTIONS.map((question) => {
    const answer = compact(input.profile?.[question.id]);
    return answer ? `- ${question.label}: ${answer}` : null;
  }).filter((line): line is string => Boolean(line));

  const riskLines = risks.map((id) => `- ${riskLabel(id)}`);

  const impactLines = IMPACT_QUESTIONS.map((question) => {
    const answer = compact(input.impact?.[question.id]);
    return answer ? `- ${question.label}: ${answer}` : null;
  }).filter((line): line is string => Boolean(line));

  const answerLines = SCORED_QUESTIONS.map((question) => {
    const value = likert[question.id];
    if (!value) return null;
    return `- ${question.text}: ${likertLabel(value)}`;
  }).filter((line): line is string => Boolean(line));

  const submissionId = compact(input.submissionId ?? undefined);
  const systemsFields = input.systems
    ? formatSystemsLead(
        input.systems,
        systemsContextFromLead({
          profile: input.profile,
          likert: input.likert,
          risks,
        })
      )
    : null;
  const systemsSubject = !systemsFields
    ? null
    : systemsFields.systemsScore
      ? `People & Growth Assessment systems map — ${systemsFields.systemsBand} (${systemsFields.systemsScore})`
      : "People & Growth Assessment systems map — needs review call";

  const message = [
    "People & Growth Readiness Assessment lead",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    businessName ? `Business: ${businessName}` : null,
    schedule ? `Wants to discuss results: ${schedule}` : null,
    `HRis interest: ${hrisInterest}`,
    issue ? `Current HR issue: ${issue}` : null,
    outcomes ? `What matters most: ${outcomes}` : null,
    outcomeOther ? `Other outcome detail: ${outcomeOther}` : null,
    timeline ? `Ideal start timeline: ${timeline}` : null,
    input.completedAt ? `Completed at: ${input.completedAt}` : null,
    submissionId ? `Submission: ${submissionId}` : null,
    "",
    scoreLine,
    `Scoring version: ${scores.scoringVersion}`,
    scores.percent === null
      ? "Unrounded score: withheld"
      : `Unrounded score: ${scores.percent}`,
    `Points: ${scores.points} on ${scores.scoredCount} scored statements`,
    `Scored count: ${scores.scoredCount}`,
    `Don't know count: ${scores.dontKnowCount}`,
    `Don't know statements: ${dontKnowList || "none"}`,
    `Limited information: ${scores.limitedInformation ? "Yes" : "No"}`,
    `Coverage: ${coverageSummary(scores)}`,
    `Areas worth exploring: ${exploring || "withheld"}`,
    `Category scores: ${categoryScores || "not yet scored"}`,
    `Critical attention flag: ${scores.criticalAttention ? "Yes" : "No"}`,
    `Business impact flag: ${scores.businessImpact ? "Yes" : "No"}`,
    profileLines.length ? "" : null,
    profileLines.length ? "Business profile:" : null,
    ...profileLines,
    riskLines.length ? "" : null,
    riskLines.length ? "Risks experienced:" : null,
    ...riskLines,
    impactLines.length ? "" : null,
    impactLines.length ? "Business-impact answers:" : null,
    ...impactLines,
    answerLines.length ? "" : null,
    answerLines.length ? "Key scored answers:" : null,
    ...answerLines,
    systemsFields ? "" : null,
    systemsFields ? systemsFields.systemsSummary : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const readinessSubject =
    outcomes || timeline
      ? `People & Growth Assessment priorities — ${scoreLabel}`
      : `People & Growth Assessment — ${scoreLabel}`;

  const payload: Record<string, string> = {
    formType: "assessment",
    _subject:
      systemsSubject && (outcomes || timeline)
        ? systemsSubject.replace("systems map", "priorities + systems map")
        : systemsSubject || readinessSubject,
    name,
    firstName: compact(contact.firstName),
    lastName: compact(contact.lastName),
    email,
    businessName,
    issue,
    schedule,
    outcomes,
    outcomeOther,
    timeline,
    hrisInterest,
    scoringVersion: scores.scoringVersion,
    scoredCount: String(scores.scoredCount),
    dontKnowCount: String(scores.dontKnowCount),
    dontKnowList: dontKnowList || "none",
    limitedInformation: scores.limitedInformation ? "Yes" : "No",
    coverage: coverageSummary(scores),
    areasWorthExploring: exploring || "withheld",
    scorePercent: scores.displayPercent === null ? "withheld" : String(scores.displayPercent),
    scoreUnrounded: scores.percent === null ? "withheld" : String(scores.percent),
    scoreBand: band?.name ?? "withheld",
    categoryScores: categoryScores || "not yet scored",
    criticalAttention: scores.criticalAttention ? "Yes" : "No",
    businessImpact: scores.businessImpact ? "Yes" : "No",
    message,
  };

  if (phone) payload.phone = phone;
  if (submissionId) payload.submissionId = submissionId;
  if (systemsFields) {
    if (systemsFields.systemsScore) payload.systemsScore = systemsFields.systemsScore;
    if (systemsFields.systemsBand) payload.systemsBand = systemsFields.systemsBand;
    payload.systemsRecommendation = systemsFields.systemsRecommendation;
    payload.systemsRenewal = systemsFields.systemsRenewal;
    if (systemsFields.systemsDiscovery) payload.systemsDiscovery = systemsFields.systemsDiscovery;
  }

  return payload;
}
