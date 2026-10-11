import { CarFront, PlugZap, Sparkles } from "lucide-react";
import { WatermarkRoad } from "@/components/common/Illustrations";

const STEPS = [
  { icon: CarFront, title: "Add your vehicle", desc: "Choose your car, or enter the battery size and connector type once. Every recommendation after that is matched to it." },
  { icon: Sparkles, title: "Get your recommendation", desc: "Atlas ranks nearby chargers by reliability, queue and cost, and shows why the top pick wins." },
  { icon: PlugZap, title: "Charge and go", desc: "Open directions in Google Maps, plug in, and keep your saved vehicles ready for the next trip." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden border-t border-border bg-bg-surface2 py-14 md:py-20">
      <WatermarkRoad className="pointer-events-none absolute -left-20 bottom-0 w-[32rem] text-accent opacity-[0.08]" />
      <div className="container-page relative">
        <h2 className="max-w-3xl font-display text-4xl font-extrabold text-text-primary md:text-5xl">
          From low battery to plugged in, in three steps
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card relative border border-border-soft p-7">
              <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-accent/20">{i + 1}</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-accent text-accent-contrast">
                <s.icon size={28} strokeWidth={1.9} />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-text-primary">{s.title}</h3>
              <p className="mt-2 text-lg leading-8 text-text-secondary">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
