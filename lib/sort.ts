import type { SortKey, Workout } from "@/lib/types";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

const SORT_ACCESSORS: Record<SortKey, (workout: Workout) => number> = {
  duration: (workout) => workout.duration,
  calories: (workout) => workout.caloriesBurned,
  rating: (workout) => workout.rating,
};

const DEFAULT_SORT_KEY: SortKey = "duration";

/** Returns a new list sorted by the requested key (highest value first). */
export function sortWorkouts(workouts: Workout[], key: SortKey): Workout[] {
  const readValue = SORT_ACCESSORS[key] ?? SORT_ACCESSORS[DEFAULT_SORT_KEY];

  return [...workouts].sort(
    (first, second) =>
      readValue(second) - readValue(first) || first.name.localeCompare(second.name),
  );
}

/** Free-text search across the workout name, equipment and muscle groups. */
export function matchesQuery(workout: Workout, query: string): boolean {
  const needle = query.trim().toLowerCase();

  if (!needle) return true;

  return (
    workout.name.toLowerCase().includes(needle) ||
    workout.equipment.toLowerCase().includes(needle) ||
    workout.muscleGroups.some((group) => group.toLowerCase().includes(needle))
  );
}
