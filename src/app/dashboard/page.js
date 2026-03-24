"use client";

import ReviewProcessTracker from "@/components/dashboard/ReviewProcessTracker";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  CalendarClock,
  FileText,
  Loader2,
  PlusCircle,
  RefreshCw,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [abstracts, setAbstracts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Role check logic
  const isResearcher = session?.user?.role === "RESEARCHER";

  const loadData = useCallback(async (silent = false) => {
    if (!silent) setLoadingData(true);
    else setIsRefreshing(true);

    try {
      const res = await fetch("/api/user/abstracts");
      const data = await res.json();
      if (res.ok) setAbstracts(data);
    } catch (err) {
      if (!silent) toast.error("Failed to load research data.");
    } finally {
      setLoadingData(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      loadData();
      const interval = setInterval(() => loadData(true), 30000);
      return () => clearInterval(interval);
    }
  }, [status, router, loadData]);

  if (status === "loading" || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="animate-spin text-[#003366]" size={40} />
      </div>
    );
  }

  const latestAbstract = abstracts[0];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 space-y-10">
        <div className="flex justify-end -mb-8">
          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
            <RefreshCw
              size={12}
              className={`${isRefreshing ? "animate-spin text-[#C5A059]" : "text-slate-400"}`}
            />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
              {isRefreshing ? "Syncing Live..." : "Live Tracker Active"}
            </span>
          </div>
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-[#003366]">
              Welcome back, {session?.user?.name?.split(" ")[0]}!
            </h1>
            <p className="mt-1.5 text-slate-500">
              {session?.user?.role === "ADMIN"
                ? "Admin Control Center"
                : session?.user?.role === "REVIEWER"
                  ? "Reviewer Panel"
                  : "Conference DBA 2026 Researcher Portal"}
            </p>
          </div>

          {/* Action Button: Only visible to Researchers */}
          {isResearcher && (
            <button
              onClick={() => router.push("/dashboard/submit")}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-[#C5A059] text-[#003366] font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
            >
              <PlusCircle size={22} />
              Submit New Abstract
            </button>
          )}
        </header>

        {latestAbstract ? (
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-[#003366]">
                  My Paper Status
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-1 truncate max-w-md">
                  {latestAbstract.title}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-[#fdfaf3] text-[#a8823f] px-4 py-2 rounded-xl text-sm font-semibold border border-[#f0e6ce]">
                <CalendarClock size={16} />
                Current Phase: {latestAbstract.status.replace(/_/g, " ")}
              </div>
            </div>

            <ReviewProcessTracker
              currentStatus={latestAbstract.status}
              abstractId={latestAbstract.id}
            />
          </section>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
            <FileText className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-[#003366] font-bold text-lg">
              No active submissions
            </h3>
            <p className="text-slate-500">
              Submit your abstract to begin the peer review process.
            </p>
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={FileText}
            label="Total Submissions"
            value={abstracts.length}
          />
          <StatCard
            icon={FileText}
            label="Paid Registrations"
            value={abstracts.filter((a) => a.isPaid).length}
          />
          <StatCard icon={FileText} label="Notifications" value="2" />
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="p-3 bg-[#e8f0f8] text-[#003366] rounded-xl">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-3xl font-extrabold text-[#003366]">{value}</p>
      </div>
    </div>
  );
}
