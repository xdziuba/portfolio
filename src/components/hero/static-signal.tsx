/**
 * The no-WebGL rendering of the hero object, and what shows while the 3D bundle
 * loads. It is a designed drawing, not a grey box: same composition as the scene —
 * loose wave in from the left, core, structured lattice out to the right — so the
 * hero communicates the same idea before (or without) any WebGL at all.
 *
 * Pure SVG, no JavaScript, no animation dependency.
 */
export function StaticSignal({ className, label }: { className?: string; label: string }) {
  const lattice: { x: number; y: number }[] = [];
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 4; row++) {
      lattice.push({ x: 505 + col * 34, y: 148 + (row - 1.5) * 32 });
    }
  }

  return (
    <svg
      viewBox="0 0 720 300"
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="sig-line" x1="0" y1="0" x2="720" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3c6bff" stopOpacity="0.1" />
          <stop offset="0.35" stopColor="#2fd3f5" stopOpacity="0.85" />
          <stop offset="1" stopColor="#7fe9ff" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="sig-core" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#7fe9ff" stopOpacity="0.34" />
          <stop offset="0.6" stopColor="#2fd3f5" stopOpacity="0.12" />
          <stop offset="1" stopColor="#2fd3f5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* frequency rings */}
      <g stroke="#2fd3f5" fill="none">
        <ellipse cx="360" cy="150" rx="118" ry="42" strokeOpacity="0.22" strokeWidth="1" />
        <ellipse cx="360" cy="150" rx="86" ry="86" strokeOpacity="0.14" strokeWidth="1" />
        <ellipse cx="360" cy="150" rx="46" ry="112" strokeOpacity="0.1" strokeWidth="1" />
      </g>

      <circle cx="360" cy="150" r="96" fill="url(#sig-core)" />

      {/* the core, faceted rather than spherical */}
      <path
        d="M360 96 L404 124 L404 176 L360 204 L316 176 L316 124 Z"
        fill="none"
        stroke="#7fe9ff"
        strokeOpacity="0.75"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M360 96 L360 204 M316 124 L404 176 M404 124 L316 176"
        stroke="#2fd3f5"
        strokeOpacity="0.28"
        strokeWidth="1"
      />

      {/* loose input wave -> flat carrier out */}
      <path
        d="M18 150 H84 L104 150 L118 118 L132 182 L146 136 L160 164 L174 150 H250 L272 150 L288 132 L302 168 L316 150"
        fill="none"
        stroke="url(#sig-line)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M404 150 H702" stroke="#7fe9ff" strokeOpacity="0.2" strokeWidth="1.2" strokeDasharray="2 6" />

      {/* structured output */}
      <g>
        {lattice.map((n, i) => (
          <rect
            key={i}
            x={n.x - 3}
            y={n.y - 3}
            width="6"
            height="6"
            fill={i % 3 === 0 ? "#7fe9ff" : "#5b85ff"}
            fillOpacity={i % 3 === 0 ? 0.7 : 0.4}
          />
        ))}
      </g>

      {/* measurement ticks — instrumentation, not decoration */}
      <g stroke="#e8edf7" strokeOpacity="0.12" strokeWidth="1">
        <path d="M18 262 H702" />
        {Array.from({ length: 25 }, (_, i) => (
          <path key={i} d={`M${18 + i * 28.5} 262 V${i % 5 === 0 ? 252 : 257}`} />
        ))}
      </g>
    </svg>
  );
}
