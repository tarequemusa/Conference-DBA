"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (isSuccess && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (isSuccess && countdown === 0) {
      router.push("/?view=login");
    }
    return () => clearInterval(timer);
  }, [isSuccess, countdown, router]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Invalid session link.");

    // Validation for matching passwords
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim(), password }),
      });
      if (res.ok) {
        setIsSuccess(true);
        toast.success("Security updated!");
      } else {
        const data = await res.json();
        toast.error(data.error || "Reset failed.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Background Gradient for visibility of white Navbar text */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-[#003366] to-transparent pointer-events-none z-0" />

      {/* Navbar Container */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content Area with padding-top gap to avoid Navbar overlap */}
      <main className="flex-grow flex items-center justify-center p-4 relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="bg-white w-full max-w-lg p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,51,102,0.15)] border border-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

          {!isSuccess ? (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-[#003366]/5 text-[#003366] rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#003366]/10">
                  <Lock size={28} strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-[#003366] uppercase tracking-tighter">
                  New Password
                </h1>
                <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium leading-relaxed max-w-[280px] mx-auto">
                  Choose a unique password to protect your researcher account.
                </p>
              </div>

              <form onSubmit={handleReset} className="space-y-4">
                {/* Field 1: New Password */}
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors">
                    <ShieldCheck size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="New Password"
                    className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 outline-none transition-all font-bold text-[#003366] text-sm bg-slate-50/50"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#003366] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Field 2: Confirm Password */}
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Confirm Password"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 outline-none transition-all font-bold text-[#003366] text-sm bg-slate-50/50"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  disabled={loading || !token}
                  className="w-full mt-2 py-4 bg-[#003366] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-[#002244] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xs md:text-sm"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Update Security <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-4 animate-in zoom-in fade-in duration-700">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping"></div>
                <CheckCircle2 size={40} className="relative z-10" />
              </div>
              <h2 className="text-2xl font-black text-[#003366] uppercase tracking-tighter">
                Verified!
              </h2>
              <p className="text-slate-500 text-sm font-medium px-4 mt-2">
                Your password has been updated successfully.
              </p>

              <div className="mt-10 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
                  Redirecting in
                </span>
                <span className="text-4xl text-[#C5A059] font-black leading-none">
                  {countdown}
                </span>
                <button
                  onClick={() => router.push("/?view=login")}
                  className="group flex items-center gap-3 text-[#003366] font-black uppercase tracking-widest text-[10px] hover:text-[#C5A059] transition-all mt-4"
                >
                  Go to Login{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto relative z-10">
        <Footer />
      </footer>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-white">
          <Loader2 className="animate-spin text-[#003366]" size={40} />
        </div>
      }
    >
      <ResetForm />
    </Suspense>
  );
}
