"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import LibrarySkeleton from "@/components/LibrarySkeleton";
import LibraryUnavailable from "@/components/LibraryUnavailable";
import SearchInput from "@/components/SearchInput";
import SortDropdown from "@/components/SortDropdown";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/lib/api";
import { matchesQuery, sortWorkouts } from "@/lib/sort";
import type { SortKey, Workout } from "@/lib/types";

type LibrarySectionProps = {
  /** Workouts already rendered on the server (empty for a fully static host). */
  workouts: Workout[];
  /** Fetch the library in the browser — used by the static GitHub Pages build. */
  autoFetch?: boolean;
};

export default function LibrarySection({
  workouts: initialWorkouts,
  autoFetch = false,
}: LibrarySectionProps) {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [isLoading, setIsLoading] = useState(autoFetch && initialWorkouts.length === 0);
  const [hasFailed, setHasFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  // Only runs when the server could not provide the data (static export).
  useEffect(() => {
    if (!isLoading) return;

    let isMounted = true;

    getWorkouts({ fresh: true }).then((list) => {
      if (!isMounted) return;
      setWorkouts(list);
      setHasFailed(list.length === 0);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [isLoading]);

  const visibleWorkouts = useMemo(
    () => sortWorkouts(workouts.filter((workout) => matchesQuery(workout, query)), sortKey),
    [workouts, query, sortKey],
  );

  return (
    <section id="library" className="shell scroll-mt-20 py-12 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Workout Library</p>
          <h2 className="display-title mt-3 text-3xl sm:text-4xl">The Library</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {!isLoading ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-strong">
            Showing {visibleWorkouts.length} of {workouts.length} lifts
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={query}
          onChange={setQuery}
          label="Search the workout library"
          placeholder="Search by name, tag or equipment"
        />
        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      {isLoading ? (
        <div className="mt-6">
          <LibrarySkeleton label="Loading workouts…" />
        </div>
      ) : hasFailed ? (
        <LibraryUnavailable
          onRetry={() => {
            setHasFailed(false);
            setIsLoading(true);
          }}
        />
      ) : visibleWorkouts.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="card-panel mt-6 flex flex-col items-center gap-3 px-6 py-14 text-center">
          <SearchX className="h-6 w-6 text-accent" />
          <h3 className="display-title text-2xl">No lifts match that search</h3>
          <p className="max-w-sm text-sm text-muted">
            Try another muscle group such as chest, legs or core.
          </p>
          <button type="button" onClick={() => setQuery("")} className="btn btn-outline mt-1">
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
