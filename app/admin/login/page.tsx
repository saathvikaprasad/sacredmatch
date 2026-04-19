import { adminLoginAction } from "@/app/actions/auth";
import { SubmitButton } from "@/components/ui/SubmitButton";

export default function AdminLoginPage() {
  async function loginAction(formData: FormData) {
    "use server";

    await adminLoginAction(formData);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
      <form action={loginAction} className="w-full rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-coral">Admin Portal</p>
        <h1 className="mt-4 font-[var(--font-heading)] text-4xl text-ink">Admin login</h1>
        <p className="mt-3 text-slate">Use the credentials stored in your environment variables.</p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin email"
            required
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-coral"
          />
          <input
            type="password"
            name="password"
            placeholder="Admin password"
            required
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-coral"
          />
        </div>

        <div className="mt-8">
          <SubmitButton label="Login" pendingLabel="Signing in..." />
        </div>
      </form>
    </main>
  );
}
