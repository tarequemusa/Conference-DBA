"use client";
import Sidebar from "@/components/dashboard/Sidebar"; // 🚀 Import your Sidebar
import {
  Calendar,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Mic2,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

const SLOTS = [
  {
    id: "slot-1",
    time: "09:00 AM",
    title: "Inaugural",
    room: "Grand Ball Room",
  },
  { id: "slot-2", time: "11:00 AM", title: "Track I", room: "Hall A" },
  { id: "slot-3", time: "02:00 PM", title: "Track II", room: "Hall B" },
  { id: "slot-4", time: "04:00 PM", title: "Closing", room: "Main Auditorium" },
];

export default function DashboardSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load schedule", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#001A41]">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
      </div>
    );

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* --- SIDEBAR INTEGRATION --- */}
      <Sidebar />

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto h-screen custom-scrollbar">
        {/* --- THEMATIC HEADER --- */}
        <div className="bg-[#001A41] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl -mr-32 -mt-32" />

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                <Calendar className="text-[#C5A059]" size={32} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">
                  Event Timeline
                </h1>
                <p className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-[0.2em] mt-2">
                  Session Orchestration & Presentation Logistics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-all text-white/60 hover:text-white">
                <Clock size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-8 pb-20">
          {/* --- FILTER BAR --- */}
          <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/20 mb-10 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by session, presenter, or topic..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-[#003366] outline-none focus:ring-2 focus:ring-[#C5A059]/20 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#003366] outline-none cursor-pointer hover:bg-white transition-all">
                <option value="all">ALL ROOMS</option>
                <option value="ballroom">GRAND BALL ROOM</option>
                <option value="hall-a">HALL A</option>
                <option value="hall-b">HALL B</option>
              </select>
            </div>
          </div>

          {/* --- TIMELINE GRID --- */}
          <div className="grid gap-8">
            {SLOTS.map((slot) => {
              const slotPapers = schedule.filter(
                (p) => p.scheduledSlot === slot.id,
              );

              return (
                <div key={slot.id} className="group relative">
                  <div className="absolute left-[-20px] top-10 bottom-[-40px] w-px bg-slate-200 hidden xl:block last:hidden" />

                  <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="bg-[#001A41] p-5 px-10 flex justify-between items-center border-b border-white/5">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-[#C5A059]" />
                          <span className="text-[#C5A059] font-black text-xs uppercase tracking-widest leading-none">
                            {slot.time}
                          </span>
                        </div>
                        <div className="h-4 w-px bg-white/20" />
                        <h3 className="text-white font-black uppercase text-sm tracking-tight leading-none">
                          {slot.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                        <MapPin size={12} className="text-[#C5A059]" />
                        <span className="text-white/60 text-[9px] font-black uppercase tracking-widest">
                          {slot.room}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 space-y-4">
                      {slotPapers.length > 0 ? (
                        slotPapers.map((paper) => (
                          <div
                            key={paper.id}
                            className="flex items-center justify-between p-5 bg-slate-50/50 hover:bg-white hover:shadow-md rounded-2xl border border-slate-100 transition-all group/item"
                          >
                            <div className="flex items-center gap-5">
                              <div className="p-3 bg-white rounded-xl text-[#003366] shadow-sm border border-slate-50 group-hover/item:bg-[#003366] group-hover/item:text-white transition-all">
                                <Mic2 size={18} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[#003366] leading-tight group-hover/item:text-[#C5A059] transition-colors">
                                  {paper.title}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-[9px] font-black text-[#C5A059] uppercase tracking-widest">
                                    Presenter:
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                                    {paper.user?.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="hidden md:block px-4 py-1.5 bg-white border border-slate-100 text-[9px] font-black text-slate-400 rounded-full uppercase tracking-tighter">
                                Status: Confirmed
                              </span>
                              <ChevronRight
                                className="text-slate-300 group-hover/item:text-[#C5A059] transition-all"
                                size={20}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                          <p className="text-[10px] md:text-[11px] text-slate-400 italic font-bold uppercase tracking-widest">
                            Administrative Block / Networking Break
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
