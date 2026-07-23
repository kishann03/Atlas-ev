export default function Stepper({ steps, current }) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={steps.length}>
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                i <= current ? "bg-accent" : "bg-border"
              }`}
            />
          </div>
        </div>
      ))}
      <span className="ml-2 text-xs text-text-tertiary">
        Step {current + 1} of {steps.length} &middot; {steps[current]}
      </span>
    </div>
  );
}
