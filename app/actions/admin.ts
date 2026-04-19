"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getSetupGuidanceMessage, isMissingSchemaError } from "@/lib/supabase/setup";
import { requireAdminSession } from "@/utils/auth";
import { normalizeEmail } from "@/lib/utils";

function parseCsv(content: string) {
  const lines = content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  const [, ...rows] = lines;

  return rows.map((line) => {
    const [email, role] = line.split(",").map((entry) => entry.trim());
    return { email: normalizeEmail(email ?? ""), role };
  });
}

export async function addAllowedUserAction(formData: FormData) {
  await requireAdminSession();

  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const role = String(formData.get("role") ?? "view");

  if (!email || !["view", "edit"].includes(role)) {
    return { error: "Please provide a valid email and role." };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("allowed_users").upsert(
    {
      email,
      role
    },
    {
      onConflict: "email"
    }
  );

  if (error) {
    if (isMissingSchemaError(error)) {
      return { error: getSetupGuidanceMessage() };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: "User saved successfully." };
}

export async function removeAllowedUserAction(formData: FormData) {
  await requireAdminSession();

  const id = String(formData.get("id") ?? "");
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("allowed_users").delete().eq("id", id);

  if (error) {
    if (isMissingSchemaError(error)) {
      return { error: getSetupGuidanceMessage() };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: "User removed successfully." };
}

export async function uploadAllowedUsersCsvAction(formData: FormData) {
  await requireAdminSession();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return { error: "Please upload a CSV file." };
  }

  const content = await file.text();
  const rows = parseCsv(content).filter(
    (row) => row.email && (row.role === "view" || row.role === "edit")
  );

  if (rows.length === 0) {
    return { error: "No valid rows found in the CSV file." };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("allowed_users").upsert(rows, {
    onConflict: "email"
  });

  if (error) {
    if (isMissingSchemaError(error)) {
      return { error: getSetupGuidanceMessage() };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: `${rows.length} user(s) imported successfully.` };
}
