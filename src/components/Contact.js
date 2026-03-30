"use client";

import {
  CheckCircle2,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, userAnswer: "" });

  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1,
      userAnswer: "",
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Effect to reset captcha whenever user decides to send another message
  useEffect(() => {
    if (!isSubmitted) {
      generateCaptcha();
    }
  }, [isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (parseInt(captcha.userAnswer) !== captcha.num1 + captcha.num2) {
      toast.error("Incorrect captcha answer. Please try again.");
      generateCaptcha();
      return;
    }

    setLoading(true);

    const formData = {
      name: form.fullName.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setLoading(false);
        setIsSubmitted(true);
        toast.success("Acknowledgement sent to your email!");
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error sending message. Please try again later.");
    }
  };

  return (
    // Adjusted py-24 to py-12 and used min-h-[calc(100vh-80px)] to fit viewport
    <section className="py-12 lg:py-16 bg-white min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.3em] mb-2">
            Get In Touch
          </h2>
          <h3 className="text-2xl md:text-4xl font-black text-[#003366] uppercase tracking-tighter">
            Contact & Venue
          </h3>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-12">
          {/* Left Side: Contact Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="bg-[#003366] p-8 rounded-[2rem] text-white relative overflow-hidden shadow-xl flex-grow flex flex-col justify-center">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#C5A059] mb-4">
                  <MapPin size={20} />
                </div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tighter">
                  Conference Venue
                </h4>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                    <img
                      src="/images/logo.png"
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-white font-black text-xl lg:text-xl md:text-2xl leading-none tracking-tight uppercase">
                      <span className="text-[#C5A059]">
                        East West University
                      </span>
                    </h3>
                  </div>
                </div>
                <p className="text-slate-300 leading-snug text-sm mt-4 mb-4">
                  A/2, Jahurul Islam Avenue, Jahurul Islam City
                  <br />
                  Aftabnagar, Dhaka-1212, Bangladesh
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#C5A059]" />
                    <span className="text-xs text-slate-200">
                      helpdesk-scm@ewubd.edu
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#C5A059]" />
                    <span className="text-xs text-slate-200">
                      09666775577, Ext-213/132
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
            </div>

            <div className="group p-6 rounded-[2rem] border border-slate-100 bg-slate-50 flex items-center justify-between transition-all duration-500 hover:bg-[#003366] hover:border-[#003366] hover:shadow-2xl cursor-pointer">
              <div className="transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 transition-colors duration-500 group-hover:text-white/60">
                  Official Website
                </p>
                <p className="text-[#003366] font-bold text-sm transition-colors duration-500 group-hover:text-white">
                  https://www.ewubd.edu
                </p>
              </div>

              {/* 🚀 Active State: Navy Background + Gold Zoomed Globe */}
              <div className="relative">
                <Globe
                  size={24}
                  className="text-slate-200 transition-all duration-700 ease-out group-hover:text-[#C5A059] group-hover:scale-125"
                />
                {/* Dynamic glow effect restricted to hover state */}
                <div className="absolute inset-0 bg-[#C5A059]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="relative">
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 lg:p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-500 h-full flex flex-col justify-center"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C5A059] focus:ring-0 transition-all outline-none bg-slate-50 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C5A059] focus:ring-0 transition-all outline-none bg-slate-50 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="2"
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C5A059] focus:ring-0 transition-all outline-none bg-slate-50 text-xs resize-none"
                  ></textarea>
                </div>

                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#003366] bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                      {captcha.num1} + {captcha.num2} = ?
                    </span>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-slate-400 hover:text-[#C5A059] transition-colors"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                  <input
                    type="number"
                    required
                    value={captcha.userAnswer}
                    onChange={(e) =>
                      setCaptcha({ ...captcha, userAnswer: e.target.value })
                    }
                    placeholder="Sum"
                    className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 outline-none focus:border-[#C5A059] text-xs font-bold text-center"
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-[#003366] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={14} />
                  ) : (
                    <Send size={14} />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="bg-[#003366] p-8 lg:p-12 rounded-[2rem] text-center flex flex-col items-center justify-center h-full min-h-[400px] text-white shadow-xl animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-[#C5A059] mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">
                  Sent!
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto mb-6">
                  Your inquiry has been received. An acknowledgement email has
                  been sent to your inbox.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C5A059] hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Map Section (Scrollable beyond 100vh) */}
        <div className="w-full h-[350px] lg:h-[400px] rounded-[2rem] bg-slate-100 overflow-hidden border border-slate-200 shadow-xl relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2171.1408531752254!2d90.42394291096932!3d23.768441426339592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c78bc678693d%3A0x3e87f7b866c0e38!2sEast+West+University!5e0!3m2!1sen!2sbd!4v1560409847860!5m2!1sen!2sbd"
            className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-1000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-lg hidden md:block">
            <p className="text-[#003366] font-bold text-[10px] uppercase tracking-widest">
              Aftabnagar, Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
