import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="h-40 rounded-[2.5rem] border border-black/5 bg-white/80 shadow-soft" />
      <div className="mt-8">
        <LoadingSkeleton />
      </div>
    </main>
  );
}
