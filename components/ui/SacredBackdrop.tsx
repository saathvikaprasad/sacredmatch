import { cn } from "@/lib/utils";

export function SacredBackdrop({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative isolate", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(255,243,220,0.92),transparent_60%)]" />
      <div className="pointer-events-none absolute left-0 top-8 -z-10 h-44 w-44 rounded-full bg-coral/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-28 -z-10 h-56 w-56 rounded-full bg-moss/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 flex justify-center opacity-25">
        <div className="rangoli-ring animate-rotate-slow h-56 w-56 rounded-full border border-coral/20" />
      </div>
      <div className="pointer-events-none absolute left-6 top-24 -z-10 animate-soft-float text-5xl text-coral/20">
        ❀
      </div>
      <div className="pointer-events-none absolute right-8 top-40 -z-10 animate-soft-float text-4xl text-amber-700/20 [animation-delay:500ms]">
        ॐ
      </div>
      <div className="pointer-events-none absolute bottom-16 left-8 -z-10 text-4xl text-coral/15">
        🪔
      </div>
      <div className="pointer-events-none absolute bottom-24 right-10 -z-10 text-5xl text-moss/15">
        ❋
      </div>
      {children}
    </div>
  );
}
