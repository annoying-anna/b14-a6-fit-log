import Image from "next/image";
import Link from "next/link";
import { ArrowDown, BicepsFlexed, Flame, Timer } from "lucide-react";

const HERO_STATS = [
  { icon: BicepsFlexed, label: "12 lifts", value: "Every major muscle group" },
  { icon: Timer, label: "5 lift cap", value: "A plan you can actually finish" },
  { icon: Flame, label: "Live totals", value: "Minutes and calories add up" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-[-15%] h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]"
      />

      <div className="shell relative grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-accent" />
            Workout Library
          </p>

          <h1 className="display-title mt-5 text-[38px] sm:text-6xl lg:text-[70px]">
            Train with intent.
            <br />
            <span className="text-accent">Log every set.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#library" className="btn btn-accent">
              <ArrowDown className="h-4 w-4" />
              Browse workouts
            </a>
            <Link href="/my-plan" className="btn btn-outline">
              View today&apos;s plan
            </Link>
          </div>

          <dl className="mt-10 grid gap-3 sm:grid-cols-3">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-panel/70 px-4 py-3">
                <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  <stat.icon className="h-3.5 w-3.5" />
                  {stat.label}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-strong">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[430px]">
          <div
            aria-hidden
            className="absolute inset-x-12 bottom-8 h-40 rounded-full bg-accent/20 blur-3xl"
          />
          <Image
            src="/fitlog-banner.png"
            alt="Anatomical illustration of a lifter training on a cable machine"
            width={334}
            height={334}
            priority
            className="relative z-10 w-full drop-shadow-[0_28px_50px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      <div className="border-t border-line bg-panel/50">
        <div className="shell flex flex-wrap items-center gap-x-8 gap-y-2 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-muted-strong">
          <span className="text-accent">Pick a lift</span>
          <span>Lock it into today&apos;s plan</span>
          <span>Save the rest for later</span>
          <span>Mark it done</span>
        </div>
      </div>
    </section>
  );
}
