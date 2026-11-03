import Link from "next/link";
import { photos, toolkit } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SheetHeader } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";


/* The human chapter: who builds the systems, and how they work with you. */
export function People() {
  return (
    <section className="people section" aria-labelledby="people-title">
      <div className="wrap">
        <SheetHeader fig="02.1" title="The people" aside="One accountable team" />

        <div className="people__top">
          <div className="people__copy">
            <RevealLines
              as="h2"
              id="people-title"
              className="t-d1"
              lines={[
                "Built by people",
                <>
                  who <span className="em">sit with</span>
                </>,
                "your teams.",
              ]}
            />
            <Reveal as="p" className="t-lead people__lead" delay={0.1}>
              Every project starts with a conversation. We map your workflows, design interfaces you review early, and stay on after
              launch to train your team and keep improving.
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/about" className="link-line">
                Meet the team <ArrowRight />
              </Link>
            </Reveal>
          </div>
          <Photo
            photo={photos.team}
            className="people__hero"
            sizes="(max-width: 900px) 100vw, 58vw"
            caption="Discovery — we start in the room with you"
          />
        </div>

        <div className="people__row">
          <Photo photo={photos.wireframe} className="people__a" sizes="(max-width: 900px) 100vw, 30vw" caption="Wireframes before code" />
          <Photo photo={photos.nightDev} className="people__b" sizes="(max-width: 900px) 100vw, 42vw" caption="Senior engineers, shipping weekly" />
          <Photo photo={photos.hands} className="people__c" sizes="(max-width: 900px) 100vw, 24vw" caption="One shared roadmap" />
        </div>

        <div className="stack" aria-label="Our toolkit">
          <span className="label">Our toolkit</span>
          <ul className="stack__list">
            {toolkit.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
