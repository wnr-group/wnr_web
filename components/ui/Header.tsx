"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { Logo, Arrow } from "./Icons";

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [night, setNight] = useState(false);
  const [open, setOpen] = useState(false);
  const time = useClock();

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 24);
      // Invert the header over sections marked data-theme="night"
      let n = false;
      document.querySelectorAll<HTMLElement>('[data-theme="night"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 40 && r.bottom >= 40) n = true;
      });
      setNight(n);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className={`hdr ${scrolled ? "is-scrolled" : ""} ${night && !open ? "is-night" : ""} ${open ? "is-open" : ""}`}>
      <div className="hdr__bar wrap">
        <Link href="/" className="hdr__logo" aria-label="WnR Advisory — home">
          <Logo />
        </Link>

        <nav className="hdr__nav" aria-label="Primary">
          {nav.map((n, i) => (
            <Link key={n.href} href={n.href} className={`hdr__link ${isActive(n.href) ? "is-active" : ""}`}>
              <span className="mono hdr__idx">0{i + 1}</span>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hdr__end">
          <span className="mono hdr__time" aria-label="Studio local time">
            <i className="hdr__live" /> IST {time}
          </span>
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

      <div id="mobile-menu" className="mmenu" hidden={!open}>
        <nav className="mmenu__nav wrap" aria-label="Mobile">
          {[{ label: "Home", href: "/" }, ...nav].map((n, i) => (
            <Link key={n.href} href={n.href} className="mmenu__link" style={{ ["--i" as string]: i }}>
              <span className="mono">0{i}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mmenu__foot wrap">
          <span className="label">Have an ambitious idea?</span>
          <Link href="/contact" className="btn btn--ultra">
            <span>Start a project</span>
            <span className="btn__icon">
              <Arrow />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
