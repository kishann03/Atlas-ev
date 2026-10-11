import { useEffect, useState } from "react";
import api from "@/lib/api";

/** Loads stations from the protected API; search is debounced. */
export default function useStations({ search, chargerType }) {
  const [state, setState] = useState({ stations: [], loading: true, error: "", unauthorized: false });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: "" }));

    const timer = setTimeout(async () => {
      try {
        const params = {};
        if (search.trim()) params.search = search.trim();
        if (chargerType !== "All") params.chargerType = chargerType;
        const res = await api.get("/stations", { params });
        if (!cancelled) {
          setState({ stations: res.data.data.stations, loading: false, error: "", unauthorized: false });
        }
      } catch (err) {
        if (cancelled) return;
        const unauthorized = err.response?.status === 401;
        setState({
          stations: [],
          loading: false,
          unauthorized,
          error: unauthorized
            ? ""
            : err.response?.data?.message || "Could not reach the server. Check your connection and try again.",
        });
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search, chargerType]);

  return state;
}
