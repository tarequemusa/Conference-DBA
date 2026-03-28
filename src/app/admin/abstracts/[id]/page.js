"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  History,
  Loader2,
  ShieldAlert,
  User,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AbstractDetail({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/abstracts/${id}`);
        const result = await res.json();

        if (res.ok) {
          setData(result);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id]);

  const handleDecision = async (decision) => {
    setProcessing(true);
    const loadingToast = toast.loading(
      `Recording ${decision.toLowerCase()}...`,
    );
    try {
      const res = await fetch(`/api/admin/abstracts/${id}/decision`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(`DECISION RECORDED: ${decision.replace(/_/g, " ")}`, {
          id: loadingToast,
        });

        const updatedRes = await fetch(`/api/admin/abstracts/${id}`);
        const updatedData = await updatedRes.json();
        setData(updatedData);
      } else {
        toast.error(result.error || "Failed to record decision.", {
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Network error occurred.", { id: loadingToast });
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059] mb-4" size={40} />
        <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Decoding Intelligence...
        </p>
      </div>
    );

  if (error || !data)
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center text-center p-10">
        <ShieldAlert className="text-red-500 mb-6" size={60} />
        <h1 className="text-xl font-black text-white uppercase tracking-widest mb-2">
          Submission Not Found
        </h1>
        <button
          onClick={() => router.push("/admin/abstracts")}
          className="px-8 py-3 bg-[#C5A059] text-[#001A41] rounded-xl text-[10px] font-black uppercase transition-all"
        >
          Return to Central
        </button>
      </div>
    );

  // Status Check Helpers
  const isAccepted = data.status === "ACCEPTANCE_NOTIFICATION";
  const isRejected = data.status === "REJECTED";
  const hasDecision = isAccepted || isRejected;

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- HEADER --- */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-[#003366] transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Desk
          </button>

          <div className="flex items-center gap-3">
            {/* REJECT BUTTON LOGIC */}
            <button
              disabled={processing || hasDecision}
              onClick={() => handleDecision("REJECTED")}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 
                ${isRejected ? "bg-red-600 text-white cursor-not-allowed" : "bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white disabled:opacity-50"}`}
            >
              {isRejected && <XCircle size={14} />}
              {isRejected ? "Rejected" : "Reject"}
            </button>

            {/* ACCEPT BUTTON LOGIC */}
            <button
              disabled={processing || hasDecision}
              onClick={() => handleDecision("ACCEPTANCE_NOTIFICATION")}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2
                ${isAccepted ? "bg-[#C5A059] text-[#001A41] cursor-not-allowed shadow-none" : "bg-[#003366] text-white hover:bg-[#C5A059] hover:text-[#001A41] disabled:opacity-50"}`}
            >
              {isAccepted && <CheckCircle2 size={14} />}
              {isAccepted ? "Accepted" : "Accept & Notify"}
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* --- LEFT: CONTENT VIEW --- */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white custom-scrollbar border-r border-slate-100">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <span className="px-3 py-1 bg-blue-50 text-[#003366] text-[10px] font-black rounded-full border border-blue-100 uppercase tracking-widest">
                  Administrative Review
                </span>
                <h1 className="text-3xl font-black text-[#003366] mt-4 leading-tight uppercase tracking-tighter">
                  {data.title}
                </h1>
                <p className="text-[11px] font-bold text-slate-400 mt-2 italic">
                  Submitted by: {data.user?.name} (UID:{" "}
                  {id.slice(-10).toUpperCase()})
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                    <FileText size={14} /> Abstract Content
                  </h3>
                  <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 text-slate-600 leading-relaxed text-sm whitespace-pre-wrap italic shadow-inner">
                    {data.abstract || "No abstract content provided."}
                  </div>
                </section>

                {/* --- SMART DOCUMENT VISIBILITY --- */}
                {data.fileUrl && (
                  <section>
                    <h3 className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.25em] mb-4">
                      Document Access
                    </h3>
                    <a
                      href={data.fileUrl}
                      target="_blank"
                      className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-[2rem] hover:bg-[#C5A059] hover:text-[#003366] transition-all group shadow-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#003366]/10">
                          <Download size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Download Manuscript PDF
                        </span>
                      </div>
                      <FileText size={18} className="opacity-30" />
                    </a>
                  </section>
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT: SIDEBAR INFO --- */}
          <div className="w-full lg:w-[400px] bg-slate-50/50 overflow-y-auto p-6 md:p-10 custom-scrollbar shadow-inner space-y-8">
            <div className="bg-[#001A41] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
              <User
                className="absolute -right-4 -bottom-4 text-white/5"
                size={120}
              />
              <h3 className="text-[9px] font-black text-[#C5A059] uppercase tracking-widest mb-6">
                User Context
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-black text-[#C5A059] border border-white/5">
                  {data.user?.name?.charAt(0) || "?"}
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-tight">
                    {data.user?.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium truncate w-40">
                    {data.user?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6">
                Lifecycle Status
              </h3>
              <div className="px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-black text-[#C5A059] uppercase">
                  Current
                </span>
                <span className="text-[10px] font-black text-[#003366] uppercase">
                  {data.status?.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <History size={14} className="text-[#003366]" />
                <h3 className="text-[9px] font-black text-[#003366] uppercase tracking-widest">
                  Assignment Trail
                </h3>
              </div>
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
                {data?.reviews?.length > 0 ? (
                  data.reviews.map((rev, idx) => (
                    <div key={rev.id} className="relative pl-8">
                      <div
                        className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm ${idx === 0 ? "bg-[#C5A059]" : "bg-slate-200"}`}
                      />
                      <p className="text-[9px] font-black text-[#003366] uppercase">
                        {idx === 0 ? "Active Reviewer" : "Previous"}
                      </p>
                      <p className="text-xs font-bold text-slate-600">
                        {rev.reviewer?.name}
                      </p>
                      {rev.totalScore && (
                        <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                          Score: {rev.totalScore}/20
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 border border-dashed border-slate-100 rounded-2xl">
                    <p className="text-[9px] text-slate-300 font-bold uppercase">
                      No assignments yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
