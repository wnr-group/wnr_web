import { Mark } from "@/components/ui/Icons";

import { industries } from "@/lib/content";

const words = industries;

/* A slow typographic band between chapters, alternating solid and
   outlined words, punctuated by the WnR mark. */
export function Marquee() {
  const row = (k: string) => (
    <div className="mq__row" key={k}>
      {words.map((w, i) => (
        <span key={w} className="mq__item">
          <span className={i % 2 ? "mq__word mq__word--line" : "mq__word"}>{i === 1 ? <span className="em">{w}</span> : w}</span>
          <Mark size={42} className="mq__mark" />
        </span>
      ))}
    </div>
  );
  return (
    <section className="mq" aria-label="Industry expertise">
      <div className="wrap mq__head">
        <span className="label label--dot">Industry expertise</span>
        <span className="label">Food · Travel · Recruitment · Gaming · Retail · Manufacturing · Energy · and more</span>
      </div>
      <div className="mq__track" aria-hidden>
        {[row("a"), row("b")]}
      </div>
    </section>
  );
}
