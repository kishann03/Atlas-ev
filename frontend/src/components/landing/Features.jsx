import { CarFront, Clock3, Gauge, MapPinned, MessageSquareText, Wallet } from "lucide-react";
import { WatermarkCar } from "@/components/common/Illustrations";

const FEATURES = [
  { icon: Gauge, title: "Reliability Score", desc: "Every station gets a score from 0 to 100 based on uptime, driver reports and maintenance history, so you know before you go." },
  { icon: Clock3, title: "Queue Estimation", desc: "See how many cars are ahead of you and the expected wait, updated as drivers plug in and unplug." },
  { icon: Wallet, title: "Cost Comparison", desc: "Compare price per kWh across networks, with the estimated session cost worked out for your vehicle." },
  { icon: MapPinned, title: "Google Maps Integration", desc: "Live pins on the map and one-tap directions in the Google Maps app you already use." },
  { icon: MessageSquareText, title: "Verified Reviews", desc: "Reviews from drivers who actually charged there, kept separate from casual ratings." },
  { icon: CarFront, title: "Vehicle Profiles", desc: "Add your EV once. Connector type, battery size and range shape every recommendation." },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-14 md:py-20">
      <WatermarkCar variant="sedan" className="pointer-events-none absolute -right-24 top-6 w-[34rem] text-accent opacity-[0.07]" />
      <div className="container-page relative">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl font-extrabold text-text-primary md:text-5xl">Six signals. One confident choice.</h2>
          <p className="mt-4 text-xl text-text-secondary">
            Everything you would check across several apps before a charge, ranked into one answer.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="card border border-border-soft p-7">
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-accent/10 text-accent">
                <f.icon size={28} strokeWidth={1.9} />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-text-primary">{f.title}</h3>
              <p className="mt-2 text-lg leading-8 text-text-secondary">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
