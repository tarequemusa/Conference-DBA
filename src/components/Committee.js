"use client";

import { Search, Sparkles, User2, Users, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Committee() {
  const [showFullCommittee, setShowFullCommittee] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = showFullCommittee ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFullCommittee]);

  const organizingData = [
    {
      name: "Dr. Md. Ariful Islam",
      role: "Professor",
      title: "East West University, Dhaka",
    },
    {
      name: "Dr. Farhana Ferdousi",
      role: "Professor",
      title: "East West University, Dhaka",
    },
    {
      name: "Dr. Ravi Shankar PhD",
      role: "Professor",
      title: "IIT Delhi, Delhi",
    },
    {
      name: "Dr. Rahat Munir",
      role: "Professor",
      title: "Macquarie University, Sydney",
    },
    {
      name: "Dr. Nachippan Subramanian",
      role: "Professor",
      title: "University of Sussex, Sussex",
    },
    {
      name: "Dr. Andrew Potter",
      role: "Professor",
      title: "Cardiff University, Cardiff",
    },
    {
      name: "Dr. Kamrul Ahsan",
      role: "Associate Professor",
      title: "RMIT University, Melbourne",
    },
    {
      name: "Dr. Partha Priya Datta",
      role: "Professor",
      title: "IIM Calcutta, India",
    },
    {
      name: "Dr. Laura Yang",
      role: "Professor",
      title: "Shanghai University of Int. Business & Economics",
    },
    { name: "Dr. A.K.M Masud", role: "Professor", title: "BUET, Dhaka" },
    {
      name: "Dr. Smaraki Pattanayak",
      role: "Professor",
      title: "ASBM University, Bhubaneswar",
    },
    {
      name: "Dr. Nasrin Akter",
      role: "Professor",
      title: "University of Dhaka, Dhaka",
    },
    {
      name: "Dr. Md Abdul Hoque",
      role: "Professor",
      title: "BRAC University, Dhaka",
    },
    {
      name: "Dr. Choudhury Abul Anam Rashed",
      role: "Professor",
      title: "SUST, Sylhet",
    },
    {
      name: "Dr. Salma Karim",
      role: "Professor",
      title: "United International University, Dhaka",
    },
  ];

  const filteredOrganizers = organizingData.filter(
    (o) =>
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section
      id="committee"
      className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden pt-28 pb-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Header (Kept exactly same per instructions) */}
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

        {/* Members Grid (Main View) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizingData.slice(0, 6).map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[2rem] p-5 transition-all duration-500 hover:shadow-xl flex items-center gap-5 border border-slate-100 hover:border-[#C5A059]/30"
            >
              <div className="w-16 h-16 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-[#003366] transition-colors">
                <User2
                  className="text-slate-300 group-hover:text-white transition-colors"
                  size={32}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                  {member.role}
                </span>
                <h4 className="text-lg font-bold text-[#003366] leading-tight mt-0.5">
                  {member.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-semibold uppercase truncate mt-1">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center">
          <button
            onClick={() => setShowFullCommittee(true)}
            className="flex items-center gap-2 bg-[#003366] hover:bg-[#C5A059] text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
          >
            <Users size={16} /> View Full Committee
          </button>
        </div>
      </div>

      {/* --- REASONABLE SIZE MODAL --- */}
      {showFullCommittee && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-[#001A41]/95 backdrop-blur-xl"
            onClick={() => setShowFullCommittee(false)}
          ></div>

          <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-[#002855] rounded-[2.5rem] relative z-10 no-scrollbar shadow-2xl border border-white/10 flex flex-col">
            {/* 🚀 Reasonable Header Logic */}
            <div className="sticky top-0 bg-[#002855] z-[60] px-8 py-8 border-b border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#C5A059] font-bold text-[10px] uppercase tracking-[0.3em]">
                    <Sparkles size={12} /> Global Secretariat
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-none">
                    Conference <span className="text-[#C5A059]">DBA Team</span>
                  </h2>
                </div>
                <button
                  onClick={() => setShowFullCommittee(false)}
                  className="text-white/40 hover:text-[#C5A059] transition-colors p-2"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Compact Search Bar */}
              <div className="relative w-full max-w-sm group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search team member..."
                  className="w-full bg-white/5 border border-white/10 px-5 py-3 rounded-xl text-xs font-semibold text-white outline-none focus:border-[#C5A059] transition-all placeholder:text-white/20"
                />
                <Search
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20"
                  size={16}
                />
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrganizers.map((o, i) => (
                <div
                  key={i}
                  className="group bg-white/5 rounded-2xl p-4 flex items-center gap-4 border border-white/5 hover:bg-white/[0.08] transition-all"
                >
                  <div className="w-12 h-12 bg-[#001A41] rounded-xl flex items-center justify-center border border-white/10 shrink-0 group-hover:bg-[#C5A059] transition-colors">
                    <User2
                      className="text-white/20 group-hover:text-white transition-colors"
                      size={24}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#C5A059] text-[9px] font-bold uppercase tracking-widest leading-none mb-1">
                      {o.role}
                    </p>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {o.name}
                    </h4>
                    <p className="text-[10px] text-white/40 font-semibold truncate mt-1">
                      {o.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 text-center border-t border-white/5">
              <p className="text-white/10 text-[9px] font-bold uppercase tracking-[0.5em]">
                DBA Conference Team | East West University | 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
