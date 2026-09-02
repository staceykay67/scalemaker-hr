const FORMSPREE_BASE = "https://formspree.io/f/";

export type FormKind = "contact" | "assessment";

function firstDefined(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => typeof value === "string" && value.trim().length > 0);
}

export function resolveFormspreeEndpoint(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `${FORMSPREE_BASE}${trimmed.replace(/^\/+/, "")}`;
}

export function getFormspreeEndpoint(kind: FormKind): string | null {
  const shared = firstDefined(
    process.env.FORMSPREE_FORM_ID,
    process.env.NEXT_PUBLIC_FORMSPREE_FORM,
    process.env.FORMSPREE_FORM
  );

  if (kind === "contact") {
    return resolveFormspreeEndpoint(
      firstDefined(
        process.env.FORMSPREE_CONTACT_ID,
        process.env.NEXT_PUBLIC_FORMSPREE_CONTACT,
        process.env.FORMSPREE_CONTACT,
        shared
      )
    );
  }

  return resolveFormspreeEndpoint(
    firstDefined(
      process.env.FORMSPREE_ASSESSMENT_ID,
      process.env.NEXT_PUBLIC_FORMSPREE_ASSESSMENT,
      process.env.FORMSPREE_ASSESSMENT,
      shared
    )
  );
}

export async function submitToFormspree(
  endpoint: string,
  payload: Record<string, string>
): Promise<{ ok: boolean; status: number; error?: string }> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return { ok: true, status: response.status };
  }

  let error = `Formspree responded with ${response.status}`;
  try {
    const body = (await response.json()) as { error?: string };
    if (body?.error) error = body.error;
  } catch {
    // Keep the status-based message when the response is not JSON.
  }

  return { ok: false, status: response.status, error };
}
