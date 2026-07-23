import { motion } from "framer-motion";
import {
  Gauge,
  Clock3,
  Wallet,
  MapPinned,
  MessageSquareText,
  CarFront,
} from "lucide-react";

const FEATURES = [
  {
    icon: Gauge,
    title: "Reliability Score",
    desc: "Every station gets a live score from 0–100, built from uptime, driver reports, and maintenance history — so you know before you go.",
  },
  {
    icon: Clock3,
    title: "Queue Estimation",
    desc: "See how many cars are ahead of you and the real wait time, updated as drivers plug in and unplug in real time.",
  },
  {
    icon: Wallet,
    title: "Cost Comparison",
    desc: "Compare price-per-kWh across every network at once, with your estimated session cost calculated for your exact vehicle.",
  },
  {
    icon: MapPinned,
    title: "Google Maps Integration",
    desc: "Live pins, turn-by-turn directions, and traffic-aware ETAs — routing handled by the map you already trust.",
  },
  {
    icon: MessageSquareText,
    title: "Verified Reviews",
    desc: "Reviews from drivers who actually charged there, flagged separately from casual ratings, so the signal stays clean.",
  },
  {
    icon: CarFront,
    title: "Vehicle Profiles",
    desc: "Add your EV once. Atlas EV matches connector types, battery size, and range to every recommendation automatically.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Built for the decision, not just the map</p>
          <h2 className="mt-4 text-3xl font-semibold text-text-primary sm:text-4xl">
            Six signals. One confident choice.
          </h2>
          <p className="mt-4 text-text-secondary">
            Atlas EV combines everything you'd normally check across five
            different apps — into one ranked answer.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="group card p-6 transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent/10 transition-colors group-hover:bg-accent/15">
                <f.icon size={20} className="text-accent" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-text-primary">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
