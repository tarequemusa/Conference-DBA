"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { ClipboardCheck, Clock, ExternalLink, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PendingReviews() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "REVIEWER") {
      router.push("/dashboard");
    } else if (status === "authenticated") {
      fetchPending();
    }
  }, [status, session]);

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/reviewer/abstracts");
      const data = await res.json();
      if (res.ok) {
        // FILTER: Only show papers currently in PEER_REVIEW status
        const pendingOnly = data.filter((abs) => abs.status === "PEER_REVIEW");
        setAbstracts(pendingOnly);
      }
    } catch (err) {
      toast.error("Failed to sync pending queue.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-[#003366] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Clock size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#003366] uppercase tracking-tighter">
                Pending Tasks
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Awaiting your evaluation
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {abstracts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {abstracts.map((abs) => (
                <div
                  key={abs.id}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#C5A059] transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#003366] font-black italic border border-slate-100">
                      {abs.id.slice(-2)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#003366] text-sm leading-tight mb-1">
                        {abs.title}
                      </h3>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                        Priority: Standard • Due Soon
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/reviewer/evaluate/${abs.id}`)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#003366] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#003366] transition-all shadow-lg active:scale-95"
                  >
                    Review Now <ExternalLink size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="p-6 bg-emerald-50 text-emerald-500 rounded-full mb-4">
                <ClipboardCheck size={48} />
              </div>
              <h3 className="text-[#003366] font-black text-lg uppercase tracking-tighter">
                All caught up!
              </h3>
              <p className="text-slate-500 text-sm max-w-xs mt-2">
                There are no pending abstracts assigned to you at this moment.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
