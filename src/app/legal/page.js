"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  CheckCircle,
  Database,
  EyeOff,
  FileText,
  Gavel,
  Globe,
  Scale,
  ShieldCheck,
} from "lucide-react";
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
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-700">
      <div className="space-y-12">
        {sections.map((sec, i) => (
          <div key={i} className="flex gap-6 group">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all shrink-0">
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

function EthicsSection() {
  const ethics = [
    {
      title: "Double-Blind Peer Review",
      content:
        "To ensure unbiased evaluation, both the reviewer and author identities are concealed throughout the review process.",
    },
    {
      title: "Conflict of Interest",
      content:
        "All participants must disclose any financial or personal relationships that could inappropriately influence their work.",
    },
    {
      title: "COPE Compliance",
      content:
        "Conference DBA 2026 strictly adheres to the Code of Conduct and Best Practice Guidelines set by the Committee on Publication Ethics.",
    },
    {
      title: "Human & Animal Rights",
      content:
        "Research involving human subjects must confirm that informed consent was obtained and ethical approval was granted.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-700">
      {ethics.map((item, i) => (
        <div
          key={i}
          className="bg-white p-8 rounded-[2rem] border border-[#C5A059]/20 shadow-lg relative group overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
            <CheckCircle size={40} className="text-[#C5A059]" />
          </div>
          <h4 className="text-[#003366] font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C5A059]" /> {item.title}
          </h4>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
}

// --- MAIN PAGE ---
export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("privacy");
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative min-h-screen w-full bg-[#FDFCFB] selection:bg-[#C5A059] selection:text-white">
      <Navbar />

      {/* --- HERO HEADER --- */}
      <div className="w-full bg-[#003366] pt-48 pb-24 px-6 text-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[100px] -mr-48 -mt-48" />

        {/* 🚀 VERIFIED BY AUTHORITY BUTTON (Positioned Top Right with Green Blink) */}
        <div className="absolute top-[120px] right-10 z-20 group">
          <button className="relative flex items-center gap-4 bg-[#001A41] border border-white/10 p-2 pr-6 rounded-2xl shadow-2xl group-hover:scale-105 transition-all duration-500">
            {/* 🟢 Parrot Green Blinking Dot */}
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#32CD32] shadow-[0_0_10px_#32CD32] animate-pulse"></div>

            <div className="w-10 h-10 bg-[#C5A059] rounded-xl flex items-center justify-center text-[#001A41] shadow-inner">
              <ShieldCheck size={20} />
            </div>
            <div className="text-left">
              <p className="text-[7px] font-black text-[#C5A059] uppercase tracking-[0.2em] leading-none mb-1">
                Institutional
              </p>
              <p className="text-[9px] font-black text-white uppercase tracking-widest">
                Verified by Authority
              </p>
            </div>
          </button>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 mt-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-[2rem] text-[#C5A059] mb-8 border border-white/10 shadow-2xl">
            <Gavel size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            Legal <span className="text-[#C5A059]">Compliance</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-6">
            Protocol Reference: EWU-DBA-2026-LEG
          </p>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center -mt-12 pb-32 px-6">
        {/* Tab Switcher */}
        <div className="flex bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 mb-20 overflow-x-auto max-w-full">
          {["privacy", "terms", "ethics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-10 py-5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? "bg-[#003366] text-white shadow-xl scale-105" : "text-slate-400 hover:text-[#003366]"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-w-5xl w-full">
          {activeTab === "privacy" && <PrivacySection />}
          {activeTab === "terms" && <TermsSection />}
          {activeTab === "ethics" && <EthicsSection />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
