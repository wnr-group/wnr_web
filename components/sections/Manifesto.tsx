"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollProgress } from "@/lib/motion";
import { ArrowRight } from "@/components/ui/Icons";

const text: { w: string; em?: boolean; ultra?: boolean }[] = [];
const push = (s: string, o: { em?: boolean; ultra?: boolean } = {}) => s.split(" ").forEach((w) => text.push({ w, ...o }));
push("We are an engineering studio for companies with");
push("serious ambitions.", { em: true });
push("We design, build and connect the systems behind the business: commerce, operations, data and");
push("intelligence,", { ultra: true });
push("until an idea becomes a platform that simply runs.");

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, undefined, "through");
  const n = text.length;
  return (
    <section ref={ref} className="manifesto section" aria-label="About WnR">
      <div className="wrap grid-12">
        <div className="manifesto__side">
          <span className="label sheet__fig">FIG. 02</span>
          <span className="label">The studio</span>
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
            ["Model", "Design + engineering, one team"],
            ["Teams", "Senior, small, accountable"],
            ["Base", "India, working worldwide"],
          ].map(([k, v]) => (
            <div key={k} className="manifesto__fact">
              <span className="label">{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <Link href="/studio" className="link-line manifesto__link">
            Inside the studio <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
