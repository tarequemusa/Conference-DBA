"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  CheckCircle,
  Download,
  ExternalLink,
  Loader2,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompletedReviews() {
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/reviewer/completed")
      .then((res) => res.json())
      .then((data) => {
        setAbstracts(data);
        setLoading(false);
      });
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFillColor(0, 26, 65);
    doc.rect(0, 0, 297, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("COMPLETED EVALUATIONS ARCHIVE", 15, 25);

    const body = abstracts.map((abs, i) => [
      i + 1,
      abs.id.slice(-8).toUpperCase(),
      abs.title,
      abs.reviews[0]?.totalScore || 0,
      new Date(abs.updatedAt).toLocaleDateString(),
    ]);

    doc.autoTable({
      startY: 50,
      head: [["#", "ID", "TITLE", "SCORE", "COMPLETED ON"]],
      body: body,
      headStyles: { fillColor: [197, 160, 89] },
    });
    doc.save("Review_Archive.pdf");
  };

  const filtered = abstracts.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="h-screen bg-[#001A41] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
      </div>
    );

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-10 shadow-2xl z-20">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
              <CheckCircle size={26} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">
                Completed Reviews
              </h1>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">
                Archive of Evaluated Research
              </p>
            </div>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-[#001A41] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all"
          >
            <Download size={14} /> Export Archive
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {/* SEARCH BAR */}
          <div className="relative mb-10 max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-[#C5A059]/20"
              placeholder="Filter archives..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* TABLE */}
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-6">Research Item</th>
                  <th className="px-8 py-6 text-center">Your Score</th>
                  <th className="px-8 py-6 text-right">View Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((abs) => (
                  <tr
                    key={abs.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-7">
                      <p className="font-bold text-[#003366] text-sm uppercase">
                        {abs.title}
                      </p>
                      <p className="text-[9px] text-slate-400 font-black mt-1 uppercase tracking-tighter">
                        UID: {abs.id.slice(-10)}
                      </p>
                    </td>
                    <td className="px-8 py-7 text-center">
                      <div className="inline-flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-black border border-emerald-100">
                        <span className="text-lg leading-none">
                          {abs.reviews[0]?.totalScore || 0}
                        </span>
                        <span className="text-[8px] opacity-50">/20</span>
                      </div>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <button
                        onClick={() =>
                          router.push(`/reviewer/evaluate/${abs.id}`)
                        }
                        className="p-3 bg-slate-50 text-[#003366] hover:bg-[#003366] hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <ExternalLink size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}
