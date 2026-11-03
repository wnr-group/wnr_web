"use client";

import { useRef } from "react";
import { CoreGL } from "@/components/three/CoreGL";
import { Dashboard, Assistant, Mobile } from "@/components/mockups/Mockups";
import { Button } from "@/components/ui/Button";
import { useMedia, usePointerTilt, useScrollProgress } from "@/lib/motion";

/* Satellite interfaces, tethered to the layer of the Core they run on. */
const sats = [
  { key: "asst", x: 25, y: 38, d: 1.5, r: -3, el: <Assistant />, cap: "AI sales agent", layer: "L4" },
  { key: "dash", x: 86, y: 24, d: 0.8, r: 3, el: <Dashboard />, cap: "Operations intelligence", layer: "L2" },
  { key: "mobile", x: 89, y: 52, d: 1.2, r: 5, el: <Mobile />, cap: "Customer app", layer: "L5" },
] as const;

const CORE = { x: 61, y: 33 };

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const narrow = useMedia("(max-width: 900px)");
  useScrollProgress(ref, (p) => (progress.current = p));
  usePointerTilt(ref);

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__sticky">
        <div className="hero__bg" aria-hidden />

        <div className="hero__stage">
          <CoreGL
            className="hero__gl"
            progress={narrow ? undefined : progress}
            size={narrow ? 0.5 : 0.46}
            center={narrow ? [0, 0.02] : [0.16, 0.16]}
            labels={!narrow}
            drift={0.17}
          />

          <svg className="hero__tethers" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {sats.map((s, i) => (
              <path
                key={s.key}
                d={`M${s.x},${s.y} C${(s.x + CORE.x) / 2},${s.y} ${(s.x + CORE.x) / 2},${CORE.y} ${CORE.x},${CORE.y}`}
                style={{ ["--i" as string]: i }}
              />
            ))}
          </svg>

          {sats.map((s, i) => (
            <figure
              key={s.key}
              className={`sat sat--${s.key}`}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                ["--d" as string]: s.d,
                ["--r" as string]: `${s.r}deg`,
                ["--i" as string]: i,
                ["--dx" as string]: ((s.x - CORE.x) / 50).toFixed(3),
                ["--dy" as string]: ((s.y - CORE.y) / 50).toFixed(3),
              }}
              aria-hidden
            >
              <div className="sat__inner">{s.el}</div>
              <figcaption className="sat__cap mono">
                <b>{s.layer}</b> {s.cap}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="hero__meta wrap" aria-hidden>
          <span className="label label--dot">Digital engineering studio</span>
          <span className="label hero__meta-mid">Commerce · AI · Enterprise · Data · Cloud</span>
          <span className="label">Sheet 01 — The Core</span>
        </div>

        <div className="hero__copy wrap">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span>
                From ambitious <span className="em">ideas</span> to
              </span>
            </span>{" "}
            <span className="hero__line">
              <span>
                intelligent digital experiences<span className="t-ultra">.</span>
              </span>
            </span>
          </h1>
          <div className="hero__foot">
            <p className="hero__lead">
              WnR Advisory designs, engineers and connects the platforms modern businesses run on: commerce, enterprise
              systems, data and AI, built as one coherent core.
            </p>
            <div className="hero__ctas">
              <Button href="/contact" variant="ultra">
                Start a project
              </Button>
              <Button href="/work" variant="light">
                See our work
              </Button>
            </div>
          </div>
        </div>

        <div className="hero__explain" aria-hidden>
          <span className="label">Exploded view</span>
          <p>
            Five layers.
            <br />
            <span className="em">One</span> platform.
          </p>
          <span className="hero__explain-note mono">Every product we ship sits on the same engineered core.</span>
        </div>

        <div className="hero__cue mono" aria-hidden>
          <span className="hero__cue-bar" />
          Scroll to open the core
        </div>
      </div>
    </section>
  );
}
