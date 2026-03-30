"use client";

import { Globe2, Lightbulb, Microscope, Trophy, Users } from "lucide-react";

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
      desc: "Connect with global industry leaders.",
      icon: Lightbulb,
    },
    {
      title: "Awards",
      desc: "Best paper honors.",
      icon: Trophy,
    },
  ];

  return (
    <section
      id="highlights"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white py-24 md:py-16"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-[#C5A059] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#003366] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-6 md:mb-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2 bg-[#C5A059]/10 px-3 py-1 rounded-full">
            <Trophy size={12} /> Event Excellence
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none">
            Conference <span className="text-[#C5A059]">Highlights</span>
          </h3>
        </div>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {/* Main Hero Highlight Card */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#003366] rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-10 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden group min-h-[220px] md:min-h-0 border-4 border-white">
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <p className="text-[#C5A059] text-[8px] font-black uppercase tracking-[0.3em] leading-none mb-1">
                  Conference Date
                </p>
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-black leading-none">
                  18th-19th <span className="text-[#C5A059]">Dec</span> 2026
                </h4>
              </div>
              <div className="space-y-1">
                <p className="text-[#C5A059] text-[8px] font-black uppercase tracking-[0.3em] leading-none mb-1">
                  Event Schedule
                </p>
                <p className="text-white font-bold text-lg lg:text-2xl leading-tight">
                  10:00am - 8:00pm
                </p>
              </div>
              <p className="text-white/40 text-[11px] md:text-xs lg:text-sm max-w-xs leading-relaxed pt-2">
                Sustainable business trends and technological evolution in 2026.
              </p>
            </div>

            <Globe2
              size={180}
              className="absolute -bottom-10 -right-10 text-white opacity-[0.05] group-hover:rotate-12 transition-transform duration-1000"
            />
          </div>

          {/* Stats Column */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-slate-50 border-[4px] border-white p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] flex flex-col md:flex-row items-center md:items-start lg:items-center gap-3 lg:gap-5 transition-all duration-500 ease-out group hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(197,160,89,0.3)] hover:border-[#C5A059]/30 hover:scale-105 active:scale-95"
              >
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-500`}
                >
                  <stat.icon size={20} />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl lg:text-2xl font-black text-[#003366]">
                    {stat.value}
                  </div>
                  <div className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Column */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4 lg:col-span-1">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-white border-[4px] border-white p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] transition-all duration-500 ease-out group relative overflow-hidden flex flex-col justify-center hover:shadow-[0_20px_50px_rgba(197,160,89,0.2)] hover:border-[#C5A059]/30 hover:scale-105 active:scale-95"
              >
                <div className="text-[#C5A059] mb-2 lg:mb-4">
                  <feat.icon size={20} />
                </div>
                <h5 className="text-[11px] lg:text-sm font-black text-[#003366] uppercase tracking-tight mb-1">
                  {feat.title}
                </h5>
                <p className="text-slate-400 text-[9px] lg:text-[11px] font-medium leading-tight">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 🚀 UPDATED: INTERACTIVE ANIMATED BULLET TICKER (Matches Attached) */}
          <div className="md:col-span-3 lg:col-span-4 bg-slate-50/50 backdrop-blur-md border-2 border-white rounded-[1.5rem] lg:rounded-[2.5rem] p-6 md:p-10 shadow-inner">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {[
                {
                  label: "Publication in Scopus Indexed Journals",
                  color: "bg-emerald-500",
                },
                {
                  label: "Conference Proceeding with ISBN",
                  color: "bg-[#C5A059]",
                },
                { label: "Academic-Industry Discussion", color: "bg-blue-600" },
                { label: "Oral & Poster Presentation", color: "bg-purple-500" },
                { label: "International Participants", color: "bg-orange-500" },
              ].map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 group/tag cursor-default transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${tag.color} z-10 shadow-sm transition-transform duration-300 group-hover/tag:scale-125`}
                    ></span>
                    <span
                      className={`absolute w-full h-full rounded-full ${tag.color} opacity-40 animate-ping`}
                    ></span>
                  </div>
                  <span className="text-[9px] md:text-[11px] font-black text-[#003366] uppercase tracking-[0.12em] transition-colors duration-300 group-hover/tag:text-[#C5A059]">
                    {tag.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
