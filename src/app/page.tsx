'use client';

import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Differentiators from "@/components/sections/Differentiators";
import Comparison from "@/components/sections/Comparison";
import Features from "@/components/sections/Features";
import ModuleShowcase from "@/components/sections/ModuleShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import PageAtmosphere from "@/components/ui/PageAtmosphere";
import FlowThread from "@/components/ui/FlowThread";

export default function Home() {
  useLenis();

  useEffect(() => {
    if (typeof history !== "undefined") history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <>
      {/* Telón continuo (fijo) detrás de todo */}
      <PageAtmosphere />

      {/* Contenido sobre la atmósfera; el hilo de flujo recorre todo el alto */}
      <div className="relative z-10">
        <FlowThread />
        <Navbar />
        <main className="relative">
          <Hero />
          <Differentiators />
          <Comparison />
          <Features />
          <ModuleShowcase />
          <HowItWorks />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>

      <FloatingWhatsApp />
    </>
  );
}
