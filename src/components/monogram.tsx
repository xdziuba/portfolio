/**
 * Identity mark.
 *
 * Not initials: the glyph is the site's thesis at 28px. A flat line enters on the
 * left, breaks into a spike at the centre, and leaves as evenly spaced steps —
 * unstructured in, structured out. The same drawing is used for the favicon.
 *
 * The GitHub profile avatar is deliberately not used anywhere: it is the default
 * generated identicon, and it is purple, which fights the palette.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="3.25"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <path
        d="M4 20 H10 L12.5 20 L14.5 9.5 L17 24 L19 16 H21"
        stroke="url(#monogram-signal)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Structured output: three discrete, evenly spaced ticks. */}
      <path d="M23.5 13.5 V22.5" stroke="#7fe9ff" strokeOpacity="0.9" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M26.5 15.5 V20.5" stroke="#5b85ff" strokeOpacity="0.75" strokeWidth="1.7" strokeLinecap="round" />
      <defs>
        <linearGradient id="monogram-signal" x1="4" y1="16" x2="21" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5b85ff" />
          <stop offset="0.55" stopColor="#2fd3f5" />
          <stop offset="1" stopColor="#7fe9ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
