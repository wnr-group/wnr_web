"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo as PhotoT } from "@/lib/content";
import { useInView } from "@/lib/motion";

/* Editorial photograph with the house grade: graded for the dark theme,
   eases in from a slight zoom when it enters the viewport, and falls
   back to a designed gradient if the image cannot load. */
export function Photo({
  photo,
  sizes = "(max-width: 900px) 100vw, 50vw",
  className = "",
  caption,
  priority = false,
  grade = "default",
}: {
  photo: PhotoT;
  sizes?: string;
  className?: string;
  caption?: string;
  priority?: boolean;
  grade?: "default" | "deep" | "none";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.15 });
  const [failed, setFailed] = useState(false);
  return (
    <figure ref={ref} className={`photo photo--${grade} ${inView ? "is-in" : ""} ${failed ? "is-failed" : ""} ${className}`}>
      {!failed && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="photo__img"
          style={{ objectPosition: photo.pos ?? "50% 50%" }}
          onError={() => setFailed(true)}
        />
      )}
      <span className="photo__grade" aria-hidden />
      {caption && (
        <figcaption className="photo__cap mono">
          <span>{caption}</span>
          {photo.credit && <span className="photo__credit">{photo.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
