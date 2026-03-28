"use client";
import ActivityFeed from "@/components/admin/ActivityFeed";
import SubmissionChart from "@/components/admin/SubmissionChart";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  FileText,
  History,
  Lightbulb,
  Loader2,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAbstracts: 0,
    pendingReviews: 0,
    totalRevenue: 0,
    forecastRevenue: 0,
    pipelineValue: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, analyticsRes, recentRes, logsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/analytics"),
          fetch("/api/admin/abstracts?limit=5"),
          fetch("/api/admin/logs"),
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (analyticsRes.ok) setChartData(await analyticsRes.json());
        if (recentRes.ok) setRecentSubmissions(await recentRes.json());
        if (logsRes.ok) setLogs(await logsRes.json());
      } catch (err) {
        toast.error("Failed to sync live dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#001A41]">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
        <p className="mt-4 text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Initializing Command Center...
        </p>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 w-full overflow-x-hidden">
        {/* --- THEMATIC HEADER --- */}
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-12 shadow-2xl relative shrink-0">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059] shadow-inner">
              <BarChart3 size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
                Admin Control Center
              </h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-2 opacity-80">
                Conference Operations & System Health
              </p>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-12 space-y-10">
          {/* --- ENHANCED STATS GRID --- */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdminStatCard
              icon={Users}
              label="Researchers"
              value={stats.totalUsers}
              color="bg-blue-600"
              sub="Registered"
            />
            <AdminStatCard
              icon={CreditCard}
              label="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              color="bg-emerald-600"
              sub="Collected"
            />
            <AdminStatCard
              icon={Lightbulb}
              label="Revenue Forecast"
              value={`$${stats.forecastRevenue.toLocaleString()}`}
              color="bg-[#C5A059]"
              sub="Projected (Unpaid)"
            />
            <AdminStatCard
              icon={BarChart3}
              label="Pipeline Value"
              value={`$${stats.pipelineValue.toLocaleString()}`}
              color="bg-[#001A41]"
              sub="Maximum Potential"
            />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#C5A059]" />
                <h2 className="text-xl font-black text-[#003366] uppercase tracking-tighter flex items-center gap-3 mb-10">
                  <TrendingUp size={22} className="text-[#C5A059]" /> Submission
                  Trends
                </h2>
                <div className="h-[320px]">
                  <SubmissionChart data={chartData} />
                </div>
              </section>

              <section className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <h2 className="text-xl font-black text-[#003366] uppercase tracking-tighter flex items-center gap-3">
                    <FileText size={22} className="text-[#C5A059]" /> Latest
                    Submissions
                  </h2>
                  <Link
                    href="/admin/abstracts"
                    className="p-3 bg-white border border-slate-200 rounded-xl text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                      <tr>
                        <th className="px-10 py-6">Research Title</th>
                        <th className="px-10 py-6">Status</th>
                        <th className="px-10 py-6 text-right">Review</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs font-bold">
                      {recentSubmissions.map((abs) => (
                        <tr
                          key={abs.id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="px-10 py-6 font-black text-[#003366] truncate max-w-[300px] uppercase tracking-tight">
                            {abs.title}
                          </td>
                          <td className="px-10 py-6">
                            <span
                              className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] border ${getStatusStyle(abs.status)}`}
                            >
                              {abs.status.replace(/_/g, " ")}
                            </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <Link
                              href={`/admin/abstracts/${abs.id}`}
                              className="text-[#C5A059] font-black uppercase text-[10px] tracking-widest hover:underline"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#001A41]" />
                <h2 className="text-xl font-black text-[#003366] uppercase tracking-tighter flex items-center gap-3 mb-12">
                  <History size={22} className="text-[#C5A059]" /> System Health
                </h2>
                <div className="custom-scrollbar overflow-y-auto max-h-[850px] pr-2">
                  <ActivityFeed logs={logs} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getStatusStyle(status) {
  const styles = {
    INITIAL_EVALUATION: "bg-amber-50 text-amber-600 border-amber-100",
    PEER_REVIEW: "bg-blue-50 text-blue-600 border-blue-100",
    CONFIRMED: "bg-emerald-50 text-emerald-600 border-emerald-100",
    REJECTED: "bg-red-50 text-red-600 border-red-100",
    ACCEPTANCE_NOTIFICATION: "bg-purple-50 text-purple-600 border-purple-100",
  };
  return styles[status] || "bg-slate-50 text-slate-500 border-slate-200";
}

function AdminStatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden">
      <div className="flex items-center gap-6 relative z-10">
        <div
          className={`p-4 bg-slate-50 rounded-2xl ${color} transition-transform group-hover:scale-110 shadow-lg text-white`}
        >
          <Icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
            {label}
          </p>
          <h3 className="text-2xl font-black text-[#003366] tracking-tighter leading-none">
            {value}
          </h3>
          {sub && (
            <p className="text-[9px] text-slate-400 font-bold uppercase italic opacity-60 mt-2">
              {sub}
            </p>
          )}
        </div>
      </div>
      <Icon
        size={100}
        strokeWidth={4}
        className="absolute -right-4 -bottom-4 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
