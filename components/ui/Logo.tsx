"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

/* The WnR Advisory logo, as on the current site: the emblem image followed
   by "WnR" and an italic "Advisory".
   Tries /public/logo.png, then the live site's file, then shows the
   wordmark alone. The image stays hidden until it has really loaded, so
   a missing file never shows as a broken-image icon. */
export function Logo({ className = "" }: { className?: string }) {
  const sources = [site.logo, site.logoFallback];
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Catch load/error events that fired before React hydrated.
  useEffect(() => {
    const img = ref.current;
    if (!img || !img.complete) return;
    if (img.naturalWidth > 0) setOk(true);
    else setI((n) => n + 1);
  }, [i]);

  return (
    <span className={`logo ${className}`}>
      {i < sources.length && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          key={sources[i]}
          src={sources[i]}
          alt=""
          width={34}
          height={34}
          className={`logo__img ${ok ? "is-ok" : ""}`}
          onLoad={() => setOk(true)}
          onError={() => {
            setOk(false);
            setI((n) => n + 1);
          }}
        />
      )}
      <span className="logo__word">
        WnR <span className="logo__adv em">Advisory</span>
      </span>
    </span>
  );
}
