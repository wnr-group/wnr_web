/* ------------------------------------------------------------------
   WnR Advisory — site content
   ------------------------------------------------------------------
   Everything editable lives here. Company details, services, process,
   FAQs and contact info come from the current WnR site. Every project in
   `projects` is a SAMPLE written to show the layout. Replace them with
   real work, client permissions and real figures before launch.
------------------------------------------------------------------- */

export const site = {
  name: "WnR Advisory",
  short: "WnR",
  tagline: "We build the operational brain of your business through technology.",
  description:
    "WnR Advisory builds websites, web & mobile apps, custom software, e-commerce and end-to-end business suites. One partner from idea to growth.",
  footerLine: "Building What’s Next",
  logo: "/logo.png", // put your logo at public/logo.png
  logoFallback: "https://wnradvisory.netlify.app/assets/logo.png",
  email: "admin@wnradvisory.com",
  phone: "+91 90801 21533",
  whatsapp: "https://wa.me/919080121533",
  instagram: "https://instagram.com/wnr__group",
  company: "WnR Groups",
  address: ["115 D, First Floor, TIDEL Park", "No. 4, Rajiv Gandhi Salai, Taramani", "Chennai 600113"],
  location: "Chennai, India",
  social: [
    { label: "WhatsApp", href: "https://wa.me/919080121533" },
    { label: "Instagram", href: "https://instagram.com/wnr__group" },
  ],
};

/* Headline proof points (from the current WnR site) */
export const badges = ["75+ happy customers", "AI-native builds", "End-to-end suites"];

export const industries = ["Food", "Travel", "Recruitment", "Gaming", "Retail", "Manufacturing", "Energy"];

export const toolkit = ["React", "Next.js", "Node.js", "Supabase", "Shopify", "Flutter", "Python", "AI & LLMs", "Cloud", "Analytics"];

export const projectTypes = ["Website", "Web / Mobile App", "Custom Software", "E-Commerce", "Business Suite / ERP", "AI Automation"];

export const faqs = [
  {
    q: "How do we get started?",
    a: "Message us on WhatsApp or give us a call. We’ll understand what you need and come back with a clear plan and estimate.",
  },
  {
    q: "How long does a project take?",
    a: "A business website can launch in a few weeks. Apps and business suites are delivered in phases, so you see working software early and often.",
  },
  {
    q: "Do you support us after launch?",
    a: "Yes. We train your team, stay on for support, and keep improving the product as your business grows.",
  },
  {
    q: "Can you work with the tools we already use?",
    a: "Yes. We integrate with your payments, CRM, accounting and other existing systems rather than asking you to start over.",
  },
];

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
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Let’s talk", href: "/contact" },
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

export type MockupKind = "website" | "storefront" | "dashboard" | "assistant" | "mobile" | "erp" | "workflow";

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
    slug: "websites",
    index: "01",
    title: "Websites",
    kicker: "Corporate sites & landing pages",
    summary:
      "Fast, search-friendly websites that tell your story well and turn visitors into enquiries, with a CMS your team can update without a developer.",
    layer: "experience",
    mockup: "website",
    deliverables: ["Corporate websites", "Landing pages", "SEO", "CMS", "Analytics setup"],
    stack: ["Next.js", "React", "Headless CMS", "Analytics"],
  },
  {
    slug: "apps",
    index: "02",
    title: "Web & Mobile Apps",
    kicker: "Booking apps · portals · dashboards",
    summary:
      "Booking apps, customer portals, dashboards and progressive web apps, designed around how your customers and teams actually work.",
    layer: "experience",
    mockup: "mobile",
    deliverables: ["Booking apps", "Customer portals", "Dashboards", "PWAs", "iOS & Android"],
    stack: ["Flutter", "React", "Next.js", "Supabase"],
  },
  {
    slug: "custom-software",
    index: "03",
    title: "Custom Software",
    kicker: "Automation · integrations · APIs",
    summary:
      "Software built for the way your business runs: automation, AI workflows, integrations and APIs that remove manual work and connect your tools.",
    layer: "foundation",
    mockup: "workflow",
    deliverables: ["Process automation", "AI workflows", "Integrations", "APIs", "Internal tools"],
    stack: ["Node.js", "Python", "Supabase", "Cloud"],
  },
  {
    slug: "e-commerce",
    index: "04",
    title: "E-Commerce",
    kicker: "Online stores & payments",
    summary:
      "Online stores that sell: product catalogues, smooth checkout and payments, and the analytics to see what’s working.",
    layer: "experience",
    mockup: "storefront",
    deliverables: ["Online stores", "Payments", "Catalogues", "Order management", "Analytics"],
    stack: ["Shopify", "Next.js", "Razorpay", "Analytics"],
  },
  {
    slug: "business-suites",
    index: "05",
    title: "End-to-End Business Suites",
    kicker: "ERP · CRM · billing · BI",
    summary:
      "One connected system for operations: ERP, CRM, billing and BI reports, so every team works from the same live numbers.",
    layer: "applications",
    mockup: "erp",
    deliverables: ["ERP", "CRM", "Billing", "BI reports", "Training & rollout"],
    stack: ["Custom suites", "Supabase", "Python", "Analytics"],
  },
  {
    slug: "ai-automation",
    index: "06",
    title: "AI & Automation",
    kicker: "AI-native by default",
    summary:
      "Smart automation, predictive insight and customer-facing assistants, built into your systems from day one rather than bolted on later.",
    layer: "intelligence",
    mockup: "assistant",
    deliverables: ["Smart automation", "Predictive insight", "Customer assistants", "AI workflows", "LLM integrations"],
    stack: ["AI & LLMs", "Python", "Cloud", "Analytics"],
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
    services: ["E-Commerce", "End-to-End Business Suites"],
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
    services: ["AI & Automation", "End-to-End Business Suites"],
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
    services: ["End-to-End Business Suites", "Custom Software"],
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
    services: ["End-to-End Business Suites", "AI & Automation"],
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
    services: ["Web & Mobile Apps", "Custom Software"],
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
    services: ["Custom Software", "Web & Mobile Apps", "AI & Automation"],
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
  { n: "01", title: "Discover", text: "We map your workflows, your customers and your goals before anything is designed.", out: "A clear plan & estimate" },
  { n: "02", title: "Design", text: "Brand-true interfaces you review early, so there are no surprises later.", out: "Approved designs" },
  { n: "03", title: "Develop", text: "Scalable, secure builds with AI automation built in, shipped in visible steps.", out: "Working software" },
  { n: "04", title: "Deliver & Stay", text: "Launch, training for your team, and long-term support as you grow.", out: "Live product + support" },
];

export const principles = [
  { n: "i", title: "Industry know-how", text: "We’ve built for food, travel, recruitment, gaming, retail, manufacturing and energy. We understand your business, not just the code." },
  { n: "ii", title: "One accountable team", text: "Design, development and support under one roof. One partner from idea to growth." },
  { n: "iii", title: "Fast, visible progress", text: "You see working software early and often, not a big reveal at the end." },
  { n: "iv", title: "Privacy by design", text: "Your data stays yours. We never sell it, and we build security in from the start." },
  { n: "v", title: "Built to scale", text: "Architecture that grows with your customers, your team and your ambitions." },
  { n: "vi", title: "Support after launch", text: "Training, maintenance and continuous improvement long after go-live." },
];

export const engagements = [
  { title: "Blueprint Sprint", duration: "2–4 weeks", text: "Discovery, architecture and a clickable prototype. A clear plan before a large investment." },
  { title: "Product Build", duration: "3–9 months", text: "A dedicated cross-functional team taking a product or platform from blueprint to production." },
  { title: "Embedded Partner", duration: "Ongoing", text: "A long-term engineering and AI team working alongside yours on a shared roadmap." },
];
