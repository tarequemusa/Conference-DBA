"use client";

import { LayoutDashboard, LogOut, Mail, Menu, Phone, X } from "lucide-react";
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
    { name: "Guidelines", id: "guidelines" },
    { name: "Dates", id: "important-dates" },
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
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 10);

      if (scrollPos < 100) {
        setActiveSection("");
        return;
      }

      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = scrollPos + 120;

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted)
    return <div className="h-20 bg-transparent fixed top-0 w-full z-[100]" />;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-[#002147]/95 backdrop-blur-xl shadow-2xl py-2"
            : "bg-transparent py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* 🚀 COMPACT TOP CONTACT BAR (Integrated) */}
          <div
            className={`hidden lg:flex justify-end transition-all duration-500 ${isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-7 opacity-100 mb-1"}`}
          >
            <div className="flex items-center gap-4 px-4 py-1 rounded-full bg-white/5 border border-white/10">
              <a
                href="mailto:helpdesk-scm@ewubd.edu"
                className="flex items-center gap-2 group"
              >
                <Mail size={11} className="text-[#C5A059]" />
                <span className="text-[9px] font-bold text-white/70 uppercase group-hover:text-white transition-colors">
                  helpdesk-scm@ewubd.edu
                </span>
              </a>
              <div className="w-px h-2.5 bg-white/10"></div>
              <div className="flex items-center gap-2">
                <Phone size={11} className="text-[#C5A059]" />
                <span className="text-[9px] font-bold text-white/70 uppercase">
                  09666775577 | EXT-213/132
                </span>
              </div>
            </div>
          </div>

          {/* 🚀 MAIN NAV ROW (Single Line Alignment) */}
          <div className="flex justify-between items-center gap-2">
            {/* Logo & Title Group */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-xl overflow-hidden bg-white/10 border border-white/20 p-1.5 transition-all group-hover:border-[#C5A059]/40">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  sizes="(max-width: 768px) 40px, 56px"
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="flex flex-col uppercase leading-none">
                <h1 className="text-white font-black text-sm md:text-xl tracking-tighter">
                  DBA <span className="text-[#C5A059]">CONFERENCE</span>
                </h1>
                <p className="text-[7px] md:text-[9px] text-white/40 font-bold tracking-[0.15em] mt-1">
                  International 2026
                </p>
              </div>
            </Link>

            {/* Navigation Pill (Reduced Gap) */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-3">
              <div className="flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-3 xl:px-4 py-2 rounded-full text-[10px] xl:text-[11px] font-black uppercase tracking-wider transition-all duration-300 border ${
                      activeSection === link.id
                        ? "bg-white border-white/40 text-[#002147] shadow-lg scale-105"
                        : "text-white/70 border-transparent hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="h-5 w-px bg-white/10 mx-1 xl:mx-2"></div>

              {/* Auth Actions (Merged into One Line) */}
              <div className="flex items-center gap-3 xl:gap-5">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-[#C5A059] font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5 hover:text-white"
                    >
                      <LayoutDashboard size={13} /> Dashboard
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="text-white/40 hover:text-red-400"
                    >
                      <LogOut size={15} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthMode("login");
                        setIsAuthOpen(true);
                      }}
                      className="text-white font-black text-[10px] uppercase tracking-[0.15em] hover:text-[#C5A059] transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode("signup");
                        setIsAuthOpen(true);
                      }}
                      className="bg-[#C5A059] text-[#002147] px-5 py-2.5 xl:px-7 xl:py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-white transition-all shadow-xl active:scale-95 whitespace-nowrap"
                    >
                      Join Now
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-[#001021]/95 backdrop-blur-md transition-opacity ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[80%] bg-[#002147] p-6 transition-transform duration-500 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-10">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10 p-1">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/50"
            >
              <X size={28} />
            </button>
          </div>
          <div className="space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-black text-xs uppercase transition-all ${activeSection === link.id ? "bg-[#C5A059] text-[#002147]" : "text-white/60 hover:text-white"}`}
              >
                {link.name}
              </button>
            ))}
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
