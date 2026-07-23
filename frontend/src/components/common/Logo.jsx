import { Zap } from "lucide-react";

/**
 * Atlas EV wordmark. `variant="full"` renders icon + wordmark,
 * `variant="icon"` renders just the mark (used in tight spaces).
 */
export default function Logo({ variant = "full", className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-sm bg-accent/10">
        <Zap className="text-accent" strokeWidth={2.4} size={18} />
        <span className="absolute inset-0 rounded-sm ring-1 ring-accent/30" />
      </span>
      {variant === "full" && (
        <span className="font-display text-lg font-semibold text-text-primary">
          Atlas <span className="text-accent">EV</span>
        </span>
      )}
    </div>
  );
}
