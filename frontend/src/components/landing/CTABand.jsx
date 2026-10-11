import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { WatermarkRoad } from "@/components/common/Illustrations";

export default function CTABand() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-lg bg-accent px-8 py-14 text-accent-contrast sm:px-16">
          <WatermarkRoad className="pointer-events-none absolute -right-10 -top-6 h-80 text-accent-contrast opacity-[0.12]" />
          <div className="relative max-w-3xl">
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">Your next charge, already figured out.</h2>
            <p className="mt-4 text-xl opacity-90">Add your vehicle in under a minute and see your first recommendation.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="btn bg-bg-surface px-8 py-4 text-lg text-text-primary hover:bg-bg-surface2">
                Get Started <ArrowRight size={20} />
              </Link>
              <Link to="/stations" className="btn border border-accent-contrast/50 px-8 py-4 text-lg text-accent-contrast hover:bg-accent-contrast/10">
                Find Chargers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
