import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Icons";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "ink" | "ultra" | "light";
  className?: string;
};

export function Button({ href, children, variant = "ink", className = "" }: Props) {
  const v = variant === "ink" ? "" : `btn--${variant}`;
  return (
    <Link href={href} className={`btn ${v} ${className}`}>
      <span>{children}</span>
      <span className="btn__icon">
        <Arrow />
      </span>
    </Link>
  );
}

export function SheetHeader({ fig, title, aside, night = false }: { fig: string; title: string; aside?: string; night?: boolean }) {
  return (
    <div className={`sheet ${night ? "sheet--night" : ""}`}>
      <span className="label sheet__fig">FIG. {fig}</span>
      <span className="label">{title}</span>
      <span className="sheet__rule" aria-hidden />
      {aside && <span className="label">{aside}</span>}
    </div>
  );
}
