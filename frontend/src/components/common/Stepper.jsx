export default function Stepper({ steps, current }) {
  return (
    <div className="flex items-center gap-3" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={steps.length}>
      <div className="flex gap-2">
        {steps.map((label, i) => (
          <span key={label} className={`h-2 w-9 rounded-full transition-colors duration-300 ${i <= current ? "bg-accent" : "bg-border"}`} />
        ))}
      </div>
      <span className="text-sm text-text-secondary">
        Step {current + 1} of {steps.length}: {steps[current]}
      </span>
    </div>
  );
}
