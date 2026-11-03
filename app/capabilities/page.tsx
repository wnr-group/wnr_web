import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { Anatomy, CapabilityList } from "@/components/sections/CapabilityDetail";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/Closing";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Product engineering, commerce, AI & automation, enterprise systems, data & analytics, and cloud & integration, engineered as one core.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHead
        fig="C"
        label="Capabilities"
        aside="06 disciplines · 05 layers"
        lines={[
          "Six disciplines.",
          <>
            <span className="em">One</span> core.
          </>,
        ]}
        lead="Each capability is a layer of the same engineered platform, so commerce talks to finance, data feeds intelligence, and nothing is bolted on."
      />
      <Anatomy />
      <CapabilityList />
      <Process />
      <CTA />
    </>
  );
}
