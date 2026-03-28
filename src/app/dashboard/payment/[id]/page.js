"use client";
import { ArrowRight, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function PaymentGatewayDesign() {
  const [processing, setProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
        {/* Order Summary */}
        <div className="bg-[#001A41] p-12 text-white relative">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <CreditCard size={150} />
          </div>
          <h2 className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.3em] mb-12">
            Checkout Summary
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                Service
              </p>
              <p className="text-lg font-black uppercase tracking-tight">
                Conference Registration Fee
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 flex justify-between items-end">
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                  Amount Due
                </p>
                <p className="text-4xl font-black text-[#C5A059]">BDT 5,000</p>
              </div>
            </div>
          </div>

          <div className="mt-20 p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
            <ShieldCheck className="text-[#C5A059]" size={24} />
            <p className="text-[9px] font-medium leading-relaxed uppercase tracking-widest opacity-60">
              Secured by SSL Commerz 256-bit encryption protocol. Your
              transaction is safe.
            </p>
          </div>
        </div>

        {/* Payment Selection */}
        <div className="p-12 flex flex-col justify-center">
          <h3 className="text-xl font-black text-[#003366] uppercase tracking-tighter mb-8">
            Select Payment Method
          </h3>

          <div className="space-y-4 mb-12">
            {["BKash", "Nagad", "Visa / Mastercard"].map((method) => (
              <label
                key={method}
                className="flex items-center justify-between p-5 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-[#C5A059] transition-all group active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl group-hover:bg-[#C5A059]/10 transition-colors" />
                  <span className="font-black text-xs uppercase tracking-widest text-[#003366]">
                    {method}
                  </span>
                </div>
                <input
                  type="radio"
                  name="payment"
                  className="w-5 h-5 accent-[#003366]"
                />
              </label>
            ))}
          </div>

          <button
            disabled={processing}
            className="w-full py-5 bg-[#003366] text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl hover:bg-[#C5A059] hover:text-[#001A41] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {processing ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Initialize Payment <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
