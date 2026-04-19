import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getEnv } from "@/lib/env";
import { getSetupGuidanceMessage, isMissingSchemaError } from "@/lib/supabase/setup";
import type { AllowedUser, AllowedUserRole } from "@/lib/types";
import { normalizeEmail } from "@/lib/utils";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";

const ADMIN_COOKIE_NAME = "admin_session";
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 12;

type AdminSessionPayload = {
  email: string;
  exp: number;
};

function getAdminSecret() {
  return `${getEnv("ADMIN_EMAIL")}:${getEnv("ADMIN_PASSWORD")}`;
}

function signPayload(payload: string) {
  return createHmac("sha256", getAdminSecret()).update(payload).digest("hex");
}

export async function createAdminSession(email: string) {
  const payload: AdminSessionPayload = {
    email,
    exp: Date.now() + ADMIN_COOKIE_MAX_AGE * 1000
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload);
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, `${encodedPayload}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/"
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!value) {
    return null;
  }

  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  const isValid =
    expectedSignature.length === signature.length &&
    timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));

  if (!isValid) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as AdminSessionPayload;

  if (payload.exp < Date.now()) {
    return null;
  }

  if (payload.email !== getEnv("ADMIN_EMAIL")) {
    return null;
  }

  return payload;
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function getAllowedUserByEmail(email: string) {
  const supabase = createSupabaseAdminClient();
  const normalized = normalizeEmail(email);
  const { data, error } = await supabase
    .from("allowed_users")
    .select("id, email, role")
    .eq("email", normalized)
    .maybeSingle<AllowedUser>();

  if (error) {
    if (isMissingSchemaError(error)) {
      throw new Error(getSetupGuidanceMessage());
    }
    throw new Error(error.message);
  }

  return data;
}

export async function requireAllowedUser() {
  const user = await getAuthenticatedUser();

  if (!user?.email) {
    redirect("/login");
  }

  const allowedUser = await getAllowedUserByEmail(user.email);

  if (!allowedUser) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/unauthorized");
  }

  return {
    user,
    allowedUser
  };
}

export async function requireEditableUser() {
  const auth = await requireAllowedUser();

  if (auth.allowedUser.role !== "edit") {
    redirect("/dashboard");
  }

  return auth;
}

export async function getCurrentUserRole(): Promise<AllowedUserRole | null> {
  const user = await getAuthenticatedUser();

  if (!user?.email) {
    return null;
  }

  const allowedUser = await getAllowedUserByEmail(user.email);
  return allowedUser?.role ?? null;
}
