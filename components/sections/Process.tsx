import { process } from "@/lib/content";
import { SheetHeader } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section className="proc-sec section" aria-labelledby="process-title">
      <div className="wrap">
        <SheetHeader fig="05" title="How we work" aside="Idea → growth" />
        <div className="proc-sec__head">
          <RevealLines
            as="h2"
            id="process-title"
            className="t-d1"
            lines={[
              <>
                From <span className="em">idea</span>
              </>,
              "to growth.",
            ]}
          />
          <Reveal as="p" className="t-lead proc-sec__lead" delay={0.1}>
            Four clear steps, with progress you can see at every one, and a team that stays with you after launch.
          </Reveal>
        </div>
        <ol className="proc-sec__steps">
          {process.map((s, i) => (
            <Reveal as="li" key={s.n} className="pstep" delay={i * 0.08}>
              <span className="pstep__n mono">{s.n}</span>
              <span className="pstep__node" aria-hidden />
              <h3 className="pstep__t">{s.title}</h3>
              <p className="pstep__d">{s.text}</p>
              <span className="pstep__out mono">
                <span>Output</span> {s.out}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
