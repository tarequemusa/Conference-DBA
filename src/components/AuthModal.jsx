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
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  // --- LEGAL CONTENT MAPPING ---
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsEmailSent(true);
        toast.success("Recovery link sent!");
      } else {
        toast.error(data.error || "Failed to send recovery email.");
      }
    } catch (err) {
      toast.error("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (view === "forgot") return handleForgotPassword(e);

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
    } else {
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
        toast.error("Server connection lost. Try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div
        className={`bg-white w-full transition-all duration-500 ease-in-out ${
          view === "signup" ? "max-w-[950px]" : "max-w-[450px]"
        } rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 my-auto`}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 z-[110] transition-colors"
        >
          <X size={28} />
        </button>

        {/* --- NESTED LEGAL MODAL OVERLAY --- */}
        {legalView && (
          <div className="absolute inset-0 z-[120] bg-[#003366] text-white p-8 md:p-16 animate-in slide-in-from-bottom duration-500 flex flex-col justify-center overflow-y-auto">
            <div className="absolute top-8 right-16 hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <Award size={14} className="text-[#C5A059]" />
              <span className="text-[10px] font-bold text-white/80">
                DBA 2026 Verified
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>

            <button
              onClick={() => setLegalView(null)}
              className="absolute top-8 left-8 flex items-center gap-2 text-[#C5A059] font-bold text-xs hover:text-white transition-colors"
            >
              <ChevronLeft size={16} /> Back to Register
            </button>

            <div className="max-w-xl mx-auto md:mx-0 mt-12 md:mt-0">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-[#C5A059] mb-6 md:mb-8 shadow-xl">
                {legalView === "privacy" ? (
                  <ShieldCheck size={32} />
                ) : (
                  <Scale size={32} />
                )}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                {LegalContent[legalView].title}{" "}
                <span className="text-[#C5A059]">2026</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                {LegalContent[legalView].text}
              </p>

              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <button
                  onClick={() => {
                    setAgreed(true);
                    setLegalView(null);
                  }}
                  className="w-full sm:w-auto bg-[#C5A059] text-[#003366] px-10 py-4 rounded-xl font-bold text-sm hover:bg-white transition-all shadow-2xl active:scale-95"
                >
                  I Understand & Agree
                </button>

                <Link
                  href="/legal"
                  target="_blank"
                  className="flex items-center gap-2 text-xs font-bold text-[#C5A059] hover:text-white transition-colors group"
                >
                  View Detailed Legal Hub
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
          <div className="hidden md:flex md:w-5/12 bg-[#003366] p-12 text-white flex-col justify-between animate-in slide-in-from-left duration-500">
            <div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight">
                Conference DBA 2026
              </h2>
              <p className="mt-4 text-slate-300 font-medium">
                Join the International Conference on Economics, Business and
                Technology Management.
              </p>
            </div>

            <ul className="space-y-5 my-8">
              {[
                "Secure Abstract Submission",
                "Real-time Peer Review Tracking",
                "Digital Certification Access",
                "Early Bird Registration",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold"
                >
                  <CheckCircle2 className="text-[#C5A059] w-5 h-5 shrink-0" />{" "}
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-[10px] text-slate-400 italic font-bold">
              © 2026 EWU Conference Committee
            </p>
          </div>
        )}

        <div
          className={`${view === "signup" ? "md:w-7/12" : "w-full"} p-8 md:p-12 bg-white`}
        >
          {isEmailSent ? (
            <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#003366]">
                Check Your Email
              </h3>
              <p className="text-slate-500 mt-4 px-6 text-sm">
                {`We've sent a password recovery link to`} <br />
                <span className="font-bold text-[#003366]">
                  {formData.email}
                </span>
              </p>
              <button
                onClick={() => {
                  setIsEmailSent(false);
                  setView("login");
                }}
                className="mt-8 px-8 py-3 bg-[#003366] text-white rounded-xl font-bold hover:bg-[#002244] transition-all"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center md:text-left">
                {view === "forgot" && (
                  <button
                    onClick={() => setView("login")}
                    className="flex items-center gap-1 text-xs font-bold text-[#C5A059] mb-4 hover:text-[#003366] transition-colors"
                  >
                    <ChevronLeft size={14} /> Back to Login
                  </button>
                )}
                <h3 className="text-2xl font-bold text-[#003366]">
                  {view === "login"
                    ? "Researcher Login"
                    : view === "signup"
                      ? "Create Account"
                      : "Recover Password"}
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  {view === "login"
                    ? "Access your portal"
                    : view === "signup"
                      ? "Register to submit your paper"
                      : "We'll email you a reset link"}
                </p>
              </div>

              {view !== "forgot" && (
                <>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700 mb-6 disabled:opacity-50"
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

                  <div className="relative flex items-center justify-center mb-6">
                    <div className="flex-grow border-t border-slate-100"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold">
                      OR USE EMAIL
                    </span>
                    <div className="flex-grow border-t border-slate-100"></div>
                  </div>
                </>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {view === "signup" && (
                  <div className="relative group">
                    <User className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-[#C5A059] transition-colors w-5 h-5" />
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none transition-all text-sm"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-[#C5A059] transition-colors w-5 h-5" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none transition-all text-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {view !== "forgot" && (
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-[#C5A059] transition-colors w-5 h-5" />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none transition-all text-sm"
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
                      className="text-xs font-bold text-[#003366] hover:text-[#C5A059] transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {view === "signup" && (
                  <div className="flex items-start gap-3 px-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      className="mt-1 accent-[#003366] cursor-pointer w-4 h-4 shrink-0"
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-[11px] text-slate-500 leading-tight cursor-pointer"
                    >
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setLegalView("terms")}
                        className="text-[#003366] font-bold hover:text-[#C5A059] transition-colors"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        onClick={() => setLegalView("privacy")}
                        className="text-[#003366] font-bold hover:text-[#C5A059] transition-colors"
                      >
                        Privacy Policy
                      </button>
                      .
                    </label>
                  </div>
                )}

                <button
                  disabled={loading || (view === "signup" && !agreed)}
                  className={`w-full py-4 rounded-xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] text-sm ${
                    view === "signup"
                      ? "bg-[#C5A059] text-[#003366]"
                      : "bg-[#003366] text-white"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : view === "login" ? (
                    "Log In"
                  ) : view === "signup" ? (
                    "Register for Conference"
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-500">
                {view === "login" ? (
                  <p>
                    New researcher?{" "}
                    <button
                      type="button"
                      onClick={() => setView("signup")}
                      className="text-[#003366] font-extrabold hover:underline"
                    >
                      Register
                    </button>
                  </p>
                ) : view === "signup" ? (
                  <p>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setView("login")}
                      className="text-[#003366] font-extrabold hover:underline"
                    >
                      Log in
                    </button>
                  </p>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
