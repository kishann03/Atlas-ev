import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StationMap from "@/components/stations/StationMap";
import StationList from "@/components/stations/StationList";
import StationFilters from "@/components/stations/StationFilters";
import StationDetailsPanel from "@/components/stations/StationDetailsPanel";
import useStations from "@/hooks/useStations";
import useAuth from "@/hooks/useAuth";

export default function ChargingStations() {
  const { isAuthenticated } = useAuth();
  return <MainLayout>{isAuthenticated ? <StationsView /> : <LoginGate />}</MainLayout>;
}

function LoginGate() {
  return (
    <div className="container-page py-20">
      <div className="mx-auto max-w-xl rounded-lg border border-border bg-bg-surface p-10 text-center shadow-card">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent"><Lock size={30} /></span>
        <h1 className="mt-6 font-display text-4xl font-extrabold text-text-primary">Log in to find chargers</h1>
        <p className="mt-3 text-lg text-text-secondary">Charger search is available to signed-in drivers. It takes under a minute to create an account.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/login" state={{ from: "/stations" }} className="btn-primary px-8">Log In</Link>
          <Link to="/signup" className="btn-secondary px-8">Create account</Link>
        </div>
      </div>
    </div>
  );
}

function StationsView() {
  const [search, setSearch] = useState("");
  const [chargerType, setChargerType] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const { stations, loading, error, unauthorized } = useStations({ search, chargerType });

  // An expired token: the API interceptor clears the session, which swaps to the gate.
  const selected = stations.find((s) => s._id === selectedId) || null;
  useEffect(() => {
    if (selectedId && !loading && !selected) setSelectedId(null);
  }, [selectedId, selected, loading]);

  if (unauthorized) return <LoginGate />;

  return (
    <div className="container-page py-8">
      <h1 className="font-display text-4xl font-extrabold text-text-primary">Find a charger</h1>
      <p className="mt-2 text-lg text-text-secondary">Search, filter by connector, and open directions in Google Maps.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_440px]">
        <div className="order-2 h-[32rem] lg:order-1 lg:h-[calc(100vh-17rem)] lg:min-h-[36rem]">
          <StationMap stations={stations} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <div className="order-1 space-y-5 lg:order-2 lg:max-h-[calc(100vh-17rem)] lg:overflow-y-auto lg:pr-1">
          <StationFilters search={search} onSearch={setSearch} chargerType={chargerType} onChargerType={setChargerType} count={stations.length} />
          <StationDetailsPanel station={selected} onClose={() => setSelectedId(null)} />
          <StationList stations={stations} selectedId={selectedId} onSelect={setSelectedId} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
