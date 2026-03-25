"use client";
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  Loader2,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AuthModal({ isOpen, onClose, initialView = "login" }) {
  const [view, setView] = useState(initialView);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [legalView, setLegalView] = useState(null); // 'privacy' | 'terms' | null
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setIsEmailSent(false);
      setLegalView(null);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const LegalContent = {
    privacy: {
      title: "Privacy Protocol",
      icon: ShieldCheck,
      text: "Authors retain 100% intellectual property. Research papers are shielded from third-party AI training bots. Personal data is encrypted via AES-256 standards. On-site check-in logs are purged 72 hours post-event for maximum attendee privacy.",
    },
    terms: {
      title: "Terms of Service",
      icon: Scale,
      text: "Plagiarism limit is strictly <15%. Registration fees are non-refundable after June 15, 2026. Authors must present their work (physically or virtually) to be included in the final Scopus-indexed proceedings.",
    },
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        toast.error("Google authentication failed.");
      } else if (result?.ok) {
        toast.success("Redirecting to dashboard...");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (view === "login") {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successful!");
        window.location.href = "/dashboard";
      } else {
        toast.error(res?.error || "Invalid email or password.");
        setLoading(false);
      }
    } else if (view === "signup") {
      if (!agreed) {
        toast.error("Please agree to the Terms & Conditions.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("Registration successful! You can now log in.");
          setView("login");
        } else {
          toast.error(data.error || "Registration failed.");
        }
      } catch (error) {
        toast.error("Server connection lost.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className={`bg-white w-full transition-all duration-500 ease-in-out ${
          view === "signup" ? "max-w-[1000px]" : "max-w-[480px]"
        } rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[92vh] animate-in fade-in zoom-in duration-300`}
      >
        {/* Close Button - More visible on mobile */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 md:right-8 md:top-8 text-slate-400 hover:text-[#003366] z-[130] transition-all p-2 bg-slate-100 md:bg-transparent rounded-full"
        >
          <X size={24} />
        </button>

        {/* --- NESTED LEGAL MODAL OVERLAY --- */}
        {legalView && (
          <div className="absolute inset-0 z-[140] bg-[#003366] text-white p-6 md:p-16 animate-in slide-in-from-bottom duration-500 flex flex-col justify-center overflow-y-auto">
            <div className="hidden md:flex absolute top-8 right-16 items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <Award size={14} className="text-[#C5A059]" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/80">
                DBA 2026 Verified
              </span>
            </div>

            <button
              onClick={() => setLegalView(null)}
              className="mb-8 flex items-center gap-2 text-[#C5A059] font-black text-[11px] uppercase tracking-widest hover:text-white transition-colors"
            >
              <ChevronLeft size={18} /> Back to Register
            </button>

            <div className="max-w-xl">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 rounded-2xl flex items-center justify-center text-[#C5A059] mb-6 shadow-xl">
                {legalView === "privacy" ? (
                  <ShieldCheck size={40} />
                ) : (
                  <Scale size={40} />
                )}
              </div>
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 leading-tight">
                {LegalContent[legalView].title}{" "}
                <span className="text-[#C5A059]">2026</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-lg font-medium">
                {LegalContent[legalView].text}
              </p>

              <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-6">
                <button
                  onClick={() => {
                    setAgreed(true);
                    setLegalView(null);
                  }}
                  className="w-full sm:w-auto bg-[#C5A059] text-[#003366] px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl active:scale-95"
                >
                  I Understand & Agree
                </button>
                <Link
                  href="/legal"
                  target="_blank"
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors group"
                >
                  Legal Hub{" "}
                  <ExternalLink
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* --- LEFT SIDE PANEL (SIGNUP ONLY) --- */}
        {view === "signup" && (
          <div className="hidden md:flex md:w-5/12 bg-[#003366] p-12 text-white flex-col justify-between relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-black leading-tight tracking-tight uppercase">
                Conference <br /> <span className="text-[#C5A059]">DBA</span>{" "}
                2026
              </h2>
              <p className="mt-6 text-slate-300 font-medium text-sm leading-relaxed">
                Empowering the next generation of business research and
                technological management.
              </p>
            </div>

            <ul className="space-y-5 relative z-10">
              {[
                "Secure Abstract Submission",
                "Real-time Peer Review Tracking",
                "Digital Certification Access",
                "Early Bird Registration",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-[13px] font-bold uppercase tracking-wide"
                >
                  <CheckCircle2 className="text-[#C5A059] w-5 h-5 shrink-0" />{" "}
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-[10px] text-slate-400 italic uppercase tracking-widest font-black relative z-10">
              © 2026 EWU Conference Committee
            </p>
          </div>
        )}

        {/* --- MAIN FORM AREA --- */}
        <div
          className={`${view === "signup" ? "md:w-7/12" : "w-full"} p-8 md:p-14 bg-white overflow-y-auto custom-scrollbar`}
        >
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-[#003366] uppercase tracking-tighter">
              {view === "login"
                ? "Researcher Login"
                : view === "signup"
                  ? "Create Account"
                  : "Recover Password"}
            </h3>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              {view === "login"
                ? "Welcome back to the portal"
                : view === "signup"
                  ? "Join the 2026 research cohort"
                  : "Enter your email to reset"}
            </p>
          </div>

          {view !== "forgot" && (
            <>
              <button
                type="button"
                disabled={loading}
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-slate-100 rounded-xl hover:bg-slate-50 hover:border-[#C5A059]/30 transition-all font-black text-[11px] uppercase tracking-widest text-slate-700 mb-6 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                Continue with Google
              </button>

              <div className="relative flex items-center justify-center mb-8">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-[9px] uppercase tracking-[0.3em] font-black">
                  OR
                </span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {view === "signup" && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors w-5 h-5" />
                <input
                  type="text"
                  required
                  placeholder="FULL NAME"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 rounded-xl focus:bg-white focus:border-[#C5A059] outline-none transition-all text-xs font-bold uppercase tracking-wider"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors w-5 h-5" />
              <input
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 rounded-xl focus:bg-white focus:border-[#C5A059] outline-none transition-all text-xs font-bold uppercase tracking-wider"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {view !== "forgot" && (
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors w-5 h-5" />
                <input
                  type="password"
                  required
                  placeholder="PASSWORD"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 rounded-xl focus:bg-white focus:border-[#C5A059] outline-none transition-all text-xs font-bold uppercase tracking-wider"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            )}

            {view === "login" && (
              <div className="flex justify-end px-1">
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-[10px] font-black uppercase tracking-widest text-[#003366] hover:text-[#C5A059] transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {view === "signup" && (
              <div className="flex items-start gap-3 px-1 py-2">
                <input
                  type="checkbox"
                  id="terms-check"
                  checked={agreed}
                  className="mt-1 accent-[#003366] w-4 h-4 shrink-0 cursor-pointer"
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label
                  htmlFor="terms-check"
                  className="text-[10px] font-bold text-slate-500 leading-snug cursor-pointer uppercase tracking-tight"
                >
                  I accept the{" "}
                  <button
                    type="button"
                    onClick={() => setLegalView("terms")}
                    className="text-[#003366] underline decoration-[#C5A059] decoration-2 underline-offset-2"
                  >
                    Terms
                  </button>{" "}
                  &{" "}
                  <button
                    type="button"
                    onClick={() => setLegalView("privacy")}
                    className="text-[#003366] underline decoration-[#C5A059] decoration-2 underline-offset-2"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>
            )}

            <button
              disabled={loading || (view === "signup" && !agreed)}
              className={`w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 ${
                view === "signup"
                  ? "bg-[#C5A059] text-[#003366]"
                  : "bg-[#003366] text-white"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : view === "login" ? (
                "Enter Dashboard"
              ) : (
                "Confirm Registration"
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {view === "login"
                ? "New to the conference?"
                : "Already a member?"}{" "}
              <button
                type="button"
                onClick={() => setView(view === "login" ? "signup" : "login")}
                className="text-[#003366] font-black underline decoration-[#C5A059] decoration-2 underline-offset-4 ml-1"
              >
                {view === "login" ? "Register Now" : "Log In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
