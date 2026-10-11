const STYLES = {
  Available: "bg-accent/12 text-accent",
  Busy: "bg-warning/15 text-warning",
  Offline: "bg-danger/12 text-danger",
};

export default function AvailabilityBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${STYLES[status] || STYLES.Offline}`}>
      <span className="h-2 w-2 rounded-full bg-current" /> {status}
    </span>
  );
}
