import type { SVGProps } from "react";

export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden {...p}>
    <path d="M2 12 12 2M12 2H4.5M12 2v7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...p}>
    <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The WnR mark — three offset planes: the Core, seen in elevation. */
export const Mark = ({ size = 28, ...p }: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
    <path d="M16 3 29 9.5 16 16 3 9.5 16 3Z" fill="var(--logo-blue)" />
    <path d="M3 15.5 16 22l13-6.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M3 21.5 16 28l13-6.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity=".45" />
  </svg>
);

export const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`logo ${className}`}>
    <Mark />
    <span className="logo__word">
      W<span className="em">n</span>R<span className="logo__sub">Advisory</span>
    </span>
  </span>
);
