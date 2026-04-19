import Link from "next/link";

type SetupAlertProps = {
  title?: string;
  message: string;
};

export function SetupAlert({
  title = "Supabase setup needed",
  message
}: SetupAlertProps) {
  return (
    <div className="rounded-[2rem] border border-amber-300/70 bg-amber-50 p-5 text-amber-950">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6">{message}</p>
      <p className="mt-3 text-sm">
        Use [supabase/setup.sql](/Users/ggd/Documents/Codex/2026-04-17-writing-variant-standard-id-84291-build/supabase/setup.sql)
        {" "}or run <code>npm run supabase:verify</code> for a status check.
      </p>
      <Link href="/admin/login" className="mt-4 inline-flex text-sm font-semibold text-coral">
        Return to admin login
      </Link>
    </div>
  );
}
