"use client";

import { useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
import { useInView } from "@/lib/motion";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
  style?: CSSProperties;
  threshold?: number;
};

/** Fades + lifts its children in once, when they enter the viewport. */
export function Reveal({ as: Tag = "div", className = "", delay = 0, children, style, threshold = 0.15 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold, rootMargin: "0px 0px -8% 0px" });
  return (
    <Tag
      ref={ref}
      className={`rv ${inView ? "is-in" : ""} ${className}`}
      style={{ ...style, ["--rv-delay" as string]: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

/** Masked line-by-line headline reveal. Each item in `lines` is one visual line. */
export function RevealLines({
  as: Tag = "h2",
  className = "",
  lines,
  delay = 0,
  stagger = 0.08,
  id,
}: {
  id?: string;
  as?: ElementType;
  className?: string;
  lines: ReactNode[];
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.2 });
  return (
    <Tag ref={ref} id={id} className={`${inView ? "is-in" : ""} ${className}`}>
      {lines.map((l, i) => (
        <span className="rv-line" key={i} style={{ ["--rv-delay" as string]: `${delay + i * stagger}s` }}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
