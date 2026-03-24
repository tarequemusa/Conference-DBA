"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowRight,
  CheckCircle,
  ClipboardCheck,
  Clock,
  FileText,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReviewerDashboard() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/reviewer/tasks");
        const data = await res.json();
        if (res.ok) {
          setTasks(data);
        } else {
          toast.error("Failed to load assignments");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchTasks();
  }, [session]);

  const pendingCount = tasks.filter((t) => !t.isFinal).length;
  const completedCount = tasks.filter((t) => t.isFinal).length;
  const totalCount = tasks.length;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      {/* Main Content: pt-20 removed to start content from the very top */}
      <main className="flex-1 w-full p-4 md:p-12 space-y-8 overflow-x-hidden">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#003366]">
              Reviewer Panel
            </h1>
            <p className="text-slate-500 mt-1 font-medium text-sm">
              Evaluating Conference DBA 2026 Academic Submissions
            </p>
          </div>

          {/* Replaced Navbar Profile with a sleek Session Badge */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]">
              <FileText size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                Reviewer
              </p>
              <p className="text-xs font-bold text-[#003366]">
                {session?.user?.name || "User Session"}
              </p>
            </div>
          </div>
        </header>

        {/* --- Stats Section --- */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <ReviewStatCard
            icon={Clock}
            label="Pending My Review"
            value={loading ? "..." : pendingCount}
            color="text-amber-500"
            bg="bg-amber-50"
          />
          <ReviewStatCard
            icon={CheckCircle}
            label="Completed"
            value={loading ? "..." : completedCount}
            color="text-emerald-500"
            bg="bg-emerald-50"
          />
          <ReviewStatCard
            icon={ClipboardCheck}
            label="Total Assigned"
            value={loading ? "..." : totalCount}
            color="text-blue-500"
            bg="bg-blue-50"
          />
        </section>

        {/* --- Assignments List --- */}
        <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-6 md:p-8 flex justify-between items-center bg-white border-b border-slate-50">
            <h2 className="text-lg font-bold text-[#003366]">
              Recent Assignments
            </h2>
            <Link
              href="/reviewer/pending"
              className="text-xs font-bold text-[#C5A059] flex items-center gap-1 hover:underline transition-all"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="p-6 md:p-8 space-y-4">
            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-300">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-xs font-bold uppercase tracking-widest">
                  Fetching Assignments...
                </p>
              </div>
            ) : tasks.length > 0 ? (
              tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-slate-50 rounded-2xl hover:border-[#C5A059]/30 hover:bg-slate-50/50 transition-all gap-4 group"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#003366] group-hover:text-[#C5A059] transition-colors">
                      {task.abstract?.title || "No Title Provided"}
                    </h3>
                    <div className="flex items-center gap-3">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        Ref: {task.id.slice(-6).toUpperCase()}
                      </p>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                          task.isFinal
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {task.isFinal ? "COMPLETED" : "PENDING"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/reviewer/evaluate/${task.id}`}
                    className="px-6 py-2.5 bg-[#003366] text-white text-xs font-bold rounded-xl hover:bg-[#C5A059] shadow-md transition-all text-center whitespace-nowrap"
                  >
                    {task.isFinal ? "View Feedback" : "Review Paper"}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                  <ClipboardCheck size={32} />
                </div>
                <p className="text-slate-400 font-medium italic">
                  No papers assigned to you yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function ReviewStatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div
      className={`p-6 rounded-3xl border border-slate-100 shadow-sm ${bg} flex flex-col gap-2 transition-transform hover:scale-[1.02] active:scale-95 cursor-default`}
    >
      <Icon className={color} size={24} />
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        {label}
      </p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}
