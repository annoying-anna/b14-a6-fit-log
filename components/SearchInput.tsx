"use client";

import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  className?: string;
};

export default function SearchInput({
  value,
  onChange,
  label,
  placeholder,
  className = "",
}: SearchInputProps) {
  return (
    <label className={`relative block w-full sm:w-64 ${className}`}>
      <span className="sr-only">{label}</span>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-strong"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="field pl-10"
      />
    </label>
  );
}
