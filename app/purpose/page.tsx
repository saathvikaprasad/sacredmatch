import Link from "next/link";

import { FadeIn } from "@/components/motion/FadeIn";
import { DevotionalOrnament } from "@/components/ui/DevotionalOrnament";
import { HaloPanel } from "@/components/ui/HaloPanel";
import { SacredBackdrop } from "@/components/ui/SacredBackdrop";
import { requireAllowedUser } from "@/utils/auth";

export default async function PurposePage() {
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
              Purpose
            </p>
            <h1 className="mt-3 text-4xl text-ink">Our objectives are:</h1>

            <ul className="mt-8 space-y-5 text-base leading-8 text-slate">
              <li>
                To help Krishna Katha Desh devotees become acquainted with the
                eligible sons and daughters of devotee families.
              </li>
              <li>
                To facilitate matrimonial alliances among families who share
                similar devotional values, culture, and commitment to Krishna
                consciousness.
              </li>
              <li>
                To help parents and families find suitable grooms and brides
                from known devotee families, where family background and
                devotional practices are already familiar.
              </li>
              <li>
                To gradually expand this initiative to include devotee families
                across the Middle East, thereby providing a wider pool of
                suitable matches while maintaining the same standards of privacy
                and authenticity.
              </li>
            </ul>
          </HaloPanel>
        </FadeIn>
      </main>
    </SacredBackdrop>
  );
}
