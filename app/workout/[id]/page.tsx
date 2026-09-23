import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Flame, Layers, Repeat, Star, Target, Wrench } from "lucide-react";

import WorkoutCard from "@/components/WorkoutCard";
import WorkoutDetailActions from "@/components/WorkoutDetailActions";
import { getWorkoutById, getWorkouts } from "@/lib/api";
import { titleCase } from "@/lib/format";

type WorkoutPageProps = {
  params: Promise<{ id: string }>;
};

/** Every lift in the library is pre-rendered and refreshed every 5 minutes. */
export async function generateStaticParams() {
  const workouts = await getWorkouts();

  return workouts.map((workout) => ({ id: String(workout.id) }));
}

export async function generateMetadata({ params }: WorkoutPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) return { title: "Workout not found" };

  return {
    title: workout.name,
    description: workout.description,
    openGraph: { title: workout.name, description: workout.description, images: [workout.image] },
  };
}

export default async function WorkoutDetailsPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const [workout, library] = await Promise.all([getWorkoutById(id), getWorkouts()]);

  if (!workout) notFound();

  const specs = [
    { label: "Equipment", value: workout.equipment, icon: Wrench },
    { label: "Difficulty", value: workout.difficulty, icon: Target },
    { label: "Sets", value: `${workout.sets}`, icon: Layers },
    { label: "Reps", value: workout.reps, icon: Repeat },
    { label: "Duration", value: `${workout.duration} min`, icon: Clock },
    { label: "Calories", value: `${workout.caloriesBurned} kcal`, icon: Flame },
    { label: "Rating", value: workout.rating.toFixed(1), icon: Star },
  ];

  const sameMuscles = library.filter(
    (item) =>
      item.id !== workout.id &&
      item.muscleGroups.some((group) => workout.muscleGroups.includes(group)),
  );
  const related = (sameMuscles.length > 0 ? sameMuscles : library.filter((item) => item.id !== workout.id)).slice(
    0,
    3,
  );

  return (
    <div className="shell py-8 sm:py-12">
      <Link
        href="/#library"
        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-muted transition hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to library
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-panel lg:aspect-square">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4">
              <span className="tag-pill border-accent/40 bg-ink/80 text-accent">
                {workout.difficulty}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-bold text-white">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {workout.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow">Exercise Detail</p>
          <h1 className="display-title mt-4 text-4xl sm:text-5xl">{workout.name}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="tag-pill border-accent/35 normal-case tracking-[0.08em] text-accent"
              >
                {titleCase(group)}
              </span>
            ))}
          </div>

          <div className="card-panel mt-7 p-4 sm:p-5">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-strong">
              Key Specs
            </h2>
            <dl className="mt-3">
              {specs.map((spec) => (
                <div key={spec.label} className="spec-row">
                  <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-strong">
                    <spec.icon className="h-3.5 w-3.5 text-accent" />
                    {spec.label}
                  </dt>
                  <dd className="text-sm font-semibold text-white">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-7">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-strong">
              Instructions
            </h2>
            <ol className="mt-4 flex flex-col gap-3">
              {workout.instructions.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="icon-chip h-7 w-7 text-[11px] font-bold">{index + 1}</span>
                  <p className="pt-1 text-sm leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <WorkoutDetailActions workout={workout} />
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-14 border-t border-line pt-10">
          <h2 className="display-title text-2xl sm:text-3xl">More like this</h2>
          <p className="mt-2 text-sm text-muted">
            Lifts that share a muscle group with {workout.name}.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <WorkoutCard key={item.id} workout={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
