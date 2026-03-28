"use client";
import AssignReviewerModal from "@/components/admin/AssignReviewerModal";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Loader2,
  Printer,
  RefreshCcw,
  Search,
  ShieldCheck,
  UserCog,
  UserPlus,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminAbstracts() {
  const router = useRouter();
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [reviewerFilter, setReviewerFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedAbstract, setSelectedAbstract] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAbstracts();
  }, []);

  const fetchAbstracts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/abstracts");
      const data = await res.json();
      if (res.ok) {
        setAbstracts(data);
      } else {
        toast.error("Failed to load abstracts.");
      }
    } catch (err) {
      toast.error("Submissions sync failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const headers = "ID,Title,Researcher,Reviewer,Status\n";
    const rows = filtered.map(
      (abs) =>
        `"${abs.id.slice(-8)}","${abs.title.replace(/"/g, '""')}","${abs.user?.name}","${abs.reviewer?.name || "Unassigned"}","${abs.status}"`,
    );
    const blob = new Blob([headers + rows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Conference_Abstracts_${new Date().toLocaleDateString()}.csv`;
    a.click();
    toast.success("DATABASE EXPORTED");
  };

  const filtered = abstracts.filter((abs) => {
    const title = abs.title || "";
    const userName = abs.user?.name || "";
    const uid = abs.id || "";

    const matchesKeyword =
      title.toLowerCase().includes(search.toLowerCase()) ||
      userName.toLowerCase().includes(search.toLowerCase()) ||
      uid.toLowerCase().includes(search.toLowerCase());

    const matchesReviewer =
      reviewerFilter === "ALL" || abs.reviewer?.name === reviewerFilter;
    const matchesStatus = statusFilter === "ALL" || abs.status === statusFilter;

    return matchesKeyword && matchesReviewer && matchesStatus;
  });

  const uniqueReviewers = [
    ...new Set(abstracts.map((a) => a.reviewer?.name).filter(Boolean)),
  ];

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
                  Abstract Central
                </h1>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1.5 opacity-80">
                  System Triage & Reviewer Logistics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#001A41] transition-all shadow-xl"
              >
                <Download size={14} /> Export CSV
              </button>
              <button
                onClick={() => window.print()}
                className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
              >
                <Printer size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* --- MULTI-FILTER BAR --- */}
        <div className="bg-white border-b border-slate-100 p-4 px-10 flex flex-wrap items-center gap-4 shadow-sm z-10">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={16}
            />
            <input
              type="text"
              placeholder="Filter by Title, Researcher, or UID..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-[#C5A059]/10 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              onChange={(e) => setReviewerFilter(e.target.value)}
              className="pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider outline-none cursor-pointer"
            >
              <option value="ALL">All Reviewers</option>
              {uniqueReviewers.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ABSTRACT_SUBMISSION">Pending Triage</option>
              <option value="PEER_REVIEW">Under Review</option>
              <option value="ACCEPTANCE_NOTIFICATION">Accepted</option>
              <option value="CONFIRMED">Confirmed/Paid</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-slate-50/20">
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

            {loading ? (
              <div className="py-32 flex justify-center items-center flex-col gap-4">
                <Loader2 className="animate-spin text-[#003366]" size={40} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Loading Logistics...
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-6 text-[#003366]">Submission</th>
                      <th className="px-8 py-6">Researcher</th>
                      <th className="px-8 py-6 text-center">Personnel</th>
                      <th className="px-8 py-6 text-center">Status</th>
                      <th className="px-8 py-6 text-right">Logistics</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                    {filtered.map((abs) => (
                      <tr
                        key={abs.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-8 py-7">
                          <div className="max-w-xs">
                            <p className="font-bold text-[#003366] text-sm uppercase tracking-tight truncate group-hover:text-[#C5A059] transition-colors cursor-default">
                              {abs.title}
                            </p>
                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">
                              UID: {abs.id.slice(-10).toUpperCase()}
                            </p>
                          </div>
                        </td>
                        <td className="px-8 py-7">
                          <p className="text-xs font-black text-slate-600 uppercase tracking-tighter">
                            {abs.user?.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium italic lowercase">
                            {abs.user?.email}
                          </p>
                        </td>
                        <td className="px-8 py-7">
                          <div className="flex flex-col items-center gap-1.5 mx-auto">
                            <div
                              className={`flex items-center gap-2 w-full max-w-[160px] px-3 py-1.5 rounded-xl border transition-all ${abs.reviewerId ? "bg-blue-50/50 border-blue-100" : "bg-slate-50 border-dashed border-slate-200"}`}
                            >
                              <UserCog
                                size={12}
                                className={
                                  abs.reviewerId
                                    ? "text-blue-600"
                                    : "text-slate-300"
                                }
                              />
                              <span
                                className={`text-[9px] font-black uppercase truncate ${abs.reviewerId ? "text-[#003366]" : "text-slate-300"}`}
                              >
                                {abs.reviewer?.name || "Needs Reviewer"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-7 text-center">
                          <StatusBadge status={abs.status} />
                        </td>
                        <td className="px-8 py-7 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <button
                              onClick={() =>
                                router.push(`/admin/abstracts/${abs.id}`)
                              }
                              className="p-2.5 bg-slate-100 text-[#003366] hover:bg-[#003366] hover:text-white rounded-xl transition-all shadow-sm"
                              title="Full Detail View"
                            >
                              <Eye size={16} />
                            </button>

                            {/* --- UPDATED DYNAMIC LOGISTICS --- */}
                            {abs.status === "ACCEPTANCE_NOTIFICATION" ||
                            abs.status === "CONFIRMED" ? (
                              /* Locked State: Accepted */
                              <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-100/50">
                                <CheckCircle2 size={14} /> Accepted
                              </div>
                            ) : abs.status === "REJECTED" ? (
                              /* Locked State: Rejected */
                              <div className="px-4 py-2 bg-red-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                <XCircle size={14} /> Rejected
                              </div>
                            ) : abs.reviewerId ? (
                              /* Active Review State */
                              <div className="flex items-center gap-2">
                                <button
                                  disabled
                                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-90 cursor-not-allowed"
                                >
                                  <ShieldCheck size={14} /> Assigned
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedAbstract(abs);
                                    setIsModalOpen(true);
                                  }}
                                  className="p-2.5 bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-500 hover:text-white rounded-xl transition-all shadow-sm"
                                  title="Change Reviewer"
                                >
                                  <RefreshCcw size={14} />
                                </button>
                              </div>
                            ) : (
                              /* Action Required State */
                              <button
                                onClick={() => {
                                  setSelectedAbstract(abs);
                                  setIsModalOpen(true);
                                }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#001A41] text-white hover:bg-[#C5A059] hover:text-[#001A41] rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 border border-white/5"
                              >
                                <UserPlus size={14} /> Assign Peer
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="py-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest">
                    No matching abstracts found
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        <AssignReviewerModal
          abstract={selectedAbstract}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRefresh={fetchAbstracts}
        />
      </main>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    ABSTRACT_SUBMISSION: "bg-blue-50 text-blue-600 border-blue-100",
    INITIAL_EVALUATION: "bg-amber-50 text-amber-600 border-amber-100",
    PEER_REVIEW: "bg-purple-50 text-purple-600 border-purple-100",
    ACCEPTANCE_NOTIFICATION:
      "bg-emerald-50 text-emerald-600 border-emerald-100",
    CONFIRMED: "bg-[#001A41] text-white border-[#001A41] shadow-md",
    REJECTED: "bg-red-50 text-red-600 border-red-100",
    REVISION_REQUIRED: "bg-orange-50 text-orange-600 border-orange-100",
  };

  return (
    <span
      className={`inline-block px-3 py-1.5 text-[8px] font-black uppercase tracking-tighter rounded-lg border shadow-sm ${styles[status] || "bg-slate-50 text-slate-500 border-slate-100"}`}
    >
      {status ? status.replace(/_/g, " ") : "NO STATUS"}
    </span>
  );
}
