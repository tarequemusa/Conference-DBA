"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { ArrowRight, FileSearch, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReviewerDashboard() {
  const { data: session } = useSession();
  const [assignedPapers, setAssignedPapers] = useState([]);

  useEffect(() => {
    // Fetch papers assigned to this specific reviewer
    const fetchAssigned = async () => {
      const res = await fetch("/api/reviewer/assigned");
      const data = await res.json();
      if (res.ok) setAssignedPapers(data);
    };
    fetchAssigned();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 p-8 md:p-12">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#003366]">
            Reviewer Portal
          </h1>
          <p className="text-slate-500 mt-2">
            Expert Evaluation Panel • ICEBTM 2025
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {assignedPapers.length > 0 ? (
            assignedPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-slate-50 text-[#003366] rounded-2xl">
                    <FileSearch size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#003366] text-lg leading-tight">
                      {paper.abstract.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Submitted by: {paper.abstract.user.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold border border-amber-100">
                    {paper.abstract.status.replace(/_/g, " ")}
                  </div>
                  <Link
                    href={`/reviewer/evaluate/${paper.id}`}
                    className="flex-1 md:flex-none text-center px-6 py-3 bg-[#003366] text-white font-bold rounded-xl hover:bg-[#002244] transition-all flex items-center justify-center gap-2"
                  >
                    Evaluate <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <Star size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium">
                No papers currently assigned to you.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
