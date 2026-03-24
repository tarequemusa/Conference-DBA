"use client";

import { Check, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Pricing() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const plans = [
    {
      name: "Student Author",
      earlyBird: "$150",
      regular: "$200",
      features: [
        "1 Paper Publication",
        "Conference Kit",
        "Lunch & Coffee",
        "Certificate",
      ],
      highlight: false,
    },
    {
      name: "Regular Author",
      earlyBird: "$250",
      regular: "$300",
      features: [
        "1 Paper Publication",
        "Kit & Proceedings",
        "Gala Dinner Access",
        "Certificate",
      ],
      highlight: true,
    },
    {
      name: "Listener",
      earlyBird: "$100",
      regular: "$130",
      features: [
        "Access to All Sessions",
        "Lunch & Coffee",
        "Program Book",
        "Participation Cert",
      ],
      highlight: false,
    },
  ];

  return (
    <section
      id="pricing"
      // Changed h-screen to min-h-screen and added responsive padding
      className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden py-20 lg:py-12"
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#C5A059]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#003366]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-center h-full relative z-10">
        {/* Header - Scaled for Viewport */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2 bg-[#C5A059]/10 px-3 py-1 rounded-full">
            <ShieldCheck size={12} /> Registration Tiers
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-[#003366] uppercase tracking-tighter leading-none">
            Investment <span className="text-[#C5A059]">Rates</span>
          </h3>
          <p className="text-slate-400 mt-3 text-[11px] md:text-xs font-bold uppercase tracking-widest leading-relaxed">
            Early Bird until{" "}
            <span className="text-[#003366] underline decoration-[#C5A059] underline-offset-4">
              June 15, 2026
            </span>
          </p>
        </div>

        {/* Pricing Grid - Responsive Columns & Scales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative p-6 lg:p-8 rounded-[2rem] bg-white border transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,51,102,0.1)] flex flex-col justify-between ${
                plan.highlight
                  ? "border-[#C5A059] shadow-xl md:scale-105 z-10"
                  : "border-slate-100"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C5A059] text-[#003366] px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 whitespace-nowrap">
                  <Zap size={10} fill="currentColor" /> Recommended Choice
                </div>
              )}

              <div>
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                  {plan.name}
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-black text-[#003366]">
                    {plan.earlyBird}
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase">
                    USD
                  </span>
                </div>
                <div className="mt-2 py-1 px-3 bg-slate-50 rounded-lg inline-block">
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter">
                    Regular: {plan.regular}
                  </p>
                </div>

                <div className="h-[1px] w-full bg-slate-100 my-6"></div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <Check
                          size={10}
                          className="text-emerald-500"
                          strokeWidth={4}
                        />
                      </div>
                      <span className="text-[11px] lg:text-xs text-slate-600 font-bold uppercase tracking-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsAuthOpen(true)}
                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-md active:scale-95 ${
                  plan.highlight
                    ? "bg-[#003366] text-white hover:bg-[#C5A059]"
                    : "bg-slate-100 text-[#003366] hover:bg-[#003366] hover:text-white"
                }`}
              >
                Register Now
              </button>
            </div>
          ))}
        </div>

        {/* Trending Payment Badges - Viewport Friendly */}
        <div className="mt-10 lg:mt-16 text-center">
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">
            Official Payment Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {["Stripe", "PayPal", "bKash", "Nagad", "Visa"].map((bank) => (
              <span
                key={bank}
                className="text-xs md:text-sm font-black text-[#003366] tracking-tighter uppercase"
              >
                {bank}
              </span>
            ))}
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
