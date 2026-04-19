import type { Metadata } from "next";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "SacredMatch",
  description: "Secure candidate directory powered by Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-[Avenir_Next,Avenir,ui-sans-serif,sans-serif]">
        <MotionProvider>
          {children}
          <ToastProvider />
        </MotionProvider>
      </body>
    </html>
  );
}
