"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { jsPDF } from "jspdf";
import {
  Award,
  Download,
  FileCheck,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Certificates() {
  const { data: session, status } = useSession();
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") fetchEligibleCertificates();
  }, [status]);

  const fetchEligibleCertificates = async () => {
    try {
      const res = await fetch("/api/user/abstracts");
      const data = await res.json();
      if (res.ok) {
        // Eligibility: Only CONFIRMED or FULL_PAPER_SUBMISSION status can download
        const eligible = data.filter(
          (a) =>
            a.status === "CONFIRMED" || a.status === "FULL_PAPER_SUBMISSION",
        );
        setAbstracts(eligible);
      }
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async (abs) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // 1. Draw Gold Border
    doc.setDrawColor(197, 160, 89); // #C5A059
    doc.setLineWidth(5);
    doc.rect(10, 10, 277, 190);
    doc.setLineWidth(1);
    doc.rect(15, 15, 267, 180);

    // 2. Header
    doc.setTextColor(0, 51, 102); // #003366
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.text("CONFERENCE DBA 2026", 148.5, 50, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("INTERNATIONAL ACADEMIC RESEARCH CONFERENCE", 148.5, 60, {
      align: "center",
    });

    // 3. Main Body
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102);
    doc.text("CERTIFICATE OF PARTICIPATION", 148.5, 90, { align: "center" });
    doc.setFontSize(14);
    doc.setTextColor(80);
    doc.text("This is to certify that", 148.5, 110, { align: "center" });
    doc.setFontSize(24);
    doc.setFont("times", "italic");
    doc.setTextColor(0, 51, 102);
    doc.text(session?.user?.name || "Distinguished Researcher", 148.5, 125, {
      align: "center",
    });
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "has successfully presented the research paper titled:",
      148.5,
      140,
      { align: "center" },
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    const splitTitle = doc.splitTextToSize(abs.title.toUpperCase(), 200);
    doc.text(splitTitle, 148.5, 150, { align: "center" });

    // 4. Digital Signature Logic
    try {
      const sigRes = await fetch("/api/certificates/authority-signature");
      const sigData = await sigRes.json();
      if (sigData.signature) {
        doc.addImage(sigData.signature, "PNG", 185, 158, 50, 20);
      }
    } catch (error) {
      console.warn("Could not load authority signature.");
    }

    // 5. Footer
    doc.setDrawColor(200);
    doc.line(50, 180, 110, 180);
    doc.line(180, 180, 240, 180);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Conference Chair", 80, 185, { align: "center" });
    doc.text("Authority of DBA", 210, 185, { align: "center" });

    // 6. Save
    doc.save(`Certificate_${abs.id.slice(-6)}.pdf`);
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
        <p className="mt-4 text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Validating Credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- DARK COMMAND HEADER --- */}
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-10 shadow-2xl shrink-0 z-20">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
              <Award size={26} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
                Certificates
              </h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1.5 opacity-80">
                Official Recognition & Credentials
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-emerald-500 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={14} /> Verified Archive
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/30">
          <div className="max-w-5xl mx-auto space-y-6">
            {abstracts.length > 0 ? (
              abstracts.map((abs) => (
                <div
                  key={abs.id}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-2xl transition-all relative overflow-hidden group"
                >
                  {/* Decorative Side Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-8 text-left w-full md:w-auto">
                    <div className="w-20 h-20 bg-[#FDFCF6] rounded-[1.5rem] flex items-center justify-center border border-[#F0E6CE] shadow-inner">
                      <FileCheck size={36} className="text-[#C5A059]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[#003366] leading-tight uppercase tracking-tight">
                        {abs.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                          Status: Confirmed
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          ID: {abs.id.slice(-8)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => generatePDF(abs)}
                    className="flex items-center gap-3 px-10 py-5 bg-[#001A41] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#001A41] transition-all shadow-2xl active:scale-95 whitespace-nowrap group-hover:translate-x-1"
                  >
                    <Download size={20} /> Generate Certificate
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center shadow-inner">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock size={40} className="text-slate-200" />
                </div>
                <h3 className="text-slate-400 font-black text-xl uppercase tracking-[0.2em]">
                  Documents Locked
                </h3>
                <p className="text-slate-500 text-sm mt-4 max-w-sm mx-auto font-medium leading-relaxed">
                  Participation certificates are issued upon final confirmation
                  and payment verification by the conference board.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
