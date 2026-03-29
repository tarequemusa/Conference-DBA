"use client";

import {
  ArrowUpRight,
  GraduationCap,
  Mic2,
  Quote,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Keynotes() {
  const [showFullCommittee, setShowFullCommittee] = useState(false);

  // 🚀 Logic to disable body scroll when modal is open
  useEffect(() => {
    if (showFullCommittee) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFullCommittee]);

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

  const fullCommittee = {
    patrons: [
      {
        name: "Prof. Dr. Mohammed Farashuddin",
        role: "Chief Patron",
        title: "Chief Adviser & Founder VC, EWU",
      },
      {
        name: "Prof. Dr. Shamsul Haque",
        role: "Patron",
        title: "Vice Chancellor, EWU",
      },
      {
        name: "Prof. Dr. Ashik Mosaddik",
        role: "Co-Patron",
        title: "Pro-Vice Chancellor, EWU",
      },
    ],
    advisory: [
      {
        name: "Prof. Dr. Tanbir Ahmed Chowdhury",
        role: "Advisory Chair",
        title: "Dean, Faculty of Business & Economics",
      },
      {
        name: "Prof. Dr. Anup Chowdhury",
        role: "Member",
        title: "Department of Business Administration",
      },
    ],
    organizing: [
      {
        name: "Dr. Farhana Ferdousi",
        role: "Organizing Chair",
        title: "Chairperson, Dept. of Business Administration",
      },
      {
        name: "Dr. Jashim Uddin",
        role: "Convener",
        title: "Associate Professor, EWU",
      },
      {
        name: "Dr. Seyama Sultana",
        role: "Joint Convener",
        title: "Associate Professor, EWU",
      },
      {
        name: "Dr. Rehana Parvin",
        role: "Technical Chair",
        title: "Associate Professor, EWU",
      },
    ],
  };

  return (
    <section
      id="keynotes"
      className="min-h-screen w-full flex items-center justify-center bg-[#003366] relative overflow-hidden py-16 md:py-10 lg:py-0"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-bold text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2 bg-white/5 px-3 py-1 rounded-full">
            <Mic2 size={12} /> Visionary Insights
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            Keynote <span className="text-[#C5A059]">Speakers</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-white/10 p-5 md:p-8 lg:p-10 transition-all duration-500 hover:bg-white/[0.08] hover:border-[#C5A059]/40 flex flex-col sm:flex-row gap-6 md:gap-8 items-center overflow-hidden"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 shrink-0">
                <div className="absolute inset-0 border-2 border-[#C5A059]/50 rounded-[1.5rem] md:rounded-[2.5rem] rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
                <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-2 border-white/20 shadow-2xl">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, 176px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

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
                    "{speaker.talk}"
                  </p>
                </div>
                <button className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-[#C5A059] transition-all group/btn">
                  Read Full Bio{" "}
                  <ArrowUpRight
                    size={12}
                    className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                  />
                </button>
              </div>
              <Quote className="absolute top-4 right-6 text-white/[0.03] w-10 h-10 md:w-16 md:h-16 pointer-events-none group-hover:text-[#C5A059]/10 transition-colors" />
            </div>
          ))}
        </div>

        <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6 md:pt-8 text-center sm:text-left">
          <p className="text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
            More Speakers to be announced in{" "}
            <span className="text-[#C5A059]">Phase II</span>
          </p>
          <button
            onClick={() => setShowFullCommittee(true)}
            className="group flex items-center gap-2 bg-white/5 hover:bg-[#C5A059] text-[#C5A059] hover:text-[#003366] px-8 py-3 rounded-full border border-[#C5A059]/30 text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
          >
            <Users size={14} /> View Full Committee
          </button>
        </div>
      </div>

      {/* --- PHASE II FULL COMMITTEE MODAL --- */}
      {showFullCommittee && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-[#001A41]/95 backdrop-blur-xl"
            onClick={() => setShowFullCommittee(false)}
          ></div>

          <div className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-[#002855] rounded-[3rem] border border-white/10 p-6 md:p-16 relative z-10 no-scrollbar shadow-2xl">
            <button
              onClick={() => setShowFullCommittee(false)}
              className="fixed md:absolute top-10 right-10 text-[#C5A059] hover:text-white transition-all hover:rotate-90 z-50"
            >
              <X size={40} strokeWidth={3} />
            </button>

            <div className="space-y-16">
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                  Conference <span className="text-[#C5A059]">DBA Team</span>
                </h2>
                <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em]">
                  Phase II Governance Board
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10 pb-12">
                {fullCommittee.patrons.map((p, i) => (
                  <div key={i} className="group">
                    <p className="text-[#C5A059] text-[9px] font-black uppercase tracking-widest mb-1">
                      {p.role}
                    </p>
                    <h4 className="text-white font-bold text-xl uppercase leading-tight group-hover:text-[#C5A059] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-white/40 text-[10px] uppercase font-bold mt-1">
                      {p.title}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <h5 className="text-white/20 font-black text-xs uppercase tracking-[0.3em] border-b border-white/5 pb-2">
                    International Advisory
                  </h5>
                  <div className="grid gap-6">
                    {fullCommittee.advisory.map((a, i) => (
                      <div key={i}>
                        <p className="text-white font-bold text-base uppercase">
                          {a.name}
                        </p>
                        <p className="text-white/40 text-[9px] uppercase font-bold">
                          {a.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h5 className="text-[#C5A059]/40 font-black text-xs uppercase tracking-[0.3em] border-b border-white/5 pb-2">
                    Organizing Secretariat
                  </h5>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {fullCommittee.organizing.map((o, i) => (
                      <div key={i}>
                        <p className="text-[#C5A059] text-[8px] font-black uppercase tracking-tighter">
                          {o.role}
                        </p>
                        <p className="text-white font-bold text-sm uppercase">
                          {o.name}
                        </p>
                        <p className="text-white/40 text-[9px] uppercase font-bold">
                          {o.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center pt-8 border-t border-white/5">
                <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.5em]">
                  Academic Excellence | East West University | 2026
                </p>
                <div className="mt-4 flex justify-center gap-6">
                  <button className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                  <button className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                    Contact Committee
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
