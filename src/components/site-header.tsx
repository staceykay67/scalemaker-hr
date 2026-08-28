import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center">
          <Image
            src="/logo-horizontal-light.png"
            alt="Scalemaker HR"
            width={280}
            height={56}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden h-10 px-3 sm:inline-flex"
            )}
          >
            Home
          </Link>
          <Link
            href="/assessment"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-10 px-4 text-sm font-semibold"
            )}
          >
            Begin the assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}
