import { PlugZap, Zap } from "lucide-react";
import AvailabilityBadge from "./AvailabilityBadge";

export default function StationCard({ station, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(station._id)}
      aria-pressed={selected}
      data-testid="station-card"
      className={`w-full rounded-md border p-4 text-left transition-colors ${
        selected ? "border-accent bg-accent/[0.07]" : "border-border bg-bg-surface hover:border-accent/50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold leading-snug text-text-primary">{station.name}</h3>
        <AvailabilityBadge status={station.availability} />
      </div>
      <p className="mt-1 text-base text-text-secondary">{station.address}</p>
      <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-base font-medium text-text-primary">
        <span className="flex items-center gap-1.5"><PlugZap size={18} className="text-accent" /> {station.chargerType}</span>
        <span className="flex items-center gap-1.5"><Zap size={18} className="text-accent" /> {station.powerKW} kW</span>
        <span>₹{station.pricePerKWh}/kWh</span>
      </p>
    </button>
  );
}
