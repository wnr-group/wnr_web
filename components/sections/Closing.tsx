import { principles, site } from "@/lib/content";
import { Core } from "@/components/three/Core";
import { Button, SheetHeader } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

export function Principles() {
  return (
    <section className="princ section" aria-labelledby="princ-title">
      <div className="wrap">
        <SheetHeader fig="07" title="Principles" />
        <h2 id="princ-title" className="visually-hidden">
          How we work
        </h2>
        <div className="princ__grid">
          {principles.map((p, i) => (
            <Reveal key={p.n} className="princ__item" delay={i * 0.08}>
              <span className="princ__n em">{p.n}.</span>
              <h3 className="t-d3">{p.title}</h3>
              <p className="t-body">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__grid bp-grid" aria-hidden />
      <div className="wrap cta__in">
        <div className="cta__copy">
          <span className="label label--dot">Now accepting new projects</span>
          <RevealLines
            as="h2"
            id="cta-title"
            className="t-mega cta__title"
            lines={[
              <>
                Have an <span className="em">ambitious</span>
              </>,
              "idea? Let’s",
              <>
                engineer it<span className="t-ultra">.</span>
              </>,
            ]}
          />
          <Reveal className="cta__actions" delay={0.2}>
            <Button href="/contact" variant="ultra">
              Start a project
            </Button>
            <a href={`mailto:${site.email}`} className="link-line cta__mail">
              {site.email}
            </a>
          </Reveal>
        </div>
        <div className="cta__core" aria-hidden>
          <Core labels={false} />
          <span className="cta__yours mono">
            <i /> L6 — Your next platform
          </span>
        </div>
      </div>
    </section>
  );
}
