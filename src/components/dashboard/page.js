"use client";

import ReviewProcessTracker from "@/components/dashboard/ReviewProcessTracker";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Bell,
  CalendarClock,
  ChevronRight,
  FileText,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [abstracts, setAbstracts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // 1. Protection & Data Fetching
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      const fetchAbstracts = async () => {
        try {
          const res = await fetch("/api/user/abstracts");
          const data = await res.json();
          if (res.ok) {
            setAbstracts(data);
          } else {
            toast.error(data.error || "Failed to load submissions");
          }
        } catch (err) {
          toast.error("Connection error to database");
        } finally {
          setLoadingData(false);
        }
      };
      fetchAbstracts();
    }
  }, [status, router]);

  // Loading state for better UX
  if (status === "loading" || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="animate-spin text-[#003366]" size={40} />
      </div>
    );
  }

  // Get the most recent abstract for the tracker
  const latestAbstract = abstracts[0];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-[#003366] tracking-tight">
              Researcher Dashboard
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Conference DBA 2026 • International Conference Portal
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-[#003366] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
            <button
              onClick={() => router.push("/dashboard/submit")}
              className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-[#003366] font-bold rounded-2xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-95"
            >
              <PlusCircle size={20} />
              Submit Abstract
            </button>
          </div>
        </div>

        {/* --- Peer Review Tracking Section --- */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-10 mb-8 overflow-hidden relative">
          {latestAbstract ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-[#eef4f9] text-[#003366] rounded-2xl">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#003366]">
                      Submission Progress
                    </h2>
                    <p className="text-sm text-slate-500 font-medium truncate max-w-[300px] md:max-w-[500px]">
                      ID: {latestAbstract.id} • {latestAbstract.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-100">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  {latestAbstract.status.replace(/_/g, " ")}
                </div>
              </div>

              <ReviewProcessTracker
                currentStatus={latestAbstract.status}
                abstractId={latestAbstract.id}
              />
            </>
          ) : (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="p-6 bg-slate-50 rounded-full mb-4">
                <FileText size={48} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-[#003366]">
                No Submissions Yet
              </h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
                Begin your researcher journey by submitting your first abstract
                for peer review.
              </p>
            </div>
          )}
        </section>

        {/* --- Grid: Quick Stats & Recent Activity --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-[#C5A059] transition-colors cursor-default">
              <div className="p-4 bg-blue-50 text-[#003366] rounded-2xl group-hover:bg-[#003366] group-hover:text-white transition-all">
                <CalendarClock size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Next Deadline
                </p>
                <p className="text-lg font-bold text-[#003366]">
                  Full Paper: May 20
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-[#C5A059] transition-colors cursor-default">
              <div className="p-4 bg-amber-50 text-[#C5A059] rounded-2xl">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Total Abstracts
                </p>
                <p className="text-lg font-bold text-[#003366]">
                  {abstracts.length.toString().padStart(2, "0")} Submitted
                </p>
              </div>
            </div>
          </div>

          {/* Card: Helpful Links */}
          <div className="bg-[#003366] p-8 rounded-[2rem] text-white shadow-lg relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <FileText size={150} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#C5A059]">Resources</h3>
            <ul className="space-y-4">
              {[
                "Submission Guidelines",
                "Abstract Template",
                "Conference Schedule",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between group/item cursor-pointer"
                >
                  <span className="text-sm text-slate-300 group-hover/item:text-[#C5A059] transition-colors">
                    {item}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-slate-500 group-hover/item:translate-x-1 transition-transform"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
