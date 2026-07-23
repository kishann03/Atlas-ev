import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Dashboard, Find Chargers, Station Details, Recommendation, Profile,
          and Admin routes are scoped for v2 once the backend is in place. */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
