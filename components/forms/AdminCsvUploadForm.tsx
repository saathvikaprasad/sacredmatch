import { SubmitButton } from "@/components/ui/SubmitButton";

export function AdminCsvUploadForm({
  action
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={action}
      className="space-y-4 rounded-[2rem] border border-black/5 bg-white p-6 shadow-soft"
    >
      <h2 className="text-lg font-semibold text-ink">Bulk Upload CSV</h2>
      <input
        type="file"
        name="file"
        accept=".csv"
        required
        className="w-full rounded-2xl border border-dashed border-black/10 px-4 py-3 text-sm"
      />
      <a
        href="/allowed-users-template.csv"
        download
        className="inline-flex rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-ink transition hover:border-coral hover:text-coral"
      >
        Download CSV Template
      </a>
      <SubmitButton label="Import CSV" />
    </form>
  );
}
