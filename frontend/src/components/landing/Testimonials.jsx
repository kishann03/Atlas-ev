import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I stopped checking three apps before a road trip. Atlas just tells me which station won't waste my time.",
    name: "Priya Sharma",
    role: "Tata Nexon EV owner",
  },
  {
    quote:
      "The reliability score caught a station that PlugShare still showed as active. Saved me a 20-minute detour.",
    name: "Rohan Verma",
    role: "MG ZS EV owner",
  },
  {
    quote:
      "Queue estimation is scarily accurate. I've started timing my errands around it.",
    name: "Ananya Iyer",
    role: "Hyundai Kona Electric owner",
  },
  {
    quote:
      "Cost comparison alone paid for a year of chai. Different networks are wildly inconsistent on pricing.",
    name: "Karan Mehta",
    role: "BYD Atto 3 owner",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">From the driver's seat</p>
          <h2 className="mt-4 text-3xl font-semibold text-text-primary sm:text-4xl">
            Trusted by drivers who plan ahead
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="card flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-text-primary">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 font-display text-xs font-semibold text-accent">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-tertiary">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
