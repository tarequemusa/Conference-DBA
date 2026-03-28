"use client";
import FeedbackModal from "@/components/dashboard/FeedbackModal";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  ExternalLink,
  FileText,
  Loader2,
  MessageSquare,
  Search,
  UploadCloud,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyAbstracts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchUserAbstracts();
    }
  }, [status, router]);

  const fetchUserAbstracts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/abstracts");
      const data = await res.json();
      if (res.ok) setAbstracts(data);
      else toast.error("Failed to load your submissions.");
    } catch (err) {
      toast.error("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewFeedback = async (id) => {
    const loadingToast = toast.loading("Fetching reviewer feedback...");
    try {
      const res = await fetch(`/api/user/abstracts/feedback/${id}`);
      const data = await res.json();

      if (res.ok) {
        setSelectedFeedback(data);
        setIsModalOpen(true);
        toast.dismiss(loadingToast);
      } else {
        toast.error(data.error || "Feedback not available yet.", {
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Network error. Please try again.", { id: loadingToast });
    }
  };

  // Fixed filtering logic with safety checks for undefined values
  const filtered = abstracts.filter((abs) => {
    const title = abs.title || "";
    const id = abs.id || "";
    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      id.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
        <p className="mt-4 text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Retrieving Submission History...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-900">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- DARK COMMAND HEADER --- */}
        <header className="h-32 bg-[#001A41] flex flex-col justify-center px-10 shadow-2xl shrink-0 z-20">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
                <FileText size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
                  My Submissions
                </h1>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1.5 opacity-80">
                  Abstract History & Peer Review Status
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="relative group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#C5A059]"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Find by Title or ID..."
                  className="w-64 pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white placeholder:text-slate-500 outline-none focus:ring-2 ring-[#C5A059]/30 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </header>

        {/* --- CONTENT --- */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-slate-50/30">
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <SummaryCard
              label="Total Uploads"
              val={abstracts.length}
              icon={FileText}
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <SummaryCard
              label="Accepted Papers"
              val={
                abstracts.filter((a) =>
                  [
                    "ACCEPTANCE_NOTIFICATION",
                    "CONFIRMED",
                    "FULL_PAPER_SUBMISSION",
                  ].includes(a.status),
                ).length
              }
              icon={CheckCircle2}
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
            <SummaryCard
              label="Review Phase"
              val={
                abstracts.filter((a) =>
                  ["PEER_REVIEW", "INITIAL_EVALUATION"].includes(a.status),
                ).length
              }
              icon={Clock}
              color="text-amber-600"
              bg="bg-amber-50"
            />
          </div>

          {/* Table Container */}
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

            {filtered.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-6 text-[#003366]">
                        Submission Details
                      </th>
                      <th className="px-8 py-6">Timeline</th>
                      <th className="px-8 py-6 text-center">Status</th>
                      <th className="px-8 py-6 text-right">Action Desk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filtered.map((abs) => (
                      <tr
                        key={abs.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-8 py-7">
                          <div className="max-w-md">
                            <p className="font-bold text-[#003366] text-sm uppercase tracking-tight mb-1 group-hover:text-[#C5A059] transition-colors">
                              {abs.title}
                            </p>
                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">
                              UID: {abs.id.slice(-12).toUpperCase()}
                            </p>
                          </div>
                        </td>
                        <td className="px-8 py-7">
                          <p className="text-xs font-black text-slate-600 uppercase">
                            {new Date(abs.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium italic">
                            Submission Recorded
                          </p>
                        </td>
                        <td className="px-8 py-7 text-center">
                          <StatusBadge status={abs.status} />
                        </td>
                        <td className="px-8 py-7 text-right">
                          <div className="flex justify-end items-center gap-3">
                            {/* 1. Payment Action: Appears only if Accepted but not Paid */}
                            {abs.status === "ACCEPTANCE_NOTIFICATION" && (
                              <button
                                onClick={() =>
                                  router.push(`/dashboard/payment/${abs.id}`)
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5A059] text-[#001A41] hover:bg-[#001A41] hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md animate-pulse"
                              >
                                Pay Fee <CreditCard size={14} />
                              </button>
                            )}

                            {/* 2. Full Paper Action: Appears only after Confirmed Payment */}
                            {abs.status === "CONFIRMED" && (
                              <button
                                onClick={() =>
                                  router.push(
                                    `/dashboard/submit-full-paper/${abs.id}`,
                                  )
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white hover:bg-[#003366] rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md"
                              >
                                Upload Full Paper <UploadCloud size={14} />
                              </button>
                            )}

                            {/* 3. Feedback Action: Hidden during initial review phases */}
                            {![
                              "ABSTRACT_SUBMISSION",
                              "PEER_REVIEW",
                              "INITIAL_EVALUATION",
                            ].includes(abs.status) && (
                              <button
                                onClick={() => handleViewFeedback(abs.id)}
                                className="p-2.5 bg-amber-50 text-[#C5A059] border border-amber-100 hover:bg-[#C5A059] hover:text-white rounded-xl transition-all shadow-sm group/btn"
                                title="View Feedback"
                              >
                                <MessageSquare size={14} />
                              </button>
                            )}

                            {/* 4. Track Link */}
                            <button
                              onClick={() =>
                                router.push(`/dashboard?id=${abs.id}`)
                              }
                              className="p-2.5 bg-slate-100 text-[#003366] hover:bg-[#003366] hover:text-white rounded-xl transition-all shadow-sm"
                              title="Track Live Progress"
                            >
                              <ExternalLink size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-32 text-center">
                <AlertCircle
                  className="mx-auto text-slate-200 mb-4"
                  size={48}
                />
                <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">
                  No matching records found
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feedback={selectedFeedback}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    ABSTRACT_SUBMISSION: "bg-blue-50 text-blue-600 border-blue-100",
    INITIAL_EVALUATION: "bg-amber-50 text-amber-600 border-amber-100",
    ACCEPTANCE_NOTIFICATION:
      "bg-emerald-50 text-emerald-600 border-emerald-100",
    CONFIRMED: "bg-[#003366] text-white border-[#003366]",
    FULL_PAPER_SUBMISSION: "bg-purple-600 text-white border-purple-700",
    PEER_REVIEW: "bg-amber-50 text-amber-600 border-amber-100",
    REVISION_REQUIRED: "bg-red-50 text-red-600 border-red-100",
    PUBLISHED: "bg-emerald-600 text-white border-emerald-700",
  };

  return (
    <span
      className={`inline-flex px-3 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-lg border shadow-sm ${styles[status] || "bg-slate-50 text-slate-400 border-slate-100"}`}
    >
      {status ? status.replace(/_/g, " ") : "PENDING"}
    </span>
  );
}

function SummaryCard({ label, val, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6 transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className={`p-4 rounded-2xl ${bg} ${color} shadow-inner`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <p className="text-3xl font-black text-[#003366] tracking-tighter">
          {val}
        </p>
      </div>
    </div>
  );
}
