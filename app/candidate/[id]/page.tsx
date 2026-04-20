import Link from "next/link";
import { notFound } from "next/navigation";

import { FadeIn } from "@/components/motion/FadeIn";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { formatDate, getInitial } from "@/lib/utils";
import { getCandidateById } from "@/utils/candidate";
import { requireAllowedUser } from "@/utils/auth";

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user, allowedUser } = await requireAllowedUser();
  const { id } = await params;
  const candidate = await getCandidateById(id);

  if (!candidate) {
    notFound();
  }

  const canEdit =
    allowedUser.role === "edit" && candidate.created_by === user.email;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <FadeIn>
        <Link href="/dashboard" className="text-sm font-medium text-coral">
          Back to dashboard
        </Link>
      </FadeIn>

      <FadeIn delay={0.08} y={24}>
        <section className="mt-6 rounded-[2.5rem] border border-black/5 bg-white/20 backdrop-blur-sm p-6 md:p-8 shadow-soft">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="flex items-center gap-5">
              {candidate.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={candidate.image_url}
                  alt={candidate.full_name}
                  className="h-24 w-24 rounded-full border-2 border-white object-cover shadow-md"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#f4b8a1,#d86c5b)] text-4xl font-semibold text-white shadow-md">
                  {getInitial(candidate.full_name)}
                </div>
              )}
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-coral">
                  Candidate Profile
                </p>
                <h1 className="mt-3 text-4xl text-ink">
                  {candidate.full_name}
                </h1>
                <p className="mt-2 text-slate">
                  Created by {candidate.created_by}
                </p>
              </div>
            </div>

            {canEdit ? (
              <Link
                href={`/candidate/${candidate.id}/edit`}
                className="rounded-full bg-[linear-gradient(135deg,#d86c5b,#b55345)] px-3 py-1.5 text-xs md:px-5 md:py-3 md:text-sm font-semibold text-white shadow-[0_12px_24px_rgba(216,108,91,0.25)]"
              >
                Edit Candidate
              </Link>
            ) : null}
          </div>

          <RevealOnScroll className="mt-10 grid gap-4 md:grid-cols-2">
            <Field label="Age" value={String(candidate.age)} />
            <Field
              label="Date of Birth"
              value={formatDate(candidate.date_of_birth)}
            />
            <Field label="Star" value={candidate.star || "Not provided"} />
            <Field label="Father Name" value={candidate.father_name} />
            <Field
              label="Mother Name"
              value={candidate.mother_name || "Not provided"}
            />
            <Field label="Email" value={candidate.email || "Not provided"} />
            <Field
              label="Mobile Number"
              value={
                candidate.mobile_number
                  ? `${candidate.mobile_country_code ? `${candidate.mobile_country_code} ` : ""}${candidate.mobile_number}`
                  : "Not provided"
              }
            />
            <Field label="Gender" value={candidate.gender || "Not provided"} />
            <Field
              label="Language"
              value={candidate.language || "Not provided"}
            />
            <Field
              label="Created At"
              value={formatDate(candidate.created_at)}
            />
          </RevealOnScroll>

          {candidate.additional_fields &&
          Object.keys(candidate.additional_fields).length > 0 ? (
            <RevealOnScroll
              delay={0.1}
              className="mt-10 rounded-[2rem] border border-amber-100 bg-[linear-gradient(180deg,rgba(255,248,236,0.96),rgba(255,255,255,0.9))] p-6"
            >
              <h2 className="text-xl font-semibold text-ink">
                Additional Information
              </h2>
              <dl className="mt-4 grid gap-4 md:grid-cols-2">
                {Object.entries(candidate.additional_fields).map(
                  ([key, value]) => (
                    <div key={key} className="rounded-2xl bg-white/90 p-4">
                      <dt className="text-sm text-slate">{key}</dt>
                      <dd className="mt-1 text-base font-medium text-ink">
                        {value}
                      </dd>
                    </div>
                  ),
                )}
              </dl>
            </RevealOnScroll>
          ) : null}
        </section>
      </FadeIn>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-amber-100 bg-white/20 backdrop-blur-sm p-4 md:p-5">
      <p className="text-sm uppercase tracking-[0.15em] text-coral/90">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}
