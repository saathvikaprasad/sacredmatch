"use client";

import { useTransition } from "react";
import { m } from "framer-motion";

import { signInWithGoogle } from "@/app/actions/auth";

export function GoogleLoginButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <m.button
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => {
        startTransition(async () => {
          await signInWithGoogle();
        });
      }}
      className="inline-flex w-full items-center justify-center rounded-full bg-coral px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-coral/30"
    >
      {isPending ? "Redirecting..." : "Continue with Google"}
    </m.button>
  );
}
