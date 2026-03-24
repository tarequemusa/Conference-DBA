"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  AlertCircle,
  FileText,
  Info,
  Loader2,
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

  const handleSubmit = async () => {
    setLoading(true);
    setShowConfirm(false);

    try {
      const res = await fetch("/api/user/abstracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Explicitly structuring to ensure data consistency
        body: JSON.stringify({
          title: formData.title.trim(),
          coAuthors: formData.coAuthors.trim() || "",
          abstract: formData.abstract.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Abstract submitted successfully!");
        router.push("/dashboard");
      } else {
        // Log the exact server error to your browser console (F12)
        console.error("Server Submission Error:", data);
        toast.error(data.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Fetch Execution Error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 w-full pt-20 md:pt-0 p-4 md:p-12 overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-[#003366]">
              New Submission
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              ICEBTM 2025 Peer Review Portal
            </p>
          </header>

          <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-slate-100 space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-[#003366] uppercase tracking-wider">
                  <FileText size={16} className="text-[#C5A059]" /> Paper Title
                </label>
                <input
                  required
                  type="text"
                  placeholder="Full title of your research..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-[#C5A059] outline-none font-medium transition-colors"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-[#003366] uppercase tracking-wider">
                  <User size={16} className="text-[#C5A059]" /> Co-Authors
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. John Doe, Sarah Smith..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-[#C5A059] outline-none font-medium transition-colors"
                  value={formData.coAuthors}
                  onChange={(e) =>
                    setFormData({ ...formData, coAuthors: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-[#003366] uppercase tracking-wider">
                  <Info size={16} className="text-[#C5A059]" /> Abstract
                </label>
                <textarea
                  required
                  rows={8}
                  maxLength={1000}
                  placeholder="Provide a brief summary of your paper..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-[#C5A059] outline-none resize-none font-medium transition-colors"
                  value={formData.abstract}
                  onChange={(e) =>
                    setFormData({ ...formData, abstract: e.target.value })
                  }
                />
                <div className="flex justify-between items-center px-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                    Character limit: 1000
                  </p>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-widest ${formData.abstract.length >= 1000 ? "text-red-500" : "text-slate-400"}`}
                  >
                    {formData.abstract.length}/1000
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!formData.title.trim() || !formData.abstract.trim()) {
                  return toast.error(
                    "Please fill in the Paper Title and Abstract.",
                  );
                }
                setShowConfirm(true);
              }}
              className="w-full py-5 bg-[#003366] text-white font-bold rounded-2xl shadow-lg hover:bg-[#002244] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Send size={20} /> Preview & Submit
            </button>
          </div>
        </div>
      </main>

      {/* --- Confirmation Modal Overlay --- */}
      {showConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-[#003366]">
                  Final Review
                </h3>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Title
                  </p>
                  <p className="font-bold text-[#003366] text-lg">
                    {formData.title}
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Co-Authors
                  </p>
                  <p className="font-medium text-slate-700">
                    {formData.coAuthors || "Individual Submission"}
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Abstract Content
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {formData.abstract}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-4 border-2 border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Edit Details
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-4 bg-[#C5A059] text-[#003366] font-bold rounded-2xl shadow-xl hover:bg-[#b38f4d] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Confirm & Submit"
                  )}
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-4 font-medium flex items-center justify-center gap-1">
                <AlertCircle size={12} /> This action will initiate the review
                process.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
