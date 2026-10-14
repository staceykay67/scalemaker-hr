import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GATE_ERRORS = {
  invalid: "That code isn’t recognized.",
  limited: "Too many attempts. Please wait a few minutes and try again.",
  unavailable: "The access check is unavailable right now. Please try again later.",
} as const;

export function hrisGateErrorMessage(code: string | undefined): string | null {
  if (!code) return null;
  if (code in GATE_ERRORS) return GATE_ERRORS[code as keyof typeof GATE_ERRORS];
  return null;
}

export function HrisGateForm({ errorCode }: { errorCode?: string }) {
  const message = hrisGateErrorMessage(errorCode);

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-heading text-2xl font-bold text-forest">Enter the access code</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        This page stays private until the access code is entered.
      </p>
      <form method="post" action="/api/hris/unlock" className="mt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="hris-code" className="text-sm font-medium">
            Access code
          </label>
          <input
            id="hris-code"
            name="code"
            type="text"
            required
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            className="h-11 w-full rounded-lg border border-input bg-white px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
        {message && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-white px-4 py-3 text-sm text-destructive"
          >
            {message}
          </p>
        )}
        <button
          type="submit"
          className={cn(buttonVariants(), "h-11 px-5 font-semibold")}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
