"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  AlertTriangle,
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  MessageSquare,
  Save,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EvaluateAbstract() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams();

  const [submission, setSubmission] = useState(null); // Renamed for clarity
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Evaluation Form State
  const [scores, setScores] = useState({
    originality: 5,
    methodology: 5,
    relevance: 5,
    clarity: 5,
  });
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "REVIEWER") {
      router.push("/dashboard");
    } else if (status === "authenticated") {
      fetchAbstractDetail();
    }
  }, [status, session]);

  const fetchAbstractDetail = async () => {
    try {
      // FIX: Fetching from the dynamic user abstracts API
      const res = await fetch(`/api/user/abstracts/${id}`);
      const data = await res.json();

      if (res.ok) {
        setSubmission(data);
      } else {
        toast.error("Submission details could not be found.");
      }
    } catch (err) {
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const loadingToast = toast.loading("Finalizing evaluation...");

    try {
      // Logic for submitting the score and moving status to ACCEPTANCE_NOTIFICATION
      const res = await fetch(`/api/reviewer/evaluate/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores, comments }),
      });

      if (res.ok) {
        toast.success("Review Submitted Successfully!", { id: loadingToast });
        router.push("/reviewer/pending"); // Redirect back to desk
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Submission failed.", {
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Server error.", { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-[#003366] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
      </div>
    );
  }

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

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

          <div className="text-right hidden md:block">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
              Submission ID
            </p>
            <p className="text-[11px] font-black text-[#003366] tracking-tighter">
              {id}
            </p>
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* --- LEFT: ABSTRACT VIEW --- */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white custom-scrollbar border-r border-slate-100">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <span className="px-3 py-1 bg-blue-50 text-[#003366] text-[10px] font-black rounded-full border border-blue-100 uppercase tracking-widest">
                  Researcher Submission
                </span>
                <h1 className="text-3xl font-black text-[#003366] mt-4 leading-tight uppercase tracking-tighter">
                  {submission?.title}
                </h1>
                <p className="text-[11px] font-bold text-slate-400 mt-2 italic">
                  Submitted by: {submission?.user?.name}
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                    <FileText size={14} /> Abstract Content
                  </h3>
                  <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 text-slate-600 leading-relaxed text-sm whitespace-pre-wrap italic shadow-inner">
                    {submission?.abstract || "No abstract content provided."}
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.25em] mb-4">
                    Supporting Documents
                  </h3>
                  {/* Note: Adjust 'fileUrl' to your actual schema field name */}
                  <a
                    href={submission?.fileUrl || "#"}
                    target="_blank"
                    className="flex items-center justify-between p-5 bg-[#003366] text-white rounded-2xl hover:bg-[#C5A059] hover:text-[#003366] transition-all group shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Download size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Download Full Manuscript PDF
                      </span>
                    </div>
                    <FileText size={18} className="opacity-50" />
                  </a>
                </section>
              </div>
            </div>
          </div>

          {/* --- RIGHT: EVALUATION FORM --- */}
          <div className="w-full lg:w-[480px] bg-slate-50/50 overflow-y-auto p-6 md:p-10 custom-scrollbar shadow-inner">
            <form onSubmit={handleSubmitReview} className="space-y-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-[#003366] uppercase tracking-tighter">
                  Evaluation
                </h2>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Aggregate Score
                  </p>
                  <p className="text-3xl font-black text-[#C5A059]">
                    {totalScore}
                    <span className="text-xs text-slate-300">/20</span>
                  </p>
                </div>
              </div>

              {/* Rubric Items */}
              <div className="space-y-5">
                {Object.keys(scores).map((key) => (
                  <div
                    key={key}
                    className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest">
                        {key}
                      </label>
                      <span className="text-xs font-black text-[#C5A059] bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                        {scores[key]}/5
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={scores[key]}
                      onChange={(e) =>
                        setScores({
                          ...scores,
                          [key]: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-[#003366] h-1.5 bg-slate-100 rounded-lg cursor-pointer appearance-none"
                    />
                    <div className="flex justify-between text-[8px] text-slate-300 font-black uppercase mt-3 tracking-widest">
                      <span>Below Standard</span>
                      <span>Outstanding</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest mb-4 block flex items-center gap-2">
                  <MessageSquare size={14} className="text-[#C5A059]" />{" "}
                  Critical Feedback
                </label>
                <textarea
                  required
                  placeholder="Provide detailed comments for the researcher..."
                  className="w-full h-32 p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-[#C5A059]/10 outline-none text-xs text-slate-600 resize-none font-bold"
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-2xl flex gap-3">
                <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                <p className="text-[9px] text-amber-700 font-black uppercase leading-relaxed tracking-tight">
                  Submission is final. Accepted papers move to manuscript phase.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-5 bg-[#003366] text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl hover:bg-[#C5A059] hover:text-[#003366] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <Save size={18} /> Finalize Submission
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
