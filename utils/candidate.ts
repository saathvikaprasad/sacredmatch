import { getSetupGuidanceMessage, isMissingSchemaError } from "@/lib/supabase/setup";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Candidate } from "@/lib/types";

export async function getCandidates() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .order("full_name", { ascending: true })
    .returns<Candidate[]>();

  if (error) {
    if (isMissingSchemaError(error)) {
      throw new Error(getSetupGuidanceMessage());
    }
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getCandidateById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", id)
    .maybeSingle<Candidate>();

  if (error) {
    if (isMissingSchemaError(error)) {
      throw new Error(getSetupGuidanceMessage());
    }
    throw new Error(error.message);
  }

  return data;
}
