"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Arrow } from "./Icons";

/* A quiet booking bar on phones: appears once the visitor has scrolled
   past the first screen, hides near the footer and on the contact page. */
export function MobileCTA() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const ftr = document.querySelector(".ftr");
      const nearEnd = ftr ? ftr.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > window.innerHeight * 0.9 && !nearEnd);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [path]);
  if (path?.startsWith("/contact")) return null;
  return (
    <div className={`mcta ${show ? "is-on" : ""}`} aria-hidden={!show}>
      <span className="mcta__txt">
        <b>Have a project?</b>
        <span>Reply within one working day</span>
      </span>
      <Link href="/contact" className="mcta__btn" tabIndex={show ? 0 : -1}>
        Book a call <Arrow />
      </Link>
    </div>
  );
}
