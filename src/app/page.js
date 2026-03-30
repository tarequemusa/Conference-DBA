"use client";
import { useEffect, useState } from "react";

import About from "@/components/About";
import Committee from "@/components/Committee";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Guidelines from "@/components/Guidelines";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import ImportantDates from "@/components/ImportantDates";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Partners from "@/components/Partners";
import Pricing from "@/components/Pricing";
import Speakers from "@/components/Speakers";

export default function Home() {
  const [enableNavbar, setEnableNavbar] = useState(false);

  useEffect(() => {
    // Layout already handles Navbar globally
    setEnableNavbar(false);
  }, []);

  return (
    <main className="relative">
      {enableNavbar && <Navbar />} {/* ✅ safely disabled */}
      <section id="home">
        <Hero />
      </section>
      {/* Marquee usually looks best right under the Hero or floating over it */}
      <Marquee />
      <section id="about" className="scroll-mt-20">
        <About />
      </section>
      <section id="highlights" className="scroll-mt-20">
        <Highlights />
      </section>
      <section id="important-dates" className="scroll-mt-20">
        <ImportantDates />
      </section>
      <section id="guidelines" className="scroll-mt-20">
        <Guidelines />
      </section>
      <section id="speakers" className="scroll-mt-20">
        <Speakers />
      </section>
      <section id="committee" className="scroll-mt-20">
        <Committee />
      </section>
      <section id="pricing" className="scroll-mt-20">
        <Pricing />
      </section>
      <section id="partners">
        <Partners />
      </section>
      <section id="faq" className="scroll-mt-20">
        <FAQ />
      </section>
      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
