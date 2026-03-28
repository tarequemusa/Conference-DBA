"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Calendar,
  Clock,
  Loader2,
  MapPin,
  MoveHorizontal,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Example Session Slots
const SESSION_SLOTS = [
  { id: "slot-1", time: "09:00 AM - 10:30 AM", title: "Inaugural Session" },
  { id: "slot-2", time: "11:00 AM - 12:30 PM", title: "Technical Track I" },
  { id: "slot-3", time: "02:00 PM - 03:30 PM", title: "Technical Track II" },
  { id: "slot-4", time: "04:00 PM - 05:30 PM", title: "Closing Remarks" },
];

export default function ScheduleBuilder() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/schedule")
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
        setLoading(false);
      });
  }, []);

  const updatePaperSlot = async (paperId, slotId) => {
    const loadingToast = toast.loading("Updating Schedule...");
    try {
      const res = await fetch("/api/admin/schedule", {
        method: "PATCH",
        body: JSON.stringify({ paperId, slotTime: slotId }),
      });
      if (res.ok) {
        setPapers((prev) =>
          prev.map((p) =>
            p.id === paperId ? { ...p, scheduledSlot: slotId } : p,
          ),
        );
        toast.success("Schedule Synchronized", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Save Failed", { id: loadingToast });
    }
  };

  if (loading)
    return (
      <div className="h-screen bg-[#001A41] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" />
      </div>
    );

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- DARK HEADER --- */}
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-12 shadow-2xl shrink-0">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
              <Calendar size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
                Schedule Architect
              </h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-2 opacity-80">
                Final Paper Placement & Timeline
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-[#001A41] font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white transition-all shadow-xl">
            <Save size={16} /> Publish Schedule
          </button>
        </header>

        <div className="flex-1 overflow-hidden p-10 flex gap-8">
          {/* --- LEFT: CONFIRMED POOL --- */}
          <div className="w-1/3 flex flex-col gap-4">
            <h2 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-2">
              <MoveHorizontal size={18} className="text-[#C5A059]" /> Confirmed
              Pool
            </h2>
            <div className="flex-1 bg-slate-100/50 rounded-[2rem] p-6 overflow-y-auto border border-slate-200 border-dashed">
              {papers
                .filter((p) => !p.scheduledSlot)
                .map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onAssign={updatePaperSlot}
                  />
                ))}
            </div>
          </div>

          {/* --- RIGHT: SESSION TRACKS --- */}
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar">
            {SESSION_SLOTS.map((slot) => (
              <div
                key={slot.id}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden"
              >
                <div className="bg-slate-50 p-6 flex justify-between items-center border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#003366] text-white rounded-lg">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {slot.time}
                      </p>
                      <h3 className="text-sm font-black text-[#003366] uppercase tracking-tight">
                        {slot.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <MapPin size={14} /> Main Auditorium
                  </div>
                </div>
                <div className="p-6 min-h-[120px] space-y-3">
                  {papers
                    .filter((p) => p.scheduledSlot === slot.id)
                    .map((paper) => (
                      <div
                        key={paper.id}
                        className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex justify-between items-center"
                      >
                        <p className="text-xs font-bold text-emerald-800">
                          {paper.title}
                        </p>
                        <button
                          onClick={() => updatePaperSlot(paper.id, null)}
                          className="text-[9px] font-black text-emerald-600 uppercase hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function PaperCard({ paper, onAssign }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 mb-4 group hover:border-[#C5A059] transition-all cursor-move">
      <p className="text-xs font-black text-[#003366] leading-snug mb-4 uppercase tracking-tight line-clamp-2">
        {paper.title}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {SESSION_SLOTS.map((slot) => (
          <button
            key={slot.id}
            onClick={() => onAssign(paper.id, slot.id)}
            className="text-[8px] font-black uppercase py-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-[#C5A059] hover:text-[#001A41] transition-all"
          >
            {slot.id.split("-")[1]}
          </button>
        ))}
      </div>
    </div>
  );
}
