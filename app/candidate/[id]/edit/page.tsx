import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updateCandidateAction } from "@/app/actions/candidates";
import { CandidateForm } from "@/components/forms/CandidateForm";
import { getCandidateById } from "@/utils/candidate";
import { requireEditableUser } from "@/utils/auth";

export default async function EditCandidatePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await requireEditableUser();
  const { id } = await params;
  const candidate = await getCandidateById(id);

  if (!candidate) {
    notFound();
  }

  if (candidate.created_by !== user.email) {
    redirect(`/candidate/${candidate.id}`);
  }

  async function updateCandidateFormAction(formData: FormData) {
    "use server";

    await updateCandidateAction(formData);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href={`/candidate/${candidate.id}`} className="text-sm font-medium text-coral">
        Back to candidate
      </Link>
      <div className="mt-6 space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-coral">Edit Candidate</p>
        <h1 className="font-[var(--font-heading)] text-4xl text-ink">{candidate.full_name}</h1>
      </div>
      <div className="mt-8">
        <CandidateForm action={updateCandidateFormAction} candidate={candidate} mode="edit" />
      </div>
    </main>
  );
}
