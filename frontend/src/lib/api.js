import axios from "axios";

/**
 * Single axios instance for the whole app.
 * VITE_API_BASE_URL must point at the deployed backend's /api root,
 * e.g. https://atlas-ev-api.onrender.com/api
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT (saved by Login/Signup) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the server says the token is invalid/expired, clear the session so the
// UI falls back to the logged-out state instead of showing stale data.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || "";
    const isAuthCall = url.includes("/auth/");
    if (err.response?.status === 401 && !isAuthCall && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("atlas-auth-change"));
    }
    return Promise.reject(err);
  }
);

export default api;
