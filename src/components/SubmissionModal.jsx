"use client";
import { CheckCircle2, Info, Loader2, Send, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SubmissionModal({ isOpen, onClose }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    abstract: "",
  });
  const charLimit = 300;

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to submit your abstract.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/abstract/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: session.user.id }),
      });

      if (res.ok) {
        toast.success("Abstract submitted successfully!", {
          duration: 4000,
          position: "top-center",
          style: { background: "#003366", color: "#fff", borderRadius: "10px" },
        });
        setFormData({ title: "", authors: "", abstract: "" });
        setTimeout(() => {
          onClose();
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <Toaster />
      <div className="bg-white w-full max-w-[950px] rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 max-h-[95vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 z-50"
        >
          <X size={28} />
        </button>

        {/* LEFT PANEL: The Branding (Matches Register Form) */}
        <div className="md:w-5/12 bg-[#003366] p-10 md:p-12 text-white flex flex-col justify-between shrink-0">
          <div>
            <h2 className="text-3xl font-bold leading-tight">
              Submission <br /> Portal
            </h2>
            <p className="mt-4 text-slate-300 text-sm">
              Follow the ICEBTM 2025 guidelines to ensure your research is
              considered for review.
            </p>
          </div>

          <div className="space-y-6 my-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-[#C5A059] w-5 h-5 mt-1" />
              <div>
                <p className="font-bold text-sm">Character Limit</p>
                <p className="text-xs text-slate-400">
                  Strictly 300 characters for the initial abstract summary.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-[#C5A059] w-5 h-5 mt-1" />
              <div>
                <p className="font-bold text-sm">Peer Review</p>
                <p className="text-xs text-slate-400">
                  Track your double-blind review progress in the dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex gap-3">
            <Info className="text-[#C5A059] shrink-0" size={18} />
            <p className="text-[10px] text-slate-300 leading-relaxed italic">
              Once submitted, abstracts cannot be edited. Please review
              carefully before sending.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: The Form Area */}
        <div className="md:w-7/12 p-10 md:p-12 overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              Paper Details
            </h3>
            <p className="text-slate-500 text-sm">
              Input your research overview below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                Paper Title
              </label>
              <input
                required
                type="text"
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none transition-all text-slate-700 font-medium"
                placeholder="The Impact of Green Logistics..."
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                Author(s) & University
              </label>
              <input
                required
                type="text"
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none transition-all text-slate-700 font-medium"
                placeholder="John Doe (EWU), Jane Smith (DU)"
                onChange={(e) =>
                  setFormData({ ...formData, authors: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Short Abstract
                </label>
                <span
                  className={`text-[10px] font-bold ${formData.abstract.length > charLimit ? "text-red-500" : "text-slate-400"}`}
                >
                  {formData.abstract.length} / {charLimit}
                </span>
              </div>
              <textarea
                required
                maxLength={charLimit}
                className="w-full px-4 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#C5A059] outline-none transition-all h-40 resize-none text-slate-600 leading-relaxed"
                placeholder="Briefly describe your research problem and outcomes..."
                onChange={(e) =>
                  setFormData({ ...formData, abstract: e.target.value })
                }
              ></textarea>
            </div>

            <button
              disabled={loading || formData.abstract.length === 0}
              className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-800 hover:shadow-[#003366]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Submit to Committee"
              )}{" "}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
