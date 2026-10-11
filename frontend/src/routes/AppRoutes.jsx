import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ChargingStations from "@/pages/ChargingStations";
import Profile from "@/pages/Profile";
import ResourceInfo from "@/pages/ResourceInfo";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/stations" element={<ChargingStations />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/resources/:slug" element={<ResourceInfo />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
