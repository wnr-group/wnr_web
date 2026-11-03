import type { CSSProperties } from "react";
import { layers, type LayerId } from "@/lib/content";

/* ---------------------------------------------------------------------
   THE CORE — WnR's signature object.
   Five solid slabs (Foundation → Experience) built from CSS 3D faces.
   Driven entirely by CSS custom properties set by the parent:
     --p      explode progress 0..1 (scroll)
     --mx/my  pointer, -1..1
   `active` lifts and lights one layer (Capabilities section).
--------------------------------------------------------------------- */

type Props = {
  active?: LayerId | null;
  labels?: boolean;
  className?: string;
  style?: CSSProperties;
  floor?: boolean;
};

const order = [...layers].reverse(); // bottom → top

export function Core({ active = null, labels = true, className = "", style, floor = true }: Props) {
  return (
    <div className={`core ${active ? "has-active" : ""} ${className}`} style={style} aria-hidden>
      <div className="core__rig">
        {floor && (
          <div className="core__floor">
            <span className="core__shadow" />
            <span className="core__dim core__dim--x">
              <i className="mono">PLATFORM CORE · 1:1</i>
            </span>
            <span className="core__dim core__dim--y">
              <i className="mono">5 LAYERS</i>
            </span>
          </div>
        )}

        {order.map((l, i) => (
          <div
            key={l.id}
            className={`core__slab core__slab--${l.id} ${active === l.id ? "is-active" : ""}`}
            style={{ ["--i" as string]: i }}
          >
            <div className="core__body">
              <span className="core__face core__face--top">
                <span className="core__fill">
                  <SlabSurface id={l.id} />
                </span>
              </span>
              <span className="core__face core__face--s">
                <span className="core__fill" />
              </span>
              <span className="core__face core__face--e">
                <span className="core__fill" />
              </span>
              <span className="core__face core__face--n">
                <span className="core__fill" />
              </span>
              <span className="core__face core__face--w">
                <span className="core__fill" />
              </span>
              {labels && (
                <span className="core__tag">
                  <span className="core__billboard">
                    <span className="core__leader" />
                    <span className="core__tagtext">
                      <b className="mono">{l.code}</b>
                      <span>{l.name}</span>
                    </span>
                  </span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Engraved top surface of each layer: a hint of what lives inside. */
function SlabSurface({ id }: { id: LayerId }) {
  switch (id) {
    case "experience":
      return (
        <span className="srf srf--exp">
          <i className="srf__win srf__win--a" />
          <i className="srf__win srf__win--b" />
          <i className="srf__win srf__win--c" />
          <i className="srf__win srf__win--d" />
        </span>
      );
    case "intelligence":
      return (
        <span className="srf srf--int">
          <svg viewBox="0 0 100 100" aria-hidden>
            <g className="srf__net">
              <path d="M20 26 50 50 80 22M50 50 26 78M50 50 78 76M20 26 26 78M80 22 78 76" />
            </g>
            {[
              [20, 26],
              [80, 22],
              [26, 78],
              [78, 76],
            ].map(([x, y]) => (
              <circle key={`${x}${y}`} cx={x} cy={y} r="3.2" className="srf__node" />
            ))}
            <circle cx="50" cy="50" r="8" className="srf__hub" />
          </svg>
        </span>
      );
    case "applications":
      return (
        <span className="srf srf--app">
          {Array.from({ length: 6 }).map((_, i) => (
            <i key={i} style={{ ["--w" as string]: `${[78, 54, 66, 40, 72, 58][i]}%` }} />
          ))}
        </span>
      );
    case "data":
      return (
        <span className="srf srf--data">
          {[36, 58, 44, 72, 52, 88, 64, 80].map((h, i) => (
            <i key={i} style={{ ["--h" as string]: `${h}%` }} />
          ))}
        </span>
      );
    case "foundation":
      return (
        <span className="srf srf--fnd">
          {Array.from({ length: 9 }).map((_, i) => (
            <i key={i} />
          ))}
        </span>
      );
  }
}
