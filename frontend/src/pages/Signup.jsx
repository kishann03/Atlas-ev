import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import PasswordInput from "@/components/common/PasswordInput";
import Stepper from "@/components/common/Stepper";
import api from "@/lib/api";
import { saveSession } from "@/hooks/useAuth";
import { apiError } from "@/pages/Login";
import indianEVs from "@/data/indianEVs";

const STEPS = ["Account", "Vehicle", "Done"];
const CONNECTORS = ["CCS", "CHAdeMO", "Type 2", "NACS"];
const slide = { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 } };
const EMPTY_VEHICLE = { make: "", connectorType: "CCS", batteryKWh: "", rangeKm: "" };

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState({ name: "", email: "", password: "" });
  const [vehicle, setVehicle] = useState(EMPTY_VEHICLE);
  const [vehicleSaved, setVehicleSaved] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Step 1 creates the real account; the user is signed in right away.
  const submitAccount = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await api.post("/auth/signup", account);
      saveSession(res.data.data);
      setStep(1);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setBusy(false);
    }
  };

  // Step 2 saves the vehicle to the profile. It is optional, and a failure
  // here never blocks the new user.
  const submitVehicle = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api.post("/user/vehicles", vehicle);
      setVehicleSaved(true);
      setStep(2);
    } catch (err) {
      setError(`${apiError(err)} You can add your vehicle later from your profile.`);
    } finally {
      setBusy(false);
    }
  };

  const pickPreset = (e) => {
    const preset = indianEVs.find((v) => v.make === e.target.value);
    if (preset) setVehicle({ ...preset });
  };

  const ErrorBanner = () =>
    error ? (
      <div role="alert" className="mt-6 flex items-start gap-3 rounded-md border border-danger/40 bg-danger/10 p-4 text-base text-danger">
        <AlertCircle size={22} className="mt-0.5 shrink-0" /> {error}
      </div>
    ) : null;

  return (
    <AuthLayout quote="Cost comparison alone paid for a year of chai. Networks are wildly inconsistent on pricing." author="Karan Mehta" role="BYD Atto 3 owner">
      <div className="mb-7"><Stepper steps={STEPS} current={step} /></div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="account" {...slide} transition={{ duration: 0.25 }}>
            <h1 className="font-display text-4xl font-extrabold text-text-primary">Create your account</h1>
            <p className="mt-2 text-lg text-text-secondary">Free to start. Add your vehicle next.</p>
            <ErrorBanner />
            <form onSubmit={submitAccount} className="mt-7 space-y-5">
              <div>
                <label htmlFor="name" className="label">Full name</label>
                <input id="name" name="name" required autoComplete="name" value={account.name} onChange={(e) => setAccount((a) => ({ ...a, name: e.target.value }))} placeholder="Aarav Mehta" className="input-field" />
              </div>
              <div>
                <label htmlFor="signup-email" className="label">Email</label>
                <input id="signup-email" name="email" type="email" required autoComplete="email" value={account.email} onChange={(e) => setAccount((a) => ({ ...a, email: e.target.value }))} placeholder="you@example.com" className="input-field" />
              </div>
              <div>
                <label htmlFor="signup-password" className="label">Password (at least 6 characters)</label>
                <PasswordInput id="signup-password" name="password" autoComplete="new-password" minLength={6} value={account.password} onChange={(e) => setAccount((a) => ({ ...a, password: e.target.value }))} />
              </div>
              <label className="flex items-start gap-3 text-base text-text-secondary">
                <input type="checkbox" required className="mt-1 h-5 w-5 accent-[rgb(var(--color-accent))]" />
                <span>
                  I agree to the <Link to="/resources/terms-of-service" className="link-accent">Terms of Service</Link> and{" "}
                  <Link to="/resources/privacy-policy" className="link-accent">Privacy Policy</Link>
                </span>
              </label>
              <button type="submit" disabled={busy} className="btn-primary w-full py-4 text-lg">
                {busy ? "Creating account…" : "Continue"} {!busy && <ArrowRight size={20} />}
              </button>
            </form>
            <p className="mt-8 text-center text-lg text-text-secondary">
              Already have an account? <Link to="/login" className="link-accent">Log in</Link>
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="vehicle" {...slide} transition={{ duration: 0.25 }}>
            <h1 className="font-display text-4xl font-extrabold text-text-primary">Add your vehicle</h1>
            <p className="mt-2 text-lg text-text-secondary">Atlas uses this to match connectors and estimate range and cost.</p>
            <ErrorBanner />
            <form onSubmit={submitVehicle} className="mt-7 space-y-5">
              <div>
                <label htmlFor="preset" className="label">Popular EVs in India</label>
                <select id="preset" className="input-field" value="" onChange={pickPreset}>
                  <option value="">Choose to autofill (optional)</option>
                  {indianEVs.map((v) => <option key={v.make} value={v.make}>{v.make}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="model" className="label">Make and model</label>
                <input id="model" required value={vehicle.make} onChange={(e) => setVehicle((v) => ({ ...v, make: e.target.value }))} placeholder="e.g. Tata Nexon EV" className="input-field" />
              </div>
              <div>
                <span className="label">Connector type</span>
                <div className="flex flex-wrap gap-2">
                  {CONNECTORS.map((c) => (
                    <button key={c} type="button" onClick={() => setVehicle((v) => ({ ...v, connectorType: c }))}
                      className={`rounded-full border px-5 py-2.5 text-base font-medium transition-colors ${vehicle.connectorType === c ? "border-accent bg-accent/10 text-accent" : "border-border text-text-secondary hover:border-accent/50"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="battery" className="label">Battery (kWh)</label>
                  <input id="battery" type="number" step="0.1" min="1" value={vehicle.batteryKWh} onChange={(e) => setVehicle((v) => ({ ...v, batteryKWh: e.target.value }))} placeholder="40.5" className="input-field" />
                </div>
                <div>
                  <label htmlFor="range" className="label">Range (km)</label>
                  <input id="range" type="number" min="1" value={vehicle.rangeKm} onChange={(e) => setVehicle((v) => ({ ...v, rangeKm: e.target.value }))} placeholder="320" className="input-field" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1 py-4">Skip for now</button>
                <button type="submit" disabled={busy} className="btn-primary flex-1 py-4">{busy ? "Saving…" : "Save vehicle"}</button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="done" {...slide} transition={{ duration: 0.25 }}>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10"><CheckCircle2 size={34} className="text-accent" /></span>
            <h1 className="mt-6 font-display text-4xl font-extrabold text-text-primary">You're all set, {account.name.split(" ")[0]}</h1>
            <p className="mt-2 text-lg text-text-secondary">Your account is ready and you are signed in.</p>
            <div className="mt-7 space-y-3 rounded-md border border-border bg-bg-surface2 p-5 text-base">
              <Row label="Name" value={account.name} />
              <Row label="Email" value={account.email} />
              <Row label="Vehicle" value={vehicleSaved ? vehicle.make : "Not added yet"} />
            </div>
            <button type="button" onClick={() => navigate("/stations")} className="btn-primary mt-8 w-full py-4 text-lg">
              Find chargers <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-text-secondary">{label}</span>
      <span className="truncate font-semibold text-text-primary">{value}</span>
    </div>
  );
}
