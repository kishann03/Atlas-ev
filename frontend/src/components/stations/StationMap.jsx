import { useMemo } from "react";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import useTheme from "@/hooks/useTheme";
import { WatermarkRoad } from "@/components/common/Illustrations";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const DEFAULT_CENTER = { lat: 26.9124, lng: 75.7873 }; // Jaipur

const PIN_COLOR = { Available: "#0b6b4a", Busy: "#b06208", Offline: "#be2a2a" };

const DARK_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#1e2422" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#a8b0aa" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#161b1a" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2f3835" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1211" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
];
const LIGHT_STYLE = [{ featureType: "poi", stylers: [{ visibility: "off" }] }];

function pinIcon(status, selected) {
  const color = PIN_COLOR[status] || PIN_COLOR.Offline;
  const size = selected ? 1.5 : 1.15;
  return {
    path: "M12 2C7.6 2 4 5.6 4 10c0 6 8 13 8 13s8-7 8-13c0-4.4-3.6-8-8-8z",
    fillColor: color,
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 2,
    scale: size,
    anchor: { x: 12, y: 23 },
  };
}

export default function StationMap({ stations, selectedId, onSelect }) {
  return API_KEY ? (
    <GoogleStationMap stations={stations} selectedId={selectedId} onSelect={onSelect} />
  ) : (
    <SchematicMap stations={stations} selectedId={selectedId} onSelect={onSelect} />
  );
}

function GoogleStationMap({ stations, selectedId, onSelect }) {
  const { isDark } = useTheme();
  const { isLoaded, loadError } = useJsApiLoader({ id: "atlas-google-maps", googleMapsApiKey: API_KEY });
  const selected = stations.find((s) => s._id === selectedId);
  const options = useMemo(
    () => ({ styles: isDark ? DARK_STYLE : LIGHT_STYLE, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }),
    [isDark]
  );

  if (loadError) {
    return <SchematicMap stations={stations} selectedId={selectedId} onSelect={onSelect} notice="Google Maps could not load. Showing a simple map instead." />;
  }
  if (!isLoaded) return <div className="h-full min-h-[24rem] animate-pulse rounded-md bg-bg-surface2" />;

  return (
    <GoogleMap mapContainerClassName="h-full min-h-[24rem] w-full rounded-md" center={selected ? selected.location : DEFAULT_CENTER} zoom={selected ? 14 : 11} options={options}>
      {stations.map((s) => (
        <MarkerF key={s._id} position={s.location} title={s.name} icon={pinIcon(s.availability, s._id === selectedId)} onClick={() => onSelect(s._id)} />
      ))}
      {selected && (
        <InfoWindowF position={selected.location} onCloseClick={() => onSelect(null)} options={{ pixelOffset: new window.google.maps.Size(0, -34) }}>
          <div style={{ color: "#161b1a", fontFamily: "Figtree, sans-serif" }}>
            <strong>{selected.name}</strong>
            <div>{selected.chargerType} · {selected.powerKW} kW</div>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

/** Used when no Google Maps key is set: plots pins by latitude/longitude. */
function SchematicMap({ stations, selectedId, onSelect, notice }) {
  // Frame the cluster of stations; far-away outliers (e.g. a highway plaza) are
  // pinned to the edge instead of squashing everything else together.
  const bounds = useMemo(() => {
    if (!stations.length) return null;
    const median = (arr) => [...arr].sort((a, b) => a - b)[Math.floor(arr.length / 2)];
    const mLat = median(stations.map((s) => s.location.lat));
    const mLng = median(stations.map((s) => s.location.lng));
    const core = stations.filter((s) => Math.abs(s.location.lat - mLat) < 0.3 && Math.abs(s.location.lng - mLng) < 0.3);
    const set = core.length ? core : stations;
    const lats = set.map((s) => s.location.lat);
    const lngs = set.map((s) => s.location.lng);
    const pad = 0.015;
    return { minLat: Math.min(...lats) - pad, maxLat: Math.max(...lats) + pad, minLng: Math.min(...lngs) - pad, maxLng: Math.max(...lngs) + pad };
  }, [stations]);
  const clamp = (v) => Math.min(94, Math.max(6, v));

  return (
    <div className="relative h-full min-h-[24rem] overflow-hidden rounded-md border border-border bg-bg-surface2" data-testid="schematic-map">
      <WatermarkRoad className="pointer-events-none absolute inset-0 m-auto h-full w-full text-accent opacity-[0.05]" />
      {bounds && stations.map((s) => {
        const x = clamp(((s.location.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng || 1)) * 100);
        const y = clamp((1 - (s.location.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat || 1)) * 80);
        const active = s._id === selectedId;
        return (
          <button
            key={s._id}
            type="button"
            onClick={() => onSelect(s._id)}
            title={s.name}
            aria-label={`${s.name}, ${s.availability}`}
            style={{ left: `${x}%`, top: `${y}%`, backgroundColor: PIN_COLOR[s.availability] || PIN_COLOR.Offline }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-card transition-transform ${active ? "z-10 h-9 w-9 scale-110 ring-4 ring-accent/30" : "h-6 w-6 hover:scale-125"}`}
          />
        );
      })}
      <p className="absolute bottom-3 left-3 right-3 rounded-sm bg-bg-surface/90 px-3 py-2 text-sm text-text-secondary">
        {notice || "Simple map view. Add a Google Maps API key to show the full interactive map."}
      </p>
    </div>
  );
}
