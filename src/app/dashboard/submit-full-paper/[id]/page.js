"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  FileType,
  Loader2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FullPaperSubmission() {
  const { id } = useParams();
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileUrl) return toast.error("Please provide the paper URL/File");

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/user/abstracts/full-paper/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullPaperUrl: fileUrl }),
      });

      if (res.ok) {
        toast.success("Full Paper Submitted for Final Review!");
        router.push("/dashboard/abstracts");
      }
    } catch (err) {
      toast.error("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-[#003366] font-bold text-xs uppercase mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to History
        </button>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Submission Form */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#003366]" />
            <h1 className="text-2xl font-black text-[#003366] uppercase tracking-tighter mb-2">
              Final Manuscript
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-10">
              Submit your complete research paper
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="p-10 border-4 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center text-center">
                <FileType size={48} className="text-[#C5A059] mb-4" />
                <p className="text-sm font-bold text-[#003366] mb-1">
                  Upload PDF Document
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-6">
                  Max File Size: 10MB
                </p>

                <input
                  type="text"
                  placeholder="Paste your Google Drive / Dropbox Link here"
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 ring-[#C5A059]/10 text-xs font-bold"
                  onChange={(e) => setFileUrl(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[#003366] text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#C5A059] hover:text-[#003366] transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <CheckCircle size={18} />
                )}
                Confirm Final Submission
              </button>
            </form>
          </div>

          {/* Guidelines Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#003366] p-8 rounded-[2.5rem] text-white shadow-xl">
              <AlertCircle className="text-[#C5A059] mb-4" size={24} />
              <h3 className="font-black uppercase tracking-tighter text-lg mb-4">
                Formatting Rules
              </h3>
              <ul className="space-y-4 text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                <li className="flex gap-2">
                  <span>•</span> IEEE Format Preferred
                </li>
                <li className="flex gap-2">
                  <span>•</span> No Author Names in Body
                </li>
                <li className="flex gap-2">
                  <span>•</span> Include All References
                </li>
                <li className="flex gap-2">
                  <span>•</span> PDF Format Only
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
