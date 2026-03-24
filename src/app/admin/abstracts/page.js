"use client";

import AssignReviewerModal from "@/components/admin/AssignReviewerModal";
import Sidebar from "@/components/dashboard/Sidebar";
import { FileText, Loader2, Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminAbstracts() {
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [selectedAbstract, setSelectedAbstract] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAbstracts = async () => {
    try {
      const res = await fetch("/api/admin/abstracts");
      const data = await res.json();
      if (res.ok) setAbstracts(data);
    } catch (err) {
      toast.error("Failed to load abstracts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbstracts();
  }, []);

  const openAssignModal = (abstract) => {
    setSelectedAbstract(abstract);
    setIsModalOpen(true);
  };

  const filtered = abstracts.filter(
    (abs) =>
      abs.title.toLowerCase().includes(search.toLowerCase()) ||
      abs.user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 p-8 md:p-12 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#003366]">
              Manage Abstracts
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Review, assign, and track all{" "}
              <span className="text-[#C5A059]">{abstracts.length}</span>{" "}
              submissions.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search title or author..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        {/* --- Abstract List Table --- */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="animate-spin text-[#003366]" size={40} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Research Details</th>
                    <th className="px-8 py-5">Author</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((abs) => (
                    <tr
                      key={abs.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-50 text-[#003366] rounded-xl group-hover:bg-[#003366] group-hover:text-white transition-all">
                            <FileText size={20} />
                          </div>
                          <div className="max-w-xs md:max-w-md">
                            <p className="font-bold text-[#003366] truncate">
                              {abs.title}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                              ID: {abs.id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-semibold text-slate-600">
                          {abs.user.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {abs.user.email}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={abs.status} />
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => openAssignModal(abs)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fdfaf3] text-[#a8823f] hover:bg-[#C5A059] hover:text-white rounded-xl text-xs font-bold transition-all border border-[#f0e6ce]"
                        >
                          <UserPlus size={14} /> Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* --- The Modal --- */}
        <AssignReviewerModal
          abstract={selectedAbstract}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRefresh={fetchAbstracts}
        />
      </main>
    </div>
  );
}

// Helper Badge Component
function StatusBadge({ status }) {
  const styles = {
    ABSTRACT_SUBMISSION: "bg-blue-50 text-blue-600 border-blue-100",
    INITIAL_EVALUATION: "bg-amber-50 text-amber-600 border-amber-100",
    ACCEPTANCE_NOTIFICATION:
      "bg-emerald-50 text-emerald-600 border-emerald-100",
    PAYMENT_PENDING: "bg-[#fdfaf3] text-[#C5A059] border-[#f0e6ce]",
  };

  return (
    <span
      className={`px-3 py-1 text-[10px] font-bold rounded-full border ${styles[status] || "bg-slate-50 text-slate-500 border-slate-100"}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
