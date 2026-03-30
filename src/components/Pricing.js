"use client";

import {
  Check,
  Globe,
  GraduationCap,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Pricing() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const commonFeatures = [
    "Access to All Sessions",
    "Conference Kit & Bag",
    "Lunch & Coffee Breaks",
    "Participation Certificate",
  ];

  const tiers = [
    {
      category: "International Participant",
      icon: <Globe size={24} />,
      earlyBird: "USD 100$",
      regular: "USD 150$",
      late: "USD 200$",
      highlight: false,
    },
    {
      category: "Local Participant",
      icon: <Users size={24} />,
      earlyBird: "BDT 5000/=",
      regular: "BDT 7500/=",
      late: "BDT 9000/=",
      highlight: true,
    },
    {
      category: "Local Participant Student",
      icon: <GraduationCap size={24} />,
      earlyBird: "BDT 2000/=",
      regular: "BDT 3000/=",
      late: "BDT 3500/=",
      highlight: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden py-16 lg:py-12"
    >
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#C5A059]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#003366]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col justify-center h-full">
        {/* Compact Header */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-black text-[8px] uppercase tracking-[0.4em] mb-2 bg-[#C5A059]/10 px-3 py-1 rounded-full">
            <ShieldCheck size={10} /> Investment Scale
          </div>
          <h3 className="text-3xl lg:text-5xl font-black text-[#003366] uppercase tracking-tighter leading-none mb-2">
            Registration <span className="text-[#C5A059]">Fee</span>
          </h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            Select your category to join the DBA Conference 2026
          </p>
        </div>

        {/* Pricing Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col bg-white rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-15px_rgba(0,26,51,0.3)] overflow-hidden ${
                tier.highlight
                  ? "border-[#C5A059] shadow-xl md:scale-105 z-10"
                  : "border-slate-100 shadow-sm"
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#C5A059]"></div>
              )}

              {/* Card Header */}
              <div
                className={`p-8 text-center transition-colors duration-500 ${tier.highlight ? "bg-[#003366]/5 group-hover:bg-[#003366]/10" : "bg-slate-50/50 group-hover:bg-slate-100/80"}`}
              >
                {/* 🚀 Animated Icon Container */}
                <div
                  className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${tier.highlight ? "bg-[#003366] text-white group-hover:bg-[#C5A059]" : "bg-white shadow-sm text-[#C5A059] group-hover:bg-[#003366] group-hover:text-white"}`}
                >
                  {tier.icon}
                </div>
                {/* 🚀 Animated Title */}
                <h4 className="text-sm font-black uppercase text-[#003366] tracking-tight mb-6 transition-all duration-500 group-hover:text-[#C5A059] group-hover:-translate-y-1">
                  {tier.category}
                </h4>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Early Bird
                  </p>
                  <h5 className="text-3xl font-black text-[#003366] tracking-tighter">
                    {tier.earlyBird}
                  </h5>
                </div>
              </div>

              {/* Card Body: Features */}
              <div className="p-8 flex-grow space-y-6">
                <div className="space-y-3">
                  {commonFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <Check
                          size={12}
                          className="text-emerald-500"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                      Regular Rate
                    </span>
                    <span className="text-xs font-black text-[#003366]">
                      {tier.regular}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                      Late Rate
                    </span>
                    <span className="text-xs font-black text-slate-400">
                      {tier.late}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Action */}
              <div className="p-8 pt-0">
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-md ${
                    tier.highlight
                      ? "bg-[#003366] text-white hover:bg-[#C5A059]"
                      : "bg-slate-100 text-[#003366] hover:bg-[#003366] hover:text-white"
                  }`}
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer: Without Paper & Gateway */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-[#003366] rounded-2xl px-8 py-5 flex items-center gap-8 border-2 border-[#C5A059]/30 relative overflow-hidden group shadow-lg transition-all hover:shadow-[0_20px_40px_rgba(0,26,51,0.2)]">
              <div className="relative z-10">
                <p className="text-[#C5A059] text-[8px] font-black uppercase tracking-widest mb-1">
                  Listener Only
                </p>
                <h4 className="text-white font-black text-sm uppercase transition-transform group-hover:-translate-y-0.5">
                  (Without Paper)
                </h4>
              </div>
              <div className="relative z-10 flex items-center gap-6">
                <span className="text-white font-black text-xl tracking-tighter">
                  BDT 5000/=
                </span>
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="bg-white text-[#003366] px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all shadow-md active:scale-95"
                >
                  Join Now
                </button>
              </div>
              <UserPlus
                className="absolute -right-4 -bottom-4 text-white/5 opacity-10 transition-transform group-hover:scale-110"
                size={80}
              />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Official Payment Gateway
            </p>
            <div className="relative w-64 h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <Image
                src="/images/Payment/sslcommerz-online-payment.png"
                alt="Pay With Sslcommerz"
                fill
                className="object-contain"
              />
            </div>
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
