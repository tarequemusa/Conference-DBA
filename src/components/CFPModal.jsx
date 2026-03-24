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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-[1000px] max-h-[95vh] md:max-h-[85vh] rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 md:right-8 md:top-8 text-slate-400 hover:text-[#003366] z-[60] transition-transform hover:scale-110 bg-white/80 rounded-full p-1"
        >
          <X size={28} className="md:w-8 md:h-8" />
        </button>

        {/* LEFT PANEL */}
        <div className="w-full md:w-5/12 bg-[#003366] p-8 md:p-12 text-white flex flex-col justify-between relative shrink-0">
          <div className="relative z-10">
            <div className="bg-[#C5A059] w-12 h-1 mb-4 md:mb-6"></div>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              Call for <br className="hidden md:block" />
              Papers
            </h2>
            <p className="mt-3 md:mt-6 text-slate-300 text-sm md:text-lg leading-relaxed">
              Submit original research contributing to sustainable supply
              chains.
            </p>
          </div>

          <div className="relative z-10 mt-6 md:mt-0 space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="bg-white/10 p-2 md:p-3 rounded-xl group-hover:bg-[#C5A059]/20 transition-colors">
                <FileText className="text-[#C5A059] w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">
                  Format
                </p>
                <p className="font-bold text-sm md:text-base">
                  PDF (300 Char Abstract)
                </p>
              </div>
            </div>

            {/* ACTION BUTTON: Now triggers the modal transition instead of navigation */}
            <button
              onClick={onStartSubmission}
              className="w-full bg-[#C5A059] text-[#003366] py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-base md:text-lg shadow-xl hover:bg-white transition-all flex items-center justify-center gap-2 border-2 border-transparent hover:border-[#C5A059]"
            >
              Start Submission <Send size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Topics */}
        <div className="w-full md:w-7/12 p-6 md:p-14 bg-white overflow-y-auto custom-scrollbar">
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-[#003366]">
              Conference Topics
            </h3>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Ready to submit? Click the button on the left.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl border border-slate-50 hover:border-[#C5A059] hover:bg-slate-50 transition-all group"
              >
                <CheckCircle2 className="text-[#C5A059] w-4 h-4 shrink-0" />
                <span className="text-xs md:text-sm font-medium text-slate-700 group-hover:text-[#003366]">
                  {topic}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Submission Link inside Topics Area */}
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
            <p className="text-[10px] md:text-xs text-slate-500 italic mb-2">
              Have your 300-character abstract ready?
            </p>
            <button
              onClick={onStartSubmission}
              className="text-[#003366] font-bold text-sm hover:underline"
            >
              Open Submission Form →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
