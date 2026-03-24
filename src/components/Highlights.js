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
      // Change: min-h-screen with flex centering and responsive padding
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white py-24 md:py-16"
    >
      {/* Background Decorative Element - Trending Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-[#C5A059] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#003366] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        {/* Header - font-black weight specifically for the section title */}
        <div className="mb-6 md:mb-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2 bg-[#C5A059]/10 px-3 py-1 rounded-full">
            <Trophy size={12} /> Event Excellence
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none">
            Conference <span className="text-[#C5A059]">Highlights</span>
          </h3>
        </div>

        {/* Responsive Bento Grid - Dynamic heights for viewport efficiency */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {/* Main Hero Highlight Card */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#003366] rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-10 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden group min-h-[220px] md:min-h-0">
            <div className="relative z-10">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-3">
                Bridging Industry <br /> &{" "}
                <span className="text-[#C5A059]">Academia</span>
              </h4>
              <p className="text-white/60 text-[11px] md:text-xs lg:text-sm max-w-xs leading-relaxed">
                Sustainable business trends and technological evolution in 2026.
              </p>
            </div>
            <div className="mt-6 flex gap-3 relative z-10">
              <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-[9px] font-bold uppercase tracking-widest">
                June 24-25
              </div>
              <div className="px-3 py-1.5 bg-[#C5A059] text-[#003366] rounded-lg text-[9px] font-bold uppercase tracking-widest">
                Dhaka, BD
              </div>
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
                className="bg-slate-50 border border-slate-100 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] flex flex-col md:flex-row items-center md:items-start lg:items-center gap-3 lg:gap-5 hover:border-[#C5A059]/30 transition-all group"
              >
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}
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
                className="bg-white border border-slate-100 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] hover:shadow-xl hover:border-[#C5A059]/20 transition-all group relative overflow-hidden flex flex-col justify-center"
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

          {/* Bottom Bar - Dynamic Ticker style */}
          <div className="md:col-span-3 lg:col-span-4 bg-[#FDFCFB]/50 backdrop-blur-sm border border-dashed border-slate-200 p-3 md:p-5 rounded-[1.5rem] lg:rounded-[2rem] flex flex-wrap items-center justify-around gap-4 md:gap-8">
            {[
              { label: "Scopus Indexed", color: "bg-emerald-500" },
              { label: "Networking Dinner", color: "bg-[#C5A059]" },
              { label: "Innovation Workshops", color: "bg-blue-500" },
            ].map((tag, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${tag.color} animate-pulse`}
                ></span>
                <span className="text-[8px] lg:text-[10px] font-black text-[#003366] uppercase tracking-[0.15em]">
                  {tag.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
