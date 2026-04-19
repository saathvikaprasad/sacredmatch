import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type SupabaseSetupStatus = {
  allowedUsersTable: boolean;
  candidatesTable: boolean;
  candidateImagesBucket: boolean;
};

export function isMissingSchemaError(error: { code?: string | null; message?: string | null } | null | undefined) {
  if (!error) {
    return false;
  }

  return error.code === "PGRST205" || error.message?.includes("schema cache") || false;
}

export async function getSupabaseSetupStatus(): Promise<SupabaseSetupStatus> {
  const supabase = createSupabaseAdminClient();

  const [{ error: allowedUsersError }, { error: candidatesError }, { data: buckets, error: bucketError }] =
    await Promise.all([
      supabase.from("allowed_users").select("id").limit(1),
      supabase.from("candidates").select("id").limit(1),
      supabase.storage.listBuckets()
    ]);

  return {
    allowedUsersTable: !allowedUsersError,
    candidatesTable: !candidatesError,
    candidateImagesBucket:
      !bucketError && (buckets ?? []).some((bucket) => bucket.id === "candidate-images")
  };
}

export function getSetupGuidanceMessage() {
  return "Supabase is connected, but the app schema is missing. Run the SQL in supabase/setup.sql before using the whitelist or candidate features.";
}
