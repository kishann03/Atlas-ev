import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import PasswordInput from "@/components/common/PasswordInput";
import api from "@/lib/api";
import { saveSession } from "@/hooks/useAuth";

export const apiError = (err, fallback = "Something went wrong. Please try again.") =>
  err.response?.data?.message || (err.request ? "Could not reach the server. Check your connection and try again." : fallback);

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/login", { email: form.email, password: form.password });
      saveSession(res.data.data);
      navigate(location.state?.from || "/stations", { replace: true });
    } catch (err) {
      setError(apiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      quote="I stopped checking three apps before a road trip. Atlas just tells me which station won't waste my time."
      author="Priya Sharma"
      role="Tata Nexon EV owner"
    >
      <h1 className="font-display text-4xl font-extrabold text-text-primary">Welcome back</h1>
      <p className="mt-2 text-lg text-text-secondary">Log in to see ranked chargers near you.</p>

      {error && (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-md border border-danger/40 bg-danger/10 p-4 text-base text-danger">
          <AlertCircle size={22} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field" />
        </div>
        <div>
          <label htmlFor="password" className="label">Password</label>
          <PasswordInput id="password" name="password" autoComplete="current-password" value={form.password} onChange={handleChange} />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-lg">
          {submitting ? "Logging in…" : "Log In"} {!submitting && <ArrowRight size={20} />}
        </button>
      </form>

      <p className="mt-8 text-center text-lg text-text-secondary">
        New to Atlas EV? <Link to="/signup" className="link-accent">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
