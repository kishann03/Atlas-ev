import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import PasswordInput from "@/components/common/PasswordInput";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // No backend yet — simulate auth and route to dashboard placeholder.
    setTimeout(() => {
      setSubmitting(false);
      navigate("/");
    }, 700);
  };

  return (
    <AuthLayout
      quote="I stopped checking three apps before a road trip. Atlas just tells me which station won't waste my time."
      author="Priya Sharma"
      role="Tata Nexon EV owner"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-2xl font-semibold text-text-primary">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Log in to see your ranked chargers for right now.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-primary">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                Password
              </label>
              <a href="#" className="link-accent text-xs">
                Forgot password?
              </a>
            </div>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded-sm border-border bg-bg-surface2 accent-accent"
            />
            Remember me for 30 days
          </label>

          <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 text-base">
            {submitting ? "Logging in…" : "Log In"}
            {!submitting && <ArrowRight size={17} />}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-text-tertiary">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <button type="button" className="btn-secondary w-full py-3.5">
          <GoogleIcon />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-text-secondary">
          New here?{" "}
          <Link to="/signup" className="link-accent font-medium">
            Create an account
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.4c-2 1.5-4.6 2.5-7.7 2.5-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4 5.5l6.6 5.4C41.6 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
