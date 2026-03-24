"use client";

import { ArrowUpRight, Megaphone } from "lucide-react";

export default function Marquee() {
  const newsItems = [
    {
      text: "Abstract Submission Deadline Extended to May 30, 2026!",
      link: "#guidelines",
    },
    {
      text: "Prof. Dr. Robert Higgins confirmed as Lead Keynote Speaker.",
      link: "#speakers",
    },
    {
      text: "Early Bird Registration is now OPEN — Save up to 20%!",
      link: "#pricing",
    },
    {
      text: "Special Session on 'AI in Supply Chain' added to the tracks.",
      link: "#about",
    },
    {
      text: "IEEE Bangladesh Section joins as Technical Co-Sponsor.",
      link: "#partners",
    },
  ];

  // Repeat the array for a seamless infinite scroll
  const scrollNews = [...newsItems, ...newsItems, ...newsItems];

  const scrollToSection = (id) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[90] bg-[#003366] text-white border-t border-white/10 py-3 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.3)] group">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        {/* Animated News Badge */}
        <div className="shrink-0 flex items-center gap-2 bg-[#C5A059] text-[#003366] px-4 py-1.5 rounded-full shadow-lg z-10">
          <Megaphone size={14} className="animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
            Updates
          </span>
        </div>

        {/* Scrolling Text Container */}
        <div className="relative flex overflow-x-hidden w-full items-center">
          <div className="flex animate-marquee whitespace-nowrap gap-16 items-center group-hover:[animation-play-state:paused]">
            {scrollNews.map((news, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(news.link)}
                className="flex items-center gap-2 transition-all duration-300 hover:text-[#C5A059] cursor-pointer group/item"
              >
                <span className="text-xs md:text-sm font-bold tracking-tight">
                  {news.text}
                </span>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <ArrowUpRight size={12} />
                </div>
                {/* Visual Separator between news items */}
                <span className="ml-8 text-white/20">|</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
