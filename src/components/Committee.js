"use client";

import {
  ArrowUpRight,
  Linkedin,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Committee() {
  const [showFullCommittee, setShowFullCommittee] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (showFullCommittee) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFullCommittee]);

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

  const fullCommitteeData = {
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

  // 🔍 Filter logic for the search bar
  const filteredOrganizers = fullCommitteeData.organizing.filter(
    (o) =>
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section
      id="committee"
      className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden pt-28 pb-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
        {/* Main Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#003366] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em]">
              <Sparkles size={14} className="text-[#C5A059]" /> Executive Board
            </div>
            <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              <span className="text-[#003366]">Organizing</span>{" "}
              <span className="text-[#C5A059]">Committee</span>
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-slate-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest pr-4 text-right hidden md:block">
              Strategic Leadership <br /> Conference DBA 2026
            </p>
            <div className="h-10 w-[3px] bg-[#C5A059] hidden md:block"></div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[2.5rem] p-5 md:p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(197,160,89,0.15)] flex items-center gap-5 md:gap-6 border border-slate-100 hover:border-[#C5A059]/30"
            >
              <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0">
                <div className="relative w-full h-full rounded-[1.8rem] md:rounded-[2rem] overflow-hidden bg-slate-50 border-2 border-white shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#C5A059]">
                  {member.role}
                </span>
                <h4 className="text-lg md:text-xl font-black text-[#003366] leading-tight">
                  {member.name}
                </h4>
                <p className="text-[10px] md:text-[11px] text-slate-400 font-bold uppercase truncate">
                  {member.institution}
                </p>
                <div className="pt-3 flex items-center gap-3">
                  <Linkedin
                    size={16}
                    className="text-slate-300 hover:text-[#0077B5]"
                  />
                  <div className="h-[1px] flex-1 bg-slate-100"></div>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-200 group-hover:text-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 lg:mt-20 flex flex-col items-center gap-4">
          <button
            onClick={() => setShowFullCommittee(true)}
            className="group flex items-center gap-2 bg-[#003366] hover:bg-[#C5A059] text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
          >
            <Users size={16} /> View Full Committee
          </button>
        </div>
      </div>

      {/* --- PHASE II FULL COMMITTEE MODAL --- */}
      {showFullCommittee && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          {/* 1. Deep Navy Backdrop */}
          <div
            className="absolute inset-0 bg-[#001A41]/98 backdrop-blur-3xl"
            onClick={() => setShowFullCommittee(false)}
          ></div>

          {/* 2. Modal Container - Switched to Navy Theme */}
          <div className="max-w-7xl w-full max-h-[95vh] overflow-y-auto bg-[#002855] rounded-[3rem] md:rounded-[4rem] relative z-10 no-scrollbar shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10">
            {/* Sticky Header with Dark Blur */}
            <div className="sticky top-0 bg-[#002855]/90 backdrop-blur-md z-[60] px-8 md:px-20 pt-12 pb-8 border-b border-white/5">
              <button
                onClick={() => setShowFullCommittee(false)}
                className="absolute top-10 right-10 text-[#C5A059] hover:text-white transition-all hover:rotate-90 p-2"
              >
                <X size={36} strokeWidth={2.5} />
              </button>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A059] font-black text-[9px] uppercase tracking-[0.4em]">
                    <Sparkles size={14} /> Executive Board
                  </div>
                  <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                    <span className="text-white">Conference</span>{" "}
                    <span className="text-[#C5A059]">DBA Team</span>
                  </h2>
                </div>

                {/* Styled Search Bar for Dark Mode */}
                <div className="relative w-full md:w-96 group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search member or role..."
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-xs font-bold text-white outline-none focus:border-[#C5A059] transition-all placeholder:text-white/20"
                  />
                  <Search
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C5A059] transition-colors"
                    size={18}
                  />
                </div>
              </div>
            </div>

            <div className="px-8 md:px-20 py-16 space-y-24">
              {/* Patrons Grid (The Board) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/5 pb-16">
                {fullCommitteeData.patrons.map((p, i) => (
                  <div
                    key={i}
                    className="group relative pl-8 border-l-4 border-[#C5A059]/30 hover:border-[#C5A059] transition-all"
                  >
                    <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-widest mb-2">
                      {p.role}
                    </p>
                    <h4 className="text-white font-black text-2xl uppercase leading-tight group-hover:translate-x-1 transition-transform">
                      {p.name}
                    </h4>
                    <p className="text-white/40 text-[11px] uppercase font-bold mt-2 leading-relaxed">
                      {p.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Organizing Secretariat (Horizontal Cards matching dark theme) */}
              <div className="space-y-12">
                <div className="flex items-center gap-6">
                  <h3 className="text-white/10 font-black text-xs md:text-sm uppercase tracking-[0.4em] whitespace-nowrap">
                    Organizing Secretariat
                  </h3>
                  <div className="h-[1px] w-full bg-white/5"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredOrganizers.map((o, i) => (
                    <div
                      key={i}
                      className="group bg-white/5 rounded-[2.5rem] p-6 transition-all duration-500 hover:bg-white/[0.08] flex items-center gap-6 border border-white/5 hover:border-[#C5A059]/30"
                    >
                      <div className="relative w-24 h-24 shrink-0">
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#001A41] border-2 border-white/10 shadow-lg">
                          <Image
                            src="/images/committee/placeholder.png"
                            alt={o.name}
                            fill
                            sizes="96px"
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#C5A059] text-[9px] font-black uppercase tracking-widest mb-1">
                          {o.role}
                        </p>
                        <h4 className="text-lg font-black text-white leading-tight group-hover:translate-x-1 transition-transform">
                          {o.name}
                        </h4>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter truncate">
                          {o.title}
                        </p>
                        <div className="mt-3 h-[1px] w-full bg-white/5 group-hover:bg-[#C5A059]/20 transition-colors"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer info */}
              <div className="text-center pt-8 border-t border-white/5">
                <p className="text-white/10 text-[9px] font-black uppercase tracking-[0.6em]">
                  Academic Excellence | East West University | 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
