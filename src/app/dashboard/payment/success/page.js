"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { CheckCircle, Loader2, Printer } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
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
  }, [id]);

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
        <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-emerald-600 p-12 text-center text-white relative">
            <div className="inline-flex p-4 bg-white/20 rounded-full mb-6">
              <CheckCircle size={48} />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              Registration Confirmed
            </h1>
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mt-2">
              Paper ID: {id.slice(-8)}
            </p>
          </div>

          <div className="p-12">
            <div className="space-y-6 mb-10">
              <div className="flex justify-between border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  Description
                </span>
                <span className="text-[11px] font-bold text-[#003366]">
                  Conference Registration Fee 2026
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  Amount Paid
                </span>
                <span className="text-xl font-black text-emerald-600">
                  $100.00 USD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  Date
                </span>
                <span className="text-[11px] font-bold text-[#003366]">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 py-4 border-2 border-slate-100 rounded-2xl text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
              >
                <Printer size={18} /> Print Receipt
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2 py-4 bg-[#003366] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#003366] transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
