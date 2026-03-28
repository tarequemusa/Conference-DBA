"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  Activity,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Search,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReviewerAbstracts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [abstracts, setAbstracts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "REVIEWER") {
      toast.error("Access Restricted to Reviewers");
      router.push("/dashboard");
    } else if (status === "authenticated") {
      fetchAllData();
    }
  }, [status, session, router]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [absRes, statsRes] = await Promise.all([
        fetch("/api/reviewer/abstracts"),
        fetch("/api/reviewer/stats"),
      ]);

      // Check if responses are OK before parsing JSON
      if (!absRes.ok || !statsRes.ok) {
        throw new Error("Server responded with an error");
      }

      const absData = await absRes.json();
      const statsData = await statsRes.json();

      setAbstracts(absData);
      setChartData(statsData);
    } catch (err) {
      console.error(err);
      toast.error("Dashboard Sync Failed. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  const generateSummaryPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const completed = abstracts.filter((a) => a.status !== "PEER_REVIEW");

    if (completed.length === 0) {
      return toast.error("No completed evaluations found to export.");
    }

    doc.setFillColor(0, 26, 65);
    doc.rect(0, 0, 297, 45, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("PEER REVIEWER ACTIVITY REPORT", 15, 22);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(197, 160, 89);
    doc.text(`CONFERENCE DBA INTERNATIONAL 2026`, 15, 30);
    doc.setTextColor(255, 255, 255);
    doc.text(`Reviewer: ${session?.user?.name.toUpperCase()}`, 15, 38);
    doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 245, 38);

    const tableData = completed.map((abs, index) => [
      index + 1,
      abs.id.slice(-8).toUpperCase(),
      abs.title.toUpperCase(),
      abs.user?.name || "ANONYMOUS",
      abs.status.replace(/_/g, " "),
      new Date(abs.updatedAt).toLocaleDateString(),
    ]);

    doc.autoTable({
      startY: 55,
      head: [
        [
          "#",
          "PAPER ID",
          "RESEARCH TITLE",
          "SUBMITTED BY",
          "FINAL STATUS",
          "COMPLETION DATE",
        ],
      ],
      body: tableData,
      headStyles: {
        fillColor: [197, 160, 89],
        textColor: [0, 26, 65],
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 15, right: 15 },
      styles: { fontSize: 8, cellPadding: 5 },
    });

    doc.save(`Review_Summary_${session?.user?.name.replace(/\s+/g, "_")}.pdf`);
  };

  const filtered = abstracts.filter(
    (abs) =>
      abs.title.toLowerCase().includes(search.toLowerCase()) ||
      abs.id.toLowerCase().includes(search.toLowerCase()),
  );

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059] mb-4" size={40} />
        <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Accessing Reviewer Vault...
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
              <ClipboardCheck size={26} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
                Review Desk
              </h1>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1.5 opacity-80">
                Evaluation Management & Reports
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search assignments..."
                className="w-64 pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:ring-2 ring-[#C5A059]/30 transition-all"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={generateSummaryPDF}
              className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-[#001A41] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
            >
              <Download size={14} /> Download Report
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <ReviewStatCard
              label="Total Assigned"
              val={abstracts.length}
              icon={FileText}
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <ReviewStatCard
              label="Pending Review"
              val={abstracts.filter((a) => a.status === "PEER_REVIEW").length}
              icon={Clock}
              color="text-amber-600"
              bg="bg-amber-50"
            />
            <ReviewStatCard
              label="Completed"
              val={abstracts.filter((a) => a.status !== "PEER_REVIEW").length}
              icon={CheckCircle}
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
          </div>

          {/* VELOCITY CHART SECTION */}
          <section className="mb-10 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A059]" />
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-[#003366]">
                  <Activity size={18} />
                </div>
                <h3 className="text-xs font-black text-[#003366] uppercase tracking-widest">
                  Review Velocity Tracking
                </h3>
              </div>
            </div>
            <div className="flex items-end justify-between h-32 gap-2 px-4">
              {chartData.map((data, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#001A41] text-[#C5A059] text-[8px] font-black px-2 py-1 rounded mb-1">
                    {data.count}
                  </div>
                  <div
                    className="w-full bg-slate-50 rounded-t-lg transition-all duration-700 group-hover:bg-[#C5A059]"
                    style={{
                      height: `${(data.count / (Math.max(...chartData.map((d) => d.count)) || 1)) * 100}%`,
                      minHeight: "4px",
                    }}
                  />
                  <span className="text-[8px] font-black text-slate-400 uppercase">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-6 text-[#003366]">
                      Submission Details
                    </th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Action Center</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((abs) => {
                    const isDone = abs.status !== "PEER_REVIEW";
                    return (
                      <tr
                        key={abs.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-8 py-7">
                          <div className="flex items-center gap-5">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner ${isDone ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-[#003366]"}`}
                            >
                              {abs.id.slice(-2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-[#003366] text-sm uppercase tracking-tight">
                                {abs.title}
                              </p>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">
                                Researcher: {abs.user?.name || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-7">
                          <span
                            className={`inline-flex px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg border ${isDone ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}
                          >
                            {isDone ? "Evaluation Complete" : "Pending Grading"}
                          </span>
                        </td>
                        <td className="px-8 py-7 text-right">
                          <button
                            onClick={() =>
                              router.push(`/reviewer/evaluate/${abs.id}`)
                            }
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#001A41] text-white hover:bg-[#C5A059] hover:text-[#001A41] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                          >
                            {isDone ? "View Breakdown" : "Begin Review"}{" "}
                            <ExternalLink size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ReviewStatCard({ label, val, icon: Icon, color, bg }) {
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
