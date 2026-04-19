import Link from "next/link";

import { getDashboardCandidates } from "@/app/actions/candidates";
import { CandidateGrid } from "@/components/CandidateGrid";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { DevotionalOrnament } from "@/components/ui/DevotionalOrnament";
import { HaloPanel } from "@/components/ui/HaloPanel";
import { SacredBackdrop } from "@/components/ui/SacredBackdrop";
import { userLogoutAction } from "@/app/actions/auth";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { requireAllowedUser } from "@/utils/auth";

export default async function DashboardPage() {
  const [{ allowedUser, user }, candidates] = await Promise.all([
    requireAllowedUser(),
    getDashboardCandidates(),
  ]);

  return (
    <SacredBackdrop>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <FadeIn y={26}>
          <HaloPanel className="lotus-glow temple-arch rounded-[2.8rem] px-8 pb-8 pt-14 md:px-10">
            <div className="animate-pulse-gold absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(255,218,174,0.5),transparent_72%)]" />
            <div className="flex flex-col gap-6 items-center">
              <div className="flex flex-col items-center text-center">
                <DevotionalOrnament className="justify-center" />
                <p className="mt-5 text-sm uppercase tracking-[0.3em] text-coral">
                  Dashboard
                </p>
                <h1 className="mt-3 text-4xl text-ink lg:text-5xl">
                  Find your Sacred Match
                </h1>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                  <p className="text-sm text-slate">
                    Signed in as{" "}
                    <span className="font-semibold text-ink">
                      saathvika.nt@gmail.com
                    </span>
                  </p>

                  <div className="flex items-center gap-3">
                    {allowedUser.role === "edit" ? (
                      <Link
                        href="/add-candidate"
                        className="rounded-full bg-[linear-gradient(135deg,#d86c5b,#b55345)] px-3 py-1.5 text-xs md:px-5 md:py-3 md:text-sm font-semibold text-white shadow-[0_12px_24px_rgba(216,108,91,0.25)]"
                      >
                        Add Candidate
                      </Link>
                    ) : null}

                    <form action={userLogoutAction}>
                      <SubmitButton
                        label="Logout"
                        pendingLabel="Logging out..."
                        className="border border-ink bg-ink text-white hover:bg-ink"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </HaloPanel>
        </FadeIn>

        <RevealOnScroll className="mt-8">
          <CandidateGrid candidates={candidates} />
        </RevealOnScroll>
      </main>
    </SacredBackdrop>
  );
}
