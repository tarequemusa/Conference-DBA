"use client";

import {
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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

      <div className="relative z-10 w-full pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto text-center text-white flex flex-col items-center">
          {/* EWU Badge */}
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <h3 className="text-[#C5A059] text-[10px] md:text-sm font-black uppercase tracking-[0.3em]">
              Department of Business Administration |{" "}
              <span className="text-slate-400 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1">
                East West University
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles size={14} className="text-[#C5A059]" />
            <h2 className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
              Academic Excellence 2026
            </h2>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-6xl font-black leading-[1.1] tracking-tighter uppercase mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            International Conference on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C07B]">
              Building Resilient Supply Chains
            </span>
          </h2>

          {/* DATE & TIME SECTION WITH COUNTDOWN */}
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-[2rem] shadow-2xl">
              <div className="flex items-center gap-3 px-4 border-r border-white/10">
                <Calendar className="text-[#C5A059]" size={20} />
                <div className="text-left">
                  <p className="text-[8px] font-black text-[#C5A059] uppercase tracking-widest leading-none mb-1">
                    Conference Date
                  </p>
                  <p className="text-sm md:text-base font-bold text-white leading-none">
                    18th-19th Dec 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 md:pr-8 border-r border-white/10 md:border-r-0 lg:border-r lg:border-white/10">
                <Clock className="text-[#C5A059]" size={20} />
                <div className="text-left">
                  <p className="text-[8px] font-black text-[#C5A059] uppercase tracking-widest leading-none mb-1">
                    Event Schedule
                  </p>
                  <p className="text-sm md:text-base font-bold text-white leading-none">
                    10:00am - 8:00pm
                  </p>
                </div>
              </div>

              {/* LIVE COUNTDOWN COMPONENT */}
              <div className="px-4">
                <CountdownTimer targetDate="2026-12-18T10:00:00" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <button
              onClick={() => setShowCFP(true)}
              className="group flex items-center justify-center gap-2 border border-white/30 bg-white/5 backdrop-blur-md px-8 py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-white hover:text-[#003366] transition-all duration-300 active:scale-95"
            >
              <FileText
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              Call For Papers
            </button>

            <button
              onClick={handleRegisterClick}
              className="flex items-center justify-center gap-2 bg-[#C5A059] text-[#003366] px-10 py-4 rounded-xl font-black uppercase text-[11px] tracking-widest shadow-2xl hover:bg-white transition-all duration-300 active:scale-95"
            >
              {session ? "Submit Abstract" : "Register Now"}
              {session ? <Send size={16} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>

      <CFPModal isOpen={showCFP} onClose={() => setShowCFP(false)} />
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

// --- TRENDING COUNTDOWN COMPONENT ---
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <p className="text-[8px] font-black text-[#C5A059] uppercase tracking-widest mb-1">
          Time to Event
        </p>
        <div className="flex gap-2">
          <TimeBox val={timeLeft.days} unit="D" />
          <TimeBox val={timeLeft.hours} unit="H" />
          <TimeBox val={timeLeft.mins} unit="M" />
          <TimeBox val={timeLeft.secs} unit="S" />
        </div>
      </div>
    </div>
  );
}

function TimeBox({ val, unit }) {
  return (
    <div className="bg-white/10 border border-white/5 rounded-lg px-2 py-1 min-w-[40px]">
      <p className="text-sm font-black text-white leading-none">
        {val.toString().padStart(2, "0")}
      </p>
      <p className="text-[7px] font-bold text-[#C5A059] uppercase">{unit}</p>
    </div>
  );
}
