import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Marquee } from "@/components/sections/Marquee";
import { People } from "@/components/sections/People";
import { Capabilities } from "@/components/sections/Capabilities";
import { AIMoment } from "@/components/sections/AIMoment";
import { Process } from "@/components/sections/Process";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { Principles, CTA } from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <People />
      <Marquee />
      <Capabilities />
      <AIMoment />
      <WorkIndex limit={6} />
      <Process />
      <Principles />
      <CTA />
    </>
  );
}
