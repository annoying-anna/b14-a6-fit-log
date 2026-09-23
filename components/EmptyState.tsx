import Link from "next/link";
import { Dumbbell, MoveRight } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="card-panel flex flex-col items-center gap-4 px-6 py-16 text-center">
      <span className="icon-chip h-12 w-12">
        <Dumbbell className="h-5 w-5" />
      </span>
      <h3 className="display-title text-2xl sm:text-3xl">Nothing here yet</h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link href="/" className="btn btn-accent mt-1">
        <MoveRight className="h-4 w-4" />
        Go to workouts
      </Link>
    </div>
  );
}
