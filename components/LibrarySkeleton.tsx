import { Loader2 } from "lucide-react";

/**
 * Shimmering placeholder grid shown while the workout library is loading.
 * Shared by app/loading.tsx and by the library section's client-side fetch.
 */
export default function LibrarySkeleton({
  label,
  count = 6,
}: {
  label?: string;
  count?: number;
}) {
  return (
    <div>
      {label ? (
        <div className="mb-6 flex items-center justify-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-strong">
            {label}
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="skeleton-block h-72 w-full" />
        ))}
      </div>
    </div>
  );
}
