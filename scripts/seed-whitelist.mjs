import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

import { loadEnv, requireEnv } from "./_env.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv(projectRoot);

const email = process.argv[2]?.trim().toLowerCase();
const role = process.argv[3]?.trim() || "edit";

if (!email || !["view", "edit"].includes(role)) {
  console.error("Usage: node scripts/seed-whitelist.mjs <email> <view|edit>");
  process.exit(1);
}

const supabase = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const { data: existingUser, error: existingUserError } = await supabase
  .from("allowed_users")
  .select("id, email")
  .eq("email", email)
  .maybeSingle();

if (existingUserError) {
  console.error(existingUserError.message);
  process.exit(1);
}

const { error } = existingUser
  ? await supabase.from("allowed_users").update({ role }).eq("id", existingUser.id)
  : await supabase.from("allowed_users").insert({ email, role });

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(`Whitelist updated for ${email} with role ${role}.`);
