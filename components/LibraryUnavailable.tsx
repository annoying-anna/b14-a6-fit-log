import Link from "next/link";
import { RefreshCw } from "lucide-react";

/** Shown when the FitLog API cannot be reached. */
export default function LibraryUnavailable({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="card-panel mt-6 flex flex-col items-center gap-3 px-6 py-14 text-center">
      <h3 className="display-title text-2xl">Library unavailable</h3>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        We could not reach the FitLog API just now. Check your connection and try again to pull all
        twelve lifts.
      </p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="btn btn-accent mt-1">
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      ) : (
        <Link href="/" className="btn btn-accent mt-1">
          <RefreshCw className="h-4 w-4" />
          Reload library
        </Link>
      )}
    </div>
  );
}
