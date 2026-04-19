import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
      <div className="w-full rounded-[2rem] border border-black/5 bg-white/90 p-10 shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-coral">
          Access denied
        </p>
        <h1 className="mt-3 font-[var(--font-heading)] text-4xl text-ink">
          Your account is not in the approved access list.
        </h1>
        <p className="mt-4 text-slate">
          Please contact{" "}
          <a
            href="mailto:satyaswara108@gmail.com"
            className="underline hover:text-ink"
          >
            satyaswara108@gmail.com
          </a>{" "}
          to add your email to the approved list, then try signing in again.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
        >
          Back to login
        </Link>
      </div>
    </main>
  );
}
