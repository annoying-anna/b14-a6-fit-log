"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FitLog render error:", error);
  }, [error]);

  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="display-title text-3xl sm:text-5xl">That set did not land.</h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        An unexpected error stopped FitLog from rendering this page. Your plan and saved lifts
        are stored on this device, so try again.
      </p>
      <button type="button" onClick={reset} className="btn btn-accent mt-2">
        <RotateCcw className="h-4 w-4" />
        Try again
      </button>
    </section>
  );
}
