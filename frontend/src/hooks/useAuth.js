import { useCallback, useEffect, useState } from "react";

function read() {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return token && user ? user : null;
  } catch {
    return null;
  }
}

export function saveSession({ token, user }) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("atlas-auth-change"));
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("atlas-auth-change"));
}

export function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/** Current user (or null) – updates on login, logout and expired tokens. */
export default function useAuth() {
  const [user, setUser] = useState(read);

  useEffect(() => {
    const sync = () => setUser(read());
    window.addEventListener("atlas-auth-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("atlas-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const logout = useCallback(() => clearSession(), []);

  return { user, isAuthenticated: !!user, logout, initials: initialsOf(user?.name) };
}
