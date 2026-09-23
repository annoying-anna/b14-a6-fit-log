"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import toast from "react-hot-toast";

import { PLAN_LIMIT } from "@/lib/constants";
import {
  addWorkoutToPlan,
  getServerSnapshot,
  getSnapshot,
  removeWorkoutFromPlan,
  subscribe,
  toggleWorkoutDone,
  toggleWorkoutSaved,
  type PlanActionResult,
  type PlanState,
} from "@/lib/plan-store";
import type { PlanTotals, Workout } from "@/lib/types";

type PlanContextValue = PlanState & {
  isReady: boolean;
  planCount: number;
  savedCount: number;
  isPlanFull: boolean;
  totals: PlanTotals;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (workout: Workout) => void;
  toggleSaved: (workout: Workout) => void;
  toggleDone: (workout: Workout) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

/** Turns a store result into the toast the user sees. */
function showFeedback(result: PlanActionResult, workout: Workout) {
  switch (result) {
    case "added":
      toast.success(`${workout.name} added to today's plan`);
      break;
    case "already-in-plan":
      toast(`${workout.name} is already in today's plan`, { icon: "ℹ️" });
      break;
    case "plan-full":
      toast.error(`Today's plan is capped at ${PLAN_LIMIT} lifts`);
      break;
    case "removed":
      toast.success(`${workout.name} removed from today's plan`);
      break;
    case "saved":
      toast.success(`${workout.name} saved for later`);
      break;
    case "unsaved":
      toast.success(`${workout.name} removed from saved`);
      break;
    case "marked-done":
      toast.success(`${workout.name} marked as done`);
      break;
    case "marked-undone":
      toast.success(`${workout.name} back on the todo list`);
      break;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore reads the persisted plan without a hydration mismatch:
  // the server snapshot is used for the first render, then the client snapshot
  // (localStorage) takes over on the next pass.
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addToPlan = useCallback((workout: Workout) => {
    showFeedback(addWorkoutToPlan(workout), workout);
  }, []);

  const removeFromPlan = useCallback((workout: Workout) => {
    showFeedback(removeWorkoutFromPlan(workout), workout);
  }, []);

  const toggleSaved = useCallback((workout: Workout) => {
    showFeedback(toggleWorkoutSaved(workout), workout);
  }, []);

  const toggleDone = useCallback((workout: Workout) => {
    showFeedback(toggleWorkoutDone(workout), workout);
  }, []);

  const totals = useMemo<PlanTotals>(
    () =>
      state.plan.reduce<PlanTotals>(
        (accumulator, workout) => ({
          exercises: accumulator.exercises + 1,
          minutes: accumulator.minutes + workout.duration,
          calories: accumulator.calories + workout.caloriesBurned,
        }),
        { exercises: 0, minutes: 0, calories: 0 },
      ),
    [state.plan],
  );

  const value = useMemo<PlanContextValue>(
    () => ({
      ...state,
      isReady: state.isHydrated,
      planCount: state.plan.length,
      savedCount: state.saved.length,
      isPlanFull: state.plan.length >= PLAN_LIMIT,
      totals,
      isInPlan: (id: number) => state.plan.some((item) => item.id === id),
      isSaved: (id: number) => state.saved.some((item) => item.id === id),
      isDone: (id: number) => state.doneIds.includes(id),
      addToPlan,
      removeFromPlan,
      toggleSaved,
      toggleDone,
    }),
    [state, totals, addToPlan, removeFromPlan, toggleSaved, toggleDone],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

/** Access the plan/saved state. Throws when used outside of <PlanProvider>. */
export function usePlan(): PlanContextValue {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside a PlanProvider");
  }

  return context;
}
