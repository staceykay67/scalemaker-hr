import type { SystemsAnswers } from "@/lib/systems-data";
import { scoreSystems, systemsCardModel, type SystemsContext } from "@/lib/systems-score";

export function SystemsScoreCard({
  answers,
  context,
  onEdit,
}: {
  answers: SystemsAnswers;
  context: SystemsContext;
  onEdit: () => void;
}) {
  const card = systemsCardModel(scoreSystems(answers, context));

  return (
    <section className="mt-8 rounded-xl border bg-white p-5" aria-labelledby="systems-score">
      <h2 id="systems-score" className="font-heading text-xl font-semibold text-forest">
        {card.heading}
      </h2>
      {card.suppressed ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.message}</p>
      ) : (
        <>
          <p className="mt-3 font-heading text-5xl font-bold text-forest" data-testid="systems-score-value">
            {card.score}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{card.caption}</p>
          <p className="mt-4 text-sm font-medium text-sage">{card.bandName}</p>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>{card.summary}</p>
            <p>{card.call}</p>
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">{card.weakLead}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
            {card.weakSpots.map((spot) => (
              <li key={spot}>{spot}</li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{card.closing}</p>
      <button
        type="button"
        onClick={onEdit}
        className="mt-4 text-sm font-medium text-forest underline-offset-4 hover:underline"
      >
        Change answers
      </button>
    </section>
  );
}
