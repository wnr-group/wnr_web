import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { Principles, CTA } from "@/components/sections/Closing";
import { Process } from "@/components/sections/Process";
import { SheetHeader } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { industries, photos } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "About",
  description: "WnR Advisory is a technology partner focused on client growth, with industry know-how across food, travel, recruitment, gaming, retail, manufacturing and energy.",
};

export default function StudioPage() {
  return (
    <>
      <PageHead
        fig="A"
        label="Who we are"
        aside="TIDEL Park, Chennai"
        lines={[
          "Focused on",
          <>
            <span className="em">your growth.</span>
          </>,
        ]}
        lead="WnR Advisory is one partner for websites, apps, custom software, e-commerce and complete business suites, guided by real industry knowledge."
      />

      <section className="section studio-split">
        <div className="wrap studio-split__grid">
          <Reveal className="studio-split__quote">
            <p className="t-d2">
              “We build the <span className="em">operational brain</span> of your business through technology.”
            </p>
          </Reveal>
          <Reveal className="studio-split__text" delay={0.1}>
            <p className="t-lead">
              75+ customers trust WnR with the technology their business runs on, from their first website to the ERP, CRM, billing
              and BI that keep operations moving.
            </p>
            <p className="t-body">
              We bring industry know-how from food, travel, recruitment, gaming, retail, manufacturing and energy, and one
              accountable team that designs, builds, launches and supports. AI-native from day one, private by design, and built
              to scale with you.
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
          <SheetHeader fig="A.2" title="Industry expertise" aside="And more" />
          <div className="inds">
            {industries.map((ind, i) => (
              <Reveal key={ind} className="inds__item" delay={i * 0.05}>
                <span className="mono t-ultra">0{i + 1}</span>
                <span className="inds__name">{ind}</span>
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
