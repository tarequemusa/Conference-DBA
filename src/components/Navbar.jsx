"use client";

import { LogOut, Mail, Menu, Phone, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Dates", id: "important-dates" },
    { name: "Guidelines", id: "guidelines" },
    { name: "Committee", id: "committee" },
    { name: "Pricing", id: "pricing" },
    { name: "Partners", id: "partners" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    } else {
      router.push(`/#${id}`);
    }
  };

  useEffect(() => {
    setMounted(true);

    // 🚀 FIX: Handle initial scroll state immediately on mount/refresh
    const handleInitialState = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 10);
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 10);

      if (scrollPos < 300) {
        setActiveSection("");
        return;
      }

      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = scrollPos + 150;
      sections.forEach((section) => {
        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    handleInitialState(); // Run once immediately
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted)
    return <div className="h-20 bg-[#002147] fixed top-0 w-full z-[100]" />;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-[#002147]/95 backdrop-blur-xl shadow-2xl py-2"
            : "bg-[#002147] py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* 🚀 TOP CONTACT BAR */}
          <div
            className={`hidden lg:flex justify-end transition-all duration-500 ${isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-9 opacity-100 mb-1"}`}
          >
            <div className="flex items-center gap-5 px-5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <a
                href="mailto:helpdesk-scm@ewubd.edu"
                className="flex items-center gap-2 group"
              >
                <Mail size={14} className="text-[#C5A059]" />
                <span className="text-[11px] font-bold text-white uppercase group-hover:text-[#C5A059] transition-colors tracking-wider">
                  helpdesk-scm@ewubd.edu
                </span>
              </a>
              <div className="w-px h-3 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#C5A059]" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  09666775577 | EXT-213/132
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-xl overflow-hidden bg-white/10 border border-white/20 p-1.5 transition-all">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  sizes="(max-width: 768px) 44px, 56px"
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="flex flex-col uppercase leading-none text-white">
                <h1 className="font-black text-sm md:text-xl tracking-tighter">
                  DBA <span className="text-[#C5A059]">CONFERENCE</span>
                </h1>
                <p className="text-[7px] md:text-[9px] text-white/40 font-bold tracking-[0.15em] mt-1">
                  International 2026
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1.5 xl:gap-3">
              <div className="flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-3 xl:px-4 py-2 rounded-full text-[10px] xl:text-[11px] font-black uppercase transition-all duration-300 border ${activeSection === link.id ? "bg-white/10 border-white/40 text-white shadow-lg" : "text-white/70 border-transparent hover:text-white"}`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              <div className="h-5 w-px bg-white/10 mx-1 xl:mx-2"></div>
              <div className="flex items-center gap-3 xl:gap-5">
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="text-white/40 hover:text-red-400"
                  >
                    <LogOut size={15} />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthMode("login");
                        setIsAuthOpen(true);
                      }}
                      className="text-white font-black text-[10px] hover:text-[#C5A059]"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode("signup");
                        setIsAuthOpen(true);
                      }}
                      className="bg-[#C5A059] text-[#002147] px-5 py-2.5 rounded-xl font-black text-[10px] hover:bg-white active:scale-95 transition-all"
                    >
                      Join Now
                    </button>
                  </>
                )}
              </div>
            </div>
            <button
              className="lg:hidden p-2 text-white bg-white/5 rounded-xl"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE DRAWER --- */}
      <div
        className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-[#001021]/95 backdrop-blur-md transition-opacity ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] bg-[#002147] p-6 transition-transform duration-500 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 border border-white/20 p-1.5">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col uppercase leading-tight">
                <h2 className="text-[#C5A059] font-black text-sm">
                  <span className="text-[rgb(255,255,255)]">DBA</span>{" "}
                  CONFERENCE
                </h2>
                <p className="text-[9px] text-white/40 font-bold tracking-[0.1em]">
                  INTERNATIONAL 2026
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl font-bold uppercase transition-all text-xs tracking-wide group border-b border-white/5 last:border-0 ${
                  activeSection === link.id
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5"
                }`}
              >
                {link.name}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all ${activeSection === link.id ? "bg-[#C5A059] scale-125 shadow-[0_0_8px_#C5A059]" : "bg-white/10 group-hover:bg-[#C5A059]"}`}
                />
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="space-y-3 mb-6 px-2">
              <div className="flex items-center gap-3 text-white/50 text-[11px] font-bold">
                <Mail size={14} className="text-[#C5A059]" />{" "}
                helpdesk-scm@ewubd.edu
              </div>
              <div className="flex items-center gap-3 text-white/50 text-[11px] font-bold">
                <Phone size={14} className="text-[#C5A059]" /> 09666775577
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setIsAuthOpen(true);
                  setAuthMode("login");
                  setIsMobileMenuOpen(false);
                }}
                className="py-3.5 border border-white/10 text-white rounded-xl font-black uppercase text-[10px] bg-white/5"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsAuthOpen(true);
                  setAuthMode("signup");
                  setIsMobileMenuOpen(false);
                }}
                className="py-3.5 bg-[#C5A059] text-[#002147] rounded-xl font-black uppercase text-[10px] shadow-lg"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView={authMode}
      />
    </>
  );
}
