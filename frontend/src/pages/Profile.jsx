import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CarFront, CheckCircle2, Lock, Trash2, User } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PasswordInput from "@/components/common/PasswordInput";
import api from "@/lib/api";
import { initialsOf } from "@/hooks/useAuth";
import { apiError } from "@/pages/Login";
import indianEVs from "@/data/indianEVs";

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "vehicles", label: "Vehicles", icon: CarFront },
  { id: "security", label: "Security", icon: Lock },
];
const CONNECTORS = ["CCS", "CHAdeMO", "Type 2", "NACS"];

function Notice({ type, children }) {
  if (!children) return null;
  const ok = type === "success";
  const Icon = ok ? CheckCircle2 : AlertCircle;
  return (
    <div role={ok ? "status" : "alert"} className={`flex items-start gap-3 rounded-md border p-4 text-base ${ok ? "border-accent/40 bg-accent/10 text-accent" : "border-danger/40 bg-danger/10 text-danger"}`}>
      <Icon size={22} className="mt-0.5 shrink-0" /> {children}
    </div>
  );
}

export default function Profile() {
  const [tab, setTab] = useState("account");
  const [profile, setProfile] = useState(null);
  const [loadError, setLoadError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await api.get("/user/profile");
      setProfile(res.data.data.user);
    } catch (err) {
      if (err.response?.status !== 401) setLoadError(apiError(err));
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <MainLayout>
      <div className="container-page py-8 md:py-12">
        <h1 className="font-display text-4xl font-extrabold text-text-primary">Your profile</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit rounded-md border border-border bg-bg-surface p-4 shadow-card">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-accent-contrast">{initialsOf(profile?.name)}</span>
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-text-primary">{profile?.name || "…"}</p>
                <p className="truncate text-sm text-text-secondary">{profile?.email}</p>
              </div>
            </div>
            <nav aria-label="Profile sections" className="mt-3 flex gap-2 overflow-x-auto lg:flex-col">
              {TABS.map((t) => (
                <button key={t.id} type="button" onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}
                  className={`flex items-center gap-3 whitespace-nowrap rounded-sm px-4 py-3 text-lg font-semibold transition-colors ${tab === t.id ? "bg-accent text-accent-contrast" : "text-text-primary hover:bg-bg-surface2"}`}>
                  <t.icon size={22} /> {t.label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="rounded-md border border-border bg-bg-surface p-6 shadow-card md:p-8">
            {loadError && <Notice type="error">{loadError}</Notice>}
            {!profile && !loadError && <div className="h-40 animate-pulse rounded-md bg-bg-surface2" />}
            {profile && tab === "account" && <AccountTab profile={profile} />}
            {profile && tab === "vehicles" && <VehiclesTab vehicles={profile.vehicles} onChange={(vehicles) => setProfile((p) => ({ ...p, vehicles }))} />}
            {profile && tab === "security" && <SecurityTab />}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

function AccountTab({ profile }) {
  const since = profile.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : "";
  const rows = [["Name", profile.name], ["Email", profile.email], ["Member since", since], ["Saved vehicles", String(profile.vehicles.length)]];
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary">Account details</h2>
      <dl className="mt-5 divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
            <dt className="text-lg text-text-secondary">{k}</dt>
            <dd className="text-lg font-semibold text-text-primary">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const EMPTY = { make: "", connectorType: "CCS", batteryKWh: "", rangeKm: "" };

function VehiclesTab({ vehicles, onChange }) {
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const add = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await api.post("/user/vehicles", form);
      onChange(res.data.data.vehicles);
      setForm(EMPTY);
      setMsg({ type: "success", text: "Vehicle added." });
    } catch (err) {
      setMsg({ type: "error", text: apiError(err) });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    setMsg({ type: "", text: "" });
    try {
      const res = await api.delete(`/user/vehicles/${id}`);
      onChange(res.data.data.vehicles);
    } catch (err) {
      setMsg({ type: "error", text: apiError(err) });
    }
  };

  const preset = (e) => {
    const p = indianEVs.find((v) => v.make === e.target.value);
    if (p) setForm({ ...p });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary">Your vehicles</h2>
      {vehicles.length === 0 ? (
        <p className="mt-3 text-lg text-text-secondary">No vehicles yet. Add one below so Atlas can match chargers to your car.</p>
      ) : (
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {vehicles.map((v) => (
            <li key={v.id} data-testid="vehicle-item" className="flex items-start justify-between gap-3 rounded-md border border-border bg-bg-surface2 p-4">
              <div>
                <p className="text-lg font-bold text-text-primary">{v.make}</p>
                <p className="mt-1 text-base text-text-secondary">
                  {v.connectorType}{v.batteryKWh ? ` · ${v.batteryKWh} kWh` : ""}{v.rangeKm ? ` · ${v.rangeKm} km range` : ""}
                </p>
              </div>
              <button type="button" onClick={() => remove(v.id)} aria-label={`Remove ${v.make}`} className="rounded-full p-2 text-danger hover:bg-danger/10">
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-8 text-xl font-bold text-text-primary">Add a vehicle</h3>
      <div className="mt-3 max-w-2xl"><Notice type={msg.type}>{msg.text}</Notice></div>
      <form onSubmit={add} className="mt-4 grid max-w-2xl gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="p-preset" className="label">Popular EVs in India</label>
          <select id="p-preset" value="" onChange={preset} className="input-field">
            <option value="">Choose to autofill (optional)</option>
            {indianEVs.map((v) => <option key={v.make} value={v.make}>{v.make}</option>)}
          </select>
          <p className="mt-1 text-sm text-text-tertiary">Battery and range are approximate claimed figures. Edit them to match your car.</p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="p-make" className="label">Make and model</label>
          <input id="p-make" required value={form.make} onChange={(e) => setForm((f) => ({ ...f, make: e.target.value }))} placeholder="e.g. Tata Nexon EV" className="input-field" />
        </div>
        <div>
          <label htmlFor="p-conn" className="label">Connector type</label>
          <select id="p-conn" value={form.connectorType} onChange={(e) => setForm((f) => ({ ...f, connectorType: e.target.value }))} className="input-field">
            {CONNECTORS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="p-batt" className="label">Battery (kWh)</label>
            <input id="p-batt" type="number" step="0.1" min="1" value={form.batteryKWh} onChange={(e) => setForm((f) => ({ ...f, batteryKWh: e.target.value }))} className="input-field" />
          </div>
          <div>
            <label htmlFor="p-range" className="label">Range (km)</label>
            <input id="p-range" type="number" min="1" value={form.rangeKm} onChange={(e) => setForm((f) => ({ ...f, rangeKm: e.target.value }))} className="input-field" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <button type="submit" disabled={busy} className="btn-primary px-8">{busy ? "Adding…" : "Add vehicle"}</button>
        </div>
      </form>
    </div>
  );
}

function SecurityTab() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    if (form.newPassword !== form.confirm) {
      setMsg({ type: "error", text: "New password and confirmation do not match." });
      return;
    }
    setBusy(true);
    try {
      await api.patch("/user/password", { currentPassword: form.currentPassword, newPassword: form.newPassword });
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
      setMsg({ type: "success", text: "Password updated. Use it the next time you log in." });
    } catch (err) {
      setMsg({ type: "error", text: apiError(err) });
    } finally {
      setBusy(false);
    }
  };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold text-text-primary">Change password</h2>
      <div className="mt-4"><Notice type={msg.type}>{msg.text}</Notice></div>
      <form onSubmit={submit} className="mt-5 space-y-5">
        <div>
          <label htmlFor="cur" className="label">Current password</label>
          <PasswordInput id="cur" name="currentPassword" autoComplete="current-password" value={form.currentPassword} onChange={set("currentPassword")} />
        </div>
        <div>
          <label htmlFor="new" className="label">New password (at least 6 characters)</label>
          <PasswordInput id="new" name="newPassword" autoComplete="new-password" minLength={6} value={form.newPassword} onChange={set("newPassword")} />
        </div>
        <div>
          <label htmlFor="conf" className="label">Confirm new password</label>
          <PasswordInput id="conf" name="confirm" autoComplete="new-password" minLength={6} value={form.confirm} onChange={set("confirm")} />
        </div>
        <button type="submit" disabled={busy} className="btn-primary px-8">{busy ? "Updating…" : "Update password"}</button>
      </form>
    </div>
  );
}
