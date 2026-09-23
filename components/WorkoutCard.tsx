import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

import type { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group card-panel flex flex-col overflow-hidden transition hover:border-accent/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-soft">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-3 top-3 flex flex-wrap gap-2">
          {workout.muscleGroups.slice(0, 3).map((group) => (
            <span key={group} className="tag-pill bg-ink/80 backdrop-blur">
              {group}
            </span>
          ))}
        </div>

        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {workout.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-white transition group-hover:text-accent">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-muted-strong">{workout.equipment}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line-soft pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-accent" />
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
