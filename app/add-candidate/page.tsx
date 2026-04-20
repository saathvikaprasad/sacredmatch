import Link from "next/link";

import { createCandidateAction } from "@/app/actions/candidates";
import { CandidateForm } from "@/components/forms/CandidateForm";
import { requireEditableUser } from "@/utils/auth";

export default async function AddCandidatePage() {
  await requireEditableUser();

  async function createCandidateFormAction(formData: FormData): Promise<void> {
    "use server";
    await createCandidateAction(formData);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/dashboard" className="text-sm font-medium text-coral">
        Back to dashboard
      </Link>
      <div className="mt-6 space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-coral">
          New Candidate
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl text-ink">
          Add a candidate profile
        </h1>
      </div>
      <div className="mt-8">
        <CandidateForm action={createCandidateFormAction} mode="create" />
      </div>
    </main>
  );
}
