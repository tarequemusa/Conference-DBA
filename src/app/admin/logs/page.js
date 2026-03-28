"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ChevronRight,
  Clock,
  Download,
  Filter,
  History,
  Loader2,
  Search,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminActivityLog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/dashboard");
    } else if (status === "authenticated") {
      fetchLogs();
    }
  }, [status, session]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      if (res.ok) setLogs(data);
    } catch (err) {
      console.error("Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.adminName.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading || status === "loading") {
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
        <p className="mt-4 text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Accessing Audit Vault...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- DARK COMMAND HEADER (Updated Style) --- */}
        <header className="h-32 bg-[#001A41] flex flex-col justify-center px-10 shadow-2xl shrink-0 z-20">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
                <History size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
                  System Audit Log
                </h1>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1.5 opacity-80">
                  Traceability & Security Records
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toast.success("GENERATING REPORT...")}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#001A41] transition-all"
              >
                <Download size={14} /> Export Logs
              </button>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC FILTER BAR --- */}
        <div className="bg-white border-b border-slate-100 p-4 px-10 flex items-center gap-4 shadow-sm z-10">
          <div className="relative flex-1 max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by Admin name, action, or specific details..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-[#C5A059]/10 outline-none transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-slate-50 border border-slate-200 text-slate-400 rounded-xl hover:text-[#C5A059] transition-all">
            <Filter size={18} />
          </button>
        </div>

        {/* --- LOG LIST --- */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-slate-50/30">
          <div className="max-w-5xl mx-auto space-y-4">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group relative overflow-hidden"
                >
                  {/* Subtle Role Indicator Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${log.action.includes("ROLE") ? "bg-amber-400" : "bg-[#003366]"}`}
                  />

                  <div className="flex items-center gap-6 pl-2">
                    <div
                      className={`p-3.5 rounded-2xl ${
                        log.action.includes("ROLE")
                          ? "bg-amber-50 text-amber-600 border border-amber-100"
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}
                    >
                      {log.action.includes("ROLE") ? (
                        <ShieldAlert size={22} strokeWidth={2.5} />
                      ) : (
                        <UserCheck size={22} strokeWidth={2.5} />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest mb-1">
                        {log.action.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm font-bold text-[#003366] leading-tight">
                        {log.details}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-[10px] font-black uppercase tracking-tighter text-slate-400">
                        <span className="flex items-center gap-1.5 py-1 px-2 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#003366]" />
                          Admin: {log.adminName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-[#C5A059]" />
                          {new Date(log.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-slate-200 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all"
                  />
                </div>
              ))
            ) : (
              <div className="py-32 text-center">
                <div className="inline-flex p-6 bg-slate-100 rounded-full mb-4">
                  <ShieldAlert size={32} className="text-slate-300" />
                </div>
                <p className="text-slate-400 font-black uppercase text-xs tracking-widest">
                  No security activity matches your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
