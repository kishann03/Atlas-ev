import { motion } from "framer-motion";
import { Gauge, BatteryCharging, ShieldCheck } from "lucide-react";

/**
 * Signature element shared by Login + Signup: a stylised route line that
 * "charges" from origin to destination, echoing Atlas EV's core promise —
 * a smarter route to the right charger, not just the nearest one.
 */
export default function AuthVisualPanel({ quote, author, role }) {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-bg-surface p-10 lg:flex">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-hero-mesh"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 flex items-center gap-2 text-sm text-text-secondary">
        <ShieldCheck size={16} className="text-accent" />
        Trusted by 40,000+ EV drivers
      </div>

      {/* Signature: animated route/charge line */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-10">
        <svg viewBox="0 0 360 220" className="w-full max-w-sm">
          <path
            d="M20 190 C 90 190, 90 90, 160 90 S 260 30, 340 30"
            fill="none"
            stroke="#232C33"
            strokeWidth="3"
          />
          <path
            d="M20 190 C 90 190, 90 90, 160 90 S 260 30, 340 30"
            fill="none"
            stroke="#39E6A0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10 10"
            className="animate-flow-line"
          />
          {/* origin */}
          <circle cx="20" cy="190" r="6" fill="#5C6672" />
          {/* moving vehicle marker */}
          <motion.circle
            r="7"
            fill="#39E6A0"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            style={{
              offsetPath:
                "path('M20 190 C 90 190, 90 90, 160 90 S 260 30, 340 30')",
            }}
            className="drop-shadow-[0_0_8px_rgba(57,230,160,0.8)]"
          />
          {/* destination — reliability ring */}
          <circle cx="340" cy="30" r="14" fill="none" stroke="#39E6A0" strokeWidth="2.5" opacity="0.5" />
          <circle cx="340" cy="30" r="8" fill="#39E6A0" />
        </svg>

        <div className="absolute left-4 top-4 rounded-md border border-border bg-bg-surface2/90 px-3 py-2 text-xs backdrop-blur">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <BatteryCharging size={13} className="text-accent" /> Nexon EV &middot; 62%
          </div>
        </div>
        <div className="absolute bottom-6 right-2 rounded-md border border-border bg-bg-surface2/90 px-3 py-2 text-xs backdrop-blur">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Gauge size={13} className="text-accent" /> Reliability 94 &middot; Excellent
          </div>
        </div>
      </div>

      <blockquote className="relative z-10 max-w-sm">
        <p className="text-lg leading-relaxed text-text-primary">
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="mt-3 text-sm text-text-secondary">
          {author} &middot; <span className="text-text-tertiary">{role}</span>
        </footer>
      </blockquote>
    </div>
  );
}
