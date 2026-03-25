"use client";
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  Eye,
  EyeOff,
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
  const [showPassword, setShowPassword] = useState(false);
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
      setShowPassword(false);
      // Optional: Reset agreement on modal open if desired
      // setAgreed(false);
    }
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
    if (!agreed) {
      toast.error("Please agree to the Terms & Privacy Protocol first.");
      return;
    }
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
    if (!agreed) {
      toast.error("Please agree to the Terms & Privacy Protocol.");
      return;
    }

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
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-hidden">
      <div
        className={`bg-white w-full transition-all duration-500 ease-in-out ${
          view === "signup" ? "max-w-[950px]" : "max-w-[450px]"
        } rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-300 max-h-[95vh] my-auto`}
      >
        <div className="w-full bg-[#003366] p-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
              <img
                src="/images/logo.png"
                alt="EWU Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-black text-lg leading-none tracking-tight uppercase">
                CONFERENCE <span className="text-[#C5A059]">DBA</span>
              </h2>
              <span className="text-white/60 text-[10px] tracking-[0.15em] mt-1 font-medium">
                INTERNATIONAL 2026
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-grow overflow-y-auto custom-scrollbar relative">
          {legalView && (
            <div className="absolute inset-0 z-[120] bg-[#003366] text-white p-8 md:p-16 animate-in slide-in-from-bottom duration-500 flex flex-col justify-center overflow-y-auto">
              <div className="absolute top-8 right-16 hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <Award size={14} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                  DBA 2026 Verified
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              </div>

              <button
                onClick={() => setLegalView(null)}
                className="absolute top-8 left-8 flex items-center gap-2 text-[#C5A059] font-black text-xs hover:text-white transition-colors uppercase tracking-widest"
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
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 uppercase leading-none">
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
                    className="w-full sm:w-auto bg-[#C5A059] text-[#003366] px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95"
                  >
                    I Understand & Agree
                  </button>

                  <Link
                    href="/legal"
                    target="_blank"
                    className="flex items-center gap-2 text-[10px] font-black text-[#C5A059] hover:text-white transition-all group uppercase tracking-widest"
                  >
                    View Details in Legal Hub
                    <ExternalLink
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {view === "signup" && (
            <div className="hidden md:flex md:w-5/12 bg-[#003366]/95 p-12 text-white flex-col justify-center animate-in slide-in-from-left duration-500 border-r border-white/5">
              <div className="mb-8">
                <h2 className="text-2xl font-black leading-tight tracking-tight uppercase">
                  Researcher Portal
                </h2>
                <p className="mt-2 text-slate-300 text-sm font-medium">
                  Join the global network of scholars and industry experts.
                </p>
              </div>

              <ul className="space-y-5 mb-8">
                {[
                  "Secure Abstract Submission",
                  "Real-time Peer Review Tracking",
                  "Digital Certification Access",
                  "Early Bird Registration",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[11px] font-black uppercase tracking-tight"
                  >
                    <CheckCircle2 className="text-[#C5A059] w-4 h-4 shrink-0" />{" "}
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-[10px] text-white/40 italic font-black mt-auto uppercase tracking-widest">
                © 2026 EWU Conference Committee
              </p>
            </div>
          )}

          <div
            className={`${view === "signup" ? "md:w-7/12" : "w-full"} p-8 md:p-12 bg-white flex flex-col justify-center`}
          >
            {isEmailSent ? (
              <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-black text-[#003366] uppercase">
                  Check Your Email
                </h3>
                <p className="text-slate-500 mt-4 text-xs font-medium">
                  Recovery link sent to: <br />
                  <span className="font-black text-[#003366]">
                    {formData.email}
                  </span>
                </p>
                <button
                  onClick={() => {
                    setIsEmailSent(false);
                    setView("login");
                  }}
                  className="mt-8 px-8 py-3 bg-[#003366] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#C5A059] transition-all"
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
                      className="flex items-center gap-1 text-[10px] font-black text-[#C5A059] mb-4 hover:text-[#003366] transition-colors uppercase tracking-widest"
                    >
                      <ChevronLeft size={14} /> Back to Login
                    </button>
                  )}
                  <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tighter leading-none">
                    {view === "login"
                      ? "Researcher Login"
                      : view === "signup"
                        ? "Create Account"
                        : "Recover Password"}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium mt-1">
                    {view === "login"
                      ? "Access your dashboard"
                      : view === "signup"
                        ? "Register for ICEBTM 2026"
                        : "Reset your link"}
                  </p>
                </div>

                {view !== "forgot" && (
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={loading || !agreed}
                    className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest text-slate-700 mb-6 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      className="w-4 h-4"
                      alt="G"
                    />
                    Continue with Google
                  </button>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {view === "signup" && (
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-[#003366]"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  )}

                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors w-5 h-5" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-[#003366]"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  {view !== "forgot" && (
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Password"
                        className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-[#003366]"
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#003366] transition-colors p-1"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  )}

                  {view === "login" && (
                    <button
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-[10px] font-black text-[#C5A059] hover:text-[#003366] uppercase tracking-widest w-full text-right"
                    >
                      Forgot Password?
                    </button>
                  )}

                  <div className="flex items-center gap-3 px-1 py-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="accent-[#003366] cursor-pointer w-4 h-4 shrink-0"
                    />
                    <label
                      htmlFor="terms"
                      className="text-[10px] text-slate-500 font-bold uppercase tracking-tight cursor-pointer leading-none"
                    >
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setLegalView("terms")}
                        className="text-[#003366] font-black hover:text-[#C5A059] transition-colors uppercase"
                      >
                        Terms of Service
                      </button>{" "}
                      &{" "}
                      <button
                        type="button"
                        onClick={() => setLegalView("privacy")}
                        className="text-[#003366] font-black hover:text-[#C5A059] transition-colors uppercase"
                      >
                        Privacy Protocol
                      </button>
                    </label>
                  </div>

                  <button
                    disabled={loading || !agreed}
                    className={`w-full py-4 rounded-xl font-black shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 text-sm uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed ${
                      view === "signup"
                        ? "bg-[#C5A059] text-[#003366]"
                        : "bg-[#003366] text-white"
                    }`}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mx-auto" size={18} />
                    ) : view === "login" ? (
                      "Login"
                    ) : view === "signup" ? (
                      "Register"
                    ) : (
                      "Send Link"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={() =>
                      setView(view === "login" ? "signup" : "login")
                    }
                    className="text-[11px] font-black text-[#003366] uppercase tracking-widest hover:text-[#C5A059]"
                  >
                    {view === "login"
                      ? "New researcher? Create Account"
                      : "Already have an account? Log in"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
