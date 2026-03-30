"use client";

import {
  BadgeDollarSign,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileDown,
  FileText,
  Layers,
  Map,
  Scale,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Guidelines() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

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
      isExternal: false,
    },
    {
      title: "Registration Fees",
      desc: "Breakdown for Students, Professionals, and International attendees.",
      icon: BadgeDollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      link: "pricing",
      isExternal: false,
    },
    {
      title: "Submission Guide",
      desc: "Technical requirements for abstracts and the review process.",
      icon: ClipboardCheck,
      color: "text-[#C5A059]",
      bg: "bg-[#C5A059]/10",
      link: "submission",
      isExternal: false,
    },
    {
      title: "Publication Ethics",
      desc: "Guidelines on plagiarism and COPE ethical standards.",
      icon: Scale,
      color: "text-red-500",
      bg: "bg-red-500/10",
      link: "/legal",
      isExternal: true,
    },
  ];

  return (
    <section
      id="guidelines"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white pt-24 pb-12 md:py-8"
      style={{
        background: `radial-gradient(at 100% 0%, rgba(197, 160, 89, 0.05) 0px, transparent 50%), 
                     radial-gradient(at 0% 100%, rgba(0, 51, 102, 0.03) 0px, transparent 50%),
                     #FFFFFF`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        {/* Header */}
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
                {step.isExternal ? (
                  <Link
                    href={step.link}
                    className="flex items-center gap-1.5 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#003366] hover:text-[#C5A059] transition-colors group/btn"
                  >
                    View Details
                    <ChevronRight
                      size={12}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                ) : (
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
                )}
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
              <a
                href="/template/formatting_templates.pdf"
                download="formatting_templates.pdf"
                className="text-[#003366] hover:text-[#C5A059] font-black transition-all underline decoration-[#C5A059]/30 underline-offset-4"
              >
                formatting_templates.pdf
              </a>
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="flex-1 md:flex-none px-5 py-3 lg:px-6 lg:py-3.5 bg-white border border-slate-200 text-[#003366] rounded-xl font-black text-[9px] lg:text-[10px] uppercase tracking-widest hover:border-[#C5A059] hover:text-[#C5A059] transition-all active:scale-95"
            >
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

      {/* --- DOWNLOAD KIT MODAL --- */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#001A33]/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in duration-300 border border-white/20">
            <div className="bg-[#003366] p-6 text-white flex justify-between items-center relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg font-black uppercase tracking-tight">
                  Author kit
                </h4>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">
                  Download Resources
                </p>
              </div>
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 transition-colors relative z-10"
              >
                <X size={20} />
              </button>
              <FileDown
                size={80}
                className="absolute -right-4 -bottom-4 text-white opacity-5 pointer-events-none"
              />
            </div>

            <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <a
                href="/template/abstract_formatting_guideline.pdf"
                download="abstract_formatting_guideline.pdf"
                className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#C5A059] group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-white transition-all">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#003366] uppercase">
                      Abstract Guideline
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      1.1 MB • Adobe PDF
                    </p>
                  </div>
                </div>
                <Download
                  size={16}
                  className="text-slate-300 group-hover:text-[#C5A059]"
                />
              </a>

              <a
                href="/template/full_paper_formatting_guideline.pdf"
                download="full_paper_formatting_guideline.pdf"
                className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#C5A059] group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-white transition-all">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#003366] uppercase">
                      Full Paper Guideline
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      222 KB • Adobe PDF
                    </p>
                  </div>
                </div>
                <Download
                  size={16}
                  className="text-slate-300 group-hover:text-[#C5A059]"
                />
              </a>

              <a
                href="/template/flyer_2nd_version.pdf"
                download="flyer_2nd_version.pdf"
                className="flex items-center justify-between p-5 rounded-2xl bg-[#C5A059]/5 border border-[#C5A059]/10 hover:border-[#C5A059] group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center group-hover:bg-[#003366] group-hover:text-white transition-all">
                    <Map size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#003366] uppercase">
                      Official Event Flyer
                    </p>
                    <p className="text-[10px] text-[#C5A059] font-bold">
                      999 KB • Adobe PDF
                    </p>
                  </div>
                </div>
                <Download size={16} className="text-[#C5A059]" />
              </a>
            </div>

            <div className="px-8 pb-8">
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="w-full py-4 rounded-xl bg-slate-100 text-[#003366] font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView="signup"
      />
    </section>
  );
}
