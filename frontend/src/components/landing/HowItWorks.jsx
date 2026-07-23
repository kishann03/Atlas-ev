import { motion } from "framer-motion";
import { CarFront, Sparkles, PlugZap } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: CarFront,
    title: "Add your vehicle",
    desc: "Tell Atlas your model, connector type, and battery size — once. Every recommendation after this is personalized to it.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Get your recommendation",
    desc: "Atlas ranks nearby chargers by reliability, queue, and cost, and explains exactly why the top pick is the right one.",
  },
  {
    step: "03",
    icon: PlugZap,
    title: "Charge & track",
    desc: "Navigate straight there, start your session, and watch your charging history and savings build over time.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-t border-border py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How Atlas works</p>
          <h2 className="mt-4 text-3xl font-semibold text-text-primary sm:text-4xl">
            From empty tank of range to plugged in, in three steps.
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          {/* connecting line, desktop only */}
          <div
            aria-hidden="true"
            className="absolute top-6 left-0 right-0 hidden h-px bg-border md:block"
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-bg-primary font-mono text-sm text-accent">
                {s.step}
              </div>
              <div className="mt-5 flex items-center gap-2.5">
                <s.icon size={18} className="text-accent" strokeWidth={1.8} />
                <h3 className="text-lg font-semibold text-text-primary">{s.title}</h3>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
