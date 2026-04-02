"use client";
import ReviewProcessTracker from "@/components/dashboard/ReviewProcessTracker";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Loader2,
  PlusCircle,
  Tag,
  User,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResearcherDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingAbstract, setViewingAbstract] = useState(null);
  const [expandedTrackers, setExpandedTrackers] = useState({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      const role = session?.user?.role;
      if (role === "ADMIN") return router.push("/admin");
      if (role === "REVIEWER") return router.push("/reviewer");
      if (role === "AUTHORITY") return router.push("/authority");
      fetchAbstracts();
    }
  }, [status, session, router]);

  const fetchAbstracts = async () => {
    try {
      const res = await fetch("/api/user/abstracts");
      const data = await res.json();
      if (res.ok) setAbstracts(data);
    } catch (err) {
      toast.error("Connection Error");
    } finally {
      setLoading(false);
    }
  };

  const toggleTracker = (id) => {
    setExpandedTrackers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003366]">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
      </div>
    );
  }

  const totalUploads = abstracts.length;
  const acceptedPapers = abstracts.filter((a) =>
    [
      "ACCEPTANCE_NOTIFICATION",
      "FINAL_ACCEPTANCE",
      "PUBLISHED",
      "CERTIFIED",
    ].includes(a.status),
  ).length;
  const inReview = abstracts.filter((a) =>
    [
      "SUBMITTED",
      "PEER_REVIEW",
      "INITIAL_EVALUATION",
      "TECHNICAL_AUDIT",
    ].includes(a.status),
  ).length;

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
        {/* NEW SUBMISSION BUTTON */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => router.push("/dashboard/submit")}
            className="flex items-center gap-2 px-6 py-3 bg-[#001A41] text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-xl hover:bg-[#C5A059] hover:text-[#001A41] transition-all"
          >
            <PlusCircle size={16} /> New Submission
          </button>
        </div>

        {/* SUMMARY STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard
            label="Total Uploads"
            val={totalUploads}
            icon={FileText}
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <SummaryCard
            label="Accepted Papers"
            val={acceptedPapers}
            icon={CheckCircle2}
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <SummaryCard
            label="Review Phase"
            val={inReview}
            icon={Clock}
            color="text-amber-600"
            bg="bg-amber-50"
          />
        </div>

        {/* MANUSCRIPT DESK */}
        <div className="mb-6 px-2 text-left">
          <h1 className="text-xl font-black text-[#003366] uppercase tracking-tighter">
            Manuscript Desk
          </h1>
          <p className="text-slate-400 font-bold text-[8px] uppercase tracking-widest mt-1">
            Real-time status of your research submissions
          </p>
        </div>

        <div className="space-y-4">
          {abstracts.map((abs) => (
            <div
              key={abs.id}
              className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden transition-all duration-300"
            >
              <div className="px-8 py-6 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <FileText size={18} />
                  </div>
                  <div className="text-left">
                    <h2 className="text-sm font-black text-[#003366] uppercase tracking-tight">
                      {abs.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                        UID: {abs.id.slice(-8).toUpperCase()}
                      </p>
                      <span className="text-slate-200 text-[10px]">|</span>
                      <p className="text-[9px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                        <Calendar size={10} className="text-[#C5A059]" />
                        {new Date(abs.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setViewingAbstract(abs)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase text-slate-600 hover:text-[#C5A059] hover:border-[#C5A059] transition-all shadow-sm"
                  >
                    <Eye size={13} /> View
                  </button>
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black uppercase text-slate-500 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                    {abs.status.replace(/_/g, " ")}
                  </div>
                  <button
                    onClick={() => toggleTracker(abs.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all shadow-sm ${expandedTrackers[abs.id] ? "bg-[#001A41] text-white" : "bg-[#C5A059]/10 text-[#003366] hover:bg-[#C5A059]/20"}`}
                  >
                    <Activity size={13} />{" "}
                    {expandedTrackers[abs.id] ? "Hide" : "Track"}
                  </button>
                </div>
              </div>

              {expandedTrackers[abs.id] && (
                <div className="px-8 pb-10 pt-4 bg-slate-50/50 border-t border-slate-50 animate-in slide-in-from-top-2 duration-300">
                  <ReviewProcessTracker currentStatus={abs.status} />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* 🚀 RECOVERED FULL ABSTRACT VIEW MODAL */}
      {viewingAbstract && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#001A41]/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#C5A059]" />

            {/* Modal Header */}
            <div className="p-8 md:p-12 border-b border-slate-50">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[9px] font-black text-[#C5A059] uppercase tracking-[0.3em]">
                    <FileText size={12} /> Full Manuscript Submission
                  </div>
                  <h3 className="text-xl md:text-3xl font-black text-[#003366] uppercase tracking-tighter leading-tight mt-2 text-left">
                    {viewingAbstract.title}
                  </h3>
                </div>
                <button
                  onClick={() => setViewingAbstract(null)}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar space-y-10">
              {/* Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                  <User className="text-[#C5A059] shrink-0" size={18} />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Project Personnel
                    </p>
                    <p className="text-xs font-bold text-slate-700 uppercase">
                      {viewingAbstract.coAuthors || "Solo Researcher"}
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                  <Tag className="text-[#C5A059] shrink-0" size={18} />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Sub-Thematic Area
                    </p>
                    <p className="text-xs font-bold text-slate-700 uppercase">
                      {viewingAbstract.subTheme || "Not Specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Abstract Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <Activity size={14} className="text-[#C5A059]" /> Abstract
                  Summary
                </div>
                <div className="bg-[#F8FAFC] p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-inner relative">
                  <div className="text-sm md:text-base text-slate-600 leading-relaxed italic text-left whitespace-pre-wrap font-medium">
                    "{viewingAbstract.abstract || viewingAbstract.content}"
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                UID: {viewingAbstract.id.toUpperCase()}
              </div>
              <button
                onClick={() => setViewingAbstract(null)}
                className="px-8 py-3 bg-[#003366] text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#C5A059] hover:text-[#003366] transition-all shadow-lg"
              >
                Close Manuscript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, val, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl flex items-center gap-6">
      <div className={`p-4 rounded-2xl ${bg} ${color} shadow-inner`}>
        <Icon size={22} />
      </div>
      <div className="text-left">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <p className="text-2xl font-black text-[#003366] leading-none">{val}</p>
      </div>
    </div>
  );
}
