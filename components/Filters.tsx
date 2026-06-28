"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";

type FilterState = {
  search: string;
  gender: string;
  minAge: string;
  maxAge: string;
};

type FiltersProps = {
  onChange: (filters: FilterState) => void;
};

export function Filters({ onChange }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [open, setOpen] = useState(false);

  const filterState = useMemo(
    () => ({
      search: deferredSearch,
      gender,
      minAge,
      maxAge,
    }),
    [deferredSearch, gender, maxAge, minAge],
  );

  useEffect(() => {
    onChange(filterState);
  }, [filterState, onChange]);

  return (
    <FadeIn>
      <div
        className="rounded-[2.2rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,241,229,0.9))] p-2 md:p-5 shadow-soft"
        onClick={() => {
          if (!open) setOpen(true);
        }}
      >
        <div
          className="mb-2 flex h-12 items-center justify-between gap-2 pl-2 md:pl-0 cursor-pointer md:cursor-default"
          role="button"
          tabIndex={0}
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
        >
          <p className="text-sm uppercase tracking-[0.24em] text-coral pl-1">
            Filters
          </p>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-coral/15 bg-coral/10 px-3 py-1 text-xs font-semibold text-coral md:block">
              Search by name, age, and gender
            </div>
            <div className="md:hidden inline-flex items-center justify-center rounded-md bg-coral/10 p-1 text-coral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-4 w-4 transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${open ? "block" : "hidden"} md:block`}>
          <div className="grid gap-4 md:grid-cols-4">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name"
              className="rounded-2xl border border-amber-100 bg-white/90 px-4 py-3 text-sm outline-none ring-0 transition focus:border-coral"
            />
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className="rounded-2xl border border-amber-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-coral"
            >
              <option value="">All genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="number"
              value={minAge}
              onChange={(event) => setMinAge(event.target.value)}
              placeholder="Min age"
              className="rounded-2xl border border-amber-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-coral"
            />
            <input
              type="number"
              value={maxAge}
              onChange={(event) => setMaxAge(event.target.value)}
              placeholder="Max age"
              className="rounded-2xl border border-amber-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-coral"
            />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
