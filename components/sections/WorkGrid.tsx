"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { capabilities, projects } from "@/lib/content";
import { Mockup } from "@/components/mockups/Mockups";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Icons";

/* /work — filterable, asymmetric gallery of project plates. */
export function WorkGrid() {
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", ...capabilities.map((c) => c.title)];
  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.services.includes(filter))), [filter]);

  return (
    <section className="wgrid">
      <div className="wrap">
        <div className="wgrid__filters" role="toolbar" aria-label="Filter projects by capability">
          {filters.map((f) => {
            const n = f === "All" ? projects.length : projects.filter((p) => p.services.includes(f)).length;
            return (
              <button
                key={f}
                className={`wgrid__chip ${filter === f ? "is-on" : ""}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                disabled={n === 0}
              >
                {f}
                <sup className="mono">{String(n).padStart(2, "0")}</sup>
              </button>
            );
          })}
        </div>

        <div className="wgrid__list" key={filter}>
          {list.map((p, i) => (
            <Link key={p.slug} href={`/work/${p.slug}`} data-cursor="View" className={`wcard wcard--${i % 3}`} style={{ ["--i" as string]: i }}>
              <span className={`wcard__plate tone-${p.tone}`}>
                <Photo photo={p.photo} grade="deep" className="plate__photo" sizes={i % 3 === 0 ? "100vw" : "(max-width: 860px) 100vw, 58vw"} />
                <span className="wcard__ui">
                  <Mockup kind={p.mockup} dark={p.tone === "ink"} />
                </span>
                <span className="wcard__no mono">{p.index}</span>
              </span>
              <span className="wcard__meta">
                <span className="wcard__top">
                  <b>{p.name}</b>
                  <span className="mono">
                    {p.sector} · {p.year}
                  </span>
                </span>
                <span className="wcard__title">{p.title}</span>
                <span className="wcard__go">
                  View case study <Arrow />
                </span>
              </span>
            </Link>
          ))}
          {list.length === 0 && <p className="t-lead">No projects in this category yet.</p>}
        </div>
      </div>
    </section>
  );
}
