import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Gauge, MapPin, PlugZap } from "lucide-react";
import { RoadScene } from "@/components/common/Illustrations";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-10 md:pb-24 md:pt-14">

      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] xl:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface px-4 py-2 text-base font-medium text-text-secondary">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              Built for EV drivers across India
            </p>

            <h1 className="mt-6 text-balance font-display text-5xl font-extrabold leading-[1.04] tracking-tight text-text-primary md:text-6xl">
              Find the <span className="text-accent">Best EV Charger</span>
              <br />
              Not Just the Nearest One.
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-9 text-text-secondary">
              Compare nearby EV charging stations using real-time availability, estimated waiting time, charging cost,
              and smart recommendations, all in one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/stations" className="btn-primary px-8 py-4 text-lg">
                Find Chargers <ArrowRight size={20} />
              </Link>
              <Link to="/#how-it-works" className="btn-secondary px-8 py-4 text-lg">
                See how it works
              </Link>
            </div>
            <p className="mt-5 text-base text-text-tertiary">Free for individual drivers. No credit card required.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative">
            <RoadScene className="w-full shadow-card" />
            <div className="mt-4 rounded-md border border-border bg-bg-surface p-4 shadow-pop sm:w-[26rem] lg:absolute lg:-bottom-14 lg:left-8 lg:mt-0">
              <p className="flex items-center gap-2 text-base font-bold text-text-primary">
                <MapPin size={18} className="text-accent" /> Best pick near you
              </p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-text-primary">Airport Road Fast Charge</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
                    <span className="flex items-center gap-1"><Clock size={15} /> 6 min wait</span>
                    <span className="flex items-center gap-1"><PlugZap size={15} /> ₹22/kWh</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="flex items-center gap-1 font-display text-3xl font-extrabold text-accent"><Gauge size={22} />94</p>
                  <p className="text-sm text-text-tertiary">Reliability</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
