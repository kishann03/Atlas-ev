import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import PasswordInput from "@/components/common/PasswordInput";
import Stepper from "@/components/common/Stepper";

const STEPS = ["Account", "Vehicle", "Done"];
const CONNECTORS = ["CCS", "CHAdeMO", "Type 2", "NACS"];

const slide = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState({ name: "", email: "", password: "" });
  const [vehicle, setVehicle] = useState({
    model: "",
    connector: "CCS",
    battery: "",
    range: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submitAccount = (e) => {
    e.preventDefault();
    next();
  };

  const submitVehicle = (e) => {
    e.preventDefault();
    next();
  };

  return (
    <AuthLayout
      quote="Cost comparison alone paid for a year of chai. Different networks are wildly inconsistent on pricing."
      author="Karan Mehta"
      role="BYD Atto 3 owner"
    >
      <div className="mb-7">
        <Stepper steps={STEPS} current={step} />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="account" {...slide} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="text-2xl font-semibold text-text-primary">Create your account</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Start free. Add your vehicle next so recommendations fit it exactly.
            </p>

            <form onSubmit={submitAccount} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-primary">
                  Full name
                </label>
                <input
                  id="name"
                  required
                  value={account.name}
                  onChange={(e) => setAccount((a) => ({ ...a, name: e.target.value }))}
                  placeholder="Aarav Mehta"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium text-text-primary">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={account.email}
                  onChange={(e) => setAccount((a) => ({ ...a, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium text-text-primary">
                  Password
                </label>
                <PasswordInput
                  id="signup-password"
                  autoComplete="new-password"
                  value={account.password}
                  onChange={(e) => setAccount((a) => ({ ...a, password: e.target.value }))}
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded-sm border-border bg-bg-surface2 accent-accent"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="link-accent">Terms of Service</a> and{" "}
                  <a href="#" className="link-accent">Privacy Policy</a>
                </span>
              </label>

              <button type="submit" className="btn-primary w-full py-3.5 text-base">
                Continue
                <ArrowRight size={17} />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-text-secondary">
              Already have an account?{" "}
              <Link to="/login" className="link-accent font-medium">Log in</Link>
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="vehicle" {...slide} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="text-2xl font-semibold text-text-primary">Add your vehicle</h1>
            <p className="mt-2 text-sm text-text-secondary">
              This is how Atlas matches connector type and estimates your real range.
            </p>

            <form onSubmit={submitVehicle} className="mt-8 space-y-5">
              <div>
                <label htmlFor="model" className="mb-1.5 block text-sm font-medium text-text-primary">
                  Make &amp; model
                </label>
                <input
                  id="model"
                  required
                  value={vehicle.model}
                  onChange={(e) => setVehicle((v) => ({ ...v, model: e.target.value }))}
                  placeholder="e.g. Tata Nexon EV"
                  className="input-field"
                />
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium text-text-primary">
                  Connector type
                </span>
                <div className="flex flex-wrap gap-2">
                  {CONNECTORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setVehicle((v) => ({ ...v, connector: c }))}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        vehicle.connector === c
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-text-secondary hover:border-accent/30"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="battery" className="mb-1.5 block text-sm font-medium text-text-primary">
                    Battery (kWh)
                  </label>
                  <input
                    id="battery"
                    type="number"
                    inputMode="decimal"
                    required
                    value={vehicle.battery}
                    onChange={(e) => setVehicle((v) => ({ ...v, battery: e.target.value }))}
                    placeholder="40.5"
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="range" className="mb-1.5 block text-sm font-medium text-text-primary">
                    Current range (km)
                  </label>
                  <input
                    id="range"
                    type="number"
                    inputMode="numeric"
                    required
                    value={vehicle.range}
                    onChange={(e) => setVehicle((v) => ({ ...v, range: e.target.value }))}
                    placeholder="180"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={back} className="btn-secondary flex-1 py-3.5">
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button type="submit" className="btn-primary flex-1 py-3.5">
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="done" {...slide} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 size={26} className="text-accent" />
            </div>
            <h1 className="mt-6 text-2xl font-semibold text-text-primary">You're all set</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Atlas EV is ready to rank your nearest chargers.
            </p>

            <div className="mt-8 space-y-3 rounded-md border border-border bg-bg-surface2 p-5">
              <SummaryRow label="Name" value={account.name || "—"} />
              <SummaryRow label="Email" value={account.email || "—"} />
              <SummaryRow label="Vehicle" value={vehicle.model || "—"} />
              <SummaryRow label="Connector" value={vehicle.connector} />
              <SummaryRow
                label="Battery / Range"
                value={`${vehicle.battery || "—"} kWh · ${vehicle.range || "—"} km`}
              />
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-primary mt-8 w-full py-3.5 text-base"
            >
              Go to Dashboard
              <ArrowRight size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-tertiary">{label}</span>
      <span className="font-medium text-text-primary">{value}</span>
    </div>
  );
}
