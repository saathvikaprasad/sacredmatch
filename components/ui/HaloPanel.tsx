import { cn } from "@/lib/utils";

export function HaloPanel({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/45 bg-white/78 p-6 shadow-soft backdrop-blur-sm",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.82),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(216,108,91,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute -top-14 left-8 h-28 w-28 rounded-full bg-coral/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-8 h-32 w-32 rounded-full bg-moss/12 blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}
