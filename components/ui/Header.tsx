"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { capabilities, site } from "@/lib/content";
import { Logo, Arrow } from "./Icons";

const links = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

/* Standard enterprise header: logo · nav with a Services mega-menu ·
   contact link + primary CTA. White bar, inverts over dark sections. */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [night, setNight] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 8);
      let n = false;
      document.querySelectorAll<HTMLElement>('[data-theme="night"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 36 && r.bottom >= 36) n = true;
      });
      setNight(n);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (setMega(false), setOpen(false));
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");
  const openMega = () => {
    if (closeT.current) clearTimeout(closeT.current);
    setMega(true);
  };
  const closeMega = () => {
    closeT.current = setTimeout(() => setMega(false), 140);
  };

  return (
    <header
      className={`hdr ${scrolled ? "is-scrolled" : ""} ${night && !open && !mega ? "is-night" : ""} ${open ? "is-open" : ""} ${mega ? "has-mega" : ""}`}
    >
      <div className="hdr__bar wrap">
        <Link href="/" className="hdr__logo" aria-label="WnR Advisory, home">
          <Logo />
        </Link>

        <nav className="hdr__nav" aria-label="Primary">
          <div className="hdr__item" onMouseEnter={openMega} onMouseLeave={closeMega}>
            <button
              className={`hdr__link hdr__link--menu ${isActive("/services") ? "is-active" : ""}`}
              aria-expanded={mega}
              aria-controls="mega-services"
              onClick={() => setMega((m) => !m)}
              onFocus={openMega}
            >
              Services
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {links.map((n) => (
            <Link key={n.href} href={n.href} className={`hdr__link ${isActive(n.href) ? "is-active" : ""}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hdr__end">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hdr__phone">
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"
                fill="currentColor"
              />
            </svg>
            {site.phone}
          </a>
          <Link href="/contact" className="hdr__cta">
            Start a project <Arrow />
          </Link>
          <button
            className="hdr__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Services mega-menu */}
      <div
        id="mega-services"
        className={`mega ${mega ? "is-on" : ""}`}
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        hidden={!mega}
      >
        <div className="wrap mega__in">
          <div className="mega__intro">
            <span className="mega__k">Services</span>
            <p>Everything your business runs on, from one accountable team.</p>
            <Link href="/services" className="link-line">
              All services <Arrow />
            </Link>
          </div>
          <ul className="mega__grid">
            {capabilities.map((c) => (
              <li key={c.slug}>
                <Link href={`/services#${c.slug}`} className="mega__card">
                  <span className="mega__ic" aria-hidden>
                    {c.index}
                  </span>
                  <span>
                    <b>{c.title}</b>
                    <span>{c.kicker}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="mmenu" hidden={!open}>
        <nav className="mmenu__nav wrap" aria-label="Mobile">
          {[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, ...links].map((n, i) => (
            <Link key={n.href} href={n.href} className="mmenu__link" style={{ ["--i" as string]: i }}>
              {n.label}
              <Arrow />
            </Link>
          ))}
        </nav>
        <div className="mmenu__foot wrap">
          <Link href="/contact" className="btn btn--ultra">
            <span>Start a project</span>
            <span className="btn__icon">
              <Arrow />
            </span>
          </Link>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="link-line">
            WhatsApp {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
