"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  ClipboardList,
  Loader2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PendingReviews() {
  const [pendingPapers, setPendingPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch("/api/reviewer/assigned?status=PENDING");
        const data = await res.json();
        if (res.ok) {
          setPendingPapers(data);
        } else {
          toast.error("Could not load assigned papers.");
        }
      } catch (err) {
        toast.error("Connection error.");
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="animate-spin text-[#003366]" size={40} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 p-8 md:p-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#003366]">
              Pending Reviews
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              You have{" "}
              <span className="text-[#C5A059] font-bold">
                {pendingPapers.length}
              </span>{" "}
              papers awaiting evaluation.
            </p>
          </div>
          <div className="px-5 py-2.5 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3">
            <AlertCircle size={18} className="text-amber-600" />
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Deadline: April 15, 2026
            </span>
          </div>
        </header>

        <div className="space-y-4">
          {pendingPapers.length > 0 ? (
            pendingPapers.map((assignment) => (
              <div
                key={assignment.id}
                className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#C5A059] transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                      <ClipboardList size={14} />
                      Paper ID: {assignment.abstract.id.slice(-8)}
                    </div>
                    <h2 className="text-xl font-bold text-[#003366] group-hover:text-[#C5A059] transition-colors">
                      {assignment.abstract.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5 font-medium">
                        <User size={16} className="text-slate-400" />
                        {assignment.abstract.authors}
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar size={16} className="text-slate-400" />
                        Submitted:{" "}
                        {new Date(
                          assignment.abstract.createdAt,
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/reviewer/evaluate/${assignment.id}`}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-[#003366] text-white font-bold rounded-2xl hover:bg-[#002244] transition-all shadow-lg hover:shadow-[#003366]/20"
                  >
                    Start Evaluation
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <ClipboardList size={60} className="text-slate-200 mb-4" />
              <h3 className="text-[#003366] font-bold text-xl">
                All caught up!
              </h3>
              <p className="text-slate-400 mt-1">
                No pending papers assigned to your account at this time.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
