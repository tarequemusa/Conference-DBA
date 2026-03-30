"use client";

import {
  CheckCircle2,
  Globe2,
  Lightbulb,
  Microscope,
  Trophy,
  Users,
} from "lucide-react";

export default function Highlights() {
  const stats = [
    {
      label: "Research Papers",
      value: "150+",
      icon: Microscope,
      color: "text-blue-500",
    },
    {
      label: "Expert Speakers",
      value: "25+",
      icon: Users,
      color: "text-[#C5A059]",
    },
  ];

  const features = [
    {
      title: "Network",
      desc: "Connect with global leaders.",
      icon: Lightbulb,
    },
    {
      title: "Awards",
      desc: "Best paper honors.",
      icon: Trophy,
    },
  ];

  const themeHighlights = [
    "Scope for Publication in Peer Reviewed/Scopus Indexed Journals",
    "Conference Proceeding Consist of ISBN Number",
    "Academic-Industry Discussion and Industry Talk",
    "Opportunities for Oral Poster Presentation",
    "Renowned Keynote Speakers and International Participants",
  ];

  return (
    <section
      id="highlights"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white py-24"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-[#C5A059] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#003366] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2 bg-[#C5A059]/10 px-3 py-1 rounded-full">
            <Trophy size={12} /> Event Excellence
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none">
            Conference <span className="text-[#C5A059]">Highlights</span>
          </h3>
        </div>

        {/* Top Grid: Hero Card + Compact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {/* Main Hero Card */}
          {/* Motto at top */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#003366] rounded-[2rem] p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden group border-4 border-white">
            <h4 className="text-sm md:text-base lg:text-lg font-bold text-white/90 leading-tight group-hover:text-[#C5A059] transition-colors line-clamp-2 mb-2">
              Sustainable business trends and technological evolution in 2026
            </h4>
            <div className="relative z-10 space-y-4">
              <div className="space-y-1">
                <p className="text-[#C5A059] text-[8px] font-black uppercase tracking-[0.3em] mb-1">
                  Conference Date
                </p>
                <h4 className="text-2xl md:text-3xl font-black leading-none">
                  18th-19th <span className="text-[#C5A059]">Dec</span> 2026
                </h4>
              </div>
              <div className="space-y-1">
                <p className="text-[#C5A059] text-[8px] font-black uppercase tracking-[0.3em] mb-1">
                  Event Schedule
                </p>
                <p className="text-white font-bold text-xl leading-tight">
                  10:00am - 8:00pm
                </p>
              </div>
            </div>
            <Globe2
              size={140}
              className="absolute -bottom-10 -right-10 text-white opacity-[0.05] group-hover:rotate-12 transition-transform duration-1000"
            />
          </div>

          {/* Compact Stats Column */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-slate-50 border-2 border-white p-4 rounded-[1.5rem] flex items-center gap-3 transition-all hover:shadow-lg hover:border-[#C5A059]/20 group"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}
                >
                  <stat.icon size={18} />
                </div>
                <div>
                  <div className="text-lg font-black text-[#003366] leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Feature Column */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 lg:col-span-1">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-white border-2 border-slate-50 p-4 rounded-[1.5rem] transition-all group hover:shadow-lg hover:border-[#C5A059]/20"
              >
                <div className="text-[#C5A059] mb-1">
                  <feat.icon size={18} />
                </div>
                <h5 className="text-[11px] font-black text-[#003366] uppercase tracking-tight">
                  {feat.title}
                </h5>
                <p className="text-slate-400 text-[9px] font-medium leading-tight">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🚀 THEME HIGHLIGHTS SECTION (New Design) */}
        <div className="space-y-6 mt-4">
          <div className="flex items-center gap-4">
            <h4 className="text-[#003366] font-black text-sm md:text-base uppercase tracking-[0.2em] whitespace-nowrap">
              Theme Highlights
            </h4>
            <div className="h-[1px] w-full bg-gradient-to-r from-slate-200 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themeHighlights.map((text, i) => (
              <div
                key={i}
                className={`group relative p-1 rounded-2xl transition-all duration-500 hover:scale-[1.02] ${
                  i === 4 ? "md:col-span-2 lg:col-span-1 lg:translate-x-0" : ""
                }`}
              >
                {/* 🚀 Gradient Outline Implementation */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#003366] via-[#C5A059] to-slate-200 opacity-20 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative bg-white h-full p-5 rounded-[0.9rem] flex items-start gap-4 z-10">
                  <div className="mt-1 bg-[#C5A059]/10 p-1.5 rounded-lg text-[#C5A059] group-hover:bg-[#003366] group-hover:text-white transition-all">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-[#003366] text-[10px] md:text-[11px] font-black leading-relaxed uppercase tracking-tight">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
