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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    } else {
      // 🚀 Fallback: If on another page, go home then scroll
      router.push(`/#${id}`);
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  if (!mounted)
    return <div className="h-20 bg-transparent fixed top-0 w-full z-[100]" />;

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Guidelines", id: "guidelines" },
    { name: "Timeline", path: "/schedule" },
    { name: "Committee", id: "committee" },
    { name: "Pricing", id: "pricing" },
    { name: "Partners", id: "partners" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${
          isScrolled
            ? "bg-[#003366]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        {/* 🚀 1. TOP BAR (Scrolls away, Not Sticky) */}
        <div
          className={`hidden lg:block w-full transition-all duration-500 ease-in-out relative ${
            isScrolled
              ? "max-h-0 opacity-0 pointer-events-none"
              : "max-h-20 opacity-100"
          }`}
        >
          <div className="absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-b from-black/50 to-transparent pointer-events-none opacity-70 -z-10" />

          <div className="max-w-7xl mx-auto px-10 flex justify-end items-center gap-6 py-2.5">
            <div className="flex items-center gap-2.5 cursor-default">
              <Mail size={13} className="text-[#C5A059]" />
              <span className="text-[11px] font-medium tracking-[0.12em] text-white/70 uppercase">
                helpdesk-scm@ewubd.edu
              </span>
            </div>
            <div className="w-px h-3 bg-white/10 mx-1"></div>
            <div className="flex items-center gap-2.5 cursor-default">
              <Phone size={13} className="text-[#C5A059]" />
              <span className="text-[11px] font-medium tracking-[0.12em] text-white/70 uppercase">
                09666775577 | Ext-213/132
              </span>
            </div>
          </div>
        </div>

        {/* 🚀 2. MAIN NAV ROW */}
        <div
          className={`transition-all duration-500 ${isScrolled ? "py-2 md:py-3" : "py-4 md:py-5"}`}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center">
            <Link
              href="/"
              className={`flex items-center gap-3 md:gap-4 group transition-transform duration-500 ${isScrolled ? "scale-95" : "scale-100"}`}
            >
              <div className="relative aspect-square w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden p-1.5 bg-white/5 border border-white/10">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  sizes="(max-width: 768px) 40px, 56px"
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="flex flex-col text-white leading-none uppercase">
                <h1 className="font-bold text-base md:text-xl tracking-tight">
                  DBA <span className="text-[#C5A059]">Conference</span>
                </h1>
                <span className="text-[8px] md:text-[10px] text-white/40 font-medium tracking-[0.2em] mt-1">
                  International 2026
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[13px] font-medium text-white/90">
              {navLinks.map((link) =>
                link.path ? (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="hover:text-[#C5A059] transition-colors relative group/link uppercase"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C5A059] transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-[#C5A059] transition-colors relative group/link uppercase"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C5A059] transition-all duration-300 group-hover/link:w-full"></span>
                  </button>
                ),
              )}

              <div className="h-4 w-px mx-2 bg-white/10"></div>

              {session ? (
                <div className="flex items-center gap-5">
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-[#C5A059] transition-all font-bold flex items-center gap-2 uppercase"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setIsAuthOpen(true);
                    }}
                    className="hover:text-[#C5A059] transition-colors font-bold uppercase tracking-widest text-[11px]"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setIsAuthOpen(true);
                    }}
                    className="bg-[#C5A059] text-[#003366] px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-all shadow-lg active:scale-95 uppercase tracking-widest text-[11px]"
                  >
                    Join Now
                  </button>
                </div>
              )}
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-white bg-white/5 border border-white/10"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* 🚀 BOTTOM BORDER GLOW */}
        <div
          className={`absolute bottom-0 left-0 w-full h-px transition-all duration-1000 ${isScrolled ? "bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-0 bg-[#C5A059] blur-[2px] opacity-30"></div>
        </div>
      </nav>

      {/* --- MOBILE DRAWER --- */}
      <div
        className={`fixed inset-0 w-full h-screen z-[150] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-[#001A33]/80 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-[340px] bg-[#003366] shadow-2xl transition-transform duration-500 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col p-6 shrink-0 border-b border-white/5">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10 p-1">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <h2 className="text-white font-black text-sm leading-none tracking-tight uppercase">
                  CONFERENCE <span className="text-[#C5A059]">DBA</span>
                </h2>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/50"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-4 space-y-2 p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-medium text-white/70">
                <Mail size={12} className="text-[#C5A059]" />{" "}
                helpdesk-scm@ewubd.edu
              </div>
              <div className="flex items-center gap-2 text-[10px] font-medium text-white/70">
                <Phone size={12} className="text-[#C5A059]" /> 09666775577 |
                Ext-213/132
              </div>
            </div>
            <span className="text-[#C5A059] font-black uppercase text-[10px] tracking-[0.3em]">
              Navigation
            </span>
          </div>

          <div className="flex-grow overflow-y-auto px-6 pb-10 mt-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.path) {
                    router.push(link.path);
                    setIsMobileMenuOpen(false);
                  } else {
                    scrollToSection(link.id);
                  }
                }}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 text-white font-bold hover:bg-[#C5A059] hover:text-[#003366] transition-all uppercase text-sm"
              >
                {link.name}
                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
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
