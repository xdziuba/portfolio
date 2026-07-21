import type { VisualKind } from "@/content/projects";

/**
 * Procedural project visuals.
 *
 * No screenshots are fabricated anywhere on this site. Each drawing is a diagram of
 * what the project actually does, taken from the verified technical detail: the one
 * transport contract behind many protocols, the schema that constrains a model's
 * answer, the two-pass checkout, and so on.
 *
 * All are pure SVG — no images to download, no layout shift, legible at any size.
 */

const AXIS = "rgba(232,237,247,0.1)";

type VisualProps = { label: string };

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="h-full w-full"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* shared measurement field */}
      <g stroke={AXIS} strokeWidth="1">
        <path d="M0 40 H400 M0 200 H400" />
        <path d="M40 0 V240 M360 0 V240" />
      </g>
      {children}
    </svg>
  );
}

/** LumaShell — one interface, many protocols underneath. */
function TransportVisual({ label }: VisualProps) {
  const protocols = ["PTY", "SSH", "serial", "TCP/TLS", "Telnet", "WebSocket", "UDP", "docker exec"];
  return (
    <Frame label={label}>
      <rect x="40" y="104" width="96" height="32" rx="3" fill="none" stroke="#2fd3f5" strokeOpacity="0.7" />
      <text x="88" y="124" textAnchor="middle" fill="#7fe9ff" fontSize="12.5" fontFamily="monospace">
        Transport
      </text>
      {protocols.map((p, i) => {
        const y = 30 + i * 26;
        return (
          <g key={p}>
            <path
              d={`M136 120 C 190 120, 200 ${y}, 246 ${y}`}
              fill="none"
              stroke={i % 2 === 0 ? "#2fd3f5" : "#5b85ff"}
              strokeOpacity="0.32"
              strokeWidth="1"
            />
            <circle cx="246" cy={y} r="2.4" fill={i % 2 === 0 ? "#7fe9ff" : "#5b85ff"} fillOpacity="0.85" />
            <text x="258" y={y + 3.5} fill="#95a2ba" fontSize="12" fontFamily="monospace">
              {p}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/** What2Buy — free text in, schema-shaped data out. */
function AgentVisual({ label }: VisualProps) {
  return (
    <Frame label={label}>
      <text x="46" y="70" fill="#95a2ba" fontSize="12.5" fontFamily="monospace">
        &quot;quiet 27&quot; 4K monitor&quot;
      </text>
      <path d="M46 80 H176" stroke="#5b85ff" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 4" />

      <rect x="150" y="96" width="86" height="48" rx="3" fill="none" stroke="#2fd3f5" strokeOpacity="0.65" />
      <text x="193" y="116" textAnchor="middle" fill="#7fe9ff" fontSize="12" fontFamily="monospace">
        agent
      </text>
      <text x="193" y="132" textAnchor="middle" fill="#95a2ba" fontSize="11" fontFamily="monospace">
        + MCP tools
      </text>

      {/* the schema the answer is forced into */}
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect
            x={262}
            y={78 + row * 34}
            width="94"
            height="24"
            rx="2"
            fill="none"
            stroke="#7fe9ff"
            strokeOpacity={0.5 - row * 0.1}
          />
          <path
            d={`M236 120 C 250 120, 250 ${90 + row * 34}, 262 ${90 + row * 34}`}
            fill="none"
            stroke="#7fe9ff"
            strokeOpacity="0.28"
            strokeWidth="1"
          />
          <path d={`M270 ${90 + row * 34} H310`} stroke="#95a2ba" strokeOpacity="0.5" strokeWidth="1" />
          <path d={`M318 ${90 + row * 34} H346`} stroke="#5b85ff" strokeOpacity="0.6" strokeWidth="1" />
        </g>
      ))}
      <text x="262" y="196" fill="#78859e" fontSize="11" fontFamily="monospace">
        name · price · specs[]
      </text>
    </Frame>
  );
}

/** GeoPic — a coordinate becomes a place. */
function GeoVisual({ label }: VisualProps) {
  return (
    <Frame label={label}>
      <g stroke="#5b85ff" strokeOpacity="0.16" strokeWidth="1">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={`h${i}`} d={`M56 ${52 + i * 24} H240`} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={`v${i}`} d={`M${56 + i * 26} 52 V196`} />
        ))}
      </g>

      <circle cx="152" cy="118" r="34" fill="none" stroke="#2fd3f5" strokeOpacity="0.28" />
      <circle cx="152" cy="118" r="20" fill="none" stroke="#2fd3f5" strokeOpacity="0.45" />
      <circle cx="152" cy="118" r="4" fill="#7fe9ff" />
      <path d="M152 96 V80 M152 156 V140 M130 118 H114 M190 118 H174" stroke="#7fe9ff" strokeOpacity="0.7" strokeWidth="1" />

      <path d="M248 118 H286" stroke="#2fd3f5" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 4" />
      <text x="266" y="110" textAnchor="middle" fill="#78859e" fontSize="10.5" fontFamily="monospace">
        reverse
      </text>

      <text x="296" y="106" fill="#95a2ba" fontSize="11.5" fontFamily="monospace">
        50.0614 N
      </text>
      <text x="296" y="120" fill="#95a2ba" fontSize="11.5" fontFamily="monospace">
        19.9366 E
      </text>
      <path d="M296 128 H358" stroke="#7fe9ff" strokeOpacity="0.35" strokeWidth="1" />
      <text x="296" y="142" fill="#7fe9ff" fontSize="11.5" fontFamily="monospace">
        street, city
      </text>
    </Frame>
  );
}

/** CarPartsEShop — validate everything, then commit once. */
function LedgerVisual({ label }: VisualProps) {
  const rows = [
    { qty: "2", ok: true },
    { qty: "1", ok: true },
    { qty: "5", ok: true },
  ];
  return (
    <Frame label={label}>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="48" y={64 + i * 32} width="128" height="22" rx="2" fill="none" stroke={AXIS} />
          <text x="56" y={79 + i * 32} fill="#95a2ba" fontSize="11.5" fontFamily="monospace">
            line {i + 1} × {r.qty}
          </text>
          <path
            d={`M176 ${75 + i * 32} H214`}
            stroke="#2fd3f5"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        </g>
      ))}

      <rect x="214" y="60" width="58" height="98" rx="3" fill="none" stroke="#2fd3f5" strokeOpacity="0.6" />
      <text x="243" y="104" textAnchor="middle" fill="#7fe9ff" fontSize="11" fontFamily="monospace">
        stock
      </text>
      <text x="243" y="118" textAnchor="middle" fill="#7fe9ff" fontSize="11" fontFamily="monospace">
        check
      </text>

      <path d="M272 109 H316" stroke="#7fe9ff" strokeOpacity="0.55" strokeWidth="1.2" />
      <rect x="316" y="88" width="44" height="42" rx="3" fill="none" stroke="#5b85ff" strokeOpacity="0.7" />
      <text x="338" y="106" textAnchor="middle" fill="#5b85ff" fontSize="10.5" fontFamily="monospace">
        one
      </text>
      <text x="338" y="118" textAnchor="middle" fill="#5b85ff" fontSize="10.5" fontFamily="monospace">
        commit
      </text>
      <text x="48" y="186" fill="#78859e" fontSize="11" fontFamily="monospace">
        prices frozen onto the order line
      </text>
    </Frame>
  );
}

/** PyRadio — a stream becomes sound and a title. */
function WaveformVisual({ label }: VisualProps) {
  const bars = Array.from({ length: 44 }, (_, i) => {
    const t = i / 43;
    const env = Math.sin(t * Math.PI);
    const h = 8 + env * (26 + 22 * Math.abs(Math.sin(i * 1.9)));
    return { x: 52 + i * 7, h };
  });
  return (
    <Frame label={label}>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={118 - b.h / 2}
          width="3"
          height={b.h}
          rx="1.5"
          fill={i % 5 === 0 ? "#7fe9ff" : "#2fd3f5"}
          fillOpacity={i % 5 === 0 ? 0.85 : 0.4}
        />
      ))}
      <g stroke={AXIS} strokeWidth="1">
        <path d="M52 168 H360" />
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M${52 + i * 18} 168 V${i % 3 === 0 ? 158 : 163}`} />
        ))}
      </g>
      <text x="52" y="188" fill="#78859e" fontSize="11" fontFamily="monospace">
        ICY title
      </text>
      <path d="M104 184 H240" stroke="#7fe9ff" strokeOpacity="0.3" strokeWidth="1" />
      <circle cx="248" cy="184" r="2.5" fill="#7fe9ff" />
      <text x="52" y="66" fill="#95a2ba" fontSize="11.5" fontFamily="monospace">
        icecast stream
      </text>
    </Frame>
  );
}

const VISUALS: Record<VisualKind, (props: VisualProps) => React.ReactElement> = {
  transport: TransportVisual,
  agent: AgentVisual,
  geo: GeoVisual,
  ledger: LedgerVisual,
  waveform: WaveformVisual,
};

export function ProjectVisual({ variant, label }: { variant: VisualKind; label: string }) {
  const Visual = VISUALS[variant];
  return <Visual label={label} />;
}
