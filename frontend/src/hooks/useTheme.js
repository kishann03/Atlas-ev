import { useCallback, useEffect, useState } from "react";

const KEY = "atlas-ev-theme";

function readTheme() {
  try {
    return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

/** Light is the default. The choice is stored and applied as data-theme on <html>. */
export default function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Keep several mounted toggles (navbar + mobile menu) in sync.
  useEffect(() => {
    const onChange = (e) => setTheme(e.detail);
    window.addEventListener("atlas-theme-change", onChange);
    return () => window.removeEventListener("atlas-theme-change", onChange);
  }, []);

  const set = useCallback((next) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable – theme still applies for this visit */
    }
    window.dispatchEvent(new CustomEvent("atlas-theme-change", { detail: next }));
  }, []);

  const toggle = useCallback(() => set(theme === "dark" ? "light" : "dark"), [theme, set]);

  return { theme, toggle, isDark: theme === "dark" };
}
