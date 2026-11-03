import Link from "next/link";
import { projects } from "@/lib/content";
import { Mockup } from "@/components/mockups/Mockups";
import { Photo } from "@/components/ui/Photo";
import { SheetHeader } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { CTA } from "./Closing";

export function CaseStudy({ slug }: { slug: string }) {
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];
  if (!p) return null;
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <section className="cs-head">
        <div className="wrap">
          <SheetHeader fig={`W.${p.index}`} title={`Case study — ${p.sector}`} aside={p.year} />
          <Link href="/work" className="mono cs-back">
            ← All work
          </Link>
          <div className="cs-head__grid">
            <div>
              <span className="label label--dot">{p.name}</span>
              <RevealLines as="h1" className="t-d1 cs-head__title" lines={[p.title]} />
            </div>
            <dl className="cs-meta">
              <div>
                <dt className="label">Sector</dt>
                <dd>{p.sector}</dd>
              </div>
              <div>
                <dt className="label">Year</dt>
                <dd>{p.year}</dd>
              </div>
              <div>
                <dt className="label">Services</dt>
                <dd>{p.services.join(", ")}</dd>
              </div>
              <div>
                <dt className="label">Stack</dt>
                <dd className="tags">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="cs-stage-wrap">
        <div className="wrap">
          <div className={`cs-stage tone-${p.tone}`}>
            <Photo photo={p.photo} grade="deep" className="plate__photo" sizes="100vw" priority />
            <div className="cs-stage__grid" aria-hidden />
            <Reveal className="cs-stage__ui">
              <Mockup kind={p.mockup} dark={p.tone === "ink"} />
            </Reveal>
            <span className="cs-stage__cap mono" aria-hidden>
              FIG. {p.index}.1 — {p.summary}
            </span>
          </div>
        </div>
      </section>

      <section className="section cs-body">
        <div className="wrap cs-body__grid">
          <div className="cs-body__side">
            <span className="label sheet__fig">01</span>
            <span className="label">The challenge</span>
          </div>
          <Reveal as="p" className="cs-body__challenge">
            {p.challenge}
          </Reveal>

          <div className="cs-body__side">
            <span className="label sheet__fig">02</span>
            <span className="label">Our approach</span>
          </div>
          <ol className="cs-approach">
            {p.approach.map((a, k) => (
              <Reveal as="li" key={k} delay={k * 0.08}>
                <span className="mono">0{k + 1}</span>
                <p>{a}</p>
              </Reveal>
            ))}
          </ol>

          <div className="cs-body__side">
            <span className="label sheet__fig">03</span>
            <span className="label">Outcome</span>
          </div>
          <div className="cs-outcomes">
            {p.outcomes.map((o, k) => (
              <Reveal key={o.label} className="cs-outcome" delay={k * 0.08}>
                <b>{o.value}</b>
                <span>{o.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Link href={`/work/${next.slug}`} className="cs-next">
        <span className="wrap cs-next__in">
          <span className="label">Next project</span>
          <span className="cs-next__name">
            {next.name} <ArrowRight />
          </span>
          <span className="cs-next__title">{next.title}</span>
        </span>
      </Link>
      <CTA />
    </>
  );
}
