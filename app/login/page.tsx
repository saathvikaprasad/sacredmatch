import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { DevotionalOrnament } from "@/components/ui/DevotionalOrnament";
import { HaloPanel } from "@/components/ui/HaloPanel";
import { SacredBackdrop } from "@/components/ui/SacredBackdrop";
import { getAuthenticatedUser } from "@/utils/auth";

export default async function LoginPage() {
  const user = await getAuthenticatedUser();

  return (
    <SacredBackdrop>
      <main className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <FadeIn y={30} className="w-full">
          <HaloPanel className="lotus-glow rounded-[2.7rem] p-6 lg:p-8">
            <div className="animate-pulse-gold absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,214,170,0.55),transparent_70%)]" />
            <div className="relative overflow-hidden rounded-[2.4rem] bg-[linear-gradient(180deg,#f7efe2,#f4ead9)] p-4 md:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_45%),linear-gradient(180deg,rgba(246,239,228,0.35),rgba(246,239,228,0.75))]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f4ead9] via-[#f4ead9]/65 to-transparent" />
              <div className="relative z-10 px-4 pt-6 flex justify-center">
                <h2 className="text-2xl md:text-3xl font-serif leading-snug text-ink/95">
                  Find your Sacred Match
                </h2>
              </div>
              <div className="relative flex justify-center rounded-[2rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/wedding-bg.gif"
                  alt="Traditional wedding illustration"
                  className="max-h-[420px] w-full object-contain mix-blend-multiply opacity-95 saturate-[0.92]"
                />
              </div>
            </div>

            <div className="px-3 pb-2 pt-6 flex flex-col items-center text-center">
              <DevotionalOrnament className="justify-center" />
              <p className="mt-5 text-sm uppercase tracking-[0.32em] text-coral">
                Matrimonial Directory
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl leading-tight text-ink lg:text-5xl">
                Welcome to our matrimonial website.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate">
                Sign in with your approved mail ID to enter your dashboard and
                explore profiles with ease.
              </p>
              <div className="mt-8 max-w-md mx-auto w-full">
                <GoogleLoginButton />
              </div>
              <p className="mt-5 text-sm leading-7 text-slate">
                {user?.email
                  ? `Signed in as ${user.email}`
                  : "Use your approved Google account to continue to your dashboard."}
              </p>
            </div>
          </HaloPanel>
        </FadeIn>
      </main>
    </SacredBackdrop>
  );
}
