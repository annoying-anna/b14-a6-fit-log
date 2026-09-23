/** Base URL of the FitLog API (overridable with NEXT_PUBLIC_FITLOG_API_URL). */
export const FITLOG_API_URL =
  process.env.NEXT_PUBLIC_FITLOG_API_URL ?? "https://api.abcz.workers.dev/api/fitlog";

/** "Cap of five lifts for today. Finish them, then load more." */
export const PLAN_LIMIT = 5;

/** localStorage key that keeps the plan + saved list alive across reloads. */
export const PLAN_STORAGE_KEY = "fitlog:plan";
