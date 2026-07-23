import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

const STATS = [
  { value: 12000, suffix: "+", label: "Charging stations mapped" },
  { value: 98, suffix: "%", label: "ETA prediction accuracy" },
  { value: 40000, suffix: "+", label: "Drivers routed monthly" },
  { value: 21, suffix: "%", label: "Avg. cost saved per session" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="relative border-t border-border bg-bg-surface/40 py-20 md:py-24">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center sm:text-left"
            >
              <p className="text-3xl font-semibold text-text-primary sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-text-secondary">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
