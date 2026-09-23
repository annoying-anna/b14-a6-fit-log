"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Flame, Plus, Star, X } from "lucide-react";

import type { PlanTab, Workout } from "@/lib/types";

type PlanWorkoutCardProps = {
  workout: Workout;
  variant: PlanTab;
  isDone: boolean;
  onAddToPlan: () => void;
  onToggleDone: () => void;
  onRemove: () => void;
};

export default function PlanWorkoutCard({
  workout,
  variant,
  isDone,
  onAddToPlan,
  onToggleDone,
  onRemove,
}: PlanWorkoutCardProps) {
  return (
    <article
      className={`card-panel flex flex-col gap-4 p-3.5 sm:flex-row sm:items-center sm:gap-5 ${
        isDone ? "border-accent/40 bg-panel/60" : ""
      }`}
    >
      <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-ink-soft sm:h-24 sm:w-24">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, 96px"
          className={`object-cover ${isDone ? "opacity-55" : ""}`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-display text-lg font-semibold uppercase tracking-wide ${
              isDone ? "text-muted line-through" : "text-white"
            }`}
          >
            {workout.name}
          </h3>
          {isDone && (
            <span className="tag-pill border-accent/50 bg-accent/10 text-accent">Done</span>
          )}
        </div>

        <p className="mt-1 text-xs text-muted-strong">{workout.equipment}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
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

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link href={`/workout/${workout.id}`} className="btn btn-ghost">
          View details
        </Link>

        {variant === "plan" ? (
          <button type="button" onClick={onToggleDone} className="btn btn-outline">
            <Check className="h-4 w-4" />
            {isDone ? "Undo" : "Mark as done"}
          </button>
        ) : (
          <button type="button" onClick={onAddToPlan} className="btn btn-outline">
            <Plus className="h-4 w-4" />
            Add to plan
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name} from this list`}
          className="icon-btn hover:border-red-400/60 hover:text-red-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
