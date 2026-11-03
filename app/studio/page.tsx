import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { Principles, CTA } from "@/components/sections/Closing";
import { Process } from "@/components/sections/Process";
import { SheetHeader } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { engagements, photos } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "Studio",
  description: "WnR Advisory is a digital engineering studio: designers and senior engineers working as one team.",
};

export default function StudioPage() {
  return (
    <>
      <PageHead
        fig="S"
        label="The studio"
        lines={[
          "Engineers who",
          <>
            think like a <span className="em">studio.</span>
          </>,
        ]}
        lead="WnR Advisory brings the craft of a design studio and the rigour of an engineering firm to the platforms ambitious companies run on."
      />

      <section className="section studio-split">
        <div className="wrap studio-split__grid">
          <Reveal className="studio-split__quote">
            <p className="t-d2">
              “We don’t hand over screens. We hand over <span className="em">systems</span> that work on Monday morning.”
            </p>
          </Reveal>
          <Reveal className="studio-split__text" delay={0.1}>
            <p className="t-lead">
              We started WnR because good businesses kept getting fragmented technology: a website from one vendor, an ERP from
              another, a dashboard nobody trusted, and now an AI pilot that never reached production.
            </p>
            <p className="t-body">
              Our answer is one accountable team that designs the experience and engineers everything underneath it. Strategy,
              design, engineering, data and AI sit at the same table, so the decisions that usually fall between vendors get made
              properly, once.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="studio-photos">
        <div className="wrap studio-photos__grid">
          <Photo photo={photos.meeting} className="sp__a" sizes="(max-width: 900px) 100vw, 60vw" caption="Architecture review" />
          <Photo photo={photos.wireframe} className="sp__b" sizes="(max-width: 900px) 100vw, 38vw" caption="Sketch first" />
          <Photo photo={photos.rgbDesk} className="sp__c" sizes="(max-width: 900px) 100vw, 38vw" caption="Build" />
          <Photo photo={photos.support} className="sp__d" sizes="(max-width: 900px) 100vw, 60vw" caption="Stay on after launch" />
        </div>
      </section>

      <Principles />

      <section className="section engage">
        <div className="wrap">
          <SheetHeader fig="S.2" title="Ways to work with us" />
          <div className="engage__grid">
            {engagements.map((e, i) => (
              <Reveal key={e.title} className={`engage__card ${i === 1 ? "is-feature" : ""}`} delay={i * 0.08}>
                <span className="mono engage__dur">{e.duration}</span>
                <h3 className="t-d3">{e.title}</h3>
                <p>{e.text}</p>
                <span className="engage__n em">0{i + 1}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <CTA />
    </>
  );
}
