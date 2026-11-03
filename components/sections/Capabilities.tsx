"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { capabilities, layers } from "@/lib/content";
import { CoreGL } from "@/components/three/CoreGL";
import { Mockup } from "@/components/mockups/Mockups";
import { SheetHeader } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { useInView, usePointerTilt } from "@/lib/motion";

/* MOMENT 02 — The capability ecosystem.
   Selecting a capability lifts its layer out of the Core and brings
   the product interface it produces into focus. */
export function Capabilities() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { threshold: 0.35 }, false);
  usePointerTilt(stageRef, 1);

  // Gentle auto-tour until the visitor takes control.
  useEffect(() => {
    if (touched || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % capabilities.length), 5200);
    return () => clearInterval(id);
  }, [touched, inView]);

  const cap = capabilities[active];
  const layer = layers.find((l) => l.id === cap.layer)!;

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  return (
    <section ref={sectionRef} className="caps section" aria-labelledby="caps-title">
      <div className="wrap">
        <SheetHeader fig="03" title="Services" aside="Select a service" />
        <div className="caps__intro">
          <h2 id="caps-title" className="t-d1">
            Everything you need.
            <br />
            <span className="em">One</span> partner.
          </h2>
          <p className="t-lead caps__introlead">
            From your first website to a complete business suite, every service is a layer of the same core, so everything we
            build works together from day one.
          </p>
        </div>

        <div className="caps__grid">
          <div className="caps__list" role="tablist" aria-label="Services" aria-orientation="vertical">
            {capabilities.map((c, i) => (
              <button
                key={c.slug}
                role="tab"
                id={`cap-tab-${c.slug}`}
                aria-selected={i === active}
                aria-controls="cap-panel"
                className={`caps__item ${i === active ? "is-active" : ""}`}
                onClick={() => select(i)}
                onMouseEnter={() => touched && setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const n = (i + (e.key === "ArrowDown" ? 1 : -1) + capabilities.length) % capabilities.length;
                    select(n);
                    document.getElementById(`cap-tab-${capabilities[n].slug}`)?.focus();
                  }
                }}
              >
                <span className="mono caps__idx">{c.index}</span>
                <span className="caps__name">{c.title}</span>
                <span className="mono caps__kick">{c.kicker}</span>
                {i === active && !touched && <span className="caps__timer" aria-hidden />}
              </button>
            ))}
          </div>

          <div className="caps__stage" ref={stageRef}>
            <div className="caps__plate bp-grid--fine" aria-hidden>
              <span className="reg" style={{ left: 16, top: 16 }} />
              <span className="reg" style={{ right: 16, top: 16 }} />
              <span className="reg" style={{ left: 16, bottom: 16 }} />
              <span className="reg" style={{ right: 16, bottom: 16 }} />
            </div>
            <CoreGL
              className="caps__gl"
              active={[...layers].reverse().findIndex((l) => l.id === cap.layer)}
              size={0.38}
              center={[-0.22, -0.17]}
              baseExplode={0.12}
              intro={false}
            />
            <div className="caps__layer mono" aria-hidden>
              <b>{layer.code}</b> {layer.name} layer
              <span>{layer.note}</span>
            </div>
            <div className="caps__screen" key={cap.slug} aria-hidden>
              <div className={`caps__screen-in caps__screen-in--${cap.mockup}`}>
                <Mockup kind={cap.mockup} />
              </div>
            </div>
          </div>

          <div className="caps__panel" id="cap-panel" role="tabpanel" aria-labelledby={`cap-tab-${cap.slug}`} key={cap.slug + "p"}>
            <p className="caps__summary">{cap.summary}</p>
            <div className="caps__cols">
              <div>
                <span className="label">Deliverables</span>
                <ul className="caps__deliv">
                  {cap.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label">Typical stack</span>
                <div className="tags caps__tags">
                  {cap.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Link href={`/services#${cap.slug}`} className="link-line">
              Explore {cap.title} <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
