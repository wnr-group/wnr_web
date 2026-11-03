import type { CSSProperties } from "react";
import type { MockupKind } from "@/lib/content";

/* ---------------------------------------------------------------------
   Product interface mockups — pure HTML/CSS/SVG, sized in `em` so a
   single `--ui` font-size scales the whole screen crisply in 3D.
--------------------------------------------------------------------- */

type P = { className?: string; style?: CSSProperties; dark?: boolean };

const Chrome = ({ url, dark }: { url: string; dark?: boolean }) => (
  <div className={`ui-chrome ${dark ? "is-dark" : ""}`}>
    <span className="ui-dots">
      <i />
      <i />
      <i />
    </span>
    <span className="ui-url">{url}</span>
    <span className="ui-chrome__end" />
  </div>
);

/* ---------- 1. Storefront ---------- */
export function Storefront({ className = "", style }: P) {
  return (
    <div className={`ui ui--store ${className}`} style={style}>
      <Chrome url="meridian.store/new-season" />
      <div className="st-nav">
        <b className="st-logo">MERIDIAN</b>
        <span>Women</span>
        <span>Men</span>
        <span>Home</span>
        <span className="st-nav__end">
          <i className="st-search" />
          <span className="st-bag">
            Bag <em>2</em>
          </span>
        </span>
      </div>
      <div className="st-hero">
        <div className="st-hero__copy">
          <span className="ui-kicker">New season · 24 pieces</span>
          <strong>The Linen Edit</strong>
          <span className="st-btn">Shop collection</span>
        </div>
        <div className="st-hero__art" aria-hidden>
          <span className="st-sun" />
          <span className="st-vase" />
          <span className="st-vase st-vase--2" />
          <span className="st-plinth" />
        </div>
      </div>
      <div className="st-grid">
        {[
          { n: "Linen overshirt", p: "₹3,490", c: "#d9cbb6", s: "In stock · 3 stores near you" },
          { n: "Pleated trouser", p: "₹2,990", c: "#b9c0d8", s: "Only 2 left online" },
          { n: "Woven tote", p: "₹1,890", c: "#e7b9a2", s: "Ready for pickup today" },
        ].map((x, i) => (
          <div className="st-card" key={i}>
            <span className="st-card__img" style={{ background: x.c }}>
              <span className="st-card__shape" />
            </span>
            <span className="st-card__row">
              <b>{x.n}</b>
              <span>{x.p}</span>
            </span>
            <span className={`st-avail ${i === 1 ? "is-low" : ""}`}>{x.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 2. Dashboard ---------- */
const series = [32, 38, 35, 44, 41, 52, 49, 58, 55, 63, 61, 72, 69, 78, 84];
const prev = [28, 30, 33, 31, 36, 38, 37, 42, 40, 45, 47, 46, 51, 53, 55];
function path(d: number[], w = 300, h = 90) {
  const max = 90;
  return d.map((v, i) => `${i === 0 ? "M" : "L"}${((i / (d.length - 1)) * w).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`).join(" ");
}

export function Dashboard({ className = "", style, dark }: P) {
  const line = path(series);
  return (
    <div className={`ui ui--dash ${dark ? "is-dark" : ""} ${className}`} style={style}>
      <Chrome url="tessera.app/operations" dark={dark} />
      <div className="db">
        <aside className="db-side" aria-hidden>
          <i className="is-on" />
          <i />
          <i />
          <i />
          <i />
        </aside>
        <div className="db-main">
          <div className="db-head">
            <div>
              <span className="ui-kicker">Operations · Live</span>
              <strong>Network performance</strong>
            </div>
            <span className="db-range">Last 15 days ▾</span>
          </div>
          <div className="db-kpis">
            {[
              { k: "Revenue", v: "₹4.82 Cr", d: "+12.4%" },
              { k: "On-time delivery", v: "97.8%", d: "+2.1%" },
              { k: "Cost / shipment", v: "₹312", d: "−6.3%" },
            ].map((x) => (
              <div className="db-kpi" key={x.k}>
                <span>{x.k}</span>
                <b>{x.v}</b>
                <em>{x.d}</em>
              </div>
            ))}
          </div>
          <div className="db-chart">
            <svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="dbg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--ultra)" stopOpacity=".28" />
                  <stop offset="1" stopColor="var(--ultra)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[18, 36, 54, 72].map((y) => (
                <line key={y} x1="0" x2="300" y1={y} y2={y} className="db-gridline" />
              ))}
              <path d={`${line} L300,90 L0,90 Z`} fill="url(#dbg)" />
              <path d={path(prev)} className="db-prev" />
              <path d={line} className="db-line" />
              <circle cx="300" cy={90 - (84 / 90) * 90} r="3.2" className="db-dot" />
            </svg>
            <span className="db-tip">
              <b>₹84.1L</b> today
            </span>
          </div>
          <div className="db-insight">
            <span className="db-insight__ic">✦</span>
            <span>
              <b>Copilot:</b> West hub demand is trending +18%. Move 1,200 units from Pune before Friday.
            </span>
            <span className="db-insight__btn">Apply</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. AI Assistant ---------- */
export function Assistant({ className = "", style, dark }: P) {
  return (
    <div className={`ui ui--asst ${dark ? "is-dark" : ""} ${className}`} style={style}>
      <div className="as-head">
        <span className="as-avatar" aria-hidden>
          <i />
        </span>
        <span>
          <b>Sales Agent</b>
          <span className="as-status">Connected to CRM, calendar and inventory</span>
        </span>
        <span className="as-pill">Agent mode</span>
      </div>
      <div className="as-body">
        <div className="as-msg as-msg--user">Qualify this week&apos;s enquiries and book visits for anyone serious.</div>
        <div className="as-trace">
          {[
            ["Read 214 enquiries", "portals · WhatsApp · email"],
            ["Scored intent and budget fit", "31 high-intent"],
            ["Checked unit availability", "Tower B · 3BHK"],
            ["Booked 12 site visits", "Sat & Sun"],
          ].map(([a, b], i) => (
            <div className="as-step" key={i} style={{ ["--i" as string]: i }}>
              <span className="as-check">✓</span>
              <span>{a}</span>
              <span className="as-step__meta">{b}</span>
            </div>
          ))}
        </div>
        <div className="as-msg as-msg--agent">
          Done. <b>31 leads</b> are high-intent. I&apos;ve booked <b>12 visits</b> and drafted personalised follow-ups for the
          rest. Everything is logged in the CRM.
          <div className="as-card">
            {[
              ["A. Mehta", "3BHK · ₹1.4 Cr", "Sat 11:00"],
              ["R. Iyer", "2BHK · ₹92 L", "Sat 15:30"],
              ["S. Khan", "3BHK · ₹1.6 Cr", "Sun 10:00"],
            ].map((r) => (
              <div className="as-row" key={r[0]}>
                <span className="as-ini">{r[0][0]}</span>
                <b>{r[0]}</b>
                <span>{r[1]}</span>
                <em>{r[2]}</em>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="as-input">
        <span>Ask the agent anything…</span>
        <span className="as-send" aria-hidden>
          ↑
        </span>
      </div>
    </div>
  );
}

/* ---------- 4. Mobile app ---------- */
export function Mobile({ className = "", style }: P) {
  return (
    <div className={`ui ui--phone ${className}`} style={style}>
      <div className="ph-screen">
        <div className="ph-status">
          <b>9:41</b>
          <span className="ph-island" />
          <span className="ph-bat" />
        </div>
        <div className="ph-hello">
          <span>Good morning,</span>
          <strong>Ananya</strong>
        </div>
        <div className="ph-appt">
          <span className="ui-kicker">Next appointment</span>
          <b>Dr. Rao · Cardiology</b>
          <span className="ph-appt__when">Tue, 14 Nov · 10:30</span>
          <span className="ph-appt__btn">Check in</span>
        </div>
        <div className="ph-rings">
          {[
            { k: "Steps", v: 72 },
            { k: "Sleep", v: 88 },
            { k: "Meds", v: 100 },
          ].map((r) => (
            <div className="ph-ring" key={r.k} style={{ ["--v" as string]: r.v }}>
              <span className="ph-ring__c" />
              <b>{r.v}%</b>
              <span>{r.k}</span>
            </div>
          ))}
        </div>
        <div className="ph-list">
          {[
            ["Blood report ready", "Today"],
            ["Refill: Atorvastatin", "2 days"],
          ].map(([a, b]) => (
            <div className="ph-item" key={a}>
              <i />
              <span>{a}</span>
              <em>{b}</em>
            </div>
          ))}
        </div>
        <div className="ph-tabs" aria-hidden>
          <i className="is-on" />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

/* ---------- 5. ERP ---------- */
export function ERP({ className = "", style }: P) {
  const rows = [
    { id: "PO-2291", item: "Steel housing A4", qty: "1,200", st: "In production", p: 64, c: "ultra" },
    { id: "PO-2290", item: "Valve assembly V2", qty: "860", st: "Quality check", p: 88, c: "ember" },
    { id: "PO-2288", item: "Pump casing P9", qty: "2,400", st: "Planned", p: 12, c: "mute" },
    { id: "PO-2285", item: "Flange kit F3", qty: "540", st: "Dispatched", p: 100, c: "leaf" },
    { id: "PO-2284", item: "Rotor shaft R1", qty: "320", st: "In production", p: 41, c: "ultra" },
  ];
  return (
    <div className={`ui ui--erp ${className}`} style={style}>
      <Chrome url="ops.ledgerline.cloud/production" />
      <div className="erp-top">
        <strong>Production orders</strong>
        <span className="erp-tabs">
          <i className="is-on">All 148</i>
          <i>Active 37</i>
          <i>Delayed 3</i>
        </span>
        <span className="erp-new">+ New order</span>
      </div>
      <div className="erp-table" role="presentation">
        <div className="erp-row erp-row--h">
          <span>Order</span>
          <span>Item</span>
          <span>Qty</span>
          <span>Status</span>
          <span>Progress</span>
        </div>
        {rows.map((r) => (
          <div className="erp-row" key={r.id}>
            <span className="erp-id">{r.id}</span>
            <span>{r.item}</span>
            <span>{r.qty}</span>
            <span className={`erp-chip is-${r.c}`}>{r.st}</span>
            <span className="erp-bar">
              <i style={{ width: `${r.p}%` }} className={`is-${r.c}`} />
            </span>
          </div>
        ))}
      </div>
      <div className="erp-foot">
        <span>
          <b>₹2.14 Cr</b> in open orders
        </span>
        <span>
          Next dispatch <b>Today, 16:00</b>
        </span>
      </div>
    </div>
  );
}

/* ---------- 6. Workflow ---------- */
export function Workflow({ className = "", style, dark }: P) {
  const nodes = [
    { id: "a", x: 2, y: 48, t: "Trigger", n: "New order", s: "Shopify · ERP" },
    { id: "b", x: 27, y: 24, t: "Check", n: "Validate stock", s: "Inventory API" },
    { id: "c", x: 27, y: 74, t: "AI", n: "Fraud score", s: "Model v3" },
    { id: "d", x: 54, y: 48, t: "Action", n: "Reserve & invoice", s: "ERP · Finance" },
    { id: "e", x: 80.5, y: 48, t: "Notify", n: "Customer + team", s: "WhatsApp · Slack" },
  ];
  return (
    <div className={`ui ui--flow ${dark ? "is-dark" : ""} ${className}`} style={style}>
      <Chrome url="flows.wnr.studio/order-to-cash" dark={dark} />
      <div className="fl-bar">
        <strong>Order to cash</strong>
        <span className="fl-live">
          <i /> Live · 1,284 runs today
        </span>
      </div>
      <div className="fl-canvas">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="fl-wires" aria-hidden>
          <path d="M21.7,48 C25,48 24,24 27,24" />
          <path d="M21.7,48 C25,48 24,74 27,74" />
          <path d="M49,24 C52,24 51,48 54,48" />
          <path d="M49,74 C52,74 51,48 54,48" />
          <path d="M76,48 L80.5,48" className="is-hot" />
        </svg>
        {nodes.map((n) => (
          <div className={`fl-node fl-node--${n.id}`} key={n.id} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <span className="fl-node__t">{n.t}</span>
            <b>{n.n}</b>
            <span className="fl-node__s">{n.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Mockup({ kind, ...p }: P & { kind: MockupKind }) {
  switch (kind) {
    case "storefront":
      return <Storefront {...p} />;
    case "dashboard":
      return <Dashboard {...p} />;
    case "assistant":
      return <Assistant {...p} />;
    case "mobile":
      return <Mobile {...p} />;
    case "erp":
      return <ERP {...p} />;
    case "workflow":
      return <Workflow {...p} />;
  }
}
