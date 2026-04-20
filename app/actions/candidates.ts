"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";
import {
  getSetupGuidanceMessage,
  isMissingSchemaError,
} from "@/lib/supabase/setup";
import type { CandidatePayload } from "@/lib/types";
import { requireAllowedUser, requireEditableUser } from "@/utils/auth";

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readNullableString(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value || null;
}

function parseAdditionalFields(raw: string) {
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    return Object.fromEntries(
      Object.entries(parsed).filter(([key]) => key.trim()),
    );
  } catch {
    return {};
  }
}

async function uploadImage(file: File) {
  const extension = file.name.split(".").pop() || "jpg";
  const path = `candidate-images/${randomUUID()}.${extension}`;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage
    .from("candidate-images")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/jpeg",
    });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("candidate-images").getPublicUrl(path);

  return publicUrl;
}

async function buildCandidatePayload(
  formData: FormData,
): Promise<CandidatePayload> {
  const image = formData.get("image");
  const imageUrl =
    image instanceof File && image.size > 0
      ? await uploadImage(image)
      : readString(formData, "existingImageUrl") || null;

  return {
    full_name: readString(formData, "full_name"),
    age: Number(readString(formData, "age")),
    date_of_birth: readString(formData, "date_of_birth"),
    star: readNullableString(formData, "star"),
    father_name: readString(formData, "father_name"),
    mother_name: readNullableString(formData, "mother_name"),
    email: readNullableString(formData, "email"),
    mobile_country_code: readNullableString(formData, "mobile_country_code"),
    mobile_number: readNullableString(formData, "mobile_number"),
    gender: readNullableString(formData, "gender"),
    language: readNullableString(formData, "language"),
    additional_fields: parseAdditionalFields(
      readString(formData, "additional_fields"),
    ),
    image_url: imageUrl,
  };
}

function validateCandidatePayload(payload: CandidatePayload) {
  if (
    !payload.full_name ||
    !payload.age ||
    !payload.date_of_birth ||
    !payload.father_name
  ) {
    return "Please fill in all required fields.";
  }

  return null;
}

export async function createCandidateAction(formData: FormData) {
  const { user } = await requireEditableUser();
  const supabase = await createSupabaseServerClient();
  const payload = await buildCandidatePayload(formData);
  const errorMessage = validateCandidatePayload(payload);

  if (errorMessage) {
    return { error: errorMessage };
  }

  const { error } = await supabase.from("candidates").insert({
    ...payload,
    created_by: user.email,
  });

  if (error) {
    if (isMissingSchemaError(error)) {
      return { error: getSetupGuidanceMessage() };
    }
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard?success=Candidate added");
}

export async function updateCandidateAction(formData: FormData) {
  const { user } = await requireEditableUser();
  const supabase = await createSupabaseServerClient();
  const candidateId = readString(formData, "candidate_id");
  const payload = await buildCandidatePayload(formData);
  const errorMessage = validateCandidatePayload(payload);

  if (!candidateId) {
    return { error: "Candidate ID is missing." };
  }

  if (errorMessage) {
    return { error: errorMessage };
  }

  const { data: candidate, error: candidateError } = await supabase
    .from("candidates")
    .select("id, created_by")
    .eq("id", candidateId)
    .maybeSingle<{ id: string; created_by: string }>();

  if (candidateError) {
    if (isMissingSchemaError(candidateError)) {
      return { error: getSetupGuidanceMessage() };
    }
    return { error: candidateError.message };
  }

  if (!candidate || candidate.created_by !== user.email) {
    return { error: "You can only edit candidates you created." };
  }

  const { error } = await supabase
    .from("candidates")
    .update(payload)
    .eq("id", candidateId);

  if (error) {
    if (isMissingSchemaError(error)) {
      return { error: getSetupGuidanceMessage() };
    }
    return { error: error.message };
  }

  revalidatePath(`/candidate/${candidateId}`);
  revalidatePath("/dashboard");
  redirect(`/candidate/${candidateId}?success=Candidate updated`);
}
export async function getDashboardCandidates() {
  await requireAllowedUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) {
    if (isMissingSchemaError(error)) {
      throw new Error(getSetupGuidanceMessage());
    }
    throw new Error(error.message);
  }

  return data ?? [];
}
