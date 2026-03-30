"use client";

import { Bell, Calendar, Clock, CreditCard, FileCheck } from "lucide-react";

export default function KeyDates() {
  const dates = [
    {
      title: "Abstract Submission",
      date: "June 30, 2026",
      icon: FileCheck,
      color: "text-[#003366]",
      bg: "bg-[#003366]/5",
    },
    {
      title: "Acceptance Notification",
      date: "July 30, 2026",
      icon: Bell,
      color: "text-[#C5A059]",
      bg: "bg-[#C5A059]/10",
    },
    {
      title: "Full Paper Submission",
      date: "August 30, 2026",
      icon: CreditCard,
      color: "text-[#003366]",
      bg: "bg-[#003366]/5",
    },
    {
      title: "Final Notification",
      date: "September 30, 2026",
      icon: Calendar,
      color: "text-[#C5A059]",
      bg: "bg-[#C5A059]/10",
    },
  ];

  return (
    <section
      id="importantdates"
      // Change: min-h-screen with flex centering and responsive padding
      className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden py-24 md:py-16"
    >
      {/* Background Decorative Element - Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#C5A059] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#003366] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
        {/* Header Section - font-black specifically for titles */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-[#C5A059] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-2">
            Important Timeline
          </h2>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none">
            Key Dates & <span className="text-[#C5A059]">Deadlines</span>
          </h3>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6"></div>
        </div>

        {/* Grid Section - Optimized for Viewport Height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {dates.map((item, index) => (
            <div
              key={index}
              className="group relative p-6 lg:p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-[#C5A059] hover:shadow-[0_20px_50px_rgba(197,160,89,0.12)] transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Icon Container with Interaction */}
                <div
                  className={`w-12 h-12 lg:w-14 lg:h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#003366] group-hover:text-white transition-all duration-500 shadow-sm`}
                >
                  <item.icon
                    size={24}
                    className="group-hover:rotate-12 transition-transform"
                  />
                </div>

                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                  Deadline Cycle 2026
                </p>

                <h4 className="text-base lg:text-lg font-bold text-[#003366] mb-2 leading-tight group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h4>
              </div>

              <div className="mt-4">
                <p className="text-xl lg:text-2xl font-black text-[#003366] tracking-tighter">
                  {item.date}
                </p>
                {/* Animated Bottom Line */}
                <div className="h-1 bg-[#C5A059] w-8 mt-3 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>

              {/* Background Index Number */}
              <span className="absolute -top-2 -right-2 text-6xl font-black text-slate-50 opacity-[0.4] group-hover:opacity-100 group-hover:text-[#C5A059]/5 transition-all pointer-events-none">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Note for Researchers - Footer CTA */}
        <div className="mt-10 lg:mt-16 p-5 rounded-[2rem] bg-white border border-dashed border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-[#003366]">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner group">
              <Clock
                className="text-[#C5A059] group-hover:scale-110 transition-transform"
                size={20}
              />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-tighter">
                Submission Window Active
              </p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                Timezone:{" "}
                <span className="text-[#C5A059]">11:59 PM (GMT +6)</span>
              </p>
            </div>
          </div>

          <button className="w-full md:w-auto bg-[#003366] text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#003366] transition-all shadow-xl active:scale-95 shadow-[#003366]/10">
            Download Full Schedule
          </button>
        </div>
      </div>
    </section>
  );
}
