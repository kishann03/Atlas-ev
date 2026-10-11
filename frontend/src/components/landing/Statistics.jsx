import { CheckCircle2 } from "lucide-react";
import { WatermarkCharger } from "@/components/common/Illustrations";

const REASONS = [
  { value: "5 signals", label: "Reliability, queue, cost, power and connector fit in one ranking" },
  { value: "₹ per kWh", label: "Prices shown side by side so you can compare networks before leaving" },
  { value: "Your EV", label: "Saved vehicles filter out chargers your car cannot use" },
  { value: "1 tap", label: "Directions open straight in Google Maps" },
];

const POINTS = [
  "Nearest is not always best: a free, working charger 3 km away beats a busy or offline one next door.",
  "Prices and power vary widely between networks, so a quick comparison saves real money.",
  "Your car decides which connectors and speeds make sense, so Atlas starts from your vehicle.",
];

export default function Statistics() {
  return (
    <section id="why-atlas-ev" className="relative overflow-hidden py-14 md:py-20">
      <WatermarkCharger className="pointer-events-none absolute -right-6 top-4 h-[26rem] text-accent opacity-[0.07]" />
      <div className="container-page relative grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <h2 className="font-display text-4xl font-extrabold text-text-primary md:text-5xl">Why Atlas EV</h2>
          <p className="mt-4 text-xl text-text-secondary">
            Most charger maps stop at the pin. Atlas EV helps you decide where to stop.
          </p>
          <ul className="mt-6 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-lg leading-8 text-text-primary">
                <CheckCircle2 size={26} className="mt-1 shrink-0 text-accent" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {REASONS.map((r) => (
            <div key={r.value} className="card border border-border-soft p-6">
              <p className="font-display text-4xl font-extrabold text-accent">{r.value}</p>
              <p className="mt-2 text-lg leading-7 text-text-secondary">{r.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
