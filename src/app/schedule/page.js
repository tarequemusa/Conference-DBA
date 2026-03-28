"use client";
import AuthModal from "@/components/AuthModal"; // 🚀 Added
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Calendar,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Mic2,
} from "lucide-react";
import { useSession } from "next-auth/react"; // 🚀 Added
import { useRouter } from "next/navigation"; // 🚀 Added
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
  const { data: session } = useSession(); // 🚀 Check if user is logged in
  const router = useRouter();

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false); // 🚀 Modal state

  useEffect(() => {
    fetch("/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🚀 Logic for the Register Button
  const handleRegisterClick = () => {
    if (session) {
      router.push("/dashboard"); // If already logged in, send to dashboard
    } else {
      setIsAuthOpen(true); // Otherwise, open registration modal
    }
  };

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
      <section className="bg-[#001A41] pt-48 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C5A059] rounded-full blur-[120px]" />
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
          Conference <span className="text-[#C5A059]">Timeline</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-[#C5A059]" /> May 20, 2026
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-[#C5A059]" /> Dhaka, Bangladesh
          </span>
        </div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section className="max-w-5xl mx-auto py-32 px-6">
        <div className="relative border-l-2 border-slate-100 ml-4 md:ml-40 space-y-24">
          {SESSION_SLOTS.map((slot) => {
            const slotPapers = schedule.filter(
              (p) => p.scheduledSlot === slot.id,
            );

            return (
              <div key={slot.id} className="relative group/slot">
                <div className="hidden md:block absolute right-[calc(100%+48px)] top-0 text-right w-32">
                  <p className="text-base font-black text-[#003366] leading-none mb-1">
                    {slot.time}
                  </p>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    GMT +6
                  </p>
                </div>

                <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-white border-4 border-[#C5A059] shadow-[0_0_0_4px_rgba(197,160,89,0.1)] group-hover/slot:scale-125 transition-transform duration-300 z-10" />

                <div className="pl-10 md:pl-0">
                  <div className="mb-8">
                    <div className="md:hidden flex items-center gap-2 mb-3">
                      <Clock size={12} className="text-[#C5A059]" />
                      <span className="text-[11px] font-black text-[#003366] uppercase tracking-widest">
                        {slot.time}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#003366] uppercase tracking-tighter leading-none mb-4">
                      {slot.title}
                    </h2>
                    <p className="flex items-center gap-2 text-[11px] font-black text-[#C5A059] uppercase tracking-widest">
                      <MapPin size={14} /> {slot.room}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {slotPapers.length > 0 ? (
                      slotPapers.map((paper) => (
                        <div
                          key={paper.id}
                          className="group/item bg-slate-50 hover:bg-[#003366] p-8 rounded-[2.5rem] transition-all duration-500 border border-slate-100 flex items-start justify-between gap-6 shadow-sm hover:shadow-2xl"
                        >
                          <div className="flex gap-6">
                            <div className="mt-1 p-3 bg-white rounded-2xl text-[#003366] group-hover/item:bg-[#C5A059] transition-all shadow-sm">
                              <Mic2 size={20} />
                            </div>
                            <div>
                              <h3 className="text-base md:text-lg font-bold text-[#003366] group-hover/item:text-white leading-snug transition-colors">
                                {paper.title}
                              </h3>
                              <div className="flex items-center gap-3 mt-4">
                                <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">
                                  Lead Speaker:
                                </span>
                                <span className="text-[11px] font-bold text-slate-400 group-hover/item:text-slate-300 transition-colors uppercase tracking-tight">
                                  {paper.user?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight
                            className="text-slate-200 group-hover/item:text-[#C5A059] transition-all shrink-0 mt-2"
                            size={24}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="py-10 px-8 border-2 border-dashed border-slate-50 rounded-[2.5rem]">
                        <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] text-center italic">
                          Guest Keynotes & Networking Break
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="bg-slate-50 py-32 px-6 text-center border-t border-slate-100">
        <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">
          Ready to join us?
        </p>
        {/* 🚀 LINKED BUTTON */}
        <button
          onClick={handleRegisterClick}
          className="px-12 py-5 bg-[#003366] text-white font-black uppercase text-[11px] tracking-widest rounded-[1.5rem] hover:bg-[#C5A059] hover:text-[#003366] transition-all shadow-2xl active:scale-95"
        >
          {session ? "View Dashboard" : "Register as Attendee"}
        </button>
      </section>

      {/* 🚀 AUTH MODAL INTEGRATION */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView="signup"
      />

      <Footer />
    </div>
  );
}
