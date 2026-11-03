import { faqs, principles, site } from "@/lib/content";
import { Core } from "@/components/three/Core";
import { Button, SheetHeader } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

export function Principles() {
  return (
    <section className="princ section" aria-labelledby="princ-title">
      <div className="wrap">
        <SheetHeader fig="07" title="Why WnR" aside="Six promises" />
        <RevealLines
          as="h2"
          id="princ-title"
          className="t-d1 princ__title"
          lines={[
            "Why businesses",
            <>
              choose <span className="em">WnR.</span>
            </>,
          ]}
        />
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
          <span className="label label--dot">Free consultation · Reply within one working day</span>
          <RevealLines
            as="h2"
            id="cta-title"
            className="t-mega cta__title"
            lines={[
              "Ready to build",
              <>
                what’s <span className="em">next?</span>
              </>,
            ]}
          />
          <Reveal className="cta__actions" delay={0.2}>
            <Button href="/contact" variant="ultra">
              Get a free consultation
            </Button>
            <a href={site.whatsapp} className="btn btn--light" target="_blank" rel="noopener noreferrer">
              <span>Chat on WhatsApp</span>
              <span className="btn__icon">↗</span>
            </a>
            <a href={`mailto:${site.email}`} className="link-line cta__mail">
              {site.email}
            </a>
          </Reveal>
        </div>
        <div className="cta__core" aria-hidden>
          <Core labels={false} />
          <span className="cta__yours mono">
            <i /> Your business, next
          </span>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="faq section" aria-labelledby="faq-title">
      <div className="wrap faq__grid">
        <div className="faq__side">
          <span className="label sheet__fig">FIG. 08</span>
          <h2 id="faq-title" className="t-d2">
            Questions, <span className="em">answered.</span>
          </h2>
          <p className="t-body">
            Anything else? Message us on{" "}
            <a className="link-line" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            or call {site.phone}.
          </p>
        </div>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <details key={f.q} className="faq__item" open={i === 0}>
              <summary>
                <span className="mono t-ultra">0{i + 1}</span>
                <span className="faq__q">{f.q}</span>
                <span className="faq__icon" aria-hidden />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
