import { capabilities, layers } from "@/lib/content";
import { Core } from "@/components/three/Core";
import { CoreGL } from "@/components/three/CoreGL";
import { Mockup } from "@/components/mockups/Mockups";
import { SheetHeader } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Anatomy() {
  return (
    <section className="anat">
      <div className="wrap">
        <div className="anat__grid">
        <div className="anat__vis" aria-hidden>
          <CoreGL size={0.5} center={[-0.16, 0.02]} baseExplode={0.8} intro={false} />
        </div>
        <div className="anat__list">
          <span className="label">Anatomy of a WnR platform</span>
          <ol>
            {layers.map((l, i) => (
              <Reveal as="li" key={l.id} delay={i * 0.06}>
                <span className="mono t-ultra">{l.code}</span>
                <b>{l.name}</b>
                <span>{l.note}</span>
              </Reveal>
            ))}
          </ol>
        </div>
        </div>
      </div>
    </section>
  );
}

export function CapabilityList() {
  return (
    <div className="capd">
      {capabilities.map((c, i) => {
        const layer = layers.find((l) => l.id === c.layer)!;
        return (
          <section key={c.slug} id={c.slug} className={`capd__item section ${i % 2 ? "is-flip" : ""}`} aria-labelledby={`${c.slug}-t`}>
            <div className="wrap">
              <SheetHeader fig={`C.${c.index}`} title={c.kicker} aside={`${layer.code} · ${layer.name} layer`} />
              <div className="capd__grid">
                <div className="capd__copy">
                  <span className="capd__idx em">{c.index}</span>
                  <h2 id={`${c.slug}-t`} className="t-d1">
                    {c.title}
                  </h2>
                  <p className="t-lead">{c.summary}</p>
                  <div className="capd__cols">
                    <div>
                      <span className="label">What we deliver</span>
                      <ul className="caps__deliv">
                        {c.deliverables.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="label">Typical stack</span>
                      <div className="tags caps__tags">
                        {c.stack.map((s) => (
                          <span key={s} className="tag">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Reveal className="capd__vis">
                  <div className="capd__plate bp-grid--fine" aria-hidden />
                  <div className="capd__core" aria-hidden>
                    <Core active={c.layer} labels={false} floor={false} />
                  </div>
                  <div className={`capd__ui capd__ui--${c.mockup}`} aria-hidden>
                    <Mockup kind={c.mockup} />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
