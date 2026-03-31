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
  Lock,
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
        "Conference DBA guarantees 'Research Sovereignty'. Submitted manuscripts are protected by a 'No-LLM' clause, ensuring your work is never used to train commercial AI models.",
    },
    {
      title: "Identity & ORCID encryption",
      icon: Database,
      content:
        "We collect institutional affiliations and ORCID iDs to ensure accurate citation mapping. Sensitive personal data is encrypted via AES-256 and stored on localized sovereign servers.",
    },
    {
      title: "Cross-Border Data Transfer",
      icon: Lock,
      content:
        "International participant data is managed under strict GDPR and local Bangladesh digital security frameworks, ensuring safe transit for global academic collaboration.",
    },
    {
      title: "On-Site Privacy (EWU 2026)",
      icon: EyeOff,
      content:
        "For physical attendees at East West University, digital check-in logs and temporary biometric records are purged from our local infrastructure within 72 hours post-event.",
    },
    {
      title: "Zero-Tracking Policy",
      icon: ShieldCheck,
      content:
        "We use essential session cookies only. We do not employ third-party advertising pixels, cross-site tracking, or behavioral analytics that profile academic researchers.",
    },
  ];

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-700">
      <div className="space-y-6 md:space-y-12">
        {sections.map((sec, i) => (
          <div key={i} className="flex flex-row gap-4 md:gap-6 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all shrink-0">
              <sec.icon size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#003366] uppercase text-[11px] md:text-sm tracking-tight mb-1">
                {sec.title}
              </h4>
              <p className="text-slate-500 text-[11px] md:text-sm leading-relaxed font-medium">
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
      label: "Originality",
      desc: "Similarity index exceeding 15% results in disqualification. Self-plagiarism must be cited appropriately.",
    },
    {
      label: "Indexing",
      desc: "Accepted papers are submitted for Scopus and Web of Science indexing, subject to publisher editorial benchmarks.",
    },
    {
      label: "AI Usage",
      desc: "Use of Generative AI in research must be documented in the methodology. Purely AI-generated papers are strictly prohibited.",
    },
    {
      label: "Attendance",
      desc: "At least one author must register and present (physical or virtual). No-show results in removal from the final repository.",
    },
    {
      label: "Refunds",
      desc: "Refunds permitted until June 10 (minus 25% administrative fee). No refunds are processed after the early-bird deadline.",
    },
    {
      label: "Certification",
      desc: "Blockchain-verified digital certificates will be issued to all participants. Physical copies are available upon request.",
    },
    {
      label: "Intellectual Property",
      desc: "Authors retain copyright while granting the Conference the right of first publication and distribution.",
    },
  ];

  return (
    <div className="bg-[#003366] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative z-10">
        {terms.map((term, i) => (
          <div
            key={i}
            className="border-l-2 border-[#C5A059]/30 pl-4 hover:border-[#C5A059] transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <FileText size={12} className="text-[#C5A059]" />
              <h4 className="font-bold text-[#C5A059] text-[9px] uppercase tracking-[0.2em]">
                {term.label}
              </h4>
            </div>
            <p className="text-white/70 text-[11px] leading-relaxed italic">
              {term.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EthicsSection() {
  const ethics = [
    {
      title: "Double-Blind Peer Review",
      content:
        "To ensure unbiased evaluation, both the reviewer and author identities are concealed throughout the review process. Reviewers are assigned based on expertise to avoid institutional bias.",
    },
    {
      title: "AI Disclosure & Transparency",
      content:
        "Authors must explicitly disclose the use of Generative AI tools in the drafting or data analysis phases. AI cannot be listed as an author, and final accountability remains with the human contributors.",
    },
    {
      title: "COPE Compliance & Integrity",
      content:
        "Conference DBA 2026 strictly adheres to the Code of Conduct and Best Practice Guidelines set by the Committee on Publication Ethics (COPE) regarding data fabrication and falsification.",
    },
    {
      title: "Conflict of Interest",
      content:
        "All participants must disclose any financial, professional, or personal relationships that could inappropriately influence their research findings or the review outcome.",
    },
    {
      title: "Inclusive Research Practices",
      content:
        "We prioritize diversity in our scientific committee. Research involving marginalized communities must demonstrate ethical sensitivity and evidence of community-based participatory research values.",
    },
    {
      title: "Sustainability & Green Research",
      content:
        "In line with Dhaka 2026 climate initiatives, we encourage 'Carbon-Aware Research'. Preference is given to studies that demonstrate environmentally sustainable methodologies and resource management.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in fade-in zoom-in duration-700">
      {ethics.map((item, i) => (
        <div
          key={i}
          className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-[#C5A059]/20 shadow-lg relative group overflow-hidden"
        >
          {/* Subtle Background Icon */}
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <CheckCircle size={40} className="text-[#C5A059]" />
          </div>

          <h4 className="text-[#003366] font-black uppercase text-[10px] md:text-xs tracking-widest mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C5A059]" />{" "}
            {item.title}
          </h4>

          <p className="text-slate-500 text-[11px] md:text-sm leading-relaxed font-medium">
            {item.content}
          </p>

          {/* Hover Accent */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#C5A059] group-hover:w-full transition-all duration-500" />
        </div>
      ))}
    </div>
  );
}

// --- MAIN PAGE ---
export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div className="relative min-h-screen w-full bg-[#FDFCFB] selection:bg-[#C5A059] selection:text-white">
      <Navbar />

      {/* --- HERO HEADER --- */}
      <div className="w-full bg-[#003366] pt-28 pb-12 md:pt-48 md:pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[160px] bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none z-10" />

        {/* VERIFIED BADGE */}
        <div className="max-w-7xl mx-auto flex justify-center md:justify-end mb-8 md:-mb-10 relative z-20">
          <div className="relative flex flex-row items-center gap-3 bg-[#001A41] border border-white/10 p-1.5 pr-4 md:p-2 md:pr-6 rounded-full md:rounded-2xl shadow-2xl">
            <div className="absolute top-0 right-2 md:-top-1 md:-right-1 w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#32CD32] shadow-[0_0_10px_#32CD32] animate-pulse"></div>
            <div className="w-7 h-7 md:w-10 md:h-10 bg-[#C5A059] rounded-full md:rounded-2xl flex items-center justify-center text-[#001A41]">
              <ShieldCheck size={16} className="md:w-5 md:h-5" />
            </div>
            <div className="text-left leading-tight">
              <p className="text-[6px] md:text-[7px] font-black text-[#C5A059] uppercase tracking-wider">
                Institutional
              </p>
              <p className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">
                Verified by Authority
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-row items-center justify-center gap-3 md:gap-6 mb-2">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-white/5 rounded-xl md:rounded-[1.5rem] text-[#C5A059] flex items-center justify-center border border-white/10 shadow-lg">
              <Gavel size={20} className="md:w-8 md:h-8" />
            </div>
            <h1 className="text-2xl md:text-6xl font-black text-white tracking-tighter uppercase">
              Legal <span className="text-[#C5A059]">Compliance</span>
            </h1>
          </div>
          <p className="text-slate-400 text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            Protocol Ref: EWU-DBA-2026-LEG
          </p>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center -mt-6 md:-mt-10 pb-20 px-4">
        {/* Tab Switcher */}
        <div className="flex bg-white p-1 md:p-2 rounded-xl md:rounded-2xl shadow-xl border border-slate-100 mb-10 md:mb-16">
          {["privacy", "terms", "ethics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 md:px-10 py-2.5 md:py-4 rounded-lg md:rounded-[1.2rem] text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-[#003366] text-white shadow-lg"
                  : "text-slate-400 hover:text-[#003366]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-w-4xl w-full">
          {activeTab === "privacy" && <PrivacySection />}
          {activeTab === "terms" && <TermsSection />}
          {activeTab === "ethics" && <EthicsSection />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
