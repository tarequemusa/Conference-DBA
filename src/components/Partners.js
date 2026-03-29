"use client";

import {
  Award,
  Crown,
  Globe,
  Handshake,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Partners() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Organizing", "Platinum", "Gold", "Technical"];

  const partners = [
    {
      name: "East West University",
      logo: "/images/partners/ewu.png",
      cat: "Organizing",
      tier: "Lead Organizer",
      icon: Crown,
    },
    {
      name: "IEEE Bangladesh",
      logo: "/images/partners/ieee.png",
      cat: "Technical",
      tier: "Technical Partner",
      icon: ShieldCheck,
    },
    {
      name: "Cloudinary",
      logo: "/images/partners/cloudinary.png",
      cat: "Platinum",
      tier: "Cloud Sponsor",
      icon: Zap,
    },
    {
      name: "Stripe",
      logo: "/images/partners/stripe.png",
      cat: "Gold",
      tier: "Payment Partner",
      icon: Star,
    },
    {
      name: "UGC Bangladesh",
      logo: "/images/partners/ugc.png",
      cat: "Organizing",
      tier: "Strategic Partner",
      icon: Globe,
    },
    {
      name: "ICT Division",
      logo: "/images/partners/ict.png",
      cat: "Technical",
      tier: "Web Partner",
      icon: Award,
    },
  ];

  const filteredPartners =
    activeTab === "All"
      ? partners
      : partners.filter((p) => p.cat === activeTab);

  return (
    <section
      id="partners"
      className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden py-24 md:py-16"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#C5A059] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#C5A059] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em]">
              <Handshake size={14} /> Global Alliances
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-[#003366] uppercase tracking-tighter leading-none">
              Event <span className="text-[#C5A059]">Sponsors</span>
            </h3>
          </div>

          <div className="w-full lg:w-auto overflow-hidden relative">
            <div className="flex items-center gap-2 overflow-x-auto pb-4 -mb-4 pt-2 px-2 no-scrollbar touch-pan-x scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border whitespace-nowrap flex-shrink-0 ${
                    activeTab === cat
                      ? "bg-[#003366] text-white border-[#003366] shadow-[0_10px_20px_rgba(0,51,102,0.2)] scale-100"
                      : "bg-white text-slate-400 border-slate-100 hover:border-[#C5A059] shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 py-4">
          {filteredPartners.map((partner, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center animate-in fade-in zoom-in duration-500"
            >
              <div className="relative aspect-square w-full bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 flex items-center justify-center p-6 md:p-8 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(197,160,89,0.12)] group-hover:-translate-y-1 group-hover:border-[#C5A059]/40">
                <div className="absolute top-4 right-4 z-20 text-slate-200 group-hover:text-[#C5A059] group-hover:rotate-12 transition-all duration-500">
                  <partner.icon size={16} strokeWidth={2} />
                </div>
                <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" // 🚀 FIXED: Added sizes prop to solve performance warning
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="mt-3 text-center px-1">
                <h4 className="text-[11px] md:text-xs font-bold text-[#003366] uppercase tracking-tight leading-tight w-full group-hover:text-[#C5A059] transition-colors">
                  {partner.name}
                </h4>
                <p className="text-[7px] md:text-[8px] font-medium text-slate-300 uppercase tracking-widest mt-1">
                  {partner.tier}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 lg:mt-12 p-5 md:p-8 bg-white border border-slate-100 rounded-[2rem] lg:rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border-t-4 border-t-[#C5A059]">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-12 h-12 bg-[#003366] rounded-2xl flex items-center justify-center text-[#C5A059] shadow-inner group">
              <Zap
                size={24}
                fill="currentColor"
                className="group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <p className="text-[#003366] font-black text-sm uppercase tracking-tighter">
                Become a Partner
              </p>
              <p className="text-slate-400 text-[9px] md:text-[10px] font-medium uppercase tracking-widest mt-1">
                ICEBTM Strategic Outreach 2026
              </p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-[#003366] text-white px-8 py-4 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-[#C5A059] transition-all shadow-xl active:scale-95 shadow-[#003366]/10">
            Download Prospectus
          </button>
        </div>
      </div>
    </section>
  );
}
