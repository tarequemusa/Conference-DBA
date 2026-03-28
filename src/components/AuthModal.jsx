"use client";
import {
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  RotateCcw,
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
  const [legalView, setLegalView] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // --- MATH CAPTCHA LOGIC ---
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, userAns: "" });
  const generateCaptcha = () => {
    setCaptcha({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1,
      userAns: "",
    });
  };

  useEffect(() => {
    if (isOpen) {
      // 🚀 Detect submission intent and route to signup
      if (initialView === "submission") {
        setView("signup");
      } else {
        setView(initialView);
      }
      setIsEmailSent(false);
      setLegalView(null);
      setShowPassword(false);
      setAgreed(false);
      generateCaptcha();
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

  const isCaptchaCorrect = parseInt(captcha.userAns) === captcha.a + captcha.b;
  const isSubmitDisabled =
    loading || !isCaptchaCorrect || (view === "signup" && !agreed);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });
      if (result?.ok) {
        setCaptcha((prev) => ({ ...prev, userAns: "" }));
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error("Google authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isCaptchaCorrect =
      parseInt(captcha.userAns) === captcha.a + captcha.b;
    if (!isCaptchaCorrect) {
      toast.error("Mathematical verification failed.");
      generateCaptcha();
      return;
    }

    setLoading(true);
    try {
      if (view === "forgot") {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        if (res.ok) setIsEmailSent(true);
        else {
          const data = await res.json();
          toast.error(data.error || "Failed to send reset link.");
        }
      } else if (view === "login") {
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        if (res?.ok) {
          toast.success("Login successful!");
          window.location.href = "/dashboard";
        } else {
          toast.error(res?.error || "Invalid credentials.");
        }
      } else if (view === "signup") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          toast.success("Registration successful! Please login.");
          setView("login");
        } else {
          const data = await res.json();
          toast.error(data.error || "Registration failed.");
        }
      }
    } catch (error) {
      toast.error("A connection error occurred.");
    } finally {
      setLoading(false);
      setCaptcha((prev) => ({ ...prev, userAns: "" }));
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-hidden">
      <div
        className={`bg-white w-full transition-all duration-500 ease-in-out ${view === "signup" ? "max-w-[950px]" : "max-w-[450px]"} rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-300 max-h-[95vh] my-auto`}
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
              <span className="text-white/60 text-[10px] tracking-[0.15em] mt-1 font-medium uppercase">
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
              <button
                onClick={() => setLegalView(null)}
                className="absolute top-8 left-8 flex items-center gap-2 text-[#C5A059] font-black text-xs hover:text-white transition-colors uppercase tracking-widest"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <div className="max-w-xl mx-auto md:mx-0 mt-12 md:mt-0 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 uppercase">
                  {LegalContent[legalView].title} 2026
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
                    View Details <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {view === "signup" && (
            <div className="hidden md:flex md:w-5/12 bg-[#003366]/95 p-12 text-white flex flex-col justify-center border-r border-white/5 shrink-0 animate-in slide-in-from-left duration-500">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
                Researcher Portal
              </h2>
              <ul className="space-y-5">
                {[
                  "Secure Abstract Submission",
                  "Real Time Peer Review Tracking",
                  "Digital Certification",
                  "Early Bird Registration",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-black uppercase tracking-tight"
                  >
                    <CheckCircle2 className="text-[#C5A059] w-5 h-5 shrink-0" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-white/40 italic font-black mt-auto uppercase tracking-widest">
                © Conference DBA 2026
              </p>
            </div>
          )}

          <div
            className={`${view === "signup" ? "md:w-7/12" : "w-full"} p-8 md:p-12 bg-white flex flex-col justify-center`}
          >
            {isEmailSent ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-in fade-in zoom-in duration-500 min-h-[400px] bg-[#003366] rounded-[2rem]">
                <div className="relative w-20 h-20 mb-8">
                  <div className="absolute inset-0 bg-[#C5A059]/20 rounded-full animate-ping"></div>
                  <div className="relative w-20 h-20 bg-[#C5A059]/10 border-2 border-[#C5A059] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                    <CheckCircle2 size={40} className="text-[#C5A059]" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-[0.1em] mb-4">
                  SENT!
                </h3>
                <p className="text-slate-300 text-base font-medium leading-relaxed max-w-[280px] mx-auto mb-10">
                  Your request has been received. A recovery email has been sent
                  to your inbox.
                </p>
                <button
                  onClick={() => {
                    setIsEmailSent(false);
                    setView("login");
                    generateCaptcha();
                  }}
                  className="text-[#C5A059] font-black text-xs uppercase tracking-[0.2em] hover:text-white transition-all underline underline-offset-8 decoration-1"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center md:text-left">
                  {view === "forgot" && (
                    <button
                      onClick={() => setView("login")}
                      className="flex items-center gap-1 text-[10px] font-black text-[#C5A059] mb-4 hover:text-[#003366] transition-colors uppercase tracking-widest"
                    >
                      <ChevronLeft size={14} /> Back to Login
                    </button>
                  )}
                  <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tighter leading-none">
                    {initialView === "submission"
                      ? "Welcome Researcher"
                      : view === "login"
                        ? "Researcher Login"
                        : view === "signup"
                          ? "Create Account"
                          : "Recover Password"}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium mt-1 uppercase italic">
                    {initialView === "submission"
                      ? "Register to begin your submission"
                      : view === "login"
                        ? "Access your dashboard"
                        : view === "signup"
                          ? "Register for Conference DBA 2026"
                          : "Reset your link"}
                  </p>
                </div>

                {view !== "forgot" && (
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={loading || !isCaptchaCorrect}
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
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-5 h-5" />
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
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-5 h-5" />
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
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-5 h-5" />
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
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm shrink-0">
                      <span className="text-sm font-black text-[#003366] tracking-widest">
                        {captcha.a} + {captcha.b} =
                      </span>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="Sum"
                      value={captcha.userAns}
                      onChange={(e) =>
                        setCaptcha({ ...captcha, userAns: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#C5A059] outline-none text-sm font-bold text-center no-spinner"
                    />
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-2 text-slate-400 hover:text-[#C5A059] transition-colors"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                  {view === "signup" && (
                    <div className="flex items-center gap-3 px-1">
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
                          className="text-[#003366] font-black uppercase"
                        >
                          Terms of Service
                        </button>{" "}
                        &{" "}
                        <button
                          type="button"
                          onClick={() => setLegalView("privacy")}
                          className="text-[#003366] font-black uppercase"
                        >
                          Privacy Protocol
                        </button>
                      </label>
                    </div>
                  )}
                  <button
                    disabled={isSubmitDisabled}
                    className={`w-full py-4 rounded-xl font-black shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 text-sm uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed ${view === "signup" ? "bg-[#C5A059] text-[#003366]" : "bg-[#003366] text-white"}`}
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
                    className="text-[11px] font-black text-[#C5A059] uppercase tracking-widest hover:text-[#003366]"
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
