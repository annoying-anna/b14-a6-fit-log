import Link from "next/link";

import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import { getWorkouts } from "@/lib/api";

// The library always comes from the API, so this route renders on demand.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const workouts = await getWorkouts({ fresh: true });

  return (
    <>
      <Hero />

      {workouts.length > 0 ? (
        <LibrarySection workouts={workouts} />
      ) : (
        <section id="library" className="shell scroll-mt-20 py-14">
          <div className="card-panel flex flex-col items-center gap-3 px-6 py-14 text-center">
            <h2 className="display-title text-3xl">Library unavailable</h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              We could not reach the FitLog API just now. Check your connection and reload the
              page to pull all twelve lifts again.
            </p>
            <Link href="/" className="btn btn-accent mt-1">
              Reload library
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
