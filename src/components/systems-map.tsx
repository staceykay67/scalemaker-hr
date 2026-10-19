"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ADMIN_OPTIONS,
  BACKUP_OPTIONS,
  DONT_KNOW,
  FRUSTRATION_OPTIONS,
  HIRE_PLACE_OPTIONS,
  I9_OPTIONS,
  OTHER_TOOL,
  RENEWAL_EXTRA,
  RENEWAL_MONTHS,
  RENEWAL_ROWS,
  ROW_END_CHIPS,
  SHARING_OPTIONS,
  SHEET_TRACKS,
  SPEND_OPTIONS,
  SYSTEMS_CATEGORIES,
  systemsIntro,
  systemsQuestions,
  usesSpreadsheets,
  type RenewalRowId,
  type SystemsAnswers,
  type SystemsCategoryId,
} from "@/lib/systems-data";
import { cn } from "@/lib/utils";

function toggleMulti(list: string[], chip: string, max?: number): string[] {
  if (chip === DONT_KNOW) return list.includes(DONT_KNOW) ? [] : [DONT_KNOW];
  const withoutDontKnow = list.filter((item) => item !== DONT_KNOW);
  if (withoutDontKnow.includes(chip)) return withoutDontKnow.filter((item) => item !== chip);
  if (max && withoutDontKnow.length >= max) return withoutDontKnow;
  return [...withoutDontKnow, chip];
}

function Chip({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-left text-sm transition",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-white hover:border-sage"
      )}
    >
      {children}
    </button>
  );
}

function Question({
  prompt,
  helper,
  children,
}: {
  prompt: string;
  helper?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium leading-relaxed">{prompt}</legend>
      {helper ? <p className="text-sm text-muted-foreground">{helper}</p> : null}
      {children}
    </fieldset>
  );
}

export function SystemsMap({
  answers,
  onChange,
  onSkip,
  onSubmit,
  submitting,
  error,
}: {
  answers: SystemsAnswers;
  onChange: (next: SystemsAnswers) => void;
  onSkip: () => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string;
}) {
  function setTools(id: SystemsCategoryId, chip: string) {
    onChange({
      ...answers,
      tools: { ...answers.tools, [id]: toggleMulti(answers.tools[id], chip) },
    });
  }

  function setRenewal(id: RenewalRowId, chip: string) {
    onChange({
      ...answers,
      renewals: {
        ...answers.renewals,
        [id]: answers.renewals[id] === chip ? "" : chip,
      },
    });
  }

  return (
    <section className="mt-8 rounded-xl border bg-white p-5" aria-labelledby="map-hr-tools">
      <h2 id="map-hr-tools" className="font-heading text-xl font-semibold text-forest">
        {systemsIntro.heading}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>{systemsIntro.intro}</p>
        <p>{systemsIntro.optional}</p>
        <p>{systemsIntro.privacy}</p>
        <p>{systemsIntro.helper}</p>
      </div>

      <div className="mt-6 space-y-8">
        <Question prompt={systemsQuestions.tools.prompt} helper={systemsQuestions.tools.helper}>
          <div className="space-y-5">
            {SYSTEMS_CATEGORIES.map((category) => {
              const selected = answers.tools[category.id];
              return (
                <div key={category.id}>
                  <p className="text-sm font-medium text-foreground">{category.label}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.chips.map((chip) => (
                      <Chip
                        key={chip.label}
                        selected={selected.includes(chip.label)}
                        onClick={() => setTools(category.id, chip.label)}
                      >
                        {chip.label}
                      </Chip>
                    ))}
                    {ROW_END_CHIPS.map((chip) => (
                      <Chip
                        key={chip}
                        selected={selected.includes(chip)}
                        onClick={() => setTools(category.id, chip)}
                      >
                        {chip}
                      </Chip>
                    ))}
                  </div>
                  {selected.includes(OTHER_TOOL) && (
                    <label className="mt-3 block space-y-2 text-sm font-medium">
                      Other tool
                      <Input
                        value={answers.toolsOther[category.id] ?? ""}
                        onChange={(event) =>
                          onChange({
                            ...answers,
                            toolsOther: {
                              ...answers.toolsOther,
                              [category.id]: event.target.value.slice(0, 80),
                            },
                          })
                        }
                        placeholder="Type the tool name"
                        className="h-11 font-normal"
                        maxLength={80}
                        autoComplete="off"
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </div>
        </Question>

        {usesSpreadsheets(answers) && (
          <Question prompt={systemsQuestions.sheets.prompt}>
            <div className="flex flex-wrap gap-2">
              {SHEET_TRACKS.map((chip) => (
                <Chip
                  key={chip}
                  selected={answers.sheetTracks.includes(chip)}
                  onClick={() =>
                    onChange({
                      ...answers,
                      sheetTracks: toggleMulti(answers.sheetTracks, chip),
                    })
                  }
                >
                  {chip}
                </Chip>
              ))}
            </div>
          </Question>
        )}

        <Question prompt={systemsQuestions.spend.prompt} helper={systemsQuestions.spend.helper}>
          <div className="flex flex-wrap gap-2">
            {SPEND_OPTIONS.map((chip) => (
              <Chip
                key={chip}
                selected={answers.monthlySpend === chip}
                onClick={() =>
                  onChange({ ...answers, monthlySpend: answers.monthlySpend === chip ? "" : chip })
                }
              >
                {chip}
              </Chip>
            ))}
          </div>
        </Question>

        <Question prompt={systemsQuestions.admin.prompt}>
          <div className="flex flex-wrap gap-2">
            {ADMIN_OPTIONS.map((chip) => (
              <Chip
                key={chip}
                selected={answers.adminWho === chip}
                onClick={() =>
                  onChange({ ...answers, adminWho: answers.adminWho === chip ? "" : chip })
                }
              >
                {chip}
              </Chip>
            ))}
          </div>
        </Question>

        <Question prompt={systemsQuestions.backup.prompt}>
          <div className="flex flex-wrap gap-2">
            {BACKUP_OPTIONS.map((chip) => (
              <Chip
                key={chip}
                selected={answers.backup === chip}
                onClick={() => onChange({ ...answers, backup: answers.backup === chip ? "" : chip })}
              >
                {chip}
              </Chip>
            ))}
          </div>
        </Question>

        <Question
          prompt={systemsQuestions.frustrations.prompt}
          helper={systemsQuestions.frustrations.helper}
        >
          <div className="flex flex-wrap gap-2">
            {FRUSTRATION_OPTIONS.map((chip) => (
              <Chip
                key={chip}
                selected={answers.frustrations.includes(chip)}
                onClick={() =>
                  onChange({
                    ...answers,
                    frustrations: toggleMulti(answers.frustrations, chip, 3),
                  })
                }
              >
                {chip}
              </Chip>
            ))}
          </div>
        </Question>

        <Question prompt={systemsQuestions.hirePlaces.prompt}>
          <div className="flex flex-wrap gap-2">
            {HIRE_PLACE_OPTIONS.map((chip) => (
              <Chip
                key={chip}
                selected={answers.hirePlaces === chip}
                onClick={() =>
                  onChange({
                    ...answers,
                    hirePlaces: answers.hirePlaces === chip ? "" : chip,
                  })
                }
              >
                {chip}
              </Chip>
            ))}
          </div>
        </Question>

        <Question prompt={systemsQuestions.sharing.prompt}>
          <div className="flex flex-wrap gap-2">
            {SHARING_OPTIONS.map(
              (chip) => (
                <Chip
                  key={chip}
                  selected={answers.sharing === chip}
                  onClick={() =>
                    onChange({ ...answers, sharing: answers.sharing === chip ? "" : chip })
                  }
                >
                  {chip}
                </Chip>
              )
            )}
          </div>
        </Question>

        <Question prompt={systemsQuestions.i9.prompt} helper={systemsQuestions.i9.helper}>
          <div className="flex flex-wrap gap-2">
            {I9_OPTIONS.map((chip) => (
              <Chip
                key={chip}
                selected={answers.i9 === chip}
                onClick={() => onChange({ ...answers, i9: answers.i9 === chip ? "" : chip })}
              >
                {chip}
              </Chip>
            ))}
          </div>
        </Question>

        <Question prompt={systemsQuestions.renewals.prompt} helper={systemsQuestions.renewals.helper}>
          <div className="space-y-4">
            {RENEWAL_ROWS.map((row) => (
              <div key={row.id}>
                <p className="text-sm font-medium text-foreground">{row.label}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[...RENEWAL_MONTHS, ...RENEWAL_EXTRA].map((chip) => (
                    <Chip
                      key={chip}
                      selected={answers.renewals[row.id] === chip}
                      onClick={() => setRenewal(row.id, chip)}
                    >
                      {chip}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Question>
      </div>

      {error ? (
        <p role="alert" className="mt-6 rounded-lg border border-destructive/30 bg-white px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="outline" className="h-11 px-5" onClick={onSkip} disabled={submitting}>
          {systemsIntro.skip}
        </Button>
        <Button type="button" className="h-11 px-5 font-semibold" onClick={onSubmit} disabled={submitting}>
          {submitting ? "Saving…" : systemsIntro.continue}
        </Button>
      </div>
    </section>
  );
}
