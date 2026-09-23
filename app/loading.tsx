import { Loader2 } from "lucide-react";

export default function HomeLoading() {
  return (
    <div className="shell py-20">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-strong">
          Loading workouts…
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="skeleton-block h-72 w-full" />
        ))}
      </div>
    </div>
  );
}
