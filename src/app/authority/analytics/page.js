"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowUpRight,
  Calendar,
  DollarSign,
  Download,
  FileText,
  Loader2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AuthorityAnalytics() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "AUTHORITY") {
      router.push("/dashboard");
    } else if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status, session]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/authority/analytics");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="h-screen bg-[#003366] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
      </div>
    );
  }

  // Brand Colors
  const COLORS = ["#003366", "#C5A059", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- HEADER --- */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-xl font-black text-[#003366] uppercase tracking-tighter leading-none">
              Intelligence Dashboard
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              Real-time Conference Metrics
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#003366] hover:text-white transition-all">
            <Download size={14} /> Export Report
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* --- TOP STATS --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Total Revenue"
              val={`$${data?.revenue || 0}`}
              icon={DollarSign}
              trend="+12.5%"
              color="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              label="Submissions"
              val={data?.totalSubmissions || 0}
              icon={FileText}
              trend="+5.2%"
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              label="Registered Users"
              val={data?.totalUsers || 0}
              icon={Users}
              trend="+8.1%"
              color="bg-amber-50 text-amber-600"
            />
            <StatCard
              label="Conv. Rate"
              val="64%"
              icon={TrendingUp}
              trend="+2.4%"
              color="bg-purple-50 text-purple-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* --- REVENUE TREND (AREA CHART) --- */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest">
                    Revenue Growth
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold">
                    Daily registration collections
                  </p>
                </div>
                <Calendar size={18} className="text-slate-300" />
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.revenueHistory}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#C5A059"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#C5A059"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#C5A059"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* --- SUBMISSION STATUS (PIE CHART) --- */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-6">
                Submission Status
              </h3>
              <div className="h-64 w-full flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.statusDistribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data?.statusDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {data?.statusDistribution.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- REVIEWER PERFORMANCE (BAR CHART) --- */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm lg:col-span-2">
              <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-6">
                Reviewer Activity
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.reviewerStats}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: "#64748b" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: "#64748b" }}
                    />
                    <Tooltip cursor={{ fill: "#f8fafc" }} />
                    <Bar
                      dataKey="completed"
                      fill="#003366"
                      radius={[6, 6, 0, 0]}
                      barSize={40}
                    />
                    <Bar
                      dataKey="pending"
                      fill="#C5A059"
                      radius={[6, 6, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, val, icon: Icon, trend, color }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color}`}>
          <Icon size={20} />
        </div>
        <span className="flex items-center text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          <ArrowUpRight size={12} /> {trend}
        </span>
      </div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-black text-[#003366] tracking-tighter">
        {val}
      </p>
    </div>
  );
}
