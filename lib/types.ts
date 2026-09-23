/** Shape returned by https://api.abcz.workers.dev/api/fitlog */
export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

/** Sort keys offered by the library "Sort By" dropdown. */
export type SortKey = "duration" | "calories" | "rating";

/** Live totals shown on the My Plan metric cards. */
export type PlanTotals = {
  exercises: number;
  minutes: number;
  calories: number;
};

export type PlanTab = "plan" | "saved";
