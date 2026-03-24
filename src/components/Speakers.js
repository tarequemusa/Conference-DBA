"use client";

import { ArrowUpRight, GraduationCap, Mic2, Quote } from "lucide-react";

export default function Keynotes() {
  const speakers = [
    {
      name: "Prof. Dr. Robert Higgins",
      title: "Global Lead of Digital Transformation",
      institution: "Harvard Business School, USA",
      talk: "The Synergy of AI and Sustainable Economics",
      image: "/images/speakers/higgins.jpg",
      bio: "A pioneer in digital economy research with 200+ indexed publications.",
    },
    {
      name: "Dr. Elena Petrova",
      title: "Senior Economist",
      institution: "European Central Bank",
      talk: "Future of Fintech in Emerging Markets",
      image: "/images/speakers/petrova.jpeg",
      bio: "Expert in monetary policy and blockchain integration in banking systems.",
    },
  ];

  return (
    // Changed h-screen to min-h-screen and added responsive vertical padding
    <section
      id="keynotes"
      className="min-h-screen w-full flex items-center justify-center bg-[#003366] relative overflow-hidden py-16 md:py-10 lg:py-0"
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
        {/* Compact Header - Font Black preserved */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-bold text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2 bg-white/5 px-3 py-1 rounded-full">
            <Mic2 size={12} /> Visionary Insights
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            Keynote <span className="text-[#C5A059]">Speakers</span>
          </h3>
        </div>

        {/* Responsive Grid - Flex-col on mobile, grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-white/10 p-5 md:p-8 lg:p-10 transition-all duration-500 hover:bg-white/[0.08] hover:border-[#C5A059]/40 flex flex-col sm:flex-row gap-6 md:gap-8 items-center overflow-hidden"
            >
              {/* Speaker Photo - Adjusted for 100vh constraint */}
              <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 shrink-0">
                <div className="absolute inset-0 border-2 border-[#C5A059]/50 rounded-[1.5rem] md:rounded-[2.5rem] rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
                <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-2 border-white/20 shadow-2xl">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Speaker Content */}
              <div className="flex-1 space-y-3 md:space-y-4 text-center sm:text-left">
                <div className="space-y-1">
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight">
                    {speaker.name}
                  </h4>
                  <p className="text-[#C5A059] text-[10px] md:text-xs font-bold flex items-center justify-center sm:justify-start gap-2 uppercase tracking-wide">
                    <GraduationCap size={14} className="shrink-0" />{" "}
                    {speaker.institution}
                  </p>
                </div>

                <div className="py-3 border-t border-white/10">
                  <p className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">
                    Talk Theme
                  </p>
                  <p className="text-sm md:text-base lg:text-lg font-bold text-white/90 leading-tight group-hover:text-[#C5A059] transition-colors line-clamp-2">
                    {`"{speaker.talk}"`}
                  </p>
                </div>

                <button className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-[#C5A059] transition-all group/btn">
                  Read Full Bio
                  <ArrowUpRight
                    size={12}
                    className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                  />
                </button>
              </div>

              {/* Subtle Decorative mark */}
              <Quote className="absolute top-4 right-6 text-white/[0.03] w-10 h-10 md:w-16 md:h-16 pointer-events-none group-hover:text-[#C5A059]/10 transition-colors" />
            </div>
          ))}
        </div>

        {/* Viewport Footer - Scaled for tighter viewports */}
        <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6 md:pt-8 text-center sm:text-left">
          <p className="text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
            More Speakers to be announced in{" "}
            <span className="text-[#C5A059]">Phase II</span>
          </p>
          <button className="bg-white/5 hover:bg-[#C5A059] text-[#C5A059] hover:text-[#003366] px-6 py-2 rounded-full border border-[#C5A059]/30 text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
            View Full Committee
          </button>
        </div>
      </div>
    </section>
  );
}
