"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { CheckCircle, DownloadCloud, Loader2, Printer } from "lucide-react"; // 🚀 Added DownloadCloud icon
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

// 🚀 Logic moved to a sub-component to satisfy Suspense requirements
function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    if (!id) return router.push("/dashboard");

    const finalizePayment = async () => {
      try {
        const res = await fetch(`/api/user/payments/finalize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ abstractId: id }),
        });

        if (res.ok) {
          toast.success("PAYMENT VERIFIED SUCCESSFULLY");
        } else {
          toast.error("VERIFICATION FAILED");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setUpdating(false);
      }
    };

    finalizePayment();
  }, [id, router]);

  // 🚀 Logic for Downloading Invitation (Needs to be implemented in a helper)
  const handleDownloadLetter = () => {
    // placeholder for PDF generation logic (e.g., from src/lib/generateInvitation.js)
    console.log("Downloading Invitation Letter for Abstract:", id);
    toast.success("Downloading Invitation Letter...");
    // generateInvitation({id: id});
  };

  if (updating) {
    return (
      <div className="h-screen bg-[#003366] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-[#C5A059] mb-4" size={48} />
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">
          Securing your transaction...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-12 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="bg-emerald-600 p-12 text-center text-white relative">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

            <div className="inline-flex p-4 bg-white/20 rounded-full mb-6 relative z-10">
              <CheckCircle size={48} />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter relative z-10 leading-none">
              Registration Confirmed
            </h1>
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mt-3 relative z-10">
              Registration Ref: REG-{id?.slice(-8).toUpperCase()}
            </p>
          </div>

          <div className="p-12">
            <div className="space-y-6 mb-10">
              <div className="flex justify-between border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Description
                </span>
                <span className="text-[11px] font-bold text-[#003366]">
                  Conference Registration Fee 2026
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Amount Paid
                </span>
                <span className="text-2xl font-black text-emerald-600 leading-none">
                  $100.00 USD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Verification Date
                </span>
                <span className="text-[11px] font-bold text-[#003366]">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* PRINT RECEIPT (EXISTING) */}
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 py-4 border-2 border-slate-100 rounded-2xl text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
              >
                <Printer size={18} /> Print Receipt
              </button>

              {/* BACK TO DASHBOARD (EXISTING) */}
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2 py-4 bg-[#003366] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#003366] transition-all active:scale-95 shadow-xl"
              >
                Back to Dashboard
              </button>
            </div>

            {/* --- 🚀 NEW ACTION BUTTON: DOWNLOAD INVITATION --- */}
            {/* A full-width golden button positioned directly under the existing pair */}
            <button
              onClick={handleDownloadLetter} // 🚀 Calls placeholder or library logic
              className="w-full flex items-center justify-center gap-2 py-4 mt-2 bg-[#C5A059] text-[#003366] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#003366] transition-all shadow-xl active:scale-95 group"
            >
              {/* Subtle Icon Animation on Hover */}
              <DownloadCloud
                size={18}
                className="group-hover:translate-y-0.5 transition-transform"
              />
              Download Invitation Letter
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main export wraps the content in Suspense
export default function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-[#003366] flex items-center justify-center">
          <Loader2 className="animate-spin text-[#C5A059]" size={48} />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
