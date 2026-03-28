"use client";

import { BookOpen, Globe, Lightbulb, Target } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: Globe,
      title: "Global Networking",
      desc: "Connect with researchers from across 15+ countries.",
    },
    {
      icon: BookOpen,
      title: "Quality Publications",
      desc: "Get research indexed in high-impact Scopus proceedings.",
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      desc: "Explore cutting-edge trends in Business and Tech.",
    },
    {
      icon: Target,
      title: "Academic Growth",
      desc: "Workshops designed for professional scaling.",
    },
  ];

  return (
    <section
      id="about"
      // min-h-screen allows the section to grow but maintain 100vh as baseline
      // py-20 ensures safe padding on small mobile browsers
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white py-20 lg:py-12"
    >
      {/* Trending Background Decoration: Soft Mesh Gradient */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#C5A059]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-20">
          {/* Left Side: Image Section */}
          <div className="relative w-full lg:w-1/2 group">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 md:border-[12px] border-white transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,51,102,0.15)]">
              <img
                src="/images/about-conference.jpg"
                alt="Conference Hall"
                // Optimized height using clamp-like behavior via breakpoints
                className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
              />
            </div>

            {/* Pulsing Decorative Gold Box */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-48 md:h-48 bg-[#C5A059]/15 rounded-[2.5rem] -z-10 animate-pulse"></div>

            {/* Experience Tag */}
            <div className="absolute top-8 -right-4 bg-[#003366] text-white p-5 md:p-6 rounded-[2rem] shadow-2xl z-20 hidden sm:block transform transition-transform group-hover:-translate-y-2">
              <p className="text-3xl font-black text-[#C5A059] leading-none">
                10th
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 opacity-80">
                Annual Edition
              </p>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <header className="space-y-4">
              <h2 className="text-[#C5A059] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-2">
                Welcome to Conference DBA 2026
              </h2>
              <h4 className="text-2xl md:text-4xl font-black text-[#003366] leading-[1.1] uppercase tracking-tighter">
                Sustainability Focused Industry Trends <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#b38b4d]">
                  in Global Research
                </span>
              </h4>
              <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-xl">
                The ICEBTM is a premier platform for presenting new advances and
                research results in management and social sciences. Hosted by
                the prestigious Department of Business Administration at East
                West University.
              </p>
            </header>

            {/* Icon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((item, index) => (
                <div key={index} className="flex gap-4 group cursor-default">
                  <div className="w-12 h-12 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-[#C5A059] group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <item.icon size={22} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-[#003366] text-sm uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button className="bg-[#003366] text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-[#003366] transition-all duration-300 shadow-xl active:scale-95 shadow-[#003366]/20">
                Explore Our Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
