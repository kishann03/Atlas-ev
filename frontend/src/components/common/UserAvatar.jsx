import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";

/** Circle with the user's initials; opens a small account menu. */
export default function UserAvatar() {
  const { user, initials, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        data-testid="user-avatar"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${user.name}`}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-contrast shadow-card transition-transform hover:scale-105"
      >
        {initials}
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-md border border-border bg-bg-surface shadow-pop">
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-base font-semibold text-text-primary">{user.name}</p>
            <p className="truncate text-sm text-text-secondary">{user.email}</p>
          </div>
          <Link to="/profile" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-base text-text-primary hover:bg-bg-surface2">
            <User size={18} /> View profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logout();
              navigate("/");
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-base text-danger hover:bg-bg-surface2"
          >
            <LogOut size={18} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}
