import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

import { loadEnv, requireEnv } from "./_env.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

loadEnv(projectRoot);

const supabase = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function main() {
  const [{ error: allowedUsersError }, { error: candidatesError }, { data: buckets, error: bucketsError }] =
    await Promise.all([
      supabase.from("allowed_users").select("id").limit(1),
      supabase.from("candidates").select("id").limit(1),
      supabase.storage.listBuckets()
    ]);

  const status = {
    allowed_users: allowedUsersError ? `missing (${allowedUsersError.code || allowedUsersError.message})` : "ok",
    candidates: candidatesError ? `missing (${candidatesError.code || candidatesError.message})` : "ok",
    candidate_images_bucket: bucketsError
      ? `unknown (${bucketsError.message})`
      : (buckets ?? []).some((bucket) => bucket.id === "candidate-images")
        ? "ok"
        : "missing"
  };

  console.log(JSON.stringify(status, null, 2));

  if (Object.values(status).some((value) => value !== "ok")) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
