"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Banknote,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  Loader2,
  Search,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminFinance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("CONFIRMED"); // CONFIRMED or PENDING
  const [selectedTxn, setSelectedTxn] = useState(null);

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    try {
      const res = await fetch("/api/admin/finance");
      const result = await res.json();
      if (res.ok) setData(result);
    } catch (err) {
      toast.error("Failed to load financial records");
    } finally {
      setLoading(false);
    }
  };

  const currentList =
    view === "CONFIRMED" ? data?.attendees : data?.pendingList;

  const filteredItems =
    currentList?.filter(
      (a) =>
        a.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  if (loading)
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
      </div>
    );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-0 md:p-0 custom-scrollbar">
        {/* --- DARK THEMATIC HEADER --- */}
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-12 shadow-2xl relative shrink-0">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059] shadow-inner">
              <CreditCard size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
                Financial Ledger
              </h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-2 opacity-80">
                Audit & Transaction Intelligence
              </p>
            </div>
          </div>
          <div className="flex gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setView("CONFIRMED")}
              className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === "CONFIRMED" ? "bg-[#C5A059] text-[#001A41] shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              Verified
            </button>
            <button
              onClick={() => setView("PENDING")}
              className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === "PENDING" ? "bg-[#C5A059] text-[#001A41] shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              Pending
            </button>
          </div>
        </header>

        <div className="p-10 space-y-10">
          {/* --- METRICS --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              label="Total Revenue"
              val={`$${data?.totalRevenue || 0}`}
              icon={DollarSign}
              color="text-emerald-600"
              sub="Verified Deposits"
            />
            <StatCard
              label="Confirmed"
              val={data?.paidCount || 0}
              icon={Users}
              color="text-[#C5A059]"
              sub="Attendees Synced"
            />
            <StatCard
              label="Receivables"
              val={`$${(data?.pendingCount || 0) * 100}`}
              icon={Clock}
              color="text-blue-600"
              sub={`${data?.pendingCount || 0} Awaiting Payment`}
            />
          </div>

          {/* --- TABLE SECTION --- */}
          <section className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative">
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 ${view === "CONFIRMED" ? "bg-emerald-500" : "bg-amber-500"}`}
            />
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-black text-[#003366] uppercase tracking-tight">
                {view === "CONFIRMED"
                  ? "Verified Transactions"
                  : "Pending Invoices"}
              </h2>
              <div className="relative w-full md:w-80">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Filter by name or paper..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl text-xs font-bold outline-none border border-slate-100"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
                  <tr>
                    <th className="px-8 py-5">User Info</th>
                    <th className="px-8 py-5">Paper UID</th>
                    <th className="px-8 py-5">Amount</th>
                    <th className="px-8 py-5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <p className="text-xs font-black text-[#003366] uppercase">
                          {item.user.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium italic lowercase">
                          {item.user.email}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-[11px] font-bold text-slate-600 truncate max-w-[200px] uppercase">
                          {item.title}
                        </p>
                        <p className="text-[9px] text-slate-300 font-black uppercase tracking-tighter">
                          ID: {item.id.slice(-10)}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`text-sm font-black ${view === "CONFIRMED" ? "text-emerald-600" : "text-slate-400"}`}
                        >
                          $100.00
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => setSelectedTxn(item)}
                          className="p-2.5 bg-slate-100 text-[#003366] hover:bg-[#C5A059] hover:text-[#001A41] rounded-xl transition-all shadow-sm"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* --- MODAL Logic remains the same ... --- */}
        {selectedTxn && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div
              className="absolute inset-0 bg-[#001A41]/80 backdrop-blur-md"
              onClick={() => setSelectedTxn(null)}
            />
            <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-white/20">
              <div className="h-2 bg-[#C5A059]" />
              <div className="p-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-[#003366] uppercase tracking-tighter leading-none">
                      Transaction Audit
                    </h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                      Payment ID: {selectedTxn.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTxn(null)}
                    className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-6">
                  <DetailRow
                    icon={CreditCard}
                    label="Payment Method"
                    val={selectedTxn.paymentMethod || "SSL Commerz"}
                  />
                  <DetailRow
                    icon={Banknote}
                    label="Transaction ID"
                    val={selectedTxn.transactionId || "Pending Verification"}
                  />
                  <DetailRow
                    icon={Calendar}
                    label="Timestamp"
                    val={new Date(selectedTxn.updatedAt).toLocaleString()}
                  />
                </div>
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="w-full mt-10 py-5 bg-[#003366] text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:bg-[#C5A059] hover:text-[#001A41] transition-all"
                >
                  Close Intelligence Report
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function DetailRow({ icon: Icon, label, val }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-slate-50 rounded-xl text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-all">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-black text-[#003366] uppercase">{val}</p>
      </div>
    </div>
  );
}

function StatCard({ label, val, icon: Icon, color, sub }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between transition-all group relative overflow-hidden">
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div
          className={`p-4 bg-slate-50 rounded-2xl ${color} transition-transform group-hover:scale-110 shadow-sm`}
        >
          <Icon size={24} />
        </div>
        <TrendingUp size={20} className="text-slate-100" />
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-black text-[#003366] tracking-tighter mb-1">
          {val}
        </h3>
        <p className="text-[9px] text-slate-400 font-bold uppercase italic opacity-60">
          {sub}
        </p>
      </div>
      <Icon
        size={100}
        strokeWidth={4}
        className="absolute -right-4 -bottom-4 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
