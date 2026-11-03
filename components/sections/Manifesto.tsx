"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollProgress } from "@/lib/motion";
import { ArrowRight } from "@/components/ui/Icons";

const text: { w: string; em?: boolean; ultra?: boolean }[] = [];
const push = (s: string, o: { em?: boolean; ultra?: boolean } = {}) => s.split(" ").forEach((w) => text.push({ w, ...o }));
push("We’re a technology partner focused on one thing:");
push("your growth.", { em: true });
push("Industry know-how from food, travel, recruitment, gaming, retail, manufacturing and energy, turned into the");
push("systems", { ultra: true });
push("your business runs on every day.");

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, undefined, "through");
  const n = text.length;
  return (
    <section ref={ref} className="manifesto section" aria-label="About WnR">
      <div className="wrap grid-12">
        <div className="manifesto__side">
          <span className="label sheet__fig">FIG. 02</span>
          <span className="label">Who we are</span>
        </div>
        <p className="manifesto__text">
          {text.map((t, i) => (
            <span
              key={i}
              className={`mw ${t.em ? "em" : ""} ${t.ultra ? "t-ultra" : ""}`}
              style={{ ["--w" as string]: (i / n).toFixed(3) }}
            >
              {t.w}{" "}
            </span>
          ))}
        </p>
        <div className="manifesto__facts">
          {[
            ["Customers", "75+ and growing"],
            ["Builds", "AI-native, end to end"],
            ["Base", "TIDEL Park, Chennai"],
          ].map(([k, v]) => (
            <div key={k} className="manifesto__fact">
              <span className="label">{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <Link href="/about" className="link-line manifesto__link">
            About WnR <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
