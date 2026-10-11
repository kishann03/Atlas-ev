import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Compass, MapPin, Menu, X } from "lucide-react";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import UserAvatar from "@/components/common/UserAvatar";
import useAuth from "@/hooks/useAuth";

// Hash links use "/#id" so they also work when you are on another page.
const SECTION_LINKS = [
  { label: "Features", to: "/#features" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Why Atlas EV", to: "/#why-atlas-ev" },
];

const linkClass = "whitespace-nowrap rounded-full px-5 py-2.5 text-lg font-semibold text-text-primary transition-colors hover:bg-bg-surface2 hover:text-accent";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-bg-primary/90 backdrop-blur">
      <div className="container-page grid h-24 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left: logo */}
        <Link to="/" aria-label="Atlas EV home" className="justify-self-start">
          <Logo />
        </Link>

        {/* Centre: white pill */}
        <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border border-border bg-bg-surface px-3 py-2 shadow-card lg:flex">
          {SECTION_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </Link>
          ))}
          <NavLink
            to="/stations"
            className={({ isActive }) => `${linkClass} inline-flex items-center gap-2 ${isActive ? "bg-accent/10 text-accent" : ""}`}
          >
            <Compass size={20} /> Discover
          </NavLink>
        </nav>

        {/* Right: actions */}
        <div className="flex items-center justify-self-end gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link to="/stations" className="btn-primary hidden whitespace-nowrap px-5 py-3 text-base sm:inline-flex">
                <MapPin size={20} /> Find Chargers
              </Link>
              <UserAvatar />
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary hidden whitespace-nowrap px-6 py-3 text-lg sm:inline-flex">
                Log In
              </Link>
              <Link to="/stations" className="btn-primary hidden whitespace-nowrap px-5 py-3 text-base md:inline-flex">
                <MapPin size={20} /> Find Chargers
              </Link>
            </>
          )}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-bg-surface lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg-surface lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {SECTION_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="rounded-md px-3 py-3 text-lg font-semibold hover:bg-bg-surface2">
                {l.label}
              </Link>
            ))}
            <Link to="/stations" className="flex items-center gap-2 rounded-md px-3 py-3 text-lg font-semibold hover:bg-bg-surface2">
              <Compass size={20} /> Discover
            </Link>
            {!isAuthenticated && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link to="/login" className="btn-secondary">Log In</Link>
                <Link to="/signup" className="btn-primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
