/* ------------------------------------------------------------------
   WnR Advisory — site content
   ------------------------------------------------------------------
   Everything editable lives here. Contact details and every project in
   `projects` are PLACEHOLDERS written to show the design. Replace them
   with real work, real client permissions and real figures before launch.
------------------------------------------------------------------- */

export const site = {
  name: "WnR Advisory",
  short: "WnR",
  tagline: "From ambitious ideas to intelligent digital experiences.",
  description:
    "WnR Advisory is a digital engineering studio. We design, build and connect commerce platforms, enterprise systems, data products and AI automation for companies with serious ambitions.",
  email: "hello@wnradvisory.com", // PLACEHOLDER
  phone: "+91 00000 00000", // PLACEHOLDER
  location: "India — working worldwide", // PLACEHOLDER
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
};

/* ------------------------------------------------------------------
   Photography — free-licence Unsplash images (unsplash.com/license),
   served through next/image. Swap for your own team / client photos
   whenever you have them; real people always beat stock.
------------------------------------------------------------------- */
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=2000`;

export type Photo = { src: string; alt: string; credit?: string; pos?: string };

export const photos = {
  team: { src: u("photo-1677078610072-7f11ebc4d4d7"), alt: "A team of four working together around a table in a meeting room", credit: "Paymo / Unsplash" },
  meeting: { src: u("photo-1702047149248-a6049168d2a8"), alt: "Engineers at a startup discussing a project in a modern meeting room", credit: "Creatopy / Unsplash" },
  wireframe: { src: u("photo-1581291519195-ef11498d1cf2"), alt: "Hands sketching an app wireframe on paper with a marker", credit: "Unsplash" },
  nightDev: { src: u("photo-1719400471588-575b23e27bd7"), alt: "A developer working late in front of three monitors full of code", credit: "Unsplash" },
  rgbDesk: { src: u("photo-1753715613434-9c7cb58876b9"), alt: "A programmer writing code at a multi-screen desk at night", credit: "Unsplash" },
  hands: { src: u("photo-1641951820920-c90394aef512"), alt: "Colleagues' hands on laptops around a shared table", credit: "S O C I A L . C U T / Unsplash" },
  support: { src: u("photo-1766066014237-00645c74e9c6"), alt: "A smiling customer-support specialist wearing a headset at her computer", credit: "BaljkanN4 / Unsplash" },
  clinic: { src: u("photo-1758691461973-553db5285280"), alt: "A doctor showing a patient her scan results on a tablet", credit: "Vitaly Gariev / Unsplash" },
  retail: { src: u("photo-1759630752910-c4f9f628cf88"), alt: "A shopper browsing a clothing rack in a softly lit store", credit: "Kiko Camaclang / Unsplash" },
  field: { src: u("photo-1705579612477-20866d78deeb"), alt: "An engineer in a hard hat and safety vest working on site", credit: "ThisisEngineering / Unsplash" },
} satisfies Record<string, Photo>;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

/* The Core — five layers every WnR platform is built on. */
export type LayerId = "experience" | "intelligence" | "applications" | "data" | "foundation";

export const layers: { id: LayerId; code: string; name: string; note: string }[] = [
  { id: "experience", code: "L5", name: "Experience", note: "Storefronts, apps, portals" },
  { id: "intelligence", code: "L4", name: "Intelligence", note: "Agents, copilots, models" },
  { id: "applications", code: "L3", name: "Applications", note: "ERP, CRM, operations" },
  { id: "data", code: "L2", name: "Data", note: "Pipelines, warehouse, BI" },
  { id: "foundation", code: "L1", name: "Foundation", note: "Cloud, APIs, integration" },
];

export type MockupKind = "storefront" | "dashboard" | "assistant" | "mobile" | "erp" | "workflow";

export type Capability = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  summary: string;
  layer: LayerId;
  mockup: MockupKind;
  deliverables: string[];
  stack: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "product-engineering",
    index: "01",
    title: "Product Engineering",
    kicker: "Web & mobile products",
    summary:
      "Customer-facing products designed and engineered as one discipline: research, interface design, native and cross-platform apps, and the platform underneath.",
    layer: "experience",
    mockup: "mobile",
    deliverables: ["Product strategy & UX", "Design systems", "iOS / Android / cross-platform", "Web applications", "Customer portals"],
    stack: ["Next.js", "React Native", "Swift", "Kotlin", "TypeScript"],
  },
  {
    slug: "commerce",
    index: "02",
    title: "Commerce Platforms",
    kicker: "Digital commerce",
    summary:
      "Headless storefronts, marketplaces and B2B ordering built for speed and conversion, wired into inventory, payments, fulfilment and finance.",
    layer: "experience",
    mockup: "storefront",
    deliverables: ["Headless storefronts", "Marketplaces", "B2B ordering portals", "Payments & checkout", "Catalogue & PIM"],
    stack: ["Shopify Plus", "commercetools", "Medusa", "Stripe", "Razorpay"],
  },
  {
    slug: "ai-automation",
    index: "03",
    title: "AI & Intelligent Automation",
    kicker: "Agents & copilots",
    summary:
      "Assistants, agents and automations that act on your real systems. We put them into the workflows where time and revenue actually leak.",
    layer: "intelligence",
    mockup: "assistant",
    deliverables: ["AI readiness assessment", "Agentic workflows", "Sales & support copilots", "Document intelligence", "Evaluation & guardrails"],
    stack: ["LLM APIs", "RAG", "Vector search", "Python", "Workflow engines"],
  },
  {
    slug: "enterprise-systems",
    index: "04",
    title: "Enterprise Systems",
    kicker: "ERP · CRM · Operations",
    summary:
      "The operational backbone: ERP, CRM and custom line-of-business systems, implemented or built to fit how your teams really work.",
    layer: "applications",
    mockup: "erp",
    deliverables: ["ERP implementation", "CRM customisation", "Custom operations software", "Legacy modernisation", "Process mapping"],
    stack: ["Odoo", "ERPNext", "Salesforce", "Zoho", "Node / .NET"],
  },
  {
    slug: "data-analytics",
    index: "05",
    title: "Data & Analytics",
    kicker: "Decision intelligence",
    summary:
      "One reliable version of the truth: pipelines, warehouses and dashboards leadership trusts, and the foundation your AI work needs.",
    layer: "data",
    mockup: "dashboard",
    deliverables: ["Data architecture", "ETL / ELT pipelines", "Warehouse & lakehouse", "BI dashboards", "Forecasting models"],
    stack: ["BigQuery", "Snowflake", "dbt", "Airbyte", "Power BI"],
  },
  {
    slug: "cloud-integration",
    index: "06",
    title: "Cloud & Integration",
    kicker: "Infrastructure & APIs",
    summary:
      "Secure, observable cloud infrastructure and the integration layer that lets every system you own talk to every other.",
    layer: "foundation",
    mockup: "workflow",
    deliverables: ["Cloud architecture", "API & integration layer", "DevOps & CI/CD", "Observability", "Security reviews"],
    stack: ["AWS", "GCP", "Azure", "Kubernetes", "Terraform"],
  },
];

export type Project = {
  slug: string;
  index: string;
  name: string;
  title: string;
  sector: string;
  year: string;
  services: string[];
  stack: string[];
  mockup: MockupKind;
  tone: "ultra" | "ember" | "ink" | "bone";
  photo: Photo;
  summary: string;
  challenge: string;
  approach: string[];
  outcomes: { value: string; label: string }[];
};

/* PLACEHOLDER PORTFOLIO. These are sample entries that show the layout.
   Replace them with real projects before launch. */
export const projects: Project[] = [
  {
    slug: "meridian",
    index: "01",
    name: "Meridian",
    title: "One commerce platform for 140 stores and a website",
    sector: "Retail",
    year: "2025",
    services: ["Commerce Platforms", "Enterprise Systems", "Data & Analytics"],
    stack: ["Next.js", "commercetools", "Odoo", "BigQuery"],
    mockup: "storefront",
    tone: "ultra",
    photo: photos.retail,
    summary: "Unifying store, web and warehouse inventory into a single headless commerce platform.",
    challenge:
      "Store, web and warehouse stock lived in three systems that reconciled overnight, so customers routinely ordered products that had already sold out.",
    approach: [
      "Mapped every inventory touchpoint and designed a single event-driven stock ledger.",
      "Rebuilt the storefront headless, with sub-second product pages and store-level availability.",
      "Connected POS, ERP and fulfilment through one integration layer with live monitoring.",
    ],
    outcomes: [
      { value: "Real-time", label: "Stock visibility across channels" },
      { value: "1 platform", label: "Replacing three legacy systems" },
      { value: "< 1s", label: "Product page load target" },
    ],
  },
  {
    slug: "halcyon",
    index: "02",
    name: "Halcyon",
    title: "An AI sales agent that qualifies every lead in minutes",
    sector: "Real Estate",
    year: "2025",
    services: ["AI & Intelligent Automation", "Enterprise Systems"],
    stack: ["LLM APIs", "RAG", "Salesforce", "WhatsApp API"],
    mockup: "assistant",
    tone: "ink",
    photo: photos.support,
    summary: "An agentic assistant that qualifies enquiries, books site visits and keeps the CRM clean.",
    challenge:
      "Thousands of monthly enquiries arrived across portals, WhatsApp and email. Sales teams answered the loudest ones, and good leads went cold.",
    approach: [
      "Designed a qualification agent grounded in live inventory, pricing and project documents.",
      "Gave it tools: calendar booking, CRM updates and human hand-off with full context.",
      "Built an evaluation suite and guardrails before a single customer conversation.",
    ],
    outcomes: [
      { value: "24 / 7", label: "Response on every channel" },
      { value: "Minutes", label: "From enquiry to qualified lead" },
      { value: "100%", label: "Conversations logged to CRM" },
    ],
  },
  {
    slug: "ledgerline",
    index: "03",
    name: "Ledgerline",
    title: "Modernising finance and operations for a manufacturer",
    sector: "Manufacturing",
    year: "2024",
    services: ["Enterprise Systems", "Cloud & Integration"],
    stack: ["ERPNext", "Python", "AWS", "Power BI"],
    mockup: "erp",
    tone: "bone",
    photo: photos.meeting,
    summary: "Replacing spreadsheets and a legacy desktop ERP with a connected cloud operations suite.",
    challenge:
      "Month-end close took weeks, production planning ran on spreadsheets, and no one trusted the inventory numbers.",
    approach: [
      "Mapped order-to-cash and procure-to-pay with finance and the shop floor.",
      "Implemented a cloud ERP with custom manufacturing modules and an approvals engine.",
      "Migrated a decade of records and trained every team on site.",
    ],
    outcomes: [
      { value: "Days", label: "Month-end close, down from weeks" },
      { value: "Single", label: "Source of operational truth" },
      { value: "Cloud", label: "Access for every site" },
    ],
  },
  {
    slug: "tessera",
    index: "04",
    name: "Tessera",
    title: "A decision-intelligence layer for a logistics network",
    sector: "Logistics",
    year: "2024",
    services: ["Data & Analytics", "AI & Intelligent Automation"],
    stack: ["Snowflake", "dbt", "Airbyte", "Forecasting"],
    mockup: "dashboard",
    tone: "ultra",
    photo: photos.nightDev,
    summary: "A unified warehouse, live dashboards and demand forecasting across the network.",
    challenge:
      "Operations data was spread across nine tools. Leadership saw last month's performance, never this morning's.",
    approach: [
      "Built automated pipelines from every operational system into one warehouse.",
      "Modelled shared metrics with finance and operations so every team uses the same definitions.",
      "Shipped role-based dashboards and a demand forecast the planners actually use.",
    ],
    outcomes: [
      { value: "9 → 1", label: "Data sources unified" },
      { value: "Hourly", label: "Refresh for operational KPIs" },
      { value: "Forecasts", label: "Embedded in daily planning" },
    ],
  },
  {
    slug: "pulse",
    index: "05",
    name: "Pulse",
    title: "A care companion app that patients keep opening",
    sector: "Healthcare",
    year: "2024",
    services: ["Product Engineering", "Cloud & Integration"],
    stack: ["React Native", "Node.js", "FHIR", "GCP"],
    mockup: "mobile",
    tone: "ember",
    photo: photos.clinic,
    summary: "A patient app for appointments, reports and care plans, integrated with hospital systems.",
    challenge:
      "Patients juggled phone calls, paper reports and three portals. Follow-up adherence was falling.",
    approach: [
      "Ran research with patients and care teams to design around real care journeys.",
      "Built one cross-platform app on a secure, standards-based integration layer.",
      "Designed for accessibility first: large type, regional languages, low bandwidth.",
    ],
    outcomes: [
      { value: "1 app", label: "Replacing three portals" },
      { value: "AA", label: "Accessibility target" },
      { value: "Secure", label: "Standards-based integration" },
    ],
  },
  {
    slug: "fieldnote",
    index: "06",
    name: "Fieldnote",
    title: "Automating field service from dispatch to invoice",
    sector: "Energy",
    year: "2023",
    services: ["Cloud & Integration", "Product Engineering", "AI & Intelligent Automation"],
    stack: ["Workflow engine", "Kotlin", "Azure", "Document AI"],
    mockup: "workflow",
    tone: "ink",
    photo: photos.field,
    summary: "Connecting dispatch, technician apps, document capture and billing into one automated flow.",
    challenge:
      "Job sheets were handwritten, re-typed at head office and invoiced weeks later. Errors were common and cash flow suffered.",
    approach: [
      "Designed an end-to-end job workflow with clear states and owners.",
      "Built an offline-first technician app with photo and signature capture.",
      "Added document AI to extract readings and auto-generate invoices for review.",
    ],
    outcomes: [
      { value: "Same day", label: "Job to invoice" },
      { value: "Offline", label: "First technician app" },
      { value: "Automated", label: "Data extraction" },
    ],
  },
];

export const process = [
  { n: "01", title: "Discover", text: "Workshops with your teams to understand the business, the users and the systems already in place.", out: "Opportunity map" },
  { n: "02", title: "Architect", text: "We design the experience and the system together: interfaces, data model, integrations, security.", out: "Blueprint & prototype" },
  { n: "03", title: "Build", text: "Senior engineers ship in short, visible cycles. You see working software every two weeks.", out: "Production releases" },
  { n: "04", title: "Launch", text: "Migration, testing, training and a calm go-live, with monitoring in place from the first minute.", out: "Live platform" },
  { n: "05", title: "Evolve", text: "We stay on: measuring, improving and adding intelligence as the business grows.", out: "Ongoing roadmap" },
];

export const principles = [
  { n: "i", title: "Systems, not screens", text: "A beautiful interface is only as good as the systems behind it. We design both, together." },
  { n: "ii", title: "Senior by default", text: "The people in the pitch build the product. Small teams of experienced engineers and designers." },
  { n: "iii", title: "Useful intelligence", text: "AI where it moves a number you care about, with evaluation and guardrails, not as decoration." },
  { n: "iv", title: "Built to be owned", text: "Clean code, documentation and handover. Your platform should never hold you hostage." },
];

export const engagements = [
  { title: "Blueprint Sprint", duration: "2–4 weeks", text: "Discovery, architecture and a clickable prototype. A clear plan before a large investment." },
  { title: "Product Build", duration: "3–9 months", text: "A dedicated cross-functional team taking a product or platform from blueprint to production." },
  { title: "Embedded Partner", duration: "Ongoing", text: "A long-term engineering and AI team working alongside yours on a shared roadmap." },
];
