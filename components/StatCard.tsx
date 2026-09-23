import type { ComponentType } from "react";

type StatCardProps = {
  label: string;
  value: number;
  unit: string;
  icon: ComponentType<{ className?: string }>;
};

export default function StatCard({ label, value, unit, icon: Icon }: StatCardProps) {
  return (
    <div className="stat-tile">
      <span className="icon-chip h-10 w-10">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-strong">{label}</p>
        <p className="font-display text-3xl font-bold tabular-nums text-white">
          {value}
          <span className="ml-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            {unit}
          </span>
        </p>
      </div>
    </div>
  );
}
