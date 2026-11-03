import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { Anatomy, CapabilityList } from "@/components/sections/CapabilityDetail";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/Closing";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, web & mobile apps, custom software, e-commerce, end-to-end business suites and AI automation from WnR Advisory.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHead
        fig="S"
        label="Services"
        aside="06 services · 01 partner"
        lines={[
          "Everything your",
          <>
            business <span className="em">runs on.</span>
          </>,
        ]}
        lead="Each service is a layer of the same engineered core, so your website talks to your store, your store talks to billing, and nothing is bolted on."
      />
      <Anatomy />
      <CapabilityList />
      <Process />
      <CTA />
    </>
  );
}
