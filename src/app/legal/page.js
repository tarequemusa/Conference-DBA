"use client";

import {
  ArrowLeft,
  ChevronUp,
  Database,
  EyeOff,
  FileText,
  Gavel,
  Globe,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// --- SUB-COMPONENTS ---
function PrivacySection() {
  const sections = [
    {
      title: "Data Sovereignty & AI Ethics",
      icon: Globe,
      content:
        "In compliance with 2026 academic standards, Conference DBA guarantees 'Research Sovereignty'. Submitted manuscripts are protected by a 'No-LLM' clause, ensuring your intellectual property is never used to train third-party AI models.",
    },
    {
      title: "Personal Identity & ORCID Integration",
      icon: Database,
      content:
        "We collect professional metadata including institutional affiliations and ORCID iDs to ensure accurate citation mapping. Personal contact data is encrypted via AES-256.",
    },
    {
      title: "On-Site Privacy (Dhaka 2026)",
      icon: EyeOff,
      content:
        "For physical attendees at East West University, digital check-in logs and temporary biometric data are purged from our local servers within 72 hours.",
    },
    {
      title: "Cookies & Persistent Tracking",
      icon: ShieldCheck,
      content:
        "Our portal uses essential session cookies only. We do not employ cross-site tracking, maintaining a clean 'Researcher-First' digital environment.",
    },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,51,102,0.05)] border border-slate-100 animate-in fade-in zoom-in duration-700">
      <div className="space-y-12">
        {sections.map((sec, i) => (
          <div key={i} className="flex gap-6 group">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all duration-500 shrink-0">
              <sec.icon size={24} />
            </div>
            <div>
              <h4 className="font-bold text-[#003366] uppercase text-sm tracking-tight mb-3">
                {sec.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {sec.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TermsSection() {
  const terms = [
    {
      label: "Submission Originality",
      desc: "Similarity index exceeding 15% results in immediate disqualification.",
    },
    {
      label: "Indexing & Publication",
      desc: "Accepted papers are submitted for Scopus indexing, subject to publisher editorial benchmarks.",
    },
    {
      label: "The 'No-Show' Clause",
      desc: "At least one author must present. No-show papers are removed from final repository publication.",
    },
    {
      label: "Refund & Hybrid Switch",
      desc: "Refunds permitted until June 10 (minus 25% fee). Switch to virtual allowed until June 1.",
    },
  ];

  return (
    <div className="bg-[#003366] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        {terms.map((term, i) => (
          <div
            key={i}
            className="space-y-3 border-l-2 border-[#C5A059]/30 pl-6 hover:border-[#C5A059] transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <FileText size={14} className="text-[#C5A059]" />
              <h4 className="font-bold text-[#C5A059] text-[10px] uppercase tracking-[0.2em]">
                {term.label}
              </h4>
            </div>
            <p className="text-white/70 text-xs leading-relaxed font-medium italic">
              {term.desc}
            </p>
          </div>
        ))}
      </div>
      <Scale
        size={280}
        className="absolute -bottom-20 -right-20 text-white opacity-[0.03] rotate-12"
      />
    </div>
  );
}

// --- MAIN PAGE ---
export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("privacy");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FDFCFB] selection:bg-[#C5A059] selection:text-white">
      {/* 🧭 UNIFIED HEADER */}
      <nav className="fixed top-0 left-0 w-full z-[1000] bg-[#003366] h-[80px] px-6 md:px-12 flex justify-between items-center shadow-2xl border-b border-white/10">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center transition-all group-hover:bg-[#C5A059] group-hover:text-[#003366] text-[#C5A059]">
            <ArrowLeft size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-[12px] uppercase tracking-widest leading-none">
              Back to <span className="text-[#C5A059]">Home</span>
            </span>
            <span className="text-white/40 font-black text-[8px] uppercase tracking-[0.4em] mt-1 italic">
              Conference DBA 2026
            </span>
          </div>
        </Link>

        <div className="hidden sm:flex flex-col items-end">
          <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] leading-none opacity-40">
            Institutional Protocol
          </h3>
          <span className="text-[#C5A059] font-black text-[9px] uppercase tracking-widest mt-1 block">
            Verified Standard
          </span>
        </div>
      </nav>

      {/* 🟦 Top Navy Hero Section */}
      <div className="w-full bg-[#003366] pt-48 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-[2rem] text-[#C5A059] mb-8 border border-white/10 shadow-2xl">
            <Gavel size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            Legal <span className="text-[#C5A059]">Compliance</span>
          </h1>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center -mt-12 pb-32 px-6">
        {/* Tab Switcher */}
        <div className="flex bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 mb-20">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-12 py-5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "privacy"
                ? "bg-[#003366] text-white shadow-xl scale-105"
                : "text-slate-400 hover:text-[#003366]"
            }`}
          >
            Privacy Protocol
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-12 py-5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "terms"
                ? "bg-[#C5A059] text-[#003366] shadow-xl scale-105"
                : "text-slate-400 hover:text-[#003366]"
            }`}
          >
            Terms of Service
          </button>
        </div>

        <div className="max-w-5xl w-full">
          {activeTab === "privacy" ? <PrivacySection /> : <TermsSection />}
        </div>
      </main>

      {/* 🏁 UPDATED: Premium Navy Footer Background */}
      <footer className="relative w-full bg-[#003366] py-20 px-6 overflow-hidden">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
        {/* Top Glowing Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h4 className="text-white font-black text-[12px] uppercase tracking-[0.2em] mb-3">
              East West <span className="text-[#C5A059]">University</span>
            </h4>
            <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest max-w-sm leading-relaxed">
              Department of Business Administration • Official Institutional
              Portal for Research Compliance
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#003366] transition-all shadow-xl active:scale-95"
            >
              Return to Top{" "}
              <ChevronUp
                size={16}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>

        <div className="mt-16 text-center border-t border-white/5 pt-8 text-[9px] text-white/20 font-mono uppercase tracking-[0.4em]">
          © 2026 EWU Conference Committee • Verified March Cycle • Ref_ID:
          EWU-LEGAL-DBA
        </div>
      </footer>
    </div>
  );
}
