import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { CTA } from "@/components/sections/Closing";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected platforms engineered by WnR Advisory: commerce, enterprise systems, data and AI.",
};

export default function WorkPage() {
  return (
    <>
      <PageHead
        fig="W"
        label="Selected work"
        aside={`${String(projects.length).padStart(2, "0")} projects`}
        lines={[
          "Platforms",
          <>
            in <span className="em">production.</span>
          </>,
        ]}
        lead="Sample projects showing the kind of systems we build. Replace with your own case studies."
      />
      <WorkGrid />
      <CTA />
    </>
  );
}
