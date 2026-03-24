"use client";

import { ArrowUpRight, Linkedin, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Committee() {
  const members = [
    {
      name: "Prof. Michael Rodriguez",
      role: "Session Chair",
      institution: "MIT Sloan, USA",
      image: "/images/committee/michael_rodriguez.png",
      linkedin: "#",
    },
    {
      name: "Prof. Kenji Tanaka",
      role: "Session Chair",
      institution: "Keio University, Japan",
      image: "/images/committee/kenji_tanaka.png",
      linkedin: "#",
    },
    {
      name: "Dr. Elizabeth Smith",
      role: "Session Chair",
      institution: "LSE, United Kingdom",
      image: "/images/committee/elizabeth_smith.png",
      linkedin: "#",
    },
    {
      name: "Prof. David Lee",
      role: "Session Chair",
      institution: "NUS, Singapore",
      image: "/images/committee/david_lee.png",
      linkedin: "#",
    },
    {
      name: "Dr. Ahmed Mansour",
      role: "Technical Chair",
      institution: "East West University",
      image: "/images/committee/ahmed_mansour.png",
      linkedin: "#",
    },
    {
      name: "Dr. Fatema Zahra",
      role: "Secretary",
      institution: "East West University",
      image: "/images/committee/fatema_zahra.png",
      linkedin: "#",
    },
  ];

  return (
    <section
      id="committee"
      className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden pt-28 pb-12 lg:py-12"
    >
      {/* Abstract Geometric Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#C5A059]/5 rounded-full blur-[80px] md:blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#003366]/5 rounded-full blur-[80px] md:blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
        {/* Modern Minimalist Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#003366] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em]">
              <Sparkles size={14} className="text-[#C5A059]" /> Executive Board
            </div>
            <h3 className="text-3xl md:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none">
              Organizing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#b38b4d]">
                Committee
              </span>
            </h3>
          </div>
          <p className="text-slate-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest border-r-0 md:border-r-4 border-[#C5A059] pr-0 md:pr-6 text-right hidden md:block">
            Strategic Leadership <br /> Conference DBA 2026
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[2.5rem] p-5 md:p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(197,160,89,0.15)] flex items-center gap-5 md:gap-6 border border-slate-100 hover:border-[#C5A059]/30"
            >
              {/* Profile Frame */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
                <div className="absolute inset-[-4px] rounded-[2rem] border border-[#C5A059]/0 group-hover:border-[#C5A059]/40 group-hover:scale-105 transition-all duration-500"></div>
                <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[1.8rem] overflow-hidden bg-slate-50 border-2 border-white shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#C5A059]">
                  {member.role}
                </span>
                <h4 className="text-base md:text-lg font-black text-[#003366] leading-tight group-hover:translate-x-1 transition-transform">
                  {member.name}
                </h4>
                <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-tighter truncate">
                  {member.institution}
                </p>

                {/* Footer Icons - Error Fixed */}
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={member.linkedin}
                    className="text-slate-300 hover:text-[#0077B5] transition-all transform hover:scale-125"
                  >
                    <Linkedin size={14} fill="currentColor" />
                  </a>
                  <div className="h-[1px] flex-1 bg-slate-100 group-hover:bg-[#C5A059]/20 transition-colors"></div>
                  <ArrowUpRight
                    size={14}
                    className="text-slate-200 group-hover:text-[#C5A059] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="mt-10 lg:mt-16 flex flex-col items-center gap-3">
          <div className="flex gap-1">
            <div className="w-8 h-1 bg-[#003366] rounded-full"></div>
            <div className="w-2 h-1 bg-[#C5A059] rounded-full"></div>
            <div className="w-2 h-1 bg-[#C5A059] rounded-full"></div>
          </div>
          <p className="text-slate-300 text-[8px] font-black uppercase tracking-[0.5em]">
            Strategic Governance Board
          </p>
        </div>
      </div>
    </section>
  );
}
