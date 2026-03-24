"use client";

import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const faqs = [
    {
      question: "What is the word limit for Abstracts?",
      answer:
        "Abstracts should be between 250 to 300 words, including objective, methodology, and results.",
    },
    {
      question: "Can I submit multiple papers?",
      answer:
        "A single registration covers one paper. An 'Additional Paper' fee applies for a second submission.",
    },
    {
      question: "Do you provide Visa Support Letters?",
      answer:
        "Yes. Once registered and paid, you can request an invitation letter via your dashboard.",
    },
    {
      question: "Are there specific paper templates?",
      answer:
        "We follow standard IEEE/APA formats. Templates are available in the Author Guidelines section.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      // FIX 1: Changed items-center to items-start and reduced pt for mobile to close the gap
      className="min-h-screen w-full flex items-start lg:items-center justify-center bg-[#FDFCFB] relative overflow-hidden pt-16 md:pt-24 pb-12"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#C5A059] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Header & CTA */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4 text-center lg:text-left">
              <h2 className="text-[#C5A059] text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                Support Center
              </h2>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none">
                Common <br /> <span className="text-[#C5A059]">Queries</span>
              </h3>
              <div className="w-16 h-1 bg-[#C5A059] mx-auto lg:mx-0"></div>
            </div>

            <div className="p-6 md:p-8 bg-[#003366] rounded-[2rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-white font-bold mb-4 text-xs md:text-sm">
                  Still have questions?
                </p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-[#C5A059] text-[#003366] py-3.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
                >
                  <MessageCircle size={14} /> Contact Secretariat
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Items */}
          <div className="lg:col-span-7 w-full flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "bg-white border-[#C5A059] shadow-xl"
                    : "bg-white/40 border-slate-100 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500 ${
                        openIndex === index
                          ? "bg-[#C5A059] text-[#003366]"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <HelpCircle size={16} />
                    </div>
                    <span
                      className={`font-bold text-[11px] md:text-sm leading-tight uppercase tracking-tight transition-colors duration-500 ${
                        openIndex === index
                          ? "text-[#003366]"
                          : "text-slate-600"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-500 ${openIndex === index ? "rotate-180 text-[#C5A059]" : "text-slate-300"}`}
                  />
                </button>

                {/* FIX 2: SMOOTH TRANSITION LOGIC */}
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100 mb-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-2 md:pb-4">
                      <p className="text-slate-500 text-[10px] md:text-[13px] leading-relaxed border-l-2 border-[#C5A059]/30 pl-4 font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
