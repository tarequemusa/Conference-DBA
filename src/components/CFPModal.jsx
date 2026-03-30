"use client";
import { CheckCircle2, ClipboardCheck, FileText, Send, X } from "lucide-react";

export default function CFPModal({ isOpen, onClose, onStartSubmission }) {
  if (!isOpen) return null;

  const topics = [
    "Strategic Issues in Supply Chain Management",
    "Global Supply Chain Integration",
    "Industrial Application of Supply Chain Management",
    "Supply Chain Sustainability",
    "Circular Economy",
    "Supply Chain Digtization/AI application in SCM",
    "Supply Chain Management and SDGs",
    "Geo Politics, Geo Economy and SCM",
    "Supply Chain Finance",
    "Supply Chain Optimization",
    "Talent Management in SCM",
    "Outsourcing Logistics Services",
    "Responsible and Ethical SCM",
    "Building Adaptive and Risk-Intelligent Supply Chains",
  ];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-hidden">
      <div className="bg-white w-full max-w-[950px] rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-300 max-h-[90vh] my-auto">
        {/* --- BRANDED FIXED HEADER --- */}
        <div className="w-full bg-[#003366] p-4 md:p-5 flex items-center justify-between border-b border-white/10 shrink-0 z-30">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm border border-white/10">
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

        {/* --- MODAL CONTENT BODY --- */}
        {/* 🚀 Changed to h-full and items-stretch to ensure background colors fill vertically */}
        <div className="flex flex-col md:flex-row overflow-hidden flex-grow items-stretch">
          {/* Left Panel: Branded Sidebar */}
          <div className="w-full md:w-5/12 bg-[#003366] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-8">
              <div>
                <div className="bg-[#C5A059] w-12 h-1 mb-6"></div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-4">
                  Call for <br /> <span className="text-[#C5A059]">Papers</span>
                </h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  Submit original research contributing to sustainable supply
                  chains and global industry trends.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
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

              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
                  Submission Readiness
                </p>
                {[
                  "Clear Research Methodology",
                  "Aligned with Conference Themes",
                  "Properly formatted Abstract",
                  "Contact Details Included",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-tight"
                  >
                    <ClipboardCheck size={14} className="text-[#C5A059]" />{" "}
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onStartSubmission}
              className="w-full bg-[#C5A059] text-[#003366] py-4 mt-12 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl active:scale-95 relative z-10"
            >
              Start Submission <Send size={16} />
            </button>
          </div>

          {/* Right Panel: Content Grid */}
          {/* 🚀 overflow-y-auto is now strictly on this panel so the sidebar doesn't scroll away */}
          <div className="w-full md:w-7/12 p-8 md:p-12 bg-white flex flex-col overflow-y-auto custom-scrollbar">
            <div className="mb-8">
              <h4 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tight">
                Conference Topics
              </h4>
              <p className="text-slate-500 text-[11px] font-medium mt-1 uppercase tracking-wider italic">
                Ready to submit? Review our core research themes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 mb-10">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-[#C5A059]/30 transition-all"
                >
                  <CheckCircle2 size={16} className="text-[#C5A059] shrink-0" />
                  <span className="text-[10px] md:text-[11px] font-bold text-slate-600 uppercase tracking-tight group-hover:text-[#003366]">
                    {topic}
                  </span>
                </div>
              ))}
            </div>

            {/* 🚀 Added pb-12 here to provide the space indicated by your arrow */}
            <div className="mt-auto p-6 rounded-2xl bg-[#003366]/5 border border-dashed border-[#003366]/20 text-center mb-12">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">
                Have your abstract ready?
              </p>
              <button
                onClick={onStartSubmission}
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
