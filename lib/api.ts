import { FITLOG_API_URL } from "@/lib/constants";
import type { Workout } from "@/lib/types";

/** How long a cached API response stays fresh (seconds). */
const REVALIDATE_SECONDS = 300;

/**
 * Next.js tells callers "this route cannot be rendered statically" by throwing an
 * error with this digest. It is a rendering signal, not a failure, so it must be
 * re-thrown instead of being swallowed by the resilience below.
 */
function isDynamicUsageSignal(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    (error as { digest?: unknown }).digest === "DYNAMIC_SERVER_USAGE"
  );
}

type FetchOptions = {
  /** Skip the data cache and always hit the API (used by the home page). */
  fresh?: boolean;
};

/**
 * Fetches the whole FitLog library.
 * Never throws: an unreachable API resolves to an empty list so the UI can
 * render a friendly fallback instead of a crashed page.
 */
export async function getWorkouts({ fresh = false }: FetchOptions = {}): Promise<Workout[]> {
  try {
    const response = await fetch(
      FITLOG_API_URL,
      fresh ? { cache: "no-store" } : { next: { revalidate: REVALIDATE_SECONDS } },
    );

    if (!response.ok) return [];

    const data: unknown = await response.json();

    return Array.isArray(data) ? (data as Workout[]) : [];
  } catch (error) {
    if (isDynamicUsageSignal(error)) throw error;

    console.error("FitLog: failed to load the workout library", error);
    return [];
  }
}

/**
 * Fetches a single workout by id.
 * Resolves to null for invalid ids (the API answers with 404) and for network
 * problems, which lets the details page call notFound().
 */
export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const response = await fetch(`${FITLOG_API_URL}/${id}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;

    const data: unknown = await response.json();

    if (!data || typeof data !== "object" || Array.isArray(data)) return null;

    return data as Workout;
  } catch (error) {
    if (isDynamicUsageSignal(error)) throw error;

    console.error(`FitLog: failed to load workout ${id}`, error);
    return null;
  }
}
