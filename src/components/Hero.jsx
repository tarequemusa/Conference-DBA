"use client";

import { ChevronRight, FileText, Send, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AuthModal from "./AuthModal";
import CFPModal from "./CFPModal";
import SubmissionModal from "./SubmissionModal";

export default function Hero() {
  const { data: session } = useSession();
  const [showCFP, setShowCFP] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleRegisterClick = () => {
    session ? setShowSubmission(true) : setIsAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/95 via-black/80 to-black" />

      {/* Animated Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#C5A059]/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      {/* REDUCED TOP PADDING: pt-16 on mobile, pt-24 on desktop */}
      <div className="relative z-10 w-full pt-16 md:pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto text-center text-white flex flex-col items-center">
          {/* Badge: Reduced margin mb-4 on mobile */}
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles size={14} className="text-[#C5A059]" />
            <h2 className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
              Academic Excellence 2026
            </h2>
          </div>

          {/* Main Title: Tightened leading and reduced margin */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1.2] md:leading-[1.1] tracking-tighter uppercase mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            International Conference on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C07B]">
              Economics & Business
            </span>
          </h1>

          {/* Tagline Badge: Reduced margin */}
          <div className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg mb-4 md:mb-6">
            <p className="text-[10px] md:text-sm font-bold tracking-[0.3em] text-slate-300 uppercase leading-none">
              (CONFERENCE DBA 2026)
            </p>
          </div>

          {/* Slogan: Reduced margin mb-6 on mobile */}
          <p className="text-sm md:text-lg lg:text-xl text-slate-300 max-w-2xl mb-6 md:mb-10 italic leading-relaxed opacity-90 px-4">
            {`"Sustainability Focused Industry Trends in Global Research"`}
          </p>

          {/* Action Buttons: Adjusted gap and padding for mobile */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4">
            <button
              onClick={() => setShowCFP(true)}
              className="group flex items-center justify-center gap-2 border border-white/30 bg-white/5 backdrop-blur-md px-8 py-3.5 md:py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-white hover:text-[#003366] transition-all duration-300 active:scale-95"
            >
              <FileText
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              Call For Papers
            </button>

            {session ? (
              <button
                onClick={() => setShowSubmission(true)}
                className="flex items-center justify-center gap-2 bg-[#C5A059] text-[#003366] px-8 py-3.5 md:py-4 rounded-xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:bg-white transition-all duration-300 active:scale-95 shadow-[#C5A059]/20"
              >
                <Send size={16} /> Submit Abstract
              </button>
            ) : (
              <button
                onClick={handleRegisterClick}
                className="flex items-center justify-center gap-2 bg-[#C5A059] text-[#003366] px-10 py-3.5 md:py-4 rounded-xl font-black uppercase text-[11px] tracking-widest shadow-2xl hover:bg-white transition-all duration-300 active:scale-95 shadow-[#C5A059]/40"
              >
                Register Now <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <CFPModal
        isOpen={showCFP}
        onClose={() => setShowCFP(false)}
        onStartSubmission={() => {
          setShowCFP(false);
          handleRegisterClick();
        }}
      />
      <SubmissionModal
        isOpen={showSubmission}
        onClose={() => setShowSubmission(false)}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView="signup"
      />

      <style jsx global>{`
        @keyframes slow-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}
