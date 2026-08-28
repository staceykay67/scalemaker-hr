"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src="/logo-horizontal-light.png"
            alt="Scalemaker HR"
            width={280}
            height={56}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-10 px-3 text-sm"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            className={cn(
              buttonVariants({ variant: "default" }),
              "ml-2 h-10 px-4 text-sm font-semibold"
            )}
          >
            Begin the assessment
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/assessment"
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-2 h-11 justify-center font-semibold"
              )}
              onClick={() => setOpen(false)}
            >
              Begin the assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
