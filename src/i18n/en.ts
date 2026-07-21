import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "Paweł Dziuba — Junior Full-stack AI Developer",
    description:
      "Junior Full-stack AI Developer working on AI-powered web applications, terminal and desktop tooling, and the APIs underneath. Selected projects in TypeScript, Python and C#.",
    keywords: [
      "junior full-stack developer",
      "AI developer",
      "full-stack developer",
      "TypeScript",
      "Python",
      "C#",
      "FastAPI",
      "ASP.NET Core",
      "React",
      "Vue",
      "Electron",
      "LangChain",
    ],
    // Used as the Person description in JSON-LD. Deliberately does not repeat "AI"
    // after the job title already carries it.
    role: "Junior Full-stack AI Developer working across web applications, desktop tooling and backend APIs",
  },

  nav: {
    ariaLabel: "Main",
    links: [
      { href: "#work", label: "Work" },
      { href: "#stack", label: "Stack" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    github: "GitHub",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "back to top",
    skipToContent: "Skip to content",
    newTab: "(opens in a new tab)",
    languageLabel: "Language",
  },

  hero: {
    eyebrow: "Junior Full-stack AI Developer",
    headline: ["Signal in,", "structure out."],
    lede: "I build software that takes something loose — a question in plain language, a GPS fix, a raw byte stream — and returns something typed, checkable and useful. Backend APIs, web and desktop interfaces, and the AI plumbing between them.",
    primaryCta: "Selected work",
    status: { label: "Most recent", value: "LumaShell 1.0.0", detail: "released 19 Jul 2026" },
    chain: [
      { k: "01", t: "Input", d: "unstructured" },
      { k: "02", t: "Transform", d: "typed + validated" },
      { k: "03", t: "Output", d: "something usable" },
    ],
  },

  work: {
    index: "01",
    label: "Selected work",
    title: "Five projects, five different problems.",
    intro:
      "Each one is described from what the source actually does. Where a repository is coursework or a thesis project, it says so.",
    featured: "Featured",
    oneDetail: "One detail",
    viewOn: "View {project} on GitHub",
    liveDemo: "Live demo",
    updated: "updated",
    srLanguage: "Language",
    srUpdated: "Last updated",
    srStars: "Stars",
    chainIn: "in",
    chainTransform: "transform",
    chainOut: "out",
  },

  stack: {
    index: "02",
    label: "Technical profile",
    title: "What I actually reach for.",
    intro:
      "Grouped by the kind of problem rather than by language, with the repositories that show each one in use.",
    seenIn: "Seen in",
    repoNewTab: "(repository, opens in a new tab)",
    capabilities: [
      {
        id: "interfaces",
        title: "Interfaces",
        note: "Application UI across web and desktop, including a terminal surface that has to stay fast under continuous output.",
        items: ["React 19", "Vue 3", "Quasar", "xterm.js (WebGL)", "Leaflet", "DearPyGui", "NiceGUI", "Bootstrap"],
        evidence: ["lumashell", "what2buy", "geopic", "pyradio"],
      },
      {
        id: "ai",
        title: "AI integration",
        note: "Model calls constrained by schemas and permissions, rather than free-form prompting — structured output, tool allowlists and approval gates before anything mutates.",
        items: [
          "LangChain / LangGraph",
          "OpenAI gpt-4o",
          "Anthropic Messages API",
          "Model Context Protocol",
          "Local models (Ollama / LM Studio)",
          "Structured output (Pydantic)",
        ],
        evidence: ["what2buy", "lumashell"],
      },
      {
        id: "backend",
        title: "APIs and backend",
        note: "Typed request/response layers with authentication, validation and a service layer between the controller and the database.",
        items: ["FastAPI", "ASP.NET Core 8", "Entity Framework Core", "JWT / role claims", "Pydantic", "REST + Swagger"],
        evidence: ["what2buy", "carpartseshop"],
      },
      {
        id: "systems",
        title: "Systems and protocols",
        note: "Talking to things that are not HTTP: pseudo-terminals, SSH sessions, serial ports, raw sockets and audio streams.",
        items: ["node-pty", "ssh2", "serialport", "TCP / TLS / Telnet / UDP", "WebSocket", "Icecast / ICY", "Windows Core Audio"],
        evidence: ["lumashell", "pyradio"],
      },
      {
        id: "data",
        title: "Data and storage",
        note: "Getting data out of places it was not meant to leave, and modelling it once it lands.",
        items: ["Cloud Firestore", "T-SQL", "Temporal tables and triggers", "OPENJSON / typed XML", "BeautifulSoup", "pandas", "matplotlib"],
        evidence: ["geopic", "advanced-databases", "ceneoscrapern11"],
      },
      {
        id: "delivery",
        title: "Packaging and delivery",
        note: "Getting a project to run somewhere other than the machine it was written on.",
        items: ["Docker / Compose", "nginx", "electron-builder", "Service Workers", "GitHub Pages", "xUnit"],
        evidence: ["what2buy", "carpartseshop", "lumashell"],
      },
    ],
  },

  about: {
    index: "03",
    label: "About",
    title: "How I tend to work.",
    paragraphs: [
      "I work across the stack, with most of my time going to the parts that connect things: an API contract, a transport layer, a schema that forces a model's answer into a shape the frontend can trust.",
      "That interest shows up consistently in the repositories. What2Buy constrains an LLM to a Pydantic schema instead of parsing prose. LumaShell hides eight different session protocols behind one byte-stream interface. GeoPic turns raw coordinates into an address before storing them. Different domains, same instinct — define the boundary, then make everything conform to it.",
      "I care about the unglamorous parts too: containerised setups that run the same way anywhere, tests around the logic that matters, and documentation that explains a decision rather than restating the code.",
    ],
    interests: {
      label: "Also interested in",
      note: "Stated on the GitHub profile; no public repositories cover these yet.",
      items: ["Electronics", "Raspberry Pi", "Arduino", "Music and audio"],
    },
    education:
      "Several repositories are university coursework. The one that names an institution points to Uniwersytet Ekonomiczny w Krakowie.",
  },

  repositories: {
    index: "04",
    label: "Repository overview",
    title: "Everything else that is public.",
    intro:
      "The full picture, including the coursework. Figures come from the GitHub API and are shown as they are.",
    publicRepos: "Public repositories",
    original: "Original (not forks)",
    forks: "Forks",
    firstRepo: "First repository",
    chartCaption: "Code by language, in bytes",
    languageNote:
      "Measured in bytes across original (non-fork) repositories. Excludes PanTadeusz, a static site publishing ~762 KB of public-domain poetry, whose HTML volume would otherwise outweigh every other repository combined.",
    other: "Other",
    otherLabel: "Other repositories",
    coursework: "coursework",
    exclusionNote:
      "Forked repositories and one repository that follows a published Microsoft tutorial line for line are left out of this list. They are still counted in the totals above.",
  },

  contact: {
    index: "05",
    label: "Contact",
    title: "Get in touch.",
    lede: "Open to talking about software, automation, AI integrations or anything involving signals and hardware. The form goes straight to my inbox.",
    name: "Name",
    email: "Email",
    message: "Message",
    company: "Company",
    send: "Send message",
    sending: "Sending…",
    elsewhere: "Elsewhere",
    errors: {
      nameRequired: "Please enter your name.",
      nameTooLong: "That name is too long.",
      emailInvalid: "Please enter a valid email address.",
      messageTooShort: "Please write at least 10 characters.",
      messageTooLong: "Please keep it under 5000 characters.",
    },
    messages: {
      idle: "",
      fixErrors: "Please correct the highlighted fields.",
      notConfigured: "The contact form is not configured yet. Please reach me on GitHub in the meantime.",
      sendFailed: "Sending failed. Please try again in a moment.",
      sent: "Thanks — your message has been sent.",
    },
  },

  footer: {
    stackNote: "Next.js · TypeScript · Three.js",
    live: "End of transmission — project data synced from the GitHub API",
    snapshot: "End of transmission — project data from a checked-in snapshot",
  },

  visuals: {
    hero: "Diagram: an irregular waveform enters a faceted core on the left and leaves as an evenly spaced grid on the right.",
    transport: "Diagram: a single terminal transport interface fanning out into eight protocol implementations.",
    agent:
      "Diagram: a plain-language query passes through an agent and a scraping tool, then leaves as a nested typed schema.",
    geo: "Diagram: GPS coordinates resolved into a street address and pinned on a map.",
    ledger:
      "Diagram: cart lines are all validated against stock before any inventory is written, then committed in a single save.",
    waveform: "Diagram: an audio stream rendered as a waveform with a tuning scale and a now-playing title.",
  },

  projects: {
    lumashell: {
      tagline:
        "Windows terminal that puts local shells, SSH, serial ports and network sockets behind one byte-stream contract.",
      summary:
        "An Electron and React terminal emulator rendering through xterm.js with the WebGL addon. Every session type — local PTY, SSH, serial, raw TCP/TLS, Telnet, WebSocket, UDP, and Docker or Kubernetes exec — implements a single TerminalTransport interface, so the UI never learns which protocol it is talking to. It also ships a sandboxed plugin host and an AI agent that must ask before it acts.",
      chain: {
        input: "keystrokes, byte streams",
        transform: "one TerminalTransport contract, eight implementations",
        output: "xterm.js WebGL surface",
      },
      detail: {
        label: "Plugin permissions are enforced by the host, not the plugin",
        body: "Plugin code runs in a hidden BrowserWindow created with sandbox, contextIsolation on and nodeIntegration off, so it can only post messages. The main process gates it at two separate lifecycle points: at registration a tool is rejected unless the plugin both holds the ai.tools permission and statically declared that exact id in its manifest, and at invocation the same checks run again before anything reaches the host. Calls are correlated by a generated id under a 30-second timeout, so a hung plugin cannot stall the model loop.",
      },
      context: "Version 1.0.0, released July 2026. Interface and documentation are in Polish.",
    },
    what2buy: {
      tagline:
        "Turns a plain-language product question into a side-by-side specification comparison across marketplaces.",
      summary:
        "A two-service application: a FastAPI backend driving a LangChain agent on gpt-4o, and a Quasar/Vue 3 single-page frontend. The agent reaches live marketplace data through a BrightData MCP server and is constrained to a nested Pydantic schema, so the answer arrives as typed products and specifications rather than prose. The frontend renders one column per marketplace and shades the specification rows where two products disagree.",
      chain: {
        input: "natural-language query + chosen marketplaces",
        transform: "LangChain agent over an MCP scraping server, answer bound to a Pydantic schema",
        output: "typed offers, diffed spec-by-spec",
      },
      detail: {
        label: "The scraping server is a subprocess, not a service",
        body: "Rather than calling a hosted API, each request spawns the BrightData MCP server locally over stdio with credentials injected as environment variables, discovers its tools at runtime through load_mcp_tools, and filters them to a name allowlist before handing them to the agent. The consequence is visible in the container: the backend Dockerfile installs Node 20 into a python:3.11-slim image purely so that npx exists at runtime.",
      },
      context: "Built as a bachelor's thesis project.",
    },
    geopic: {
      tagline:
        "Photo feed that stamps every post with the GPS fix where it was taken and renders it on its own map.",
      summary:
        "A progressive web app with no build step — Vue 3 from a CDN, Firebase for storage, auth and data. Uploading a photo captures the device's coordinates, reverse-geocodes them to a street address through Nominatim, and stores both alongside the image. Each feed item is a two-slide carousel: the photo, then an interactive Leaflet map pinned to where it was taken.",
      chain: {
        input: "photo + device GPS fix",
        transform: "Nominatim reverse geocoding, Firestore documents",
        output: "chronological feed, one map per post",
      },
      detail: {
        label: "Maps are built when the slide arrives, not when the post renders",
        body: "A Leaflet map initialised inside a hidden carousel slide measures its container as zero and renders broken tiles. So map creation is deferred to a single delegated slid.bs.carousel listener, which parses the post index out of the carousel element id, builds the map on first reveal, and caches the instance on the DOM node itself. On every later reveal it short-circuits to invalidateSize() instead of rebuilding.",
      },
      context: "University project, built with Mikołaj Bębenek.",
    },
    carpartseshop: {
      tagline:
        "ASP.NET Core 8 shop API: catalogue, JWT roles, cart checkout with stock validation, and invoice email.",
      summary:
        "A layered .NET 8 Web API with a service per entity over Entity Framework Core. Authentication issues HMAC-SHA256 tokens carrying a role claim, write endpoints are gated behind an Admin role, and Swagger is wired with a bearer definition for exercising them. Covered by 31 xUnit facts across unit and WebApplicationFactory integration projects.",
      chain: {
        input: "authenticated REST request",
        transform: "service layer over an EF Core change tracker",
        output: "orders with frozen prices, SMTP invoice",
      },
      detail: {
        label: "Checkout validates everything before it mutates anything",
        body: "CheckoutAsync runs two passes inside one change-tracker unit of work. The first walks every line and bails out with an insufficient-stock response before a single value is written, so a cart that fails halfway cannot leave inventory half-decremented. The second decrements stock and copies each product's current price onto the order line, so later catalogue edits cannot rewrite what a past order cost. Stock changes, the new order and the cleared cart all persist in a single SaveChangesAsync.",
      },
      context:
        "University credit project. Runs against an in-memory EF Core provider, so data does not survive a restart.",
    },
    pyradio: {
      tagline:
        "Single-file Windows radio player that reads live ICY titles and finds cover art for the current track.",
      summary:
        "About 9 KB of Python in one file. A background thread pulls an Icecast stream through miniaudio while a borderless DearPyGui window shows the station list, a search filter and a scrolling now-playing marquee. Stations live in a plain text file the app opens in Notepad and reloads. When the stream reports a new title, it searches YouTube and shows the first result's thumbnail as cover art.",
      chain: {
        input: "Icecast stream from a url|name text file",
        transform: "miniaudio decode thread, ICY metadata callback",
        output: "audio, marquee title, fetched cover art",
      },
      detail: {
        label: "Volume is set outside the audio pipeline",
        body: "The slider never touches the stream. It walks the Windows Core Audio session list through pycaw, matches the app's own process, and sets that session's master volume — so the control operates at the same level as the Windows per-application mixer rather than scaling samples inside miniaudio.",
      },
      context: "Windows only; depends on pywin32 and the Windows audio stack.",
    },
  },

  archive: {
    "simple-mrp": {
      name: "Simple MRP System",
      note: "NiceGUI app that explodes a bill of materials for one stool across a six-period planning horizon, with a Mermaid-rendered BOM tree.",
    },
    "60-tka": {
      name: "60-tka",
      note: "Vanilla-JS progressive web app for reporting local incidents: camera photo, GPS pin on an OpenStreetMap map, reverse-geocoded address, handed to the native share sheet.",
    },
    "advanced-databases": {
      name: "Advanced Databases",
      note: "SSDT database project layering system-versioned temporal tables, price-audit and DDL triggers, OPENJSON functions and XSD-constrained XML columns onto the AdventureWorksLT schema.",
    },
    ceneoscrapern11: {
      name: "CeneoScraperN11",
      note: "Two notebooks: one crawls every review page for a product into structured JSON, the other loads it with pandas and charts rating distribution and recommendation share.",
    },
    eshopservice: {
      name: "EShopService",
      note: "Domain / Application / API split in .NET 8, with product CRUD over EF Core and a Luhn credit-card validator that maps each failure mode to its own exception type.",
    },
    "pp-simulator": {
      name: "PP-Simulator",
      note: "Turn-based grid simulation in C# where movement composes creature behaviour with map topology — the same move string wraps on a torus map and is blocked on a bounded one. Console and Razor Pages front-ends.",
    },
    pantadeusz: {
      name: "PanTadeusz",
      note: "Static Bootstrap site publishing Mickiewicz's epic poem, one page per book with a shared table of contents.",
    },
  },
};
