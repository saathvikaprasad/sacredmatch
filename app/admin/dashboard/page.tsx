import { adminLogoutAction } from "@/app/actions/auth";
import {
  addAllowedUserAction,
  removeAllowedUserAction,
  uploadAllowedUsersCsvAction
} from "@/app/actions/admin";
import { AdminCsvUploadForm } from "@/components/forms/AdminCsvUploadForm";
import { SetupAlert } from "@/components/SetupAlert";
import { AdminUserForm } from "@/components/forms/AdminUserForm";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getSetupGuidanceMessage, getSupabaseSetupStatus } from "@/lib/supabase/setup";
import type { AllowedUser } from "@/lib/types";
import { requireAdminSession } from "@/utils/auth";

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const supabase = createSupabaseAdminClient();
  const setupStatus = await getSupabaseSetupStatus();
  const schemaReady = setupStatus.allowedUsersTable && setupStatus.candidatesTable;
  const { data: users } = schemaReady
    ? await supabase
        .from("allowed_users")
        .select("id, email, role")
        .order("email", { ascending: true })
        .returns<AllowedUser[]>()
    : { data: [] as AllowedUser[] };

  async function addUserFormAction(formData: FormData) {
    "use server";

    await addAllowedUserAction(formData);
  }

  async function uploadCsvFormAction(formData: FormData) {
    "use server";

    await uploadAllowedUsersCsvAction(formData);
  }

  async function removeUserFormAction(formData: FormData) {
    "use server";

    await removeAllowedUserAction(formData);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="rounded-[2.5rem] border border-black/5 bg-white/80 p-8 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-coral">Admin Dashboard</p>
            <h1 className="mt-3 font-[var(--font-heading)] text-4xl text-ink">Whitelist Management</h1>
            <p className="mt-3 text-slate">
              Add, update, remove, or bulk import access permissions. Candidate data remains read-only for admins.
            </p>
          </div>
          <form action={adminLogoutAction}>
            <SubmitButton
              label="Logout"
              pendingLabel="Logging out..."
              className="border border-ink bg-ink text-white hover:bg-ink"
            />
          </form>
        </div>
      </section>

      {!schemaReady ? (
        <section className="mt-8">
          <SetupAlert message={getSetupGuidanceMessage()} />
        </section>
      ) : (
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <AdminUserForm action={addUserFormAction} />
          <AdminCsvUploadForm action={uploadCsvFormAction} />
        </section>
      )}

      <section className="mt-8 rounded-[2rem] border border-black/5 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Allowed Users</h2>
          <p className="text-sm text-slate">{users?.length ?? 0} total</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-black/5">
          <table className="min-w-full divide-y divide-black/5 text-left text-sm">
            <thead className="bg-sand/60 text-slate">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white">
              {(users ?? []).map((allowedUser) => (
                <tr key={allowedUser.id}>
                  <td className="px-4 py-3 text-ink">{allowedUser.email}</td>
                  <td className="px-4 py-3 capitalize text-slate">{allowedUser.role}</td>
                  <td className="px-4 py-3">
                    <form action={removeUserFormAction}>
                      <input type="hidden" name="id" value={allowedUser.id} />
                      <SubmitButton
                        label="Remove"
                        pendingLabel="Removing..."
                        className="bg-transparent px-0 py-0 text-coral shadow-none"
                      />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
