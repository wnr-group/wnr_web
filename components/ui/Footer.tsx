import Link from "next/link";
import { capabilities, nav, site } from "@/lib/content";
import { Arrow } from "./Icons";

export function Footer() {
  return (
    <footer className="ftr" data-theme="night">
      <div className="wrap">
        <div className="ftr__top">
          <p className="ftr__statement t-d2">
            Building <span className="em">what’s next</span> for growing businesses.
          </p>
          <a href={`mailto:${site.email}`} className="ftr__mail">
            <span className="label">Write to us</span>
            <span className="ftr__mailaddr">
              {site.email} <Arrow />
            </span>
          </a>
        </div>

        <div className="ftr__cols">
          <div>
            <span className="label ftr__h">Company</span>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="label ftr__h">Services</span>
            <ul>
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/services#${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="label ftr__h">Connect</span>
            <ul>
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="label ftr__h">Contact</span>
            <ul>
              <li>{site.company}</li>
              {site.address.map((l) => (
                <li key={l} className="ftr__addr">
                  {l}
                </li>
              ))}
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ftr__mega" aria-hidden>
          W<span className="em">n</span>R<span className="ftr__megadot" />
        </div>

        <div className="ftr__base">
          <span className="mono">
            © {new Date().getFullYear()} {site.name} · {site.footerLine}
          </span>
          <span className="mono">{site.location}</span>
          <a href="#top" className="mono">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
