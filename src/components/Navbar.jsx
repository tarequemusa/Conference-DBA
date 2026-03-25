"use client";

import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { data: session } = useSession();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false); // Prevents hydration flicker

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
    }
  };

  useEffect(() => {
    setMounted(true); // Navbar is ready on client
    const handleScroll = () => {
      // Logic check to handle various browser refresh behaviors
      setIsScrolled(window.scrollY > 20);
    };

    // Check immediately on mount in case of refresh at middle of page
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  // Hide Navbar until mounted to prevent the white block flicker during reload
  if (!mounted)
    return <div className="h-20 bg-transparent fixed top-0 w-full z-[100]" />;

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Guidelines", id: "guidelines" },
    { name: "Committee", id: "committee" },
    { name: "Pricing", id: "pricing" },
    { name: "Partners", id: "partners" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-[#003366]/95 backdrop-blur-xl shadow-2xl py-2 md:py-3"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="relative aspect-square w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden p-1.5 transition-all duration-500 bg-white/5 group-hover:scale-105 border border-white/10">
              <Image
                src="/images/logo.png"
                alt="EWU Logo"
                fill
                className="object-contain p-1"
                priority // Ensures logo loads immediately on reload
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-base md:text-xl tracking-tight text-white leading-none uppercase">
                Conference <span className="text-[#C5A059]">DBA</span>
              </h1>
              <span className="text-[8px] md:text-[10px] text-white/40 font-medium uppercase tracking-[0.2em] mt-1">
                International 2026
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[13px] font-medium text-white/90">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="hover:text-[#C5A059] transition-colors relative group/link"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover/link:w-full"></span>
              </button>
            ))}

            <div className="h-4 w-[1px] mx-2 bg-white/10"></div>

            {session ? (
              <div className="flex items-center gap-5">
                <Link
                  href="/dashboard"
                  className="text-white hover:text-[#C5A059] transition-all font-bold flex items-center gap-2"
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

          {/* Hamburger Icon */}
          <button
            className="lg:hidden p-2 rounded-lg text-white bg-white/5 border border-white/10 active:bg-white/10"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE DRAWER (UI Preserved Exactly) --- */}
      <div
        className={`fixed inset-0 w-full h-screen z-[150] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[#001A33]/80 backdrop-blur-md transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-[#003366] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col p-6 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-10">
            <span className="text-[#C5A059] font-black uppercase text-xs tracking-widest">
              Navigation
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 text-white text-lg font-bold hover:bg-[#C5A059] hover:text-[#003366] transition-all group"
              >
                {link.name}
                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
            {!session ? (
              <>
                <button
                  onClick={() => {
                    setAuthMode("signup");
                    setIsAuthOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#C5A059] text-[#003366] py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-xl active:scale-95"
                >
                  Join Now
                </button>
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setIsAuthOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-white/5 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] border border-white/10 active:scale-95"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => signOut()}
                className="w-full bg-red-500/10 text-red-400 py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 border border-red-500/10"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
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
