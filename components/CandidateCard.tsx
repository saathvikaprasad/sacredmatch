import Link from "next/link";

import { StaggerItem } from "@/components/motion/StaggerGrid";
import type { Candidate } from "@/lib/types";
import { getInitial } from "@/lib/utils";

type CandidateCardProps = {
  candidate: Candidate;
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <StaggerItem>
      <Link
        href={`/candidate/${candidate.id}`}
        className="lotus-glow group relative flex min-h-[148px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(251,244,231,0.96))] p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-[0_24px_48px_rgba(16,42,67,0.12)]"
      >
        <div className="flex items-center gap-4">
          {candidate.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={candidate.image_url}
              alt={candidate.full_name}
              className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-md"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#f4b8a1,#d86c5b)] text-2xl font-semibold text-white shadow-md">
              {getInitial(candidate.full_name)}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-xl font-semibold text-ink">
              {candidate.full_name}
            </p>
            <p className="mt-1 text-sm text-slate">
              {candidate.gender ? `${candidate.gender} · ` : ""}
              {candidate.language || "Language not specified"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end border-t border-amber-100 pt-4 text-sm">
          <span className="font-medium text-coral">View profile</span>
        </div>
      </Link>
    </StaggerItem>
  );
}
