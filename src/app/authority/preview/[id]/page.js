"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  MessageSquare,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AuthorityPreview() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/user/abstracts/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [id]);

  const handleDecision = async (decision) => {
    if (!remarks.trim()) {
      return toast.error("Please enter final decision remarks.");
    }

    setSubmitting(true);
    const loadingToast = toast.loading(`Processing ${decision}...`);

    try {
      const res = await fetch(`/api/authority/decision/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, authorityComments: remarks }),
      });

      if (res.ok) {
        toast.success(`PAPER ${decision}ED`, { id: loadingToast });
        router.push("/authority");
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Failed to transmit decision.", { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#001A41]">
        <Loader2 className="animate-spin text-[#C5A059] mb-4" size={40} />
        <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Accessing Document...
        </p>
      </div>
    );

  const isFinalized = [
    "ACCEPTANCE_NOTIFICATION",
    "CONFIRMED",
    "REJECTED",
  ].includes(data.status);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "---";

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 mb-8 font-black text-[10px] uppercase tracking-widest hover:text-[#003366] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Desk
          </button>

          <div className="max-w-5xl mx-auto space-y-8 pb-32">
            {/* --- SYSTEM TIMELINE TRACKER --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TimelineCard
                label="Submission Date"
                date={formatDate(data.createdAt)}
                icon={Calendar}
                color="text-blue-600"
              />
              <TimelineCard
                label="Review Completed"
                date={
                  data.reviews?.[0]
                    ? formatDate(data.reviews[0].createdAt)
                    : "Pending"
                }
                icon={Clock}
                color="text-amber-600"
              />
              <TimelineCard
                label="Final Confirmation"
                date={
                  data.status === "CONFIRMED"
                    ? formatDate(data.updatedAt)
                    : "Awaiting"
                }
                icon={CheckCircle2}
                color="text-emerald-600"
              />
            </div>

            <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-10 md:p-12 border-b border-slate-50 bg-slate-50/30">
                <h1 className="text-3xl font-black text-[#003366] uppercase tracking-tighter leading-tight mb-6">
                  {data.title}
                </h1>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Lead Researcher
                    </p>
                    <p className="text-xs font-bold text-[#003366]">
                      {data.user?.name}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Submission ID
                    </p>
                    <p className="text-xs font-bold text-[#003366]">
                      {data.id.slice(-12)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-10 md:p-12 space-y-12">
                <section>
                  <h3 className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <FileText size={16} /> Submission Content
                  </h3>
                  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 italic text-slate-600 leading-relaxed shadow-inner">
                    "{data.abstract}"
                  </div>
                </section>

                <section className="mt-10 p-8 bg-[#FDFCF6] border border-[#F0E6CE] rounded-[2.5rem] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A059]" />
                  <div className="flex items-center gap-3 mb-8">
                    <MessageSquare className="text-[#C5A059]" size={20} />
                    <h2 className="text-sm font-black text-[#003366] uppercase tracking-widest">
                      Reviewer Assessment & Detailed Marks
                    </h2>
                  </div>

                  {data.reviews && data.reviews.length > 0 ? (
                    <div className="space-y-8">
                      {data.reviews.map((review, index) => (
                        <div key={index} className="space-y-8">
                          <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-3xl border border-[#F0E6CE] shadow-sm">
                            <div className="flex flex-col items-center justify-center w-24 h-24 bg-[#001A41] rounded-[1.5rem] shadow-xl shrink-0">
                              <span className="text-3xl font-black text-[#C5A059]">
                                {review.totalScore}
                              </span>
                              <span className="text-[9px] font-black text-white/50 uppercase">
                                / 20
                              </span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Recommendation
                              </p>
                              <p className="text-sm font-bold text-[#003366] uppercase">
                                {review.recommendation?.replace(/_/g, " ")}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <ScorePill label="Novelty" score={review.novelty} />
                            <ScorePill
                              label="Methodology"
                              score={review.methodology}
                            />
                            <ScorePill
                              label="Quality"
                              score={review.writingQuality}
                            />
                            <ScorePill
                              label="Relevance"
                              score={review.relevance}
                            />
                          </div>

                          <div className="p-6 bg-white rounded-2xl border border-slate-100 italic text-slate-600 leading-relaxed">
                            "{review.comments}"
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-slate-400 text-xs font-bold uppercase italic">
                      Waiting for Reviewer Grade
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>

        {!isFinalized ? (
          <footer className="bg-white border-t border-slate-200 p-6 px-12 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full relative">
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Type official authority remarks here..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-[#C5A059]/10 h-14 resize-none transition-all shadow-inner"
                />
              </div>
              <div className="flex gap-4 shrink-0">
                <button
                  disabled={submitting}
                  onClick={() => handleDecision("REJECT")}
                  className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                >
                  <XCircle size={16} /> Reject
                </button>
                <button
                  disabled={submitting}
                  onClick={() => handleDecision("ACCEPT")}
                  className="flex items-center gap-2 px-8 py-4 bg-[#003366] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                >
                  <CheckCircle size={16} /> Accept Research
                </button>
              </div>
            </div>
          </footer>
        ) : (
          <footer className="bg-slate-50 border-t border-slate-200 p-6 px-12 z-50">
            <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 text-slate-400">
              <ShieldCheck size={20} />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                Decision Finalized and Recorded in System Logs
              </p>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}

function ScorePill({ label, score }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center shadow-sm">
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">
        {label}
      </p>
      <p className="text-lg font-black text-[#003366]">
        {score || 0}
        <span className="text-[10px] opacity-30">/5</span>
      </p>
    </div>
  );
}

function TimelineCard({ label, date, icon: Icon, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-slate-50 ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-xs font-bold text-[#003366]">{date}</p>
      </div>
    </div>
  );
}
