import Link from "next/link";

import { FadeIn } from "@/components/motion/FadeIn";
import { DevotionalOrnament } from "@/components/ui/DevotionalOrnament";
import { HaloPanel } from "@/components/ui/HaloPanel";
import { SacredBackdrop } from "@/components/ui/SacredBackdrop";
import { requireAllowedUser } from "@/utils/auth";

export default async function RulesPage() {
  await requireAllowedUser();

  return (
    <SacredBackdrop>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <FadeIn>
          <Link href="/dashboard" className="text-sm font-medium text-coral">
            Back to dashboard
          </Link>
        </FadeIn>

        <FadeIn delay={0.08} y={24}>
          <HaloPanel className="mt-6 rounded-[2.5rem] p-8 md:p-10">
            <DevotionalOrnament className="justify-start" />
            <p className="mt-6 text-sm uppercase tracking-[0.28em] text-coral">
              Rules & Guidelines
            </p>
            <h1 className="mt-3 text-4xl text-ink">Rules & Guidelines</h1>
            <p className="mt-6 text-base leading-8 text-slate">
              To maintain the quality, authenticity, and usefulness of this
              directory, we request all users to follow these guidelines:
            </p>

            <div className="mt-8 space-y-8 text-base leading-8 text-slate">
              <section>
                <h2 className="text-2xl text-ink">
                  1. Required Profile Information
                </h2>
                <p className="mt-3">The following fields are mandatory:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Full Name</li>
                  <li>Date of Birth</li>
                  <li>Place of Birth</li>
                  <li>Time of Birth</li>
                  <li>Email Address</li>
                </ul>
                <p className="mt-4">
                  All other profile fields are optional but are encouraged, as
                  they help families make informed decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl text-ink">2. Eligibility</h2>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>
                    This directory is intended strictly for practicing ISKCON
                    devotees.
                  </li>
                  <li>
                    It is not intended for well-wishers, Bhakti Vriksha
                    members, congregational visitors, or those who are not
                    seriously practicing Krishna consciousness.
                  </li>
                  <li>
                    We request that only sincere devotees seeking marriage
                    within the devotee community register on this platform.
                  </li>
                </ul>
              </section>

              <p>
                We request all members to respect the privacy of the information
                shared on this platform and use it solely for the purpose of
                facilitating suitable matrimonial alliances within the devotee
                community.
              </p>

              <p className="font-semibold text-ink">Hare Krishna.</p>
            </div>
          </HaloPanel>
        </FadeIn>
      </main>
    </SacredBackdrop>
  );
}
