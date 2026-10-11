import { Zap } from "lucide-react";

/** Atlas EV mark + wordmark. Sized up for the navbar's top-left corner. */
export default function Logo({ variant = "full", className = "" }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-accent-contrast shadow-card">
        <Zap size={24} strokeWidth={2.6} fill="currentColor" />
      </span>
      {variant === "full" && (
        <span className="font-display text-2xl font-extrabold tracking-tight text-text-primary">
          Atlas <span className="text-accent">EV</span>
        </span>
      )}
    </span>
  );
}
