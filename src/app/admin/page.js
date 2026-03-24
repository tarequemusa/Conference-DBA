"use client";

import SubmissionChart from "@/components/admin/SubmissionChart";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  FileText,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAbstracts: 0,
    pendingReviews: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (res.ok) setStats(data);
    };

    const fetchAnalytics = async () => {
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      if (res.ok) setChartData(data);
    };

    fetchStats();
    fetchAnalytics();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 w-full pt-20 md:pt-0 p-4 md:p-12 space-y-8 md:space-y-10 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#003366]">
              Admin Control Center
            </h1>
            <p className="text-slate-500 mt-1 font-medium text-xs md:text-sm">
              Managing ICEBTM 2026 Operations
            </p>
          </div>
          <div className="px-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-2 w-fit">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-[#003366] uppercase tracking-wider">
              System Live
            </span>
          </div>
        </header>

        {/* --- Stats Grid --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <AdminStatCard
            icon={Users}
            label="Researchers"
            value={stats.totalUsers}
            color="bg-blue-500"
          />
          <AdminStatCard
            icon={FileText}
            label="Submissions"
            value={stats.totalAbstracts}
            color="bg-amber-500"
          />
          <AdminStatCard
            icon={UserCheck}
            label="Pending"
            value={stats.pendingReviews}
            color="bg-emerald-500"
          />
          <AdminStatCard
            icon={CreditCard}
            label="Revenue"
            value={`$${stats.totalRevenue}`}
            color="bg-[#C5A059]"
          />
        </section>

        {/* --- Trends Chart --- */}
        <section className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl">
          <h2 className="text-lg md:text-xl font-bold text-[#003366] flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-[#C5A059]" /> Submission
            Trends
          </h2>
          <SubmissionChart data={chartData} />
        </section>

        {/* --- Recent Table --- */}
        <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold text-[#003366] flex items-center gap-2">
              <BarChart3 size={20} className="text-[#C5A059]" /> Recent Activity
            </h2>
            <Link
              href="/admin/abstracts"
              className="text-xs font-bold text-[#C5A059] flex items-center gap-1"
            >
              All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Title</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-[#003366] text-sm truncate max-w-[200px]">
                    AI in SCM Efficiency
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg uppercase">
                      Evaluation
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <button className="text-[#C5A059] font-bold text-xs">
                      Assign
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function AdminStatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
      <div
        className={`p-3 rounded-2xl text-white ${color} shadow-lg shadow-black/5`}
      >
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-xl font-black text-[#003366]">{value}</p>
      </div>
    </div>
  );
}
