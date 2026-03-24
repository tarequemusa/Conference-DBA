"use client";

import {
  BadgeDollarSign,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  Layers,
  Scale,
} from "lucide-react";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Guidelines() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const steps = [
    {
      title: "Paper Template",
      desc: "Official IEEE/APA MS Word templates with standard margins.",
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      link: "template",
    },
    {
      title: "Registration Fees",
      desc: "Breakdown for Students, Professionals, and International attendees.",
      icon: BadgeDollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      link: "pricing",
    },
    {
      title: "Submission Guide",
      desc: "Technical requirements for abstracts and the review process.",
      icon: ClipboardCheck,
      color: "text-[#C5A059]",
      bg: "bg-[#C5A059]/10",
      link: "submission",
    },
    {
      title: "Publication Ethics",
      desc: "Guidelines on plagiarism and COPE ethical standards.",
      icon: Scale,
      color: "text-red-500",
      bg: "bg-red-500/10",
      link: "ethics",
    },
  ];

  return (
    <section
      id="guidelines"
      // CHANGED: min-h-screen instead of h-screen, added pt-24 for mobile navbar clearance
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white pt-24 pb-12 md:py-8"
      style={{
        background: `radial-gradient(at 100% 0%, rgba(197, 160, 89, 0.05) 0px, transparent 50%), 
                     radial-gradient(at 0% 100%, rgba(0, 51, 102, 0.03) 0px, transparent 50%),
                     #FFFFFF`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        {/* Header - Ensures visibility by using relative positioning and safe margins */}
        <div className="mb-8 md:mb-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-3 bg-[#C5A059]/10 px-3 py-1 rounded-full">
            <Layers size={12} /> Information Hub
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-tight">
            Author <span className="text-[#C5A059]">Guidelines</span>
          </h3>
          <p className="text-slate-400 text-[11px] md:text-sm font-medium mt-3 max-w-xl leading-relaxed hidden xs:block">
            Essential technical requirements and ethical standards for
            researchers submitting to Conference DBA 2026.
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-5 lg:p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-[#C5A059] hover:shadow-[0_20px_50px_rgba(197,160,89,0.1)] transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div
                  className={`w-12 h-12 lg:w-14 lg:h-14 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mb-4 lg:mb-6 shadow-sm`}
                >
                  <step.icon size={24} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm lg:text-lg font-black text-[#003366] uppercase tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-[10px] lg:text-[11px] leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50">
                <button
                  onClick={() => scrollToSection(step.link)}
                  className="flex items-center gap-1.5 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#003366] hover:text-[#C5A059] transition-colors group/btn"
                >
                  View Details
                  <ChevronRight
                    size={12}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>

              <span className="absolute top-4 right-6 text-4xl lg:text-5xl font-black text-slate-100/40 pointer-events-none">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-8 lg:mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100 pt-6 lg:pt-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#003366]/5 flex items-center justify-center text-[#003366]">
              <Download size={18} />
            </div>
            <p className="text-slate-400 font-bold text-[9px] lg:text-[10px] uppercase tracking-[0.2em]">
              Author Kit 2026:{" "}
              <span className="text-[#003366]">ICEBTM_Template.docx</span>
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-5 py-3 lg:px-6 lg:py-3.5 bg-white border border-slate-200 text-[#003366] rounded-xl font-black text-[9px] lg:text-[10px] uppercase tracking-widest active:scale-95">
              Download Kit
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex-1 md:flex-none px-6 py-3 lg:px-8 lg:py-3.5 bg-[#003366] text-white rounded-xl font-black text-[9px] lg:text-[10px] uppercase tracking-widest hover:bg-[#C5A059] transition-all shadow-lg active:scale-95"
            >
              Submit Now
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView="signup"
      />
    </section>
  );
}
