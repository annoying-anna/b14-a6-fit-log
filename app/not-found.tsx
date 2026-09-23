import Link from "next/link";
import { MoveLeft } from "lucide-react";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="display-title text-4xl sm:text-6xl">
        Wrong rep,
        <br />
        <span className="text-accent">no such page.</span>
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        The page you tried to load is not part of the FitLog library. Head back to the workout
        list and pick a lift instead.
      </p>
      <Link href="/" className="btn btn-accent mt-2">
        <MoveLeft className="h-4 w-4" />
        Back to workouts
      </Link>
    </section>
  );
}
