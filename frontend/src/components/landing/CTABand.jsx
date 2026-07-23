import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTABand() {
  return (
    <section className="relative border-t border-border py-24 md:py-28">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-lg border border-accent/20 bg-radial-glow px-8 py-14 text-center sm:px-16"
        >
          <h2 className="text-3xl font-semibold text-text-primary sm:text-4xl">
            Your next charge, already figured out.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-secondary">
            Add your vehicle in under a minute and get your first
            recommendation before you've finished your coffee.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/signup" className="btn-primary px-6 py-3.5 text-base">
              Get Started
              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
