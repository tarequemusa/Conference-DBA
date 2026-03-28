"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  FileText,
  Info,
  Loader2,
  PlusCircle,
  Send,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SubmitAbstract() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    coAuthors: "",
    abstract: "",
  });

  const CHARACTER_LIMIT = 500; // Updated limit

  const handleSubmit = async () => {
    setLoading(true);
    setShowConfirm(false);

    try {
      const res = await fetch("/api/user/abstracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title.trim(),
          coAuthors: formData.coAuthors.trim() || "",
          abstract: formData.abstract.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Abstract submitted for review!");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Submission failed.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- DARK COMMAND HEADER --- */}
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-12 shadow-2xl shrink-0 z-20">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059] shadow-inner">
              <PlusCircle size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
                Submit Research
              </h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-2 opacity-80">
                Conference DBA 2026 Peer Review Portal
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar bg-slate-50/30">
          <div className="max-w-4xl mx-auto">
            <form className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

              <div className="space-y-8">
                {/* Paper Title */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    <FileText size={14} className="text-[#C5A059]" /> Paper
                    Title
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Full title of your research..."
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#C5A059] outline-none font-bold text-[#003366] transition-all"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                {/* Co-Authors */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    <User size={14} className="text-[#C5A059]" /> Co-Authors
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. John Doe, Sarah Smith..."
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#C5A059] outline-none font-bold text-[#003366] transition-all"
                    value={formData.coAuthors}
                    onChange={(e) =>
                      setFormData({ ...formData, coAuthors: e.target.value })
                    }
                  />
                </div>

                {/* Abstract Textarea */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    <Info size={14} className="text-[#C5A059]" /> Abstract
                    Summary
                  </label>
                  <textarea
                    required
                    rows={8}
                    maxLength={CHARACTER_LIMIT}
                    placeholder="Provide a brief summary of your research paper..."
                    className="w-full px-6 py-5 rounded-[2rem] bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#C5A059] outline-none resize-none font-medium text-[#003366] leading-relaxed transition-all"
                    value={formData.abstract}
                    onChange={(e) =>
                      setFormData({ ...formData, abstract: e.target.value })
                    }
                  />
                  <div className="flex justify-between items-center px-2">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic">
                      Minimum required for preliminary triage
                    </p>
                    <p
                      className={`text-[10px] font-black uppercase tracking-widest ${formData.abstract.length >= CHARACTER_LIMIT ? "text-red-500" : "text-slate-400"}`}
                    >
                      {formData.abstract.length} / {CHARACTER_LIMIT}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!formData.title.trim() || !formData.abstract.trim()) {
                    return toast.error("Required fields: Title and Abstract.");
                  }
                  setShowConfirm(true);
                }}
                className="w-full py-5 bg-[#001A41] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl hover:bg-[#C5A059] hover:text-[#001A41] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
              >
                <Send size={18} /> Preview & Finalize Submission
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* --- CONFIRMATION MODAL --- */}
      {showConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#001A41]/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative border border-white/10">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#C5A059]" />
            <div className="p-10 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-[#003366] uppercase tracking-tighter">
                  Final Verification
                </h3>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="p-2 bg-slate-100 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Research Title
                  </p>
                  <p className="font-bold text-[#003366] text-lg leading-tight uppercase">
                    {formData.title}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Project Personnel
                  </p>
                  <p className="font-bold text-slate-600 uppercase text-xs">
                    {formData.coAuthors || "Solo Researcher"}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">
                    Abstract Content ({formData.abstract.length} chars)
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{formData.abstract}"
                  </p>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-4 border-2 border-slate-100 text-slate-400 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Return to Edit
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-4 bg-[#C5A059] text-[#003366] font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-[#001A41] hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Transmit to Board"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
