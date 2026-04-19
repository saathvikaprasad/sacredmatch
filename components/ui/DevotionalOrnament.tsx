import { cn } from "@/lib/utils";

export function DevotionalOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-coral/80", className)} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-coral/60 to-transparent" />
      <span className="text-lg leading-none text-amber-700">✺</span>
      <span className="text-xl leading-none text-coral">🪔</span>
      <span className="text-xl leading-none text-coral">ॐ</span>
      <span className="text-xl leading-none text-amber-700">❀</span>
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-coral/60 to-transparent" />
    </div>
  );
}
