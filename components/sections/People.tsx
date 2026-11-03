import Link from "next/link";
import { photos } from "@/lib/content";
import { Photo } from "@/components/ui/Photo";
import { SheetHeader } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

const platforms = ["AWS", "Google Cloud", "Azure", "Shopify", "Salesforce", "Odoo", "Snowflake", "OpenAI", "Anthropic", "Stripe", "Razorpay", "Kubernetes"];

/* The human chapter: who builds the systems, and how they work with you. */
export function People() {
  return (
    <section className="people section" aria-labelledby="people-title">
      <div className="wrap">
        <SheetHeader fig="02.1" title="The people" aside="Design + engineering, one table" />

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
              Every system starts with a conversation. We workshop with the people who will use it, sketch before we code, and ship
              alongside your team until it runs on its own.
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/studio" className="link-line">
                Meet the studio <ArrowRight />
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

        <div className="stack" aria-label="Platforms we build on">
          <span className="label">Platforms we build on</span>
          <ul className="stack__list">
            {platforms.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
