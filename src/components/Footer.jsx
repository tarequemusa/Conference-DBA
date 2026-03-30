"use client";

import {
  ArrowUpCircle,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Footer() {
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const scrollToSection = (id) => {
    // 🚀 FIX: Map "important dates" (with space) to "guidelines"
    const sectionId = id === "important dates" ? "important-dates" : id;
    const element = document.getElementById(sectionId);

    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else {
      // 🚀 Fallback for cross-page navigation
      router.push(`/#${sectionId}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#003366] text-white pt-16 pb-36 md:pb-24 px-6 relative overflow-hidden border-t border-white/5">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full -mr-48 -mt-48 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Column 1: Branding */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="relative aspect-square w-14 h-14 bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden p-2 border border-white/10 shadow-2xl group cursor-pointer"
            >
              <Image
                src="/images/logo.png"
                alt="EWU Logo"
                fill
                sizes="56px"
                className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
            <h2 className="text-xl font-black tracking-tighter border-l-4 border-[#C5A059] pl-4 leading-tight uppercase">
              DBA
              <span className="text-[#C5A059]"> Conference</span>
              <br /> 2026
            </h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            The Conference on Building Resilient Supply Chains offers a vibrant
            forum for exploring how organizations can effectively anticipate,
            withstand, and recover from disruptions in today's volatile global
            landscape.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-[#C5A059] hover:text-[#003366] hover:border-[#C5A059] transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div>
          <h3 className="text-[#C5A059] font-black mb-6 uppercase tracking-[0.2em] text-[11px]">
            Quick Links
          </h3>
          <ul className="space-y-3 text-[13px] text-slate-400 font-medium">
            {[
              "About",
              "Speakers",
              "Timeline",
              "Guidelines",
              "Important Dates",
              "Committee",
              "FAQ",
            ].map((item) => (
              <li key={item}>
                {item === "Timeline" ? (
                  <Link
                    href="/schedule"
                    className="hover:text-[#C5A059] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-[#C5A059] group-hover:w-3 transition-all"></span>
                    Timeline
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="hover:text-[#C5A059] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-[#C5A059] group-hover:w-3 transition-all"></span>
                    {item}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Researcher Portal */}
        <div>
          <h3 className="text-[#C5A059] font-black mb-6 uppercase tracking-[0.2em] text-[11px]">
            Researcher Portal
          </h3>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => {
                  setAuthMode("login");
                  setIsAuthOpen(true);
                }}
                className="text-[13px] text-slate-400 hover:text-white transition font-medium"
              >
                Login to Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setIsAuthOpen(true);
                }}
                className="bg-[#C5A059] text-[#003366] px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
              >
                Register Now
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setIsAuthOpen(true);
                }}
                className="group flex items-center justify-center gap-2 border border-white/30 bg-white/5 backdrop-blur-md px-8 py-4 rounded-xl font-bold uppercase text-[0.6875rem] tracking-widest hover:bg-white hover:text-[#003366] transition-all duration-300 active:scale-95"
              >
                Call for Paper
              </button>
            </li>
            <li className="text-[11px] text-slate-500 mt-4 italic flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Submission portal is active.
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-[#C5A059] font-black mb-6 uppercase tracking-[0.2em] text-[11px]">
            Location
          </h3>
          <div className="space-y-5 text-[13px] text-slate-400 font-medium">
            <p className="flex items-start gap-3">
              <MapPin className="text-[#C5A059] shrink-0" size={18} />
              <span className="leading-relaxed">
                East West University <br /> A/2, Jahurul Islam Avenue <br />{" "}
                Jahurul Islam City, Aftabnagar
                <br />
                Dhaka-1212, Bangladesh
              </span>
            </p>
            <p className="flex items-center gap-3 group">
              <Mail
                className="text-[#C5A059] shrink-0 group-hover:scale-110 transition-transform"
                size={18}
              />
              <span className="group-hover:text-white transition-colors">
                helpdesk-scm@ewubd.edu
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="text-[#C5A059] shrink-0" size={18} />
              <span>+880 9666775577, Ext-213/132</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-medium text-slate-500 uppercase tracking-widest">
        <p className="text-center md:text-left">
          © 2026 Conference DBA. Managed by SWD of ICS, EWU.
        </p>

        <div className="flex gap-8">
          <Link
            href="/legal"
            className="hover:text-[#C5A059] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/legal"
            className="hover:text-[#C5A059] transition-colors"
          >
            Terms of Service
          </Link>
        </div>

        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-slate-400 hover:text-[#C5A059] transition-all bg-white/5 px-4 py-2 rounded-full border border-white/5"
        >
          Top{" "}
          <ArrowUpCircle
            className="group-hover:-translate-y-1 transition-transform"
            size={16}
          />
        </button>
      </div>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView={authMode}
      />
    </footer>
  );
}
