import { CarSilhouette } from "@/components/common/Illustrations";

const CARS = [
  { variant: "hatch", label: "City hatchbacks", note: "Type 2 AC at home, CCS on the go" },
  { variant: "suv", label: "Compact SUVs", note: "Most carry a CCS2 fast-charge port" },
  { variant: "sedan", label: "Sedans and crossovers", note: "Larger packs need higher-power chargers" },
];

export default function VehicleStrip() {
  return (
    <section className="border-y border-border bg-bg-surface2 py-10">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="font-display text-3xl font-bold text-text-primary">Made for the EVs on Indian roads</h2>
          <p className="mt-3 text-lg text-text-secondary">
            Pick your car once. Atlas EV filters out chargers it cannot use and estimates cost for your battery.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {CARS.map((c) => (
            <div key={c.label} className="rounded-md bg-bg-surface p-5 shadow-card">
              <CarSilhouette variant={c.variant} tone="rgb(var(--color-accent))" className="h-20 w-full" />
              <p className="mt-3 text-lg font-bold text-text-primary">{c.label}</p>
              <p className="mt-1 text-base text-text-secondary">{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
