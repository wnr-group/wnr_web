import type { ReactNode } from "react";
import { SheetHeader } from "./Button";
import { Reveal, RevealLines } from "./Reveal";

export function PageHead({
  fig,
  label,
  aside,
  lines,
  lead,
  children,
}: {
  fig: string;
  label: string;
  aside?: string;
  lines: ReactNode[];
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="phead">
      <div className="wrap">
        <SheetHeader fig={fig} title={label} aside={aside} />
        <div className="phead__grid">
          <RevealLines as="h1" className="t-mega phead__title" lines={lines} />
          {(lead || children) && (
            <Reveal className="phead__side" delay={0.2}>
              {lead && <p className="t-lead">{lead}</p>}
              {children}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
