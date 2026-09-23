"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Dumbbell } from "lucide-react";

import PublicImage from "@/components/PublicImage";
import { usePlan } from "@/context/PlanContext";
import { PLAN_LIMIT } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur">
      <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3 lg:flex-nowrap">
        <Link href="/" className="flex items-center gap-2.5" aria-label="FitLog home">
          <PublicImage src="/fitlog-logo.png" alt="" width={28} height={28} eager className="h-7 w-7" />
          <span className="font-display text-xl font-bold uppercase tracking-[0.22em] text-white">
            Fit<span className="text-accent">Log</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="order-3 -mx-4 flex w-full items-center gap-1 overflow-x-auto border-t border-line-soft px-4 pt-2 scrollbar-none lg:order-none lg:mx-0 lg:w-auto lg:border-t-0 lg:px-0 lg:pt-0"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative shrink-0 px-3 py-2 text-[12px] font-bold uppercase tracking-[0.2em] transition ${
                  isActive ? "text-accent" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3 -bottom-[9px] h-0.5 rounded-full bg-accent transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            aria-label={`Today's plan: ${planCount} of ${PLAN_LIMIT} lifts`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-accent-soft"
          >
            <Dumbbell className="h-3.5 w-3.5" />
            Plan
            <span className="rounded-full bg-ink/15 px-1.5 tabular-nums">{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            aria-label={`Saved workouts: ${savedCount}`}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:border-accent hover:text-accent"
          >
            <Bookmark className="h-3.5 w-3.5 text-accent" />
            Saved
            <span className="text-muted tabular-nums">{savedCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
