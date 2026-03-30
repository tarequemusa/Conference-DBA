"use client";

import {
  ArrowRight,
  BookOpen,
  GitBranch,
  Globe,
  Info,
  Lightbulb,
  School,
  Send,
  Target,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal"; // Assuming this is your auth component

export default function About() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSubThemesOpen, setIsSubThemesOpen] = useState(false);
  const [isEWUOpen, setIsEWUOpen] = useState(false);

  // Auth Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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

  const features = [
    {
      icon: (
        <Globe
          className="text-[#003366] group-hover:text-[#C5A059] transition-colors"
          size={20}
        />
      ),
      title: "Global Networking",
      desc: "Connect with researchers from across 15+ countries.",
    },
    {
      icon: (
        <BookOpen
          className="text-[#003366] group-hover:text-[#C5A059] transition-colors"
          size={20}
        />
      ),
      title: "Quality Publications",
      desc: "Get research indexed in high-impact Scopus proceedings.",
    },
    {
      icon: (
        <Lightbulb
          className="text-[#003366] group-hover:text-[#C5A059] transition-colors"
          size={20}
        />
      ),
      title: "Innovation Hub",
      desc: "Explore cutting-edge trends in Business and Tech.",
    },
    {
      icon: (
        <Target
          className="text-[#003366] group-hover:text-[#C5A059] transition-colors"
          size={20}
        />
      ),
      title: "Academic Growth",
      desc: "Workshops designed for professional scaling.",
    },
  ];

  useEffect(() => {
    document.body.style.overflow =
      isDetailsOpen || isSubThemesOpen || isEWUOpen || isAuthOpen
        ? "hidden"
        : "unset";
  }, [isDetailsOpen, isSubThemesOpen, isEWUOpen, isAuthOpen]);

  // Handler for Submission / Registration
  const handleStartSubmission = () => {
    setIsSubThemesOpen(false);
    setIsAuthOpen(true);
  };

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white px-5 md:px-10 py-16 lg:py-0"
    >
      <style jsx global>{`
        @keyframes blink-outline {
          0% {
            box-shadow: 0 0 0 0px rgba(197, 160, 89, 0.7);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(197, 160, 89, 0);
          }
          100% {
            box-shadow: 0 0 0 0px rgba(197, 160, 89, 0);
          }
        }
        .animate-blink-outline {
          animation: blink-outline 2s infinite;
        }
      `}</style>

      {/* Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-[#C5A059]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-[#003366]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          {/* LEFT: IMAGE & LOGO OVERLAY */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#C5A059]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#003366]/5 rounded-[3rem] rotate-12 -z-10"></div>

            <div className="relative group">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,51,102,0.15)] group-hover:-translate-y-2">
                <img
                  src="/images/about-conference.jpg"
                  alt="Theme"
                  className="w-full h-auto lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 z-30 w-20 h-20 bg-black/40 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/50 group-hover:scale-110 transition-transform duration-500">
                  <img
                    src="/images/logo.png"
                    alt="EWU Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="lg:col-span-7 space-y-8">
            <header className="space-y-3">
              <h2 className="text-[#C5A059] text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                Welcome to DBA Conference 2026
              </h2>
              <h4 className="text-4xl md:text-6xl font-black text-[#003366] leading-[1.05] uppercase tracking-tighter">
                Building{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#b38b4d]">
                  Resilient
                </span>{" "}
                <br /> Supply Chains
              </h4>
            </header>

            <p className="text-slate-500 text-sm md:text-base lg:text-lg leading-relaxed font-medium max-w-2xl border-l-4 border-[#C5A059]/30 pl-6 italic">
              The Conference on Building Resilient Supply Chains offers a
              vibrant forum for exploring how organizations can effectively
              anticipate, withstand, and recover from disruptions.
            </p>

            {/* FEATURE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 pt-4">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[#003366] transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                    <div className="group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                      {item.icon}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-[#003366] text-sm uppercase tracking-tight group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button
                onClick={() => setIsDetailsOpen(true)}
                className="bg-white text-[#003366] border-2 border-[#003366] px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#003366] hover:text-white transition-all flex items-center justify-center gap-3 shadow-md active:scale-95"
              >
                <Info size={16} /> Conference Details
              </button>

              <button
                onClick={() => setIsSubThemesOpen(true)}
                className="relative group bg-[#003366] text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all overflow-hidden animate-blink-outline"
              >
                <GitBranch size={16} className="text-[#C5A059]" />
                <span>Sub Themes & Tracks</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </button>

              <button
                onClick={() => setIsEWUOpen(true)}
                className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-50 border border-slate-200 text-[#003366] font-black text-[11px] uppercase tracking-widest hover:bg-white hover:border-[#C5A059] hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                <School size={16} className="text-[#C5A059]" />{" "}
                <span>About EWU</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL SYSTEM --- */}

      {isDetailsOpen && (
        <ModalWrapper
          onClose={() => setIsDetailsOpen(false)}
          title="Conference Prospectus"
        >
          <div className="space-y-6">
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium text-justify">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h5 className="font-black text-[#003366] text-xs uppercase mb-2">
                  Venue
                </h5>
                <p className="text-slate-500 text-sm">
                  East West University, Dhaka, Bangladesh.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h5 className="font-black text-[#003366] text-xs uppercase mb-2">
                  Host
                </h5>
                <p className="text-slate-500 text-sm">
                  Department of Business Administration, East West University
                </p>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}

      {isSubThemesOpen && (
        <ModalWrapper
          onClose={() => setIsSubThemesOpen(false)}
          title="Call for Papers: Submission Tracks"
        >
          <div className="space-y-8 flex flex-col">
            <div className="bg-[#003366]/5 p-5 rounded-2xl border-l-4 border-[#C5A059]">
              <p className="text-[#003366] font-black text-xs uppercase tracking-tight mb-1">
                Important Notice
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium italic">
                Papers and abstracts are invited under the following sub themes:
              </p>
            </div>

            <ThemesGrid themes={subThemes} />

            {/* 🚀 NEW HIGHLIGHTED CTA: Call for Paper Button */}
            <div className="mt-8 p-8 bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-4">
                Have your abstract ready?
              </p>
              <button
                onClick={handleStartSubmission}
                className="inline-flex items-center gap-3 bg-[#C5A059] text-[#003366] px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-[#003366] hover:text-white transition-all animate-blink-outline active:scale-95"
              >
                Call for Paper <Send size={16} />
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {isEWUOpen && (
        <ModalWrapper
          onClose={() => setIsEWUOpen(false)}
          title="East West University"
        >
          <div className="space-y-6">
            <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-8 shadow-xl">
              <img
                src="/images/ewu-campus.jpg"
                alt="EWU Campus"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 to-transparent flex items-end p-8">
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
                partnerships and maintaining academic integrity. It regularly
                hosts seminars, workshops, and conferences to engage students
                and faculty in contemporary issues. EWU's highly qualified
                faculty members are dedicated to mentoring students, preparing
                them for leadership roles in both the local and global job
                markets, and contributing to the nation's socio-economic
                development.
              </p>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* Auth Modal for Registration */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView="signup"
      />
    </section>
  );
}

function ModalWrapper({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div
        className="absolute inset-0 bg-[#001A33]/95 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-500">
        <div className="shrink-0 bg-[#003366] p-6 md:p-8 flex justify-between items-center relative overflow-hidden">
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
                {title}
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
        <div className="flex-grow overflow-y-auto p-6 md:p-10 custom-scrollbar overscroll-contain">
          {children}
        </div>
        <div className="shrink-0 p-5 bg-slate-50 border-t border-slate-100 flex justify-between items-center px-10">
          <span className="text-[9px] font-black text-[#003366]/30 uppercase tracking-widest">
            East West University
          </span>
          <button
            onClick={onClose}
            className="text-[#003366] font-black text-[10px] uppercase tracking-widest hover:text-[#C5A059] transition-colors"
          >
            Close View
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
