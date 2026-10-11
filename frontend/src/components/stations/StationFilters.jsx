import { Search } from "lucide-react";

export const CHARGER_TYPES = ["All", "CCS", "CHAdeMO", "Type 2", "NACS"];

export default function StationFilters({ search, onSearch, chargerType, onChargerType, count }) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by name, area or network"
          aria-label="Search charging stations"
          className="input-field pl-12"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by charger type">
        {CHARGER_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChargerType(t)}
            aria-pressed={chargerType === t}
            className={`rounded-full border px-4 py-2 text-base font-medium transition-colors ${
              chargerType === t ? "border-accent bg-accent text-accent-contrast" : "border-border bg-bg-surface text-text-primary hover:border-accent/60"
            }`}
          >
            {t}
          </button>
        ))}
        <span className="ml-auto text-base text-text-secondary">{count} {count === 1 ? "station" : "stations"}</span>
      </div>
    </div>
  );
}
