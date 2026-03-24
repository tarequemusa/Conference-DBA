"use client";
import { ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (isSuccess && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isSuccess && countdown === 0) {
      router.push("/?view=login");
    }
    return () => clearInterval(timer);
  }, [isSuccess, countdown, router]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid session. Please request a new link.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim(), password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        toast.success("Security updated!");
      } else {
        toast.error(data.error || "Invalid or expired link.");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 font-sans">
      <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl border border-slate-100 transition-all duration-500">
        {!isSuccess ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-blue-50 text-[#003366] rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <Lock size={36} />
              </div>
              <h1 className="text-3xl font-black text-[#003366] tracking-tight">
                New Password
              </h1>
              <p className="text-slate-400 text-sm mt-3 font-medium px-4">
                Please create a new secure password for your ICEBTM 2025
                account.
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-6">
              <input
                type="password"
                required
                minLength={8}
                placeholder="Enter new password"
                className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-[#C5A059] focus:ring-4 focus:ring-amber-50 outline-none transition-all font-medium"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                disabled={loading || !token}
                className="w-full py-5 bg-[#003366] text-white font-bold rounded-2xl shadow-xl hover:bg-[#002244] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-in zoom-in fade-in duration-700">
            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping"></div>
              <CheckCircle2 size={48} className="relative z-10" />
            </div>
            <h2 className="text-3xl font-black text-[#003366] mb-4">
              Password Reset!
            </h2>
            <p className="text-slate-500 font-medium px-4">
              Your security settings have been updated.
            </p>
            <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Redirecting in{" "}
                <span className="text-[#C5A059] text-lg mx-1">{countdown}</span>{" "}
                seconds
              </p>
              <button
                onClick={() => router.push("/?view=login")}
                className="flex items-center gap-2 text-[#003366] font-bold text-sm hover:gap-4 transition-all"
              >
                Take me there now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrapping in Suspense is required for useSearchParams() in Next.js
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="animate-spin text-[#003366]" size={40} />
        </div>
      }
    >
      <ResetForm />
    </Suspense>
  );
}
