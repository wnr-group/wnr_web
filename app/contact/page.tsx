import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with WnR Advisory.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        fig="✉"
        label="Start a project"
        aside="Reply within 1 working day"
        lines={[
          <>
            Let’s <span className="em">engineer</span>
          </>,
          "what’s next.",
        ]}
      />
      <section className="contact">
        <div className="wrap contact__grid">
          <ContactForm />
          <aside className="contact__side">
            <div className="contact__card">
              <span className="label">Write directly</span>
              <a href={`mailto:${site.email}`} className="contact__mail">
                {site.email}
              </a>
              <span className="label">Call</span>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              <span className="label">Studio</span>
              <span>{site.location}</span>
            </div>
            <div className="contact__next">
              <span className="label">What happens next</span>
              <ol>
                <li>
                  <span className="mono t-ultra">01</span> A 30-minute call to understand the goal.
                </li>
                <li>
                  <span className="mono t-ultra">02</span> A written point of view within a week.
                </li>
                <li>
                  <span className="mono t-ultra">03</span> A blueprint sprint, or an honest referral if we&apos;re not the right fit.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
