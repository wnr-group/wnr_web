"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/lib/motion";
import { Assistant, Dashboard, Workflow } from "@/components/mockups/Mockups";
import { Button, SheetHeader } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

/* MOMENT 03 — From disconnected effort to an intelligent system.
   Scroll drives three phases entirely through CSS variables:
   --t  : processes move from chaos into orbit (0..1)
   --t2 : wires draw to the agent layer        (0..1)
   --t3 : the system comes alive              (0..1)                  */

const procs = [
  { k: "Inbox", before: "214 unread enquiries", after: "Auto-qualified", cx: 14, cy: 22, cr: -9, ox: 22, oy: 24 },
  { k: "Spreadsheet", before: "pricing_FINAL_v7.xlsx", after: "Synced to ERP", cx: 66, cy: 14, cr: 7, ox: 50, oy: 12 },
  { k: "CRM", before: "38 stale deals", after: "Follow-ups sent", cx: 88, cy: 40, cr: -5, ox: 78, oy: 24 },
  { k: "Invoices", before: "12 overdue, manual", after: "Reconciled daily", cx: 80, cy: 84, cr: 11, ox: 78, oy: 76 },
  { k: "Inventory", before: "Counted on Fridays", after: "Live forecast", cx: 36, cy: 88, cr: -12, ox: 50, oy: 88 },
  { k: "Support", before: "9 tickets waiting", after: "Resolved in 4 min", cx: 8, cy: 64, cr: 6, ox: 22, oy: 76 },
];

const phases = [
  { n: "01", t: "Disconnected", h: ["Most businesses run on", "disconnected effort."] },
  { n: "02", t: "Connected", h: ["We wire every process", "into one intelligent layer."] },
  { n: "03", t: "Intelligent", h: ["Then the system starts", "working for you."] },
];

export function AIMoment() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  useScrollProgress(ref, (p) => setPhase(p < 0.36 ? 0 : p < 0.66 ? 1 : 2));

  // Entry: the night scene opens from an inset card to full bleed.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const e = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));
      el.style.setProperty("--e", (e * e * (3 - 2 * e)).toFixed(4));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section ref={ref} className="aim" aria-labelledby="aim-title" data-phase={phase} data-theme="night">
        <div className="aim__sticky">
          <div className="aim__bg" aria-hidden />
          <div className="wrap aim__top">
            <SheetHeader fig="04" title="AI & Intelligent Automation" aside="Scroll to connect" night />
          </div>

          <div className="aim__heads wrap">
            <h2 id="aim-title" className="visually-hidden">
              AI and intelligent automation: from disconnected effort to an intelligent, connected system.
            </h2>
            {phases.map((p, i) => (
              <p key={p.n} className={`aim__head t-d2 ${phase === i ? "is-on" : ""}`} aria-hidden={phase !== i}>
                <span>{p.h[0]}</span>
                <span className={i === 0 ? "aim__muted" : "em"}>{p.h[1]}</span>
              </p>
            ))}
          </div>

          <div className="aim__rail" aria-hidden>
            {phases.map((p, i) => (
              <span key={p.n} className={`aim__step ${phase >= i ? "is-done" : ""} ${phase === i ? "is-on" : ""}`}>
                <b className="mono">{p.n}</b>
                <span>{p.t}</span>
              </span>
            ))}
          </div>

          <div className="aim__field" aria-hidden>
            <svg className="aim__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
              {procs.map((p) => (
                <path key={p.k} pathLength={100} d={`M${p.ox},${p.oy} Q${(p.ox + 50) / 2},${p.oy} 50,50`} />
              ))}
            </svg>

            {procs.map((p, i) => (
              <div
                key={p.k}
                className="proc"
                style={{
                  ["--cx" as string]: p.cx,
                  ["--cy" as string]: p.cy,
                  ["--cr" as string]: `${p.cr}deg`,
                  ["--ox" as string]: p.ox,
                  ["--oy" as string]: p.oy,
                  ["--i" as string]: i,
                }}
              >
                <span className="proc__k mono">{p.k}</span>
                <span className="proc__swap">
                  <span className="proc__before">{p.before}</span>
                  <span className="proc__after">✓ {p.after}</span>
                </span>
              </div>
            ))}

            <div className="aim__hub">
              <span className="aim__ring" />
              <span className="aim__ring aim__ring--2" />
              <div className="aim__hubcore">
                <span className="mono">WnR</span>
                <b>Agent layer</b>
              </div>
              <div className="aim__console">
                <Dashboard dark />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aiprod section" aria-labelledby="aiprod-title" data-theme="night">
        <div className="wrap">
          <div className="aiprod__head">
            <RevealLines
              as="h3"
              id="aiprod-title"
              className="t-d1 aiprod__title"
              lines={[
                "Intelligence that",
                <>
                  does the <span className="em">work.</span>
                </>,
              ]}
            />
            <Reveal className="aiprod__intro" delay={0.15}>
              <p className="t-lead">
                Agents, copilots and automations built on your real data and wired into your real systems, with evaluation and
                guardrails from the first prototype.
              </p>
              <Button href="/contact" variant="ultra">
                Book an AI readiness session
              </Button>
            </Reveal>
          </div>

          <div className="aiprod__grid">
            <Reveal className="aiprod__card aiprod__card--lg">
              <div className="aiprod__vis aiprod__vis--asst">
                <Assistant dark />
              </div>
              <div className="aiprod__meta">
                <span className="mono t-ultra-l">A — Agents</span>
                <h4>Sales &amp; service agents</h4>
                <p>Qualify, book, follow up and update the CRM across WhatsApp, email and web, with a human hand-off when it matters.</p>
              </div>
            </Reveal>
            <Reveal className="aiprod__card" delay={0.1}>
              <div className="aiprod__vis aiprod__vis--dash">
                <Dashboard dark />
              </div>
              <div className="aiprod__meta">
                <span className="mono t-ultra-l">B — Copilots</span>
                <h4>Decision copilots</h4>
                <p>Ask the business a question in plain language and get an answer grounded in your warehouse.</p>
              </div>
            </Reveal>
            <Reveal className="aiprod__card" delay={0.2}>
              <div className="aiprod__vis aiprod__vis--flow">
                <Workflow dark />
              </div>
              <div className="aiprod__meta">
                <span className="mono t-ultra-l">C — Automation</span>
                <h4>Agentic workflows</h4>
                <p>End-to-end flows across ERP, finance and operations that run themselves and escalate the exceptions.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
