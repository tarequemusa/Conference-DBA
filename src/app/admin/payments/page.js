"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { CheckCircle, Clock, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

export default function PaymentTracker() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("UNPAID");

  useEffect(() => {
    fetch("/api/admin/payments")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const filtered = data.filter(
    (item) =>
      filter === "ALL" || (filter === "PAID" ? item.isPaid : !item.isPaid),
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-[#001A41] flex items-center justify-between px-10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#C5A059] rounded-xl text-[#001A41] shadow-lg">
              <CreditCard size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">
                Finance & Registration
              </h1>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">
                Payment Reconciliation Tracker
              </p>
            </div>
          </div>

          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {["UNPAID", "PAID", "ALL"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${filter === type ? "bg-[#C5A059] text-[#001A41]" : "text-slate-400 hover:text-white"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b">
                <tr>
                  <th className="px-10 py-6">Researcher</th>
                  <th className="px-10 py-6">Paper UID</th>
                  <th className="px-10 py-6">Status</th>
                  <th className="px-10 py-6 text-right">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-bold text-sm">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-10 py-6">
                      <p className="text-[#003366] uppercase tracking-tight">
                        {item.user?.name}
                      </p>
                      <p className="text-[10px] text-slate-400 lowercase italic">
                        {item.user?.email}
                      </p>
                    </td>
                    <td className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase">
                      {item.id.slice(-10)}
                    </td>
                    <td className="px-10 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${item.status === "ACCEPTANCE_NOTIFICATION" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}
                      >
                        {item.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      {item.isPaid ? (
                        <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                          <CheckCircle size={14} />{" "}
                          <span className="text-[10px] font-black uppercase">
                            Paid
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
                          <Clock size={14} />{" "}
                          <span className="text-[10px] font-black uppercase">
                            Pending $50
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
