"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clock, Dumbbell, Flame, Loader2, SearchX } from "lucide-react";

import EmptyState from "@/components/EmptyState";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import SearchInput from "@/components/SearchInput";
import SortDropdown from "@/components/SortDropdown";
import StatCard from "@/components/StatCard";
import { usePlan } from "@/context/PlanContext";
import { getWorkouts } from "@/lib/api";
import { PLAN_LIMIT } from "@/lib/constants";
import { matchesQuery, sortWorkouts } from "@/lib/sort";
import type { PlanTab, SortKey, Workout } from "@/lib/types";

const TABS: { key: PlanTab; label: string }[] = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

export default function MyPlanView() {
  const {
    plan,
    saved,
    doneIds,
    isReady,
    planCount,
    savedCount,
    totals,
    addToPlan,
    removeFromPlan,
    toggleSaved,
    toggleDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<PlanTab>("plan");
  const [library, setLibrary] = useState<Workout[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  // Pull the freshest workout data so the cards always match the library.
  useEffect(() => {
    let isMounted = true;

    getWorkouts().then((workouts) => {
      if (!isMounted) return;
      setLibrary(workouts);
      setIsFetching(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const libraryById = useMemo(
    () => new Map(library.map((workout) => [workout.id, workout])),
    [library],
  );

  const visibleWorkouts = useMemo(() => {
    const items = activeTab === "plan" ? plan : saved;

    return sortWorkouts(
      items
        .map((item) => libraryById.get(item.id) ?? item)
        .filter((item) => matchesQuery(item, query)),
      sortKey,
    );
  }, [activeTab, plan, saved, libraryById, query, sortKey]);

  const isLoading = !isReady || isFetching;
  const activeCount = activeTab === "plan" ? planCount : savedCount;

  return (
    <div className="shell py-10 sm:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">FitLog Workspace</p>
          <h1 className="display-title mt-4 text-4xl sm:text-5xl">My Plan</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="tag-pill">
            {planCount}/{PLAN_LIMIT} in today&apos;s plan
          </span>
          <Link href="/" className="btn btn-outline">
            Browse library
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Exercises" value={totals.exercises} unit="lifts" icon={Dumbbell} />
        <StatCard label="Minutes" value={totals.minutes} unit="min" icon={Clock} />
        <StatCard label="Calories" value={totals.calories} unit="kcal" icon={Flame} />
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Plan views"
          className="inline-flex w-full rounded-full border border-line bg-panel p-1 sm:w-auto"
        >
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            const count = tab.key === "plan" ? planCount : savedCount;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition sm:flex-none ${
                  isActive ? "bg-accent text-ink" : "text-muted hover:text-white"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 tabular-nums ${
                    isActive ? "bg-ink/15" : "bg-ink-soft text-muted-strong"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search my plan"
            placeholder="Search by name or tag"
          />
          <SortDropdown value={sortKey} onChange={setSortKey} />
        </div>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <LoadingPanel />
        ) : visibleWorkouts.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {visibleWorkouts.map((workout) => (
              <li key={workout.id}>
                <PlanWorkoutCard
                  workout={workout}
                  variant={activeTab}
                  isDone={doneIds.includes(workout.id)}
                  onAddToPlan={() => addToPlan(workout)}
                  onToggleDone={() => toggleDone(workout)}
                  onRemove={() =>
                    activeTab === "plan" ? removeFromPlan(workout) : toggleSaved(workout)
                  }
                />
              </li>
            ))}
          </ul>
        ) : query.trim() ? (
          <div className="card-panel flex flex-col items-center gap-3 px-6 py-14 text-center">
            <SearchX className="h-6 w-6 text-accent" />
            <h3 className="display-title text-2xl">No matches in this list</h3>
            <p className="max-w-sm text-sm text-muted">
              Nothing in {activeTab === "plan" ? "today's plan" : "your saved lifts"} matches
              &ldquo;{query}&rdquo;.
            </p>
            <button type="button" onClick={() => setQuery("")} className="btn btn-outline mt-1">
              Clear search
            </button>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {activeTab === "plan" && planCount >= PLAN_LIMIT ? (
        <p className="mt-6 rounded-xl border border-accent/40 bg-accent/5 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          Today&apos;s plan is full ({PLAN_LIMIT}/{PLAN_LIMIT}) — finish or remove a lift to load more.
        </p>
      ) : null}

      {activeCount > 0 && activeTab === "saved" ? (
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-strong">
          Saved lifts stay here until you add them to today&apos;s plan.
        </p>
      ) : null}
    </div>
  );
}

function LoadingPanel() {
  return (
    <div className="card-panel flex flex-col items-center gap-4 px-6 py-14">
      <Loader2 className="h-7 w-7 animate-spin text-accent" />
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-strong">
        Loading workouts…
      </p>
      <div className="mt-2 grid w-full gap-3 sm:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="skeleton-block h-24 w-full" />
        ))}
      </div>
    </div>
  );
}
