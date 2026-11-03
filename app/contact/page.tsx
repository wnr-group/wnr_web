import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/content";
import { FAQ } from "@/components/sections/Closing";

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
        aside="Free consultation"
        lines={[
          <>
            Let’s <span className="em">talk.</span>
          </>,
        ]}
        lead="Tell us what you’re building. We’ll come back with a clear plan and estimate, usually within one working day."
      />
      <section className="contact">
        <div className="wrap contact__grid">
          <ContactForm />
          <aside className="contact__side">
            <div className="contact__card">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--ultra contact__wa">
                <span>Chat on WhatsApp</span>
                <span className="btn__icon">↗</span>
              </a>
              <span className="label">Write directly</span>
              <a href={`mailto:${site.email}`} className="contact__mail">
                {site.email}
              </a>
              <span className="label">Call</span>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              <span className="label">Visit us</span>
              <address className="contact__addr">
                {site.company}
                {site.address.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
              <span className="label">Follow</span>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                Instagram · @wnr__group
              </a>
            </div>
            <div className="contact__next">
              <span className="label">What happens next</span>
              <ol>
                <li>
                  <span className="mono t-ultra">01</span> A short call or WhatsApp chat to understand your goals.
                </li>
                <li>
                  <span className="mono t-ultra">02</span> A clear plan and estimate.
                </li>
                <li>
                  <span className="mono t-ultra">03</span> Discover, design, develop, deliver, and we stay on after launch.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
      <FAQ />
    </>
  );
}
