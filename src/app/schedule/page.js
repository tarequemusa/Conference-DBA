"use client";
import Navbar from "@/components/layout/Navbar"; // Assuming you have a public navbar
import {
  Calendar,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Mic2,
} from "lucide-react";
import { useEffect, useState } from "react";

const SESSION_SLOTS = [
  {
    id: "slot-1",
    time: "09:00 AM",
    title: "Inaugural Session",
    room: "Grand Ball Room",
  },
  {
    id: "slot-2",
    time: "11:00 AM",
    title: "Technical Track I",
    room: "Hall A - Logistics",
  },
  {
    id: "slot-3",
    time: "02:00 PM",
    title: "Technical Track II",
    room: "Hall B - Strategy",
  },
  {
    id: "slot-4",
    time: "04:00 PM",
    title: "Closing Remarks",
    room: "Main Auditorium",
  },
];

export default function PublicSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059] mb-4" size={40} />
        <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Loading Timeline...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="bg-[#001A41] pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C5A059] rounded-full blur-[120px]" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
          Conference <span className="text-[#C5A059]">Timeline</span>
        </h1>
        <div className="flex items-center justify-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-[#C5A059]" /> May 20, 2026
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-[#C5A059]" /> Dhaka, Bangladesh
          </span>
        </div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section className="max-w-4xl mx-auto py-20 px-6">
        <div className="relative border-l-2 border-slate-100 ml-4 md:ml-32 space-y-16">
          {SESSION_SLOTS.map((slot) => {
            const slotPapers = schedule.filter(
              (p) => p.scheduledSlot === slot.id,
            );

            return (
              <div key={slot.id} className="relative">
                {/* Time Label for Desktop */}
                <div className="hidden md:block absolute right-[calc(100%+40px)] top-0 text-right w-24">
                  <p className="text-sm font-black text-[#003366]">
                    {slot.time}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">
                    GMT +6
                  </p>
                </div>

                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-[#C5A059] shadow-sm" />

                <div className="pl-8 md:pl-0">
                  <div className="mb-6">
                    <div className="md:hidden flex items-center gap-2 mb-2">
                      <Clock size={12} className="text-[#C5A059]" />
                      <span className="text-xs font-black text-[#003366]">
                        {slot.time}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-[#003366] uppercase tracking-tight leading-none">
                      {slot.title}
                    </h2>
                    <p className="flex items-center gap-2 text-[10px] font-black text-[#C5A059] uppercase tracking-widest mt-2">
                      <MapPin size={12} /> {slot.room}
                    </p>
                  </div>

                  {/* Paper List */}
                  <div className="space-y-4">
                    {slotPapers.length > 0 ? (
                      slotPapers.map((paper) => (
                        <div
                          key={paper.id}
                          className="group bg-slate-50 hover:bg-[#003366] p-6 rounded-[2rem] transition-all duration-500 border border-slate-100 flex items-start justify-between gap-4"
                        >
                          <div className="flex gap-4">
                            <div className="mt-1 p-2 bg-white rounded-xl text-[#003366] group-hover:bg-[#C5A059] transition-colors">
                              <Mic2 size={16} />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-[#003366] group-hover:text-white leading-snug transition-colors">
                                {paper.title}
                              </h3>
                              <p className="text-[10px] font-black text-slate-400 group-hover:text-[#C5A059] uppercase tracking-widest mt-2 transition-colors">
                                Speaker: {paper.user?.name}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-slate-200 group-hover:text-[#C5A059] transition-colors" />
                        </div>
                      ))
                    ) : (
                      <p className="text-xs italic text-slate-400 pl-4">
                        Guest Keynotes & Networking
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="bg-slate-50 py-20 px-6 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
          Ready to join us?
        </p>
        <button className="px-10 py-4 bg-[#003366] text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-[#C5A059] hover:text-[#003366] transition-all shadow-xl">
          Register as Attendee
        </button>
      </footer>
    </div>
  );
}
