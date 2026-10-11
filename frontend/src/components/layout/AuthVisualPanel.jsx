import { ShieldCheck } from "lucide-react";
import { RoadScene, WatermarkRoad } from "@/components/common/Illustrations";

/** Right-hand panel on Login/Signup: highway scene plus a driver quote. */
export default function AuthVisualPanel({ quote, author, role }) {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden bg-bg-surface2 p-12 lg:flex">
      <WatermarkRoad className="pointer-events-none absolute -right-16 top-0 h-[28rem] w-[34rem] text-accent opacity-[0.07]" />
      <div className="relative z-10 flex items-center gap-2 text-base font-medium text-text-secondary">
        <ShieldCheck size={20} className="text-accent" /> Charger data you can plan a trip around
      </div>
      <div className="relative z-10 py-6">
        <RoadScene className="mx-auto w-full max-w-2xl rounded-lg shadow-card" />
      </div>
      <blockquote className="relative z-10 max-w-xl">
        <p className="font-display text-2xl font-semibold leading-snug text-text-primary">&ldquo;{quote}&rdquo;</p>
        <footer className="mt-3 text-base text-text-secondary">
          {author}, <span className="text-text-tertiary">{role}</span>
        </footer>
      </blockquote>
    </aside>
  );
}
