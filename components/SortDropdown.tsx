"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { SORT_OPTIONS } from "@/lib/sort";
import type { SortKey } from "@/lib/types";

type SortDropdownProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeOption = SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[0];

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-full sm:w-60">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Sort by, currently ${activeOption.label}`}
        className="field flex items-center justify-between gap-3 text-left"
      >
        <span className="flex items-baseline gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-strong">
            Sort By
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
            {activeOption.label}
          </span>
        </span>
        <ChevronDown
          aria-hidden
          className={`h-4 w-4 shrink-0 text-accent transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Sort workouts by"
          className="absolute right-0 z-40 mt-2 w-full overflow-hidden rounded-xl border border-line bg-panel py-1 shadow-[0_22px_48px_rgba(0,0,0,0.6)]"
        >
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[12px] font-bold uppercase tracking-[0.16em] transition hover:bg-ink-soft ${
                    isSelected ? "text-accent" : "text-muted hover:text-white"
                  }`}
                >
                  {option.label}
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
