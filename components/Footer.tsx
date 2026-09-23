import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="shell flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <Link href="/" className="flex items-center gap-2.5" aria-label="FitLog home">
          <Image src="/fitlog-logo.png" alt="" width={28} height={28} className="h-6 w-6" />
          <span className="font-display text-lg font-bold uppercase tracking-[0.22em] text-white">
            Fit<span className="text-accent">Log</span>
          </span>
        </Link>

        <p className="text-center text-xs leading-relaxed text-muted sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
