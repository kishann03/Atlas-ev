import StationCard from "./StationCard";

export default function StationList({ stations, selectedId, onSelect, loading, error }) {
  if (loading) {
    return (
      <div className="space-y-3" aria-busy="true">
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-28 animate-pulse rounded-md bg-bg-surface2" />)}
      </div>
    );
  }
  if (error) {
    return <p role="alert" className="rounded-md border border-danger/40 bg-danger/10 p-4 text-base text-danger">{error}</p>;
  }
  if (!stations.length) {
    return (
      <div className="rounded-md border border-dashed border-border p-6 text-center">
        <p className="text-lg font-semibold text-text-primary">No stations match</p>
        <p className="mt-1 text-base text-text-secondary">Clear the search or choose a different charger type.</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {stations.map((s) => (
        <StationCard key={s._id} station={s} selected={s._id === selectedId} onSelect={onSelect} />
      ))}
    </div>
  );
}
