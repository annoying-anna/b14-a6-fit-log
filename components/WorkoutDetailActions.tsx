"use client";

import { Bookmark, BookmarkCheck, Check, Plus } from "lucide-react";

import { usePlan } from "@/context/PlanContext";
import { PLAN_LIMIT } from "@/lib/constants";
import type { Workout } from "@/lib/types";

export default function WorkoutDetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, toggleSaved, isInPlan, isSaved, isReady, planCount, isPlanFull } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planIsFull = isPlanFull && !inPlan;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => addToPlan(workout)}
          disabled={!isReady || inPlan || planIsFull}
          className="btn btn-accent w-full sm:w-auto"
        >
          {inPlan ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {inPlan
            ? "Already in today's plan"
            : planIsFull
              ? `Plan full (${PLAN_LIMIT}/${PLAN_LIMIT})`
              : "Add to today's plan"}
        </button>

        <button
          type="button"
          onClick={() => toggleSaved(workout)}
          disabled={!isReady}
          className="btn btn-outline w-full sm:w-auto"
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4 text-accent" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
          {saved ? "Saved for later" : "Save for later"}
        </button>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-strong">
        {planCount}/{PLAN_LIMIT} lifts locked in for today
        {planIsFull ? " — plan is full, finish a lift to load more" : ""}
      </p>
    </div>
  );
}
