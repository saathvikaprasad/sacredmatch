"use client";

import { useState } from "react";

import { SubmitButton } from "@/components/ui/SubmitButton";
import { COUNTRY_CODES } from "@/lib/country-codes";
import type { Candidate } from "@/lib/types";
import { buildAdditionalFields } from "@/lib/utils";

type CandidateFormProps = {
  action: (formData: FormData) => Promise<void>;
  candidate?: Candidate;
  mode: "create" | "edit";
};

export function CandidateForm({ action, candidate, mode }: CandidateFormProps) {
  const [fields, setFields] = useState(
    candidate?.additional_fields
      ? Object.entries(candidate.additional_fields).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }]
  );

  return (
    <form action={action} className="space-y-6 rounded-[2rem] border border-black/5 bg-white p-6 shadow-soft">
      {candidate ? <input type="hidden" name="candidate_id" value={candidate.id} /> : null}
      {candidate?.image_url ? (
        <input type="hidden" name="existingImageUrl" value={candidate.image_url} />
      ) : null}
      <input
        type="hidden"
        name="additional_fields"
        value={JSON.stringify(buildAdditionalFields(fields))}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate">
          <span>Full Name *</span>
          <input
            name="full_name"
            required
            defaultValue={candidate?.full_name ?? ""}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
          />
        </label>
        <label className="space-y-2 text-sm text-slate">
          <span>Age *</span>
          <input
            type="number"
            name="age"
            required
            defaultValue={candidate?.age ?? ""}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
          />
        </label>
        <label className="space-y-2 text-sm text-slate">
          <span>Date of Birth *</span>
          <input
            type="date"
            name="date_of_birth"
            required
            defaultValue={candidate?.date_of_birth ?? ""}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
          />
        </label>
        <label className="space-y-2 text-sm text-slate">
          <span>Star *</span>
          <input
            name="star"
            required
            defaultValue={candidate?.star ?? ""}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
          />
        </label>
        <label className="space-y-2 text-sm text-slate">
          <span>Father Name *</span>
          <input
            name="father_name"
            required
            defaultValue={candidate?.father_name ?? ""}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
          />
        </label>
        <label className="space-y-2 text-sm text-slate">
          <span>Mother Name</span>
          <input
            name="mother_name"
            defaultValue={candidate?.mother_name ?? ""}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
          />
        </label>
        <label className="space-y-2 text-sm text-slate">
          <span>Email</span>
          <input
            type="email"
            name="email"
            defaultValue={candidate?.email ?? ""}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
          />
        </label>
        <div className="space-y-2 text-sm text-slate">
          <span>Mobile Number</span>
          <div className="grid gap-3 md:grid-cols-[220px_1fr]">
            <select
              name="mobile_country_code"
              defaultValue={candidate?.mobile_country_code ?? ""}
              className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
            >
              <option value="">Select code</option>
              {COUNTRY_CODES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="mobile_number"
              defaultValue={candidate?.mobile_number ?? ""}
              placeholder="Enter mobile number"
              className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
            />
          </div>
        </div>
        <label className="space-y-2 text-sm text-slate">
          <span>Gender</span>
          <select
            name="gender"
            defaultValue={candidate?.gender ?? ""}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate">
          <span>Language</span>
          <input
            name="language"
            defaultValue={candidate?.language ?? ""}
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-ink outline-none transition focus:border-coral"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm text-slate">
        <span>Profile Image</span>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full rounded-2xl border border-dashed border-black/10 px-4 py-3 text-ink"
        />
      </label>

      <div className="space-y-3 rounded-3xl border border-black/5 bg-sand/60 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-ink">Additional Fields</h3>
            <p className="text-sm text-slate">Add flexible key-value details for a candidate profile.</p>
          </div>
          <button
            type="button"
            onClick={() => setFields((current) => [...current, { key: "", value: "" }])}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-ink transition hover:border-coral hover:text-coral"
          >
            Add More Fields
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={`${field.key}-${index}`} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <input
                value={field.key}
                onChange={(event) => {
                  const value = event.target.value;
                  setFields((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, key: value } : item
                    )
                  );
                }}
                placeholder="Field name"
                className="rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-coral"
              />
              <input
                value={field.value}
                onChange={(event) => {
                  const value = event.target.value;
                  setFields((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, value } : item
                    )
                  );
                }}
                placeholder="Field value"
                className="rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-coral"
              />
              <button
                type="button"
                onClick={() =>
                  setFields((current) =>
                    current.length === 1
                      ? [{ key: "", value: "" }]
                      : current.filter((_, itemIndex) => itemIndex !== index)
                  )
                }
                className="rounded-2xl border border-black/10 px-4 py-3 text-sm text-slate transition hover:border-coral hover:text-coral"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <SubmitButton
        label={mode === "create" ? "Save Candidate" : "Update Candidate"}
        pendingLabel={mode === "create" ? "Saving..." : "Updating..."}
      />
    </form>
  );
}
