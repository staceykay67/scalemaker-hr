import Link from "next/link";
import {
  LEGAL_BANNER_BODY,
  LEGAL_BANNER_TITLE,
  type LegalPageCopy,
} from "@/lib/legal-copy";

function LinkedText({ text }: { text: string }) {
  const parts = text.split(/(Privacy Policy)/g);
  return (
    <>
      {parts.map((part, index) =>
        part === "Privacy Policy" ? (
          <Link
            key={`${part}-${index}`}
            href="/privacy"
            className="text-forest underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        )
      )}
    </>
  );
}

export function LegalDocument({ page }: { page: LegalPageCopy }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-sage">{page.eyebrow}</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-forest sm:text-4xl">
        {page.title}
      </h1>
      <div className="mt-6 rounded-xl border border-sage/40 bg-sage/10 px-4 py-3 text-sm leading-relaxed text-forest">
        <p className="font-semibold">{LEGAL_BANNER_TITLE}</p>
        <p className="mt-1">{LEGAL_BANNER_BODY}</p>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Effective date:</span> {page.effective}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Who we are:</span> {page.who}
      </p>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
        {page.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {page.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-forest">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-relaxed text-muted-foreground">
              <LinkedText text={paragraph} />
            </p>
          ))}
          {section.list ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              {section.list.map((item) => (
                <li key={`${item.lead ?? ""}-${item.text}`}>
                  {item.lead ? <span className="font-semibold text-foreground">{item.lead} </span> : null}
                  <LinkedText text={item.text} />
                </li>
              ))}
            </ul>
          ) : null}
          {section.after?.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-bold text-forest">{page.closingHeading}</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Email{" "}
          <a
            href={`mailto:${page.email}`}
            className="text-forest underline underline-offset-4"
          >
            {page.email}
          </a>
        </p>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{page.companyLine}</p>
      </section>
    </article>
  );
}
