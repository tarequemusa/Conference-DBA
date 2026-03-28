"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  BarChart3,
  CheckCircle,
  Eye,
  Filter,
  Landmark,
  Loader2,
  Search,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AuthorityDesk() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // NEW FILTER STATE

  const [decisionComments, setDecisionComments] = useState({});

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "AUTHORITY") {
      toast.error("Access Restricted");
      router.push("/dashboard");
    } else if (status === "authenticated") {
      fetchFinalDecisions();
    }
  }, [status, session]);

  const fetchFinalDecisions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/authority/abstracts");
      const data = await res.json();
      if (res.ok) setAbstracts(data);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalDecision = async (id, decision) => {
    const comments = decisionComments[id];
    if (!comments || comments.trim() === "") {
      return toast.error("PLEASE PROVIDE FINAL REMARKS");
    }

    if (!confirm(`Are you sure you want to ${decision} this paper?`)) return;
    const loadingToast = toast.loading(`RECORDING ${decision}...`);

    try {
      const res = await fetch(`/api/authority/decision/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, authorityComments: comments }),
      });

      if (res.ok) {
        toast.success(`DECISION FINALIZED`, { id: loadingToast });
        setDecisionComments((prev) => {
          const n = { ...prev };
          delete n[id];
          return n;
        });
        fetchFinalDecisions();
      }
    } catch (err) {
      toast.error("TRANSIT ERROR", { id: loadingToast });
    }
  };

  // --- FILTERING LOGIC ---
  const filtered = abstracts.filter((abs) => {
    const matchesSearch =
      abs.title.toLowerCase().includes(search.toLowerCase()) ||
      abs.user?.name?.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === "PENDING")
      return matchesSearch && abs.status === "FINAL_DECISION";
    if (statusFilter === "ACCEPTED")
      return (
        matchesSearch &&
        (abs.status === "ACCEPTANCE_NOTIFICATION" || abs.status === "CONFIRMED")
      );
    if (statusFilter === "REJECTED")
      return matchesSearch && abs.status === "REJECTED";
    return matchesSearch;
  });

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
        <p className="mt-4 text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Accessing Authority Records...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-10 shadow-2xl shrink-0 z-20">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
              <Landmark size={26} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">
                Authority Desk
              </h1>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1 opacity-80">
                Archive & Decision Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* STATUS FILTER DROPDOWN */}
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl px-3 group">
              <Filter size={14} className="text-[#C5A059]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-white text-[10px] font-black uppercase tracking-widest py-2.5 pl-2 outline-none cursor-pointer"
              >
                <option value="PENDING" className="text-black">
                  Queue: Pending
                </option>
                <option value="ACCEPTED" className="text-black">
                  Queue: Accepted
                </option>
                <option value="REJECTED" className="text-black">
                  Queue: Rejected
                </option>
                <option value="ALL" className="text-black">
                  View All Records
                </option>
              </select>
            </div>

            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search database..."
                className="w-64 pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:ring-2 ring-[#C5A059]/30"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-slate-50/30">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <MetricCard
              label="Awaiting Action"
              val={
                abstracts.filter((a) => a.status === "FINAL_DECISION").length
              }
              icon={TrendingUp}
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <MetricCard
              label="Total Accepted"
              val={
                abstracts.filter((a) =>
                  ["ACCEPTANCE_NOTIFICATION", "CONFIRMED"].includes(a.status),
                ).length
              }
              icon={CheckCircle}
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
            <MetricCard
              label="Total Rejected"
              val={abstracts.filter((a) => a.status === "REJECTED").length}
              icon={XCircle}
              color="text-red-600"
              bg="bg-red-50"
            />
            <MetricCard
              label="Database Total"
              val={abstracts.length}
              icon={BarChart3}
              color="text-[#C5A059]"
              bg="bg-[#FDFCF6]"
            />
          </div>

          {/* Table */}
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-6 text-[#003366]">
                      Research Item & Remarks
                    </th>
                    <th className="px-8 py-6">Researcher</th>
                    <th className="px-8 py-6 text-center">Score</th>
                    <th className="px-8 py-6 text-right">Action/Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.length > 0 ? (
                    filtered.map((abs) => {
                      const isFinalized = abs.status !== "FINAL_DECISION";
                      return (
                        <tr
                          key={abs.id}
                          className="hover:bg-slate-50/50 transition-colors group"
                        >
                          <td className="px-8 py-7 align-top">
                            <div className="max-w-xl">
                              <p className="font-bold text-[#003366] text-sm uppercase tracking-tight mb-1">
                                {abs.title}
                              </p>
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-[9px] text-slate-400 font-black uppercase">
                                  UID: {abs.id.slice(-8)}
                                </span>
                                <button
                                  onClick={() =>
                                    router.push(`/authority/preview/${abs.id}`)
                                  }
                                  className="text-[#C5A059] hover:text-[#003366] text-[9px] font-black flex items-center gap-1 uppercase tracking-widest border-b border-[#C5A059]/20 hover:border-[#003366] transition-all"
                                >
                                  <Eye size={12} /> Inspect Full Record
                                </button>
                              </div>
                              {!isFinalized ? (
                                <textarea
                                  value={decisionComments[abs.id] || ""}
                                  onChange={(e) =>
                                    setDecisionComments({
                                      ...decisionComments,
                                      [abs.id]: e.target.value,
                                    })
                                  }
                                  placeholder="Enter final remarks..."
                                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] h-20 resize-none outline-none focus:ring-2 ring-[#C5A059]/10"
                                />
                              ) : (
                                <div className="p-4 bg-slate-50/50 rounded-2xl border border-dashed text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                  Decision archived in system logs
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-7 align-top">
                            <p className="text-xs font-black text-slate-700 uppercase">
                              {abs.user?.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium italic">
                              {abs.user?.email}
                            </p>
                          </td>
                          <td className="px-8 py-7 text-center align-top">
                            <div className="inline-flex flex-col items-center justify-center w-14 h-14 rounded-2xl border-2 font-black bg-white shadow-sm">
                              <span className="text-xl text-[#003366]">
                                {abs.reviews[0]?.totalScore || 0}
                              </span>
                              <span className="text-[8px] opacity-40 uppercase">
                                pts
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-7 text-right align-top">
                            {!isFinalized ? (
                              <div className="flex justify-end gap-3">
                                <button
                                  onClick={() =>
                                    handleFinalDecision(abs.id, "ACCEPT")
                                  }
                                  className="p-4 bg-[#003366] text-white hover:bg-emerald-600 rounded-2xl transition-all shadow-lg active:scale-95"
                                >
                                  <CheckCircle size={22} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleFinalDecision(abs.id, "REJECT")
                                  }
                                  className="p-4 bg-white border border-slate-200 text-slate-400 hover:bg-red-600 hover:text-white rounded-2xl transition-all shadow-sm active:scale-95"
                                >
                                  <XCircle size={22} />
                                </button>
                              </div>
                            ) : (
                              <div
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest border ${abs.status === "REJECTED" ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}
                              >
                                {abs.status === "REJECTED" ? (
                                  <XCircle size={14} />
                                ) : (
                                  <CheckCircle size={14} />
                                )}
                                {abs.status.replace(/_/g, " ")}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-32 text-center text-slate-400 font-black uppercase text-xs tracking-widest"
                      >
                        No matching results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ label, val, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col justify-between h-40 transition-all hover:shadow-2xl hover:-translate-y-1">
      <div
        className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center shadow-inner`}
      >
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
