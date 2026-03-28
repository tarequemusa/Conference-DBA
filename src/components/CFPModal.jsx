"use client";
import { CheckCircle2, FileText, Send, X } from "lucide-react";

export default function CFPModal({ isOpen, onClose, onStartSubmission }) {
  if (!isOpen) return null;

  const topics = [
    "Supply Chain Sustainability",
    "Logistics Management",
    "Green Logistics",
    "Circular Supply Chain",
    "Sustainable Procurement",
    "Resource Optimization",
    "Transportation Efficiency",
    "Inventory Management",
    "Carbon Footprint Reduction",
    "Supply Chain Resilience",
  ];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-hidden">
      <div className="bg-white w-full max-w-[950px] rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-300 max-h-[90vh] my-auto">
        {/* --- BRANDED FIXED HEADER --- */}
        <div className="w-full bg-[#003366] p-4 md:p-5 flex items-center justify-between border-b border-white/10 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
              <img
                src="/images/logo.png"
                alt="EWU Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-black text-sm md:text-lg leading-none tracking-tight uppercase">
                CONFERENCE <span className="text-[#C5A059]">DBA</span>
              </h2>
              <span className="text-white/60 text-[8px] md:text-[10px] tracking-[0.2em] mt-1 font-medium uppercase">
                INTERNATIONAL 2026
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* --- MODAL CONTENT BODY (Scrollable) --- */}
        <div className="flex flex-col md:flex-row overflow-y-auto custom-scrollbar flex-grow">
          {/* Left Panel: Branded Sidebar */}
          <div className="w-full md:w-5/12 bg-[#003366] p-8 md:p-12 text-white flex flex-col justify-between border-r border-white/5 relative overflow-hidden shrink-0">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-[#C5A059] w-12 h-1 mb-6"></div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-6">
                Call for <br /> <span className="text-[#C5A059]">Papers</span>
              </h3>
              <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed mb-8">
                Submit original research contributing to sustainable supply
                chains and global industry trends.
              </p>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl mb-8 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Format
                  </p>
                  <p className="text-sm font-bold text-white">
                    PDF (300 Word Abstract)
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onStartSubmission} // 🚀 Calls the parent logic
              className="w-full bg-[#C5A059] text-[#003366] py-4 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl active:scale-95 relative z-10"
            >
              Start Submission <Send size={16} />
            </button>
          </div>

          {/* Right Panel: Content Grid */}
          <div className="w-full md:w-7/12 p-8 md:p-12 bg-white flex flex-col">
            <div className="mb-8 text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tight">
                Conference Topics
              </h4>
              <p className="text-slate-500 text-[11px] font-medium mt-1 uppercase tracking-wider italic">
                Ready to submit? Review our core research themes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 group hover:border-[#C5A059]/30 transition-all"
                >
                  <CheckCircle2 size={16} className="text-[#C5A059] shrink-0" />
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight group-hover:text-[#003366]">
                    {topic}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">
                Have your abstract ready?
              </p>
              <button
                onClick={onStartSubmission} // 🚀 Calls the parent logic
                className="text-[#003366] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 mx-auto hover:text-[#C5A059] transition-colors"
              >
                Open Submission Form →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
