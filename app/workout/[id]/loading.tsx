import { Loader2 } from "lucide-react";

export default function WorkoutLoading() {
  return (
    <div className="shell py-12">
      <div className="flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-accent" />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-strong">
          Loading workout…
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div className="skeleton-block aspect-[4/3] w-full rounded-3xl lg:aspect-square" />
        <div className="flex flex-col gap-4">
          <div className="skeleton-block h-4 w-32" />
          <div className="skeleton-block h-12 w-3/4" />
          <div className="skeleton-block h-20 w-full" />
          <div className="skeleton-block h-72 w-full" />
        </div>
      </div>
    </div>
  );
}
