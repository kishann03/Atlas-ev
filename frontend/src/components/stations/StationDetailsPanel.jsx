import { Building2, Navigation, PlugZap, X, Zap, IndianRupee } from "lucide-react";
import AvailabilityBadge from "./AvailabilityBadge";

export const directionsUrl = (s) =>
  `https://www.google.com/maps/dir/?api=1&destination=${s.location.lat},${s.location.lng}`;

export default function StationDetailsPanel({ station, onClose }) {
  if (!station) return null;
  const facts = [
    { icon: PlugZap, label: "Connector", value: station.chargerType },
    { icon: Zap, label: "Power", value: `${station.powerKW} kW` },
    { icon: IndianRupee, label: "Price", value: `₹${station.pricePerKWh} per kWh` },
    { icon: Building2, label: "Network", value: station.network },
  ];
  return (
    <section aria-label="Station details" data-testid="station-details" className="rounded-md border border-accent/40 bg-bg-surface p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-display text-2xl font-extrabold leading-snug text-text-primary">{station.name}</h2>
        <button type="button" onClick={onClose} aria-label="Close details" className="rounded-full p-1.5 text-text-secondary hover:bg-bg-surface2">
          <X size={22} />
        </button>
      </div>
      <p className="mt-1 text-base text-text-secondary">{station.address}</p>
      <div className="mt-3"><AvailabilityBadge status={station.availability} /></div>
      <dl className="mt-5 grid grid-cols-2 gap-3">
        {facts.map((f) => (
          <div key={f.label} className="rounded-sm bg-bg-surface2 p-3">
            <dt className="flex items-center gap-1.5 text-sm text-text-secondary"><f.icon size={16} /> {f.label}</dt>
            <dd className="mt-1 text-base font-bold text-text-primary">{f.value}</dd>
          </div>
        ))}
      </dl>
      <a href={directionsUrl(station)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full py-3.5">
        <Navigation size={20} /> Get Directions
      </a>
    </section>
  );
}
