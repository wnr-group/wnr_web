"use client";

import { useRef } from "react";
import { CoreGL } from "@/components/three/CoreGL";
import { Dashboard, Assistant } from "@/components/mockups/Mockups";
import { Button } from "@/components/ui/Button";
import { badges } from "@/lib/content";
import { usePointerTilt } from "@/lib/motion";

/* Professional, conventional hero: message on the left, one contained
   visual on the right. No scroll-jacking, nothing overlapping the copy. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  usePointerTilt(ref, 1);

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <span className="hero__eyebrow">
            <i aria-hidden /> Technology partner for growing businesses
          </span>
          <h1 id="hero-title" className="hero__title">
            We build the <span className="em">operational brain</span> of your business through technology.
          </h1>
          <p className="hero__lead">
            Websites, web apps, custom software, e-commerce and complete business suites. One partner from idea to growth.
          </p>
          <div className="hero__ctas">
            <Button href="/contact" variant="ultra">
              Start a project
            </Button>
            <Button href="/work" variant="light">
              See our work
            </Button>
          </div>
          <ul className="hero__checks">
            {badges.map((b) => (
              <li key={b}>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <circle cx="8" cy="8" r="8" fill="var(--mint)" />
                  <path d="M4.8 8.2 7 10.3l4.2-4.6" fill="none" stroke="var(--ultra)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual" aria-hidden>
          <div className="hero__panel">
            <div className="hero__panelgrid" />
            <CoreGL className="hero__gl" size={0.56} center={[0, 0.06]} labels={false} />
          </div>
          <div className="hero__card hero__card--dash">
            <Dashboard />
          </div>
          <div className="hero__card hero__card--asst">
            <Assistant />
          </div>
          <div className="hero__chip">
            <b>75+</b>
            <span>happy customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Proof strip directly under the hero. */
export function Stats() {
  const stats = [
    { v: "75+", l: "Happy customers" },
    { v: "7+", l: "Industries served" },
    { v: "6", l: "Core services" },
    { v: "1", l: "Accountable team, idea to growth" },
  ];
  return (
    <section className="stats" aria-label="WnR in numbers">
      <div className="wrap stats__grid">
        {stats.map((s) => (
          <div key={s.l} className="stats__item">
            <b>{s.v}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
