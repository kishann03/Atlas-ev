/**
 * Original SVG illustrations (no brand logos, no third-party artwork):
 * generic Indian-road EV body styles, a DC charger, and a highway scene.
 * Colours come from theme tokens, so they follow light/dark mode.
 */

const BODIES = {
  hatch: {
    body: "M10 74 V60 Q10 52 24 50 L56 46 Q72 20 100 18 H146 Q168 20 180 46 L208 50 Q228 54 228 66 V74 Z",
    windows: ["M82 26 H110 V46 H64 Z", "M116 26 H144 Q152 26 158 32 L168 46 H116 Z"],
    wheels: [58, 182],
  },
  suv: {
    body: "M8 76 V58 Q8 50 20 48 L52 44 L72 22 Q76 18 84 18 H156 Q164 18 170 24 L192 46 L218 50 Q232 54 232 64 V76 Z",
    windows: ["M76 26 H110 V44 H62 Z", "M118 26 H154 Q158 26 162 30 L178 44 H118 Z"],
    wheels: [60, 186],
  },
  sedan: {
    body: "M6 74 V62 Q6 54 20 52 L60 48 Q86 22 120 20 H152 Q170 22 184 46 L214 52 Q234 56 234 66 V74 Z",
    windows: ["M90 28 H116 V46 H72 Z", "M122 28 H150 Q158 28 164 34 L176 46 H122 Z"],
    wheels: [62, 184],
  },
};

/** Side-view car silhouette. variant: "hatch" | "suv" | "sedan". */
export function CarSilhouette({ variant = "suv", className = "", tone = "currentColor" }) {
  const car = BODIES[variant] || BODIES.suv;
  return (
    <svg viewBox="0 0 240 100" className={className} fill="none" aria-hidden="true">
      <path d={car.body} fill={tone} />
      {car.windows.map((d) => (
        <path key={d} d={d} fill="rgb(var(--color-bg-surface))" opacity="0.88" />
      ))}
      <rect x="205" y="56" width="20" height="5" rx="2.5" fill="rgb(var(--color-saffron))" opacity="0.9" />
      <rect x="10" y="58" width="9" height="5" rx="2.5" fill="rgb(var(--color-danger))" opacity="0.7" />
      {car.wheels.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="76" r="15" fill="rgb(var(--color-road))" />
          <circle cx={cx} cy="76" r="6.5" fill="rgb(var(--color-bg-raised))" />
        </g>
      ))}
    </svg>
  );
}

/** Free-standing DC fast charger with cable. */
export function ChargerShape({ className = "" }) {
  return (
    <svg viewBox="0 0 80 150" className={className} fill="none" aria-hidden="true">
      <rect x="10" y="6" width="52" height="124" rx="10" fill="rgb(var(--color-bg-surface))" stroke="rgb(var(--color-text-primary))" strokeWidth="3" />
      <rect x="18" y="16" width="36" height="28" rx="5" fill="rgb(var(--color-accent))" />
      <path d="M38 20 L28 33 H35 L32 41 L44 27 H37 Z" fill="rgb(var(--color-accent-contrast))" />
      <rect x="20" y="54" width="32" height="6" rx="3" fill="rgb(var(--color-border))" />
      <rect x="20" y="66" width="22" height="6" rx="3" fill="rgb(var(--color-border))" />
      <circle cx="46" cy="96" r="6" fill="rgb(var(--color-saffron))" />
      <rect x="2" y="130" width="68" height="10" rx="3" fill="rgb(var(--color-text-primary))" />
      <path d="M62 80 Q78 84 74 108 T66 140" stroke="rgb(var(--color-text-primary))" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Hero scene: highway sign, driving EV and a charging bay on an Indian highway. */
export function RoadScene({ className = "" }) {
  return (
    <svg viewBox="0 0 760 520" className={className} role="img" aria-label="Illustration of an electric SUV on a highway and a car charging at a bay">
      <rect width="760" height="520" rx="22" fill="rgb(var(--color-bg-surface2))" />
      <circle cx="610" cy="108" r="54" fill="rgb(var(--color-saffron))" opacity="0.28" />
      <path d="M0 330 Q90 250 180 300 T360 290 T560 280 T760 310 V420 H0 Z" fill="rgb(var(--color-ground))" />
      <path d="M0 360 Q120 310 240 345 T480 340 T760 350 V420 H0 Z" fill="rgb(var(--color-accent))" opacity="0.14" />

      {/* Highway sign */}
      <rect x="86" y="258" width="8" height="150" fill="rgb(var(--color-text-secondary))" />
      <rect x="226" y="258" width="8" height="150" fill="rgb(var(--color-text-secondary))" />
      <rect x="40" y="96" width="240" height="116" rx="8" fill="rgb(var(--color-accent))" />
      <rect x="48" y="104" width="224" height="100" rx="5" fill="none" stroke="rgb(var(--color-accent-contrast))" strokeWidth="2" opacity="0.7" />
      <text x="62" y="142" fontSize="34" fontWeight="700" fill="rgb(var(--color-accent-contrast))" fontFamily="Figtree, sans-serif">NH 48</text>
      <text x="62" y="172" fontSize="20" fill="rgb(var(--color-accent-contrast))" fontFamily="Figtree, sans-serif">Jaipur  12 km</text>
      <text x="62" y="196" fontSize="16" fill="rgb(var(--color-accent-contrast))" opacity="0.85" fontFamily="Figtree, sans-serif">EV charging  2 km</text>
      <rect x="86" y="212" width="8" height="48" fill="rgb(var(--color-text-secondary))" />
      <rect x="226" y="212" width="8" height="48" fill="rgb(var(--color-text-secondary))" />

      {/* Road */}
      <rect y="402" width="760" height="118" fill="rgb(var(--color-road))" />
      <rect y="402" width="760" height="5" fill="rgb(var(--color-bg-surface))" opacity="0.8" />
      <rect y="508" width="760" height="5" fill="rgb(var(--color-bg-surface))" opacity="0.8" />
      <line x1="0" y1="456" x2="760" y2="456" stroke="rgb(var(--color-saffron))" strokeWidth="5" strokeDasharray="40 40" className="animate-road-dash" />

      {/* Driving EV */}
      <g transform="translate(130 318) scale(1.05)">
        <CarGroup variant="suv" tone="rgb(var(--color-accent))" />
      </g>

      {/* Charging bay */}
      <rect x="430" y="398" width="330" height="8" fill="rgb(var(--color-bg-raised))" />
      <g transform="translate(446 316) scale(1.05)">
        <CarGroup variant="hatch" tone="rgb(var(--color-info))" />
      </g>
      <g transform="translate(686 256) scale(0.9)">
        <ChargerGroup />
      </g>
      <path d="M696 330 Q668 350 690 366 L700 366" fill="none" stroke="rgb(var(--color-text-primary))" strokeWidth="4" strokeLinecap="round" />
      <path d="M520 150 l-14 22 h12 l-6 20 l22 -28 h-13 l8 -14 z" fill="rgb(var(--color-saffron))" />
    </svg>
  );
}

// Group versions (inline SVG content) so cars/chargers can be nested in RoadScene.
function CarGroup({ variant, tone }) {
  const car = BODIES[variant];
  return (
    <g>
      <path d={car.body} fill={tone} />
      {car.windows.map((d) => (
        <path key={d} d={d} fill="rgb(var(--color-bg-surface))" opacity="0.88" />
      ))}
      <rect x="205" y="56" width="20" height="5" rx="2.5" fill="rgb(var(--color-saffron))" />
      {car.wheels.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="76" r="15" fill="rgb(var(--color-road))" stroke="rgb(var(--color-bg-surface2))" strokeWidth="2" />
          <circle cx={cx} cy="76" r="6.5" fill="rgb(var(--color-bg-raised))" />
        </g>
      ))}
    </g>
  );
}

function ChargerGroup() {
  return (
    <g>
      <rect x="10" y="6" width="52" height="124" rx="10" fill="rgb(var(--color-bg-surface))" stroke="rgb(var(--color-text-primary))" strokeWidth="3" />
      <rect x="18" y="16" width="36" height="28" rx="5" fill="rgb(var(--color-accent))" />
      <path d="M38 20 L28 33 H35 L32 41 L44 27 H37 Z" fill="rgb(var(--color-accent-contrast))" />
      <rect x="20" y="54" width="32" height="6" rx="3" fill="rgb(var(--color-border))" />
      <circle cx="46" cy="96" r="6" fill="rgb(var(--color-saffron))" />
      <rect x="2" y="130" width="68" height="10" rx="3" fill="rgb(var(--color-text-primary))" />
    </g>
  );
}

/* ---------- Line-art watermarks (use with a text colour + low opacity) ---------- */

export function WatermarkRoad({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M200 20 L20 290 M200 20 L380 290" />
      <path d="M200 20 L200 290" strokeDasharray="14 18" />
      <path d="M200 110 L112 290 M200 110 L288 290" strokeDasharray="2 22" opacity="0.5" />
      <rect x="150" y="2" width="100" height="26" rx="4" />
    </svg>
  );
}

export function WatermarkCharger({ className = "" }) {
  return (
    <svg viewBox="0 0 120 200" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="14" y="10" width="76" height="170" rx="14" />
      <rect x="28" y="26" width="48" height="42" rx="7" />
      <path d="M54 32 L40 50 H50 L46 62 L64 42 H54 Z" />
      <path d="M92 110 Q116 116 110 150 T98 192" />
      <path d="M4 182 H100" />
    </svg>
  );
}

export function WatermarkCar({ className = "", variant = "suv" }) {
  const car = BODIES[variant] || BODIES.suv;
  return (
    <svg viewBox="0 0 240 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" aria-hidden="true">
      <path d={car.body} />
      {car.windows.map((d) => (<path key={d} d={d} />))}
      {car.wheels.map((cx) => (<circle key={cx} cx={cx} cy="76" r="15" />))}
    </svg>
  );
}
