"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Download,
  Loader2,
  PieChart,
  Star,
  Timer,
  TrendingUp,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function EventStats() {
  const [stats, setStats] = useState(null);
  const [reviewerPerformance, setReviewerPerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllStats() {
      try {
        const [statsRes, perfRes] = await Promise.all([
          fetch("/api/authority/stats"),
          fetch("/api/authority/reviewer-stats"),
        ]);

        const statsData = await statsRes.json();
        const perfData = await perfRes.json();

        setStats(statsData);
        setReviewerPerformance(perfData);
      } catch (error) {
        console.error("Analytics Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllStats();
  }, []);

  if (loading)
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
        <p className="mt-4 text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Synthesizing Intelligence...
        </p>
      </div>
    );

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- DARK COMMAND HEADER --- */}
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-12 shadow-2xl shrink-0 z-20">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
              <BarChart3 size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
                Event Intelligence
              </h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-2 opacity-80">
                Real-time Conference Metrics & Audit
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#001A41] transition-all shadow-xl">
            <Download size={14} /> Export Report
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30">
          {/* TOP METRICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              label="Total Submissions"
              val={stats?.metrics?.totalPapers || 0}
              icon={TrendingUp}
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <StatCard
              label="Decision Pending"
              val={stats?.metrics?.pending || 0}
              icon={Activity}
              color="text-amber-600"
              bg="bg-amber-50"
            />
            <StatCard
              label="Final Accepted"
              val={stats?.metrics?.accepted || 0}
              icon={CheckCircle2}
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
            <StatCard
              label="Final Rejected"
              val={stats?.metrics?.rejected || 0}
              icon={XCircle}
              color="text-red-600"
              bg="bg-red-50"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Acceptance Ratio Visual */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A059]" />
              <h3 className="text-xs font-black text-[#003366] uppercase tracking-widest mb-10 flex items-center gap-2">
                <PieChart size={18} className="text-[#C5A059]" /> Acceptance
                Breakdown
              </h3>

              <div className="space-y-8">
                <ProgressRow
                  label="Accepted"
                  count={stats?.metrics?.accepted || 0}
                  total={stats?.metrics?.totalPapers || 0}
                  color="bg-emerald-500"
                />
                <ProgressRow
                  label="Rejected"
                  count={stats?.metrics?.rejected || 0}
                  total={stats?.metrics?.totalPapers || 0}
                  color="bg-red-500"
                />
                <ProgressRow
                  label="Awaiting Authority"
                  count={stats?.metrics?.pending || 0}
                  total={stats?.metrics?.totalPapers || 0}
                  color="bg-amber-500"
                />
              </div>
            </div>

            {/* Participation Insights */}
            <div className="bg-[#001A41] p-10 rounded-[3rem] shadow-2xl border border-white/5 text-white flex flex-col justify-center">
              <h3 className="text-xs font-black text-[#C5A059] uppercase tracking-widest mb-8 flex items-center gap-2">
                <Users size={18} /> Global Participation
              </h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-6xl font-black text-white leading-none">
                  {stats?.metrics?.totalPapers || 0}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase pb-2 tracking-widest">
                  Active Researchers
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-medium max-w-sm">
                Current submission volume is tracking at{" "}
                <span className="text-emerald-400 font-black">12.4% above</span>{" "}
                seasonal projections. Operational capacity remains within
                nominal limits.
              </p>
            </div>
          </div>

          {/* --- REVIEWER PERFORMANCE SECTION --- */}
          <section className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#001A41] via-[#C5A059] to-[#001A41]" />
            <div className="p-8 md:p-10 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest">
                    Reviewer Velocity Desk
                  </h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    Operational Speed & Quality Audit
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Ranked by Velocity
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th className="px-10 py-6">Reviewer Profile</th>
                    <th className="px-10 py-6 text-center">Completed</th>
                    <th className="px-10 py-6 text-center">Avg Score Given</th>
                    <th className="px-10 py-6 text-right">Avg Turnaround</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {reviewerPerformance.map((rev) => (
                    <tr
                      key={rev.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-10 py-7">
                        <p className="text-xs font-black text-[#003366] uppercase tracking-tight group-hover:text-[#C5A059] transition-colors">
                          {rev.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium lowercase">
                          {rev.email}
                        </p>
                      </td>
                      <td className="px-10 py-7 text-center">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-tighter">
                          {rev.completed} Files
                        </span>
                      </td>
                      <td className="px-10 py-7 text-center">
                        <div className="flex items-center justify-center gap-1 text-[#C5A059]">
                          <Star size={12} fill="currentColor" />
                          <span className="text-xs font-black text-[#003366]">
                            {rev.avgScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-7 text-right">
                        <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50/50 px-4 py-1.5 rounded-xl">
                          <Timer size={14} />
                          <span className="text-xs font-black uppercase tracking-tighter">
                            {rev.avgDays} Days
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, val, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col justify-between h-44 hover:shadow-2xl hover:-translate-y-1 transition-all">
      <div
        className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center shadow-inner`}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-3xl font-black text-[#003366] tracking-tighter">
          {val}
        </p>
      </div>
    </div>
  );
}

function ProgressRow({ label, count, total, color }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-xs font-black text-[#003366]">
          {count}{" "}
          <span className="text-[9px] text-slate-400 font-bold">
            ({percentage.toFixed(1)}%)
          </span>
        </p>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000 shadow-sm`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
