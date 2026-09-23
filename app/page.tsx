import Link from "next/link";

import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import LibraryUnavailable from "@/components/LibraryUnavailable";
import { getWorkouts } from "@/lib/api";

/**
 * The standard build server-renders the library (and app/loading.tsx covers the
 * wait). The fully static GitHub Pages preview renders the hero plus a loading
 * skeleton instead and lets the browser fetch the twelve lifts.
 */
const fetchLibraryInBrowser = process.env.NEXT_STATIC_EXPORT === "1";

export default async function HomePage() {
  const workouts = fetchLibraryInBrowser ? [] : await getWorkouts({ fresh: true });

  return (
    <>
      <Hero />

      {fetchLibraryInBrowser || workouts.length > 0 ? (
        <LibrarySection workouts={workouts} autoFetch={fetchLibraryInBrowser} />
      ) : (
        <section id="library" className="shell scroll-mt-20 py-14">
          <LibraryUnavailable />
        </section>
      )}

      <section className="shell pb-14">
        <div className="card-panel flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="display-title text-2xl">Ready to train?</h2>
            <p className="mt-1 text-sm text-muted">
              Lock up to five lifts into today&apos;s plan, then tick them off as you go.
            </p>
          </div>
          <Link href="/my-plan" className="btn btn-accent">
            Open my plan
          </Link>
        </div>
      </section>
    </>
  );
}
