import { MessageSquare, Star, X } from "lucide-react";

export default function FeedbackModal({ isOpen, onClose, feedback }) {
  if (!isOpen || !feedback) return null;

  const rubric = [
    { label: "Originality", score: feedback.originality },
    { label: "Methodology", score: feedback.methodology },
    { label: "Relevance", score: feedback.relevance },
    { label: "Clarity", score: feedback.clarity },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#003366]/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#C5A059]" />
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-[#003366] rounded-xl">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-xl font-black text-[#003366] uppercase tracking-tighter">
                Reviewer Feedback
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {rubric.map((item) => (
              <div
                key={item.label}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-100"
              >
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {item.label}
                </p>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-lg font-black text-[#003366]">
                    {item.score}
                    <span className="text-xs text-slate-300">/5</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#003366] rounded-2xl text-white flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest">
                Total Score
              </span>
              <span className="text-2xl font-black">
                {feedback.totalScore}/20
              </span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 italic text-slate-600 text-sm">
              "{feedback.comments}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
