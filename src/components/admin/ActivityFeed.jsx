"use client";
import { Activity, ShieldCheck, UserCog } from "lucide-react";

export default function ActivityFeed({ logs }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="p-10 text-center text-slate-400 italic text-xs uppercase font-black">
        No recent system activity recorded.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {logs.map((log) => (
        <div key={log.id} className="flex gap-4 group">
          <div className="relative flex flex-col items-center">
            <div className="p-2 bg-slate-50 text-[#003366] rounded-xl border border-slate-100 group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
              {log.action.includes("ROLE") ? (
                <UserCog size={16} />
              ) : (
                <ShieldCheck size={16} />
              )}
            </div>
            <div className="w-px h-full bg-slate-100 mt-2" />
          </div>
          <div className="pb-6">
            <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest leading-none mb-1">
              {log.action.replace("_", " ")}
            </p>
            <p className="text-sm font-bold text-[#003366] leading-tight mb-1">
              {log.details}
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
              <Activity size={10} /> By {log.adminName} •{" "}
              {new Date(log.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
