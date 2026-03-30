"use client";

import { ArrowRight, GitBranch, School, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubThemesOpen, setIsSubThemesOpen] = useState(false);
  const [isEWUOpen, setIsEWUOpen] = useState(false);

  const subThemes = [
    "Strategic Issues in Supply Chain Management",
    "Global Supply Chain Integration",
    "Industrial Application of Supply Chain Management",
    "Supply Chain Sustainability",
    "Circular Economy",
    "Supply Chain Digtization/AI application in SCM",
    "Supply Chain Management and SDGs",
    "Geo Politics, Geo Economy and SCM",
    "Supply Chain Finance",
    "Supply Chain Optimization",
    "Talent Management in SCM",
    "Outsourcing Logistics Services",
    "Responsible and Ethical SCM",
    "Building Adaptive and Risk-Intelligent Supply Chains",
  ];

  useEffect(() => {
    document.body.style.overflow =
      isModalOpen || isSubThemesOpen || isEWUOpen ? "hidden" : "unset";
  }, [isModalOpen, isSubThemesOpen, isEWUOpen]);

  return (
    <section
      id="about"
      className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-white px-5 md:px-10"
    >
      {/* Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-[#C5A059]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-[#003366]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center relative z-10">
        <div className="mb-6 md:mb-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2 bg-[#C5A059]/10 px-3 py-1 rounded-full">
            <Trophy size={12} /> Anticipate. Adapt. Transform
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none">
            About <span className="text-[#C5A059]">The Conference</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-center">
          {/* LEFT: IMAGE & LOGO OVERLAY */}
          <div className="lg:col-span-5 hidden md:block">
            <div className="relative group">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,51,102,0.15)]">
                <img
                  src="/images/about-conference.jpg"
                  alt="Theme"
                  className="w-full h-[300px] lg:h-[400px] object-cover"
                />

                {/* 🚀 LOGO OVERLAY (Top Left) */}
                <div className="absolute top-4 left-4 z-30 w-20 h-20 bg-black/40 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/50 group-hover:scale-110 transition-transform duration-500">
                  <img
                    src="/images/logo.png"
                    alt="EWU Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#C5A059]/10 rounded-3xl -z-10 animate-pulse"></div>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            <header className="space-y-2">
              <h2 className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.4em]">
                Welcome to DBA Conference 2026
              </h2>
              <h4 className="text-3xl md:text-5xl font-black text-[#003366] leading-[1.1] uppercase tracking-tighter">
                Building{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#b38b4d]">
                  Resilient
                </span>{" "}
                <br /> Supply Chains
              </h4>
            </header>

            <p className="text-slate-500 text-sm md:text-base lg:text-lg leading-relaxed font-medium max-w-2xl text-justify">
              The Conference on Building Resilient Supply Chains offers a
              vibrant forum for exploring how organizations can effectively
              anticipate, withstand, and recover from disruptions in today's
              volatile global landscape. The event brings together leading
              academics, industry experts, and policymakers to drive
              conversations on strategic risk management, sustainability,
              digital innovation, and transformative partnerships. Through
              cutting-edge research presentations and engaging discussions, the
              conference delivers practical insights and innovative strategies
              to build resilient supply chains, advance operational excellence,
              and ensure long-term competitiveness in interconnected global
              markets.
            </p>

            {/* 🚀 ACTION BUTTONS: Added EWU Modal Button */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setIsEWUOpen(true)}
                className="bg-white text-[#003366] border-2 border-[#003366] px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#003366] hover:text-white transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                <School size={14} className="text-[#C5A059]" /> About EWU
              </button>

              <button
                onClick={() => setIsSubThemesOpen(true)}
                className="relative group bg-[#003366] text-white px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all"
              >
                <div className="absolute inset-0 rounded-xl border-2 border-[#C5A059] animate-pulse opacity-50"></div>
                <GitBranch size={14} className="text-[#C5A059]" />
                <span>Sub Themes & Tracks</span>
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 UPDATED MODAL: CONFERENCE DETAILS */}
      {isModalOpen && (
        <ModalWrapper onClose={() => setIsModalOpen(false)}>
          <div className="space-y-6">
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              The Conference on Building Resilient Supply Chains offers a
              vibrant forum for exploring how organizations can effectively
              anticipate, withstand, and recover from disruptions.
            </p>
            <ThemesGrid themes={subThemes} />
          </div>
        </ModalWrapper>
      )}

      {/* 🚀 UPDATED MODAL: SUB-THEMES */}
      {isSubThemesOpen && (
        <ModalWrapper onClose={() => setIsSubThemesOpen(false)}>
          <div className="space-y-6">
            <div className="bg-[#003366]/5 p-4 rounded-2xl border-l-4 border-[#C5A059]">
              <p className="text-[#003366] text-xs md:text-sm font-bold uppercase tracking-tight">
                Call for Papers: 2026 Submission Tracks
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                Papers and abstracts are invited under the following sub themes:
              </p>
            </div>
            <ThemesGrid themes={subThemes} />
          </div>
        </ModalWrapper>
      )}

      {/* 🚀 NEW MODAL: ABOUT EWU */}
      {isEWUOpen && (
        <ModalWrapper onClose={() => setIsEWUOpen(false)}>
          <div className="space-y-6">
            <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-8">
              <img
                src="/images/ewu-campus.jpg"
                alt="EWU Campus"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 to-transparent flex items-end p-8">
                <h5 className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">
                  Academic Excellence Since 1996
                </h5>
              </div>
            </div>
            <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-medium text-justify">
              <p>
                East West University (EWU) is a prominent private institution in
                Bangladesh, established in 1996 with a mission to provide
                world-class education and foster academic excellence. The
                university offers a wide range of undergraduate and postgraduate
                programs across fields including Business Administration,
                Computer Science, Electrical Engineering, Law, and more. EWU's
                curriculum is designed to meet international standards, ensuring
                students receive a comprehensive education that blends
                theoretical knowledge with practical skills.
              </p>
              <p>
                With a strong emphasis on research and innovation, EWU strives
                to foster critical thinking, problem-solving, and creative
                expression. The university is dedicated to building global
                partnerships and maintaining academic integrity.
              </p>
              <p>
                It regularly hosts seminars, workshops, and conferences to
                engage students and faculty in contemporary issues. EWU's highly
                qualified faculty members are dedicated to mentoring students,
                preparing them for leadership roles in both the local and global
                job markets, and contributing to the nation's socio-economic
                development.
              </p>
            </div>
          </div>
        </ModalWrapper>
      )}
    </section>
  );
}

{
  /* 🚀 BRANDED MODAL WRAPPER (Matches Attachment) */
}
function ModalWrapper({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-[#001A33]/95 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/20">
        {/* 🚀 ATTACHMENT STYLE HEADER */}
        <div className="shrink-0 bg-[#003366] p-6 md:p-8 flex justify-between items-center relative overflow-hidden">
          {/* Subtle logo watermark in background */}
          <img
            src="/images/logo.png"
            className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 pointer-events-none"
            alt=""
          />

          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-white font-black text-xl md:text-2xl leading-none tracking-tight uppercase">
                DBA <span className="text-[#C5A059]">Conference</span>
              </h3>
              <span className="text-white/50 text-[9px] md:text-[11px] font-bold tracking-[0.2em] mt-1 uppercase">
                International 2026
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C5A059] transition-colors relative z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-grow overflow-y-auto p-6 md:p-10 custom-scrollbar overscroll-contain">
          {children}
        </div>

        {/* BRANDED FOOTER */}
        <div className="shrink-0 p-5 bg-slate-50 border-t border-slate-100 flex justify-between items-center px-10">
          <span className="text-[9px] font-black text-[#003366]/30 uppercase tracking-widest">
            East West University
          </span>
          <button
            onClick={onClose}
            className="text-[#003366] font-black text-[10px] uppercase tracking-widest hover:text-[#C5A059] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemesGrid({ themes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
      {themes.map((theme, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-[#C5A059]/30 transition-all group"
        >
          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C5A059] group-hover:scale-125 transition-transform shrink-0"></div>
          <span className="text-[#003366] text-[10px] md:text-xs font-bold leading-tight uppercase">
            {theme}
          </span>
        </div>
      ))}
    </div>
  );
}
