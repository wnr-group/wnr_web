import { Hero, Stats } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Principles, CTA, FAQ } from "@/components/sections/Closing";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { AIMoment } from "@/components/sections/AIMoment";
import { Process } from "@/components/sections/Process";
import { People } from "@/components/sections/People";
import { Marquee } from "@/components/sections/Marquee";

/* Order follows how a buyer decides: what you do → proof → why you →
   evidence → how you work → who you are → questions → contact. */
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Capabilities />
      <Principles />
      <WorkIndex limit={4} />
      <AIMoment />
      <Process />
      <People />
      <Marquee />
      <FAQ />
      <CTA />
    </>
  );
}
