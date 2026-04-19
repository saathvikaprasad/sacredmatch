"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "border border-black/10 bg-white text-ink shadow-soft"
      }}
    />
  );
}
