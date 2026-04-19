"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { clearAdminSession, createAdminSession, getAllowedUserByEmail } from "@/utils/auth";
import { normalizeEmail } from "@/lib/utils";

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    return { error: error.message };
  }

  redirect(data.url);
}

export async function adminLoginAction(formData: FormData) {
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (email !== normalizeEmail(getEnv("ADMIN_EMAIL")) || password !== getEnv("ADMIN_PASSWORD")) {
    return { error: "Invalid admin credentials." };
  }

  await createAdminSession(email);
  redirect("/admin/dashboard");
}

export async function adminLogoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function userLogoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function validateAuthenticatedWhitelist() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { error: "Login failed. Please try again." };
  }

  const allowed = await getAllowedUserByEmail(user.email);

  if (!allowed) {
    await supabase.auth.signOut();
    redirect("/unauthorized");
  }

  redirect("/dashboard");
}
