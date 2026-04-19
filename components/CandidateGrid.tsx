"use client";

import { useMemo, useState } from "react";

import { CandidateCard } from "@/components/CandidateCard";
import { Filters } from "@/components/Filters";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGrid } from "@/components/motion/StaggerGrid";
import type { Candidate } from "@/lib/types";

type CandidateGridProps = {
  candidates: Candidate[];
};

export function CandidateGrid({ candidates }: CandidateGridProps) {
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    language: "",
    minAge: "",
    maxAge: ""
  });

  const languages = useMemo(
    () =>
      Array.from(
        new Set(
          candidates
            .map((candidate) => candidate.language?.trim())
            .filter((language): language is string => Boolean(language))
        )
      ).sort((left, right) => left.localeCompare(right)),
    [candidates]
  );

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch = candidate.full_name
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesGender = filters.gender ? candidate.gender === filters.gender : true;
      const matchesLanguage = filters.language ? candidate.language === filters.language : true;
      const matchesMinAge = filters.minAge ? candidate.age >= Number(filters.minAge) : true;
      const matchesMaxAge = filters.maxAge ? candidate.age <= Number(filters.maxAge) : true;

      return (
        matchesSearch &&
        matchesGender &&
        matchesLanguage &&
        matchesMinAge &&
        matchesMaxAge
      );
    });
  }, [candidates, filters]);

  return (
    <div className="space-y-6">
      <Filters languages={languages} onChange={setFilters} />

      {filteredCandidates.length === 0 ? (
        <FadeIn>
          <div className="rounded-[2rem] border border-dashed border-coral/20 bg-white/70 p-10 text-center text-slate">
            No candidates match the selected filters.
          </div>
        </FadeIn>
      ) : (
        <StaggerGrid className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </StaggerGrid>
      )}
    </div>
  );
}
