"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/content";
import { Mockup } from "@/components/mockups/Mockups";
import { Photo } from "@/components/ui/Photo";
import { SheetHeader } from "@/components/ui/Button";
import { Arrow, ArrowRight } from "@/components/ui/Icons";
import { RevealLines } from "@/components/ui/Reveal";

/* Editorial project index. On pointer devices, hovering a row brings a
   tilted product plate into the cursor's orbit. */
export function WorkIndex({ limit, heading = true }: { limit?: number; heading?: boolean }) {
  const list = limit ? projects.slice(0, limit) : projects;
  const [hover, setHover] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    const pv = previewRef.current;
    if (!el || !pv) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      vx = 0,
      raf = 0;
    const loop = () => {
      const nx = x + (tx - x) * 0.14;
      vx = nx - x;
      x = nx;
      y += (ty - y) * 0.14;
      pv.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${Math.max(-8, Math.min(8, vx * 0.5))}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const enter = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = tx = e.clientX - r.left;
      y = ty = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="work section" aria-labelledby="work-title">
      <div className="wrap">
        {heading && (
          <>
            <SheetHeader fig="06" title="Selected work" aside={`${String(projects.length).padStart(2, "0")} projects`} />
            <div className="work__head">
              <RevealLines
                as="h2"
                id="work-title"
                className="t-d1"
                lines={[
                  "Platforms in",
                  <>
                    <span className="em">production.</span>
                  </>,
                ]}
              />
              <Link href="/work" className="link-line">
                All work <ArrowRight />
              </Link>
            </div>
          </>
        )}

        <div className="work__list" ref={listRef} onMouseLeave={() => setHover(null)}>
          <div className="work__row work__row--h mono" aria-hidden>
            <span>No.</span>
            <span>Project</span>
            <span>Sector</span>
            <span>Services</span>
            <span>Year</span>
          </div>
          {list.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              data-cursor="View"
              className={`work__row ${hover !== null && hover !== i ? "is-dim" : ""}`}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
            >
              <span className="mono work__no">{p.index}</span>
              <span className="work__name">
                <b>{p.name}</b>
                <span className="work__title">{p.title}</span>
              </span>
              <span className="work__sector">{p.sector}</span>
              <span className="work__services mono">{p.services.slice(0, 2).join(" · ")}</span>
              <span className="mono work__year">
                {p.year}
                <Arrow />
              </span>
              <span className={`work__thumb tone-${p.tone}`} aria-hidden>
                <Photo photo={p.photo} grade="deep" className="plate__photo" sizes="100vw" />
                <span className="plate__ui">
                  <Mockup kind={p.mockup} />
                </span>
              </span>
            </Link>
          ))}

          <div ref={previewRef} className={`work__preview ${hover !== null ? "is-on" : ""}`} aria-hidden>
            {list.map((p, i) => (
              <div key={p.slug} className={`work__plate tone-${p.tone} ${hover === i ? "is-on" : ""}`}>
                <Photo photo={p.photo} grade="deep" className="plate__photo" sizes="440px" />
                <span className="plate__ui">
                  <Mockup kind={p.mockup} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
