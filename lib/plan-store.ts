import { PLAN_LIMIT, PLAN_STORAGE_KEY } from "@/lib/constants";
import type { Workout } from "@/lib/types";

/** Everything the plan/saved UI needs, kept outside of React. */
export type PlanState = {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  /** true once localStorage has been read in the browser */
  isHydrated: boolean;
};

/** Outcome of a store action — the provider turns this into user feedback. */
export type PlanActionResult =
  | "added"
  | "already-in-plan"
  | "plan-full"
  | "removed"
  | "saved"
  | "unsaved"
  | "marked-done"
  | "marked-undone";

/** Also used as the server snapshot so markup matches during hydration. */
const EMPTY_STATE: PlanState = { plan: [], saved: [], doneIds: [], isHydrated: false };

function readStoredState(): PlanState {
  if (typeof window === "undefined") return EMPTY_STATE;

  try {
    const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return { ...EMPTY_STATE, isHydrated: true };

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...EMPTY_STATE, isHydrated: true };

    const { plan, saved, doneIds } = parsed as Partial<Omit<PlanState, "isHydrated">>;

    return {
      plan: Array.isArray(plan) ? plan.slice(0, PLAN_LIMIT) : [],
      saved: Array.isArray(saved) ? saved : [],
      doneIds: Array.isArray(doneIds) ? doneIds : [],
      isHydrated: true,
    };
  } catch (error) {
    console.error("FitLog: could not read the stored plan", error);
    return { ...EMPTY_STATE, isHydrated: true };
  }
}

// Client modules are also evaluated on the server, so this stays guarded.
let state: PlanState = readStoredState();
const listeners = new Set<() => void>();

function persist(next: PlanState) {
  try {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.error("FitLog: could not persist the plan", error);
  }
}

function commit(next: Pick<PlanState, "plan" | "saved" | "doneIds">) {
  state = { ...next, isHydrated: true };
  persist(state);
  listeners.forEach((listener) => listener());
}

/* --------------------------- useSyncExternalStore API --------------------------- */

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): PlanState {
  return state;
}

export function getServerSnapshot(): PlanState {
  return EMPTY_STATE;
}

/* --------------------------------- actions --------------------------------- */

export function addWorkoutToPlan(workout: Workout): PlanActionResult {
  if (state.plan.some((item) => item.id === workout.id)) return "already-in-plan";
  if (state.plan.length >= PLAN_LIMIT) return "plan-full";

  commit({ plan: [...state.plan, workout], saved: state.saved, doneIds: state.doneIds });
  return "added";
}

export function removeWorkoutFromPlan(workout: Workout): PlanActionResult {
  commit({
    plan: state.plan.filter((item) => item.id !== workout.id),
    saved: state.saved,
    doneIds: state.doneIds.filter((id) => id !== workout.id),
  });
  return "removed";
}

export function toggleWorkoutSaved(workout: Workout): PlanActionResult {
  const isSaved = state.saved.some((item) => item.id === workout.id);

  commit({
    plan: state.plan,
    saved: isSaved
      ? state.saved.filter((item) => item.id !== workout.id)
      : [...state.saved, workout],
    doneIds: state.doneIds,
  });

  return isSaved ? "unsaved" : "saved";
}

export function toggleWorkoutDone(workout: Workout): PlanActionResult {
  const isDone = state.doneIds.includes(workout.id);

  commit({
    plan: state.plan,
    saved: state.saved,
    doneIds: isDone
      ? state.doneIds.filter((id) => id !== workout.id)
      : [...state.doneIds, workout.id],
  });

  return isDone ? "marked-undone" : "marked-done";
}
