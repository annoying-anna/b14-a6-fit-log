import Link from "next/link";

import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import { getWorkouts } from "@/lib/api";

/**
 * The GitHub Pages preview build is fully static and pre-renders this page.
 * Every other build fetches without caching, which keeps the route dynamic and
 * makes the "Loading workouts…" state real for every visitor.
 */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";

export default async function HomePage() {
  const workouts = await getWorkouts({ fresh: !isStaticExport });

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
