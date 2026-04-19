import { SubmitButton } from "@/components/ui/SubmitButton";

export function AdminUserForm({
  action
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-4 rounded-[2rem] border border-black/5 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">Add or Update User</h2>
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          required
          className="rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-coral"
        />
        <select
          name="role"
          defaultValue="view"
          className="rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-coral"
        >
          <option value="view">View</option>
          <option value="edit">Edit</option>
        </select>
      </div>
      <SubmitButton label="Save User" />
    </form>
  );
}
