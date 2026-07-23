import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Gauge, Clock, PlugZap } from "lucide-react";
import GlowBackground from "@/components/common/GlowBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      <GlowBackground />

      <div className="container-page">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface px-3 py-1.5 text-xs text-text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent glow-dot" />
              Live across 1,200+ stations, right now
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-4xl font-semibold leading-[1.08] text-text-primary sm:text-5xl md:text-6xl"
            >
              Don't just find the
              <br />
              nearest charger.
              <br />
              <span className="text-accent">Find the smartest one.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary"
            >
              Atlas EV ranks every charger near you by reliability, queue
              time, and real cost — so you stop guessing and start driving.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link to="/signup" className="btn-primary px-6 py-3.5 text-base">
                Get Started
                <ArrowRight size={17} />
              </Link>
              <a href="#how-it-works" className="btn-secondary px-6 py-3.5 text-base">
                See how it works
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-10 flex items-center gap-6 text-xs text-text-tertiary"
            >
              <span>No credit card required</span>
              <span className="h-1 w-1 rounded-full bg-text-tertiary" />
              <span>Free for individual drivers</span>
            </motion.div>
          </div>

          {/* Signature visual: live station panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-lg border border-border bg-bg-surface p-5 shadow-glow-lg">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <MapPin size={15} className="text-accent" />
                  Nearby, ranked for you
                </div>
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                  Live
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <StationRow
                  featured
                  name="Highway Grid — Sector 12"
                  distance="1.2 km"
                  score={94}
                  queue="8 min"
                  price="₹9.5/kWh"
                />
                <StationRow
                  name="Volt Point Mall Plaza"
                  distance="2.4 km"
                  score={88}
                  queue="12 min"
                  price="₹11/kWh"
                />
                <StationRow
                  name="ChargeHub Ring Road"
                  distance="3.1 km"
                  score={61}
                  queue="21 min"
                  price="₹10.8/kWh"
                />
              </div>
            </div>

            {/* floating reliability badge, ambient motion */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -top-6 hidden rounded-md border border-border bg-bg-surface2 px-4 py-3 shadow-card sm:block"
            >
              <div className="flex items-center gap-2">
                <Gauge size={16} className="text-accent" />
                <div>
                  <p className="font-mono text-lg font-semibold leading-none text-text-primary">94</p>
                  <p className="text-[10px] text-text-tertiary">Reliability</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StationRow({ featured, name, distance, score, queue, price }) {
  const scoreColor =
    score >= 90 ? "text-accent" : score >= 70 ? "text-accent/80" : "text-warning";

  return (
    <div
      className={`flex items-center justify-between rounded-md border px-3.5 py-3 transition-colors ${
        featured
          ? "border-accent/30 bg-accent/[0.06]"
          : "border-border bg-bg-surface2/60"
      }`}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-text-primary">{name}</p>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-text-tertiary">
          <span className="flex items-center gap-1">
            <MapPin size={11} /> {distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {queue}
          </span>
          <span className="flex items-center gap-1">
            <PlugZap size={11} /> {price}
          </span>
        </div>
      </div>
      <div className="ml-3 shrink-0 text-right">
        <p className={`font-mono text-sm font-semibold ${scoreColor}`}>{score}</p>
        <p className="text-[10px] text-text-tertiary">score</p>
      </div>
    </div>
  );
}
