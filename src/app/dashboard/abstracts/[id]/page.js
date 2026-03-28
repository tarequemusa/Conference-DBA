"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Fingerprint,
  Info,
  Loader2,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResearcherAbstractDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [abstract, setAbstract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Calling the user-specific abstract details endpoint
        const res = await fetch(`/api/user/abstracts/${id}`);
        const data = await res.json();
        if (res.ok) setAbstract(data);
        else toast.error("Unable to retrieve submission details.");
      } catch (err) {
        toast.error("Network connection error.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#003366]" size={40} />
        <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Synchronizing Manuscript...
        </p>
      </div>
    );

  if (!abstract)
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Submission Not Found
        </p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />
      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        {/* --- NAVIGATION --- */}
        <button
          onClick={() => router.push("/dashboard/abstracts")}
          className="flex items-center gap-3 text-slate-400 hover:text-[#003366] transition-colors mb-12 group"
        >
          <div className="p-2 rounded-full group-hover:bg-slate-50 transition-all">
            <ArrowLeft size={18} strokeWidth={3} />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            Back to My Submissions
          </span>
        </button>

        {/* --- MANUSCRIPT HEADER --- */}
        <div className="max-w-5xl space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full border border-slate-100 shadow-sm">
            <Info size={12} className="mr-2" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Manuscript Details
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#003366] uppercase tracking-tighter leading-tight max-w-4xl">
            {abstract.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
            <div className="flex items-center gap-2 text-slate-400">
              <User size={14} className="text-[#C5A059]" />
              <p className="text-xs font-bold italic">
                Principal Author:{" "}
                <span className="text-slate-600 not-italic">
                  {abstract.user?.name || "You"}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Fingerprint size={14} className="text-[#C5A059]" />
              <p className="text-[10px] font-black uppercase tracking-tighter">
                UID: {abstract.id.slice(-12).toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* --- ABSTRACT CONTENT --- */}
        <div className="mt-16 max-w-6xl">
          <div className="flex items-center gap-3 mb-8 text-[#C5A059]">
            <FileText size={20} strokeWidth={2.5} />
            <h2 className="text-xs font-black uppercase tracking-[0.3em]">
              Abstract Content
            </h2>
          </div>

          <div className="relative group">
            {/* Background Layer for shadow effect */}
            <div className="absolute inset-0 bg-slate-50/30 rounded-[3rem] blur-xl" />

            <div className="relative bg-[#F8FAFC]/50 border border-slate-100 p-10 md:p-16 rounded-[3rem] min-h-[300px] shadow-sm">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium italic indent-8 whitespace-pre-line">
                {abstract.content}
              </p>
            </div>
          </div>
        </div>

        {/* --- STATUS FOOTER --- */}
        <div className="mt-12 pt-8 border-t border-slate-100 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-slate-300">
            <Calendar size={16} />
            <p className="text-[10px] font-black uppercase tracking-widest">
              Submitted On:{" "}
              {new Date(abstract.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Current Status:
            </span>
            <div
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${getStatusStyles(abstract.status)}`}
            >
              {abstract.status.replace(/_/g, " ")}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getStatusStyles(status) {
  const styles = {
    ACCEPTANCE_NOTIFICATION:
      "bg-emerald-50 text-emerald-600 border-emerald-100",
    CONFIRMED: "bg-[#003366] text-white border-[#003366]",
    PEER_REVIEW: "bg-blue-50 text-blue-600 border-blue-100",
    REJECTED: "bg-red-50 text-red-600 border-red-100",
    INITIAL_EVALUATION: "bg-amber-50 text-amber-600 border-amber-100",
  };
  return styles[status] || "bg-slate-50 text-slate-400 border-slate-100";
}
