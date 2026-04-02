"use client";
import {
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  Loader2,
  Lock,
  Mail,
  RotateCcw,
  User,
  Users,
  X,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Samoa",
  "San Marino",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function AuthModal({ isOpen, onClose, initialView = "login" }) {
  const [view, setView] = useState(initialView);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [legalView, setLegalView] = useState(null);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    userType: "",
  });

  const [captcha, setCaptcha] = useState({ a: 0, b: 0, userAns: "" });

  const generateCaptcha = () => {
    setCaptcha({
      a: Math.floor(Math.random() * 9) + 1,
      b: Math.floor(Math.random() * 9) + 1,
      userAns: "",
    });
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setView(initialView === "submission" ? "signup" : initialView);
      setIsEmailSent(false);
      setLegalView(null);
      setShowPassword(false);
      setAgreed(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        country: "",
        userType: "",
      });
      generateCaptcha();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialView]);

  // 🚀 Logic: Dynamic User Type based on country selection
  const handleCountryChange = (val) => {
    let type = "";
    if (val === "Bangladesh") {
      type = "Local";
    } else if (val !== "" && val !== "Bangladesh") {
      type = "International";
    }
    setFormData({ ...formData, country: val, userType: type });
  };

  // 🚀 Logic: Password Validation (Min 8 chars, 1 uppercase, 1 number)
  const isPasswordValid = (pw) => {
    return pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
  };

  if (!isOpen) return null;

  const LegalContent = {
    privacy: {
      title: "Privacy Protocol",
      text: "Authors retain 100% intellectual property. Research papers are shielded from third-party AI training bots. Personal data is encrypted via AES-256 standards. On-site check-in logs are purged 72 hours post-event for maximum attendee privacy.",
    },
    terms: {
      title: "Terms of Service",
      text: "Plagiarism limit is strictly <15%. Registration fees are non-refundable after June 15, 2026. Authors must present their work (physically or virtually) to be included in the final Scopus-indexed proceedings.",
    },
  };

  const handleViewChange = (newView) => {
    setView(newView);
    generateCaptcha();
    setAgreed(false);
    setShowPassword(false);
  };

  const isCaptchaCorrect = parseInt(captcha.userAns) === captcha.a + captcha.b;
  const isSubmitDisabled =
    loading ||
    !isCaptchaCorrect ||
    (view === "signup" &&
      (!agreed ||
        !formData.country ||
        !formData.userType ||
        !formData.name ||
        !isPasswordValid(formData.password)));

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });
      if (result?.error) toast.error("Google Auth Failed");
      else if (result?.ok) {
        toast.success("Login Successful!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error("An error occurred with Google Sign-in");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCaptchaCorrect) {
      toast.error("Mathematical verification failed.");
      generateCaptcha();
      return;
    }

    setLoading(true);
    try {
      if (view === "login") {
        const res = await signIn("credentials", {
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          redirect: false,
        });
        if (res?.ok) {
          toast.success("Welcome Back! Login Successful.");
          window.location.href = "/dashboard";
        } else {
          toast.error(res?.error || "Invalid Credentials.");
          generateCaptcha();
        }
      } else if (view === "signup") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            email: formData.email.toLowerCase().trim(),
          }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Account Created! You are Registered.");

          // 🚀 Trigger Welcome/Registration Confirmation Email
          await fetch("/api/auth/send-welcome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              name: formData.name,
            }),
          });

          handleViewChange("login");
        } else if (
          res.status === 400 &&
          data.error === "Email already in use"
        ) {
          toast.error("You are already Registered. Please Login.");
          setTimeout(() => handleViewChange("login"), 1500);
        } else {
          toast.error(data.error || "Registration Failed.");
          generateCaptcha();
        }
      } else if (view === "forgot") {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        if (res.ok) {
          setIsEmailSent(true);
          toast.success("Recovery link sent!");
        } else {
          toast.error("User not found.");
        }
      }
    } catch (error) {
      toast.error("Server connection error. Please try again later.");
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onMouseDown={handleOutsideClick}
      className="fixed inset-0 z-[150] flex items-center justify-center p-2 md:p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
    >
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className={`bg-white w-full transition-all duration-500 ease-in-out ${view === "signup" ? "max-w-[1000px]" : "max-w-[450px]"} rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in max-h-[98vh] md:max-h-[92vh] my-auto`}
      >
        {/* Header (UI preserved) */}
        <div className="w-full bg-[#003366] p-4 flex items-center justify-between border-b border-white/10 shrink-0 relative z-[20]">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-black text-sm md:text-lg leading-none tracking-tight uppercase">
                DBA <span className="text-[#C5A059]">CONFERENCE</span>
              </h2>
              <span className="text-white/60 text-[8px] md:text-[10px] tracking-[0.15em] mt-1 font-medium uppercase">
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

        <div className="flex flex-col md:flex-row flex-grow relative min-h-0 overflow-hidden">
          {/* Legal View Overlay (UI preserved) */}
          {legalView && (
            <div className="absolute inset-0 z-[120] bg-[#003366] text-white p-8 md:p-16 animate-in slide-in-from-bottom duration-500 flex flex-col justify-center overflow-y-auto">
              <button
                onClick={() => setLegalView(null)}
                className="absolute top-8 left-8 flex items-center gap-2 text-[#C5A059] font-black text-xs hover:text-white transition-colors uppercase tracking-widest"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <div className="max-w-xl mx-auto md:mx-0 mt-12 md:mt-0 text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-4 uppercase">
                  {LegalContent[legalView].title} 2026
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                  {LegalContent[legalView].text}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
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

          {/* Left Sidebar (UI preserved) */}
          <div
            className={`hidden md:flex bg-[#003366]/95 text-white flex-col justify-center border-r border-white/5 shrink-0 transition-all duration-500 ${view === "signup" ? "w-5/12 p-10 opacity-100" : "w-0 p-0 opacity-0 overflow-hidden"}`}
          >
            <h2 className="text-xl font-black uppercase tracking-tight mb-6 whitespace-nowrap">
              Researcher Portal
            </h2>
            <ul className="space-y-4 whitespace-nowrap">
              {[
                "Secure Abstract Submission",
                "Real Time Peer Review Tracking",
                "Digital Certification",
                "Early Bird Registration",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-xs font-black uppercase tracking-tight"
                >
                  <CheckCircle2 className="text-[#C5A059] w-4 h-4 shrink-0" />{" "}
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[9px] text-white/40 italic font-black mt-12 uppercase tracking-widest">
              © CONFERENCE 2026
            </p>
          </div>

          <div
            className={`${view === "signup" ? "md:w-7/12" : "w-full"} p-6 md:p-10 bg-white flex flex-col justify-center transition-all duration-500 overflow-y-auto no-scrollbar`}
          >
            {isEmailSent ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-in fade-in zoom-in duration-500 min-h-[400px] bg-[#003366] rounded-[2rem] text-white shadow-2xl">
                <div className="relative w-20 h-20 mb-8">
                  <div className="absolute inset-0 bg-[#C5A059]/20 rounded-full animate-ping"></div>
                  <div className="relative w-20 h-20 bg-[#C5A059]/10 border-2 border-[#C5A059] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                    <CheckCircle2 size={40} className="text-[#C5A059]" />
                  </div>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-[0.1em] mb-4">
                  SENT!
                </h3>
                <p className="text-slate-300 text-base font-medium leading-relaxed max-w-[280px] mx-auto mb-10">
                  Recovery email sent to your inbox.
                </p>
                <button
                  onClick={() => {
                    setIsEmailSent(false);
                    handleViewChange("login");
                  }}
                  className="text-[#C5A059] font-black text-xs uppercase underline"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 text-center md:text-left">
                  {view === "forgot" && (
                    <button
                      onClick={() => handleViewChange("login")}
                      className="flex items-center gap-1 text-[10px] font-black text-[#C5A059] mb-3 uppercase hover:translate-x-[-2px] transition-transform"
                    >
                      <ChevronLeft size={14} /> Back to Login
                    </button>
                  )}
                  <h3 className="text-lg md:text-2xl font-black text-[#003366] uppercase tracking-tighter leading-none">
                    {view === "login"
                      ? "Researcher Login"
                      : view === "signup"
                        ? "Create Account"
                        : "Recover Password"}
                  </h3>
                  <p className="text-slate-500 text-[10px] font-medium mt-1 uppercase italic">
                    {view === "login"
                      ? "Access your dashboard"
                      : "Register for DBA Conference 2026"}
                  </p>
                </div>

                {view !== "forgot" && (
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-[9px] uppercase tracking-widest text-slate-700 mb-4 disabled:opacity-40"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <>
                        <img
                          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                          className="w-4 h-4"
                          alt="G"
                        />{" "}
                        Continue with Google
                      </>
                    )}
                  </button>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  {view === "signup" && (
                    <>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-4 h-4" />
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-[11px] font-bold text-[#003366]"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative group">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-4 h-4" />
                          <input
                            list="country-list"
                            required
                            placeholder="Select Country"
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-[11px] font-bold text-[#003366]"
                            value={formData.country}
                            onChange={(e) =>
                              handleCountryChange(e.target.value)
                            }
                          />
                          <datalist id="country-list">
                            {countries.map((c) => (
                              <option key={c} value={c} />
                            ))}
                          </datalist>
                        </div>
                        <div className="relative group">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-4 h-4" />
                          <select
                            required
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-[11px] font-bold text-[#003366] bg-white appearance-none"
                            value={formData.userType}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                userType: e.target.value,
                              })
                            }
                          >
                            <option value="">User Type</option>
                            {/* 🚀 Dynamic User Type Logic */}
                            {formData.country === "Bangladesh" ? (
                              <>
                                <option value="Local">Local</option>
                                <option value="Local (Student)">
                                  Local (Student)
                                </option>
                                <option value="Listener Only">
                                  Listener Only (Without Paper)
                                </option>
                              </>
                            ) : (
                              <option value="International">
                                International
                              </option>
                            )}
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-4 h-4" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-[11px] font-bold text-[#003366]"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  {view !== "forgot" && (
                    <div className="flex flex-col gap-1">
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-4 h-4" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="Password"
                          className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-[11px] font-bold text-[#003366]"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      {/* 🚀 Password Hint */}
                      {view === "signup" && (
                        <p
                          className={`text-[8px] font-bold px-1 transition-colors ${formData.password && !isPasswordValid(formData.password) ? "text-red-500" : "text-slate-400"}`}
                        >
                          Hint: Min 8 chars, 1 Uppercase, 1 Number.
                        </p>
                      )}
                    </div>
                  )}

                  {view === "login" && (
                    <button
                      type="button"
                      onClick={() => handleViewChange("forgot")}
                      className="text-[9px] font-black text-[#C5A059] hover:text-[#003366] uppercase w-full text-right transition-colors"
                    >
                      Forgot Password?
                    </button>
                  )}

                  <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="bg-white px-3 py-2 rounded-lg border border-slate-100 shrink-0">
                      <span className="text-xs font-black text-[#003366]">
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
                      className="w-full px-2 py-2 border border-slate-200 rounded-lg text-xs font-bold text-center outline-none focus:ring-1 focus:ring-[#C5A059]"
                    />
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-1.5 text-slate-400 hover:rotate-180 transition-transform duration-500"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>

                  {view === "signup" && (
                    <div className="flex items-center gap-2 px-1">
                      <input
                        type="checkbox"
                        id="terms-agree"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="accent-[#003366] w-3.5 h-3.5 cursor-pointer"
                      />
                      <label
                        htmlFor="terms-agree"
                        className="text-[10px] text-slate-600 font-bold uppercase tracking-tight cursor-pointer leading-none"
                      >
                        I agree to the{" "}
                        <button
                          type="button"
                          onClick={() => setLegalView("terms")}
                          className="text-[#003366] font-black"
                        >
                          Terms
                        </button>{" "}
                        &{" "}
                        <button
                          type="button"
                          onClick={() => setLegalView("privacy")}
                          className="text-[#003366] font-black"
                        >
                          Privacy
                        </button>
                      </label>
                    </div>
                  )}

                  <button
                    disabled={isSubmitDisabled}
                    className={`w-full py-3.5 rounded-xl font-black shadow-xl transition-all text-xs uppercase tracking-widest active:scale-95 disabled:opacity-40 ${view === "signup" ? "bg-[#C5A059] text-[#003366] disabled:bg-[#e6d5b8]" : "bg-[#003366] text-white disabled:bg-[#003366]/40"}`}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mx-auto" size={16} />
                    ) : view === "login" ? (
                      "Login"
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>

                <div className="mt-5 text-center pb-2">
                  <button
                    onClick={() =>
                      handleViewChange(view === "login" ? "signup" : "login")
                    }
                    className="text-[10px] font-black text-[#C5A059] uppercase hover:text-[#003366] transition-colors"
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
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
