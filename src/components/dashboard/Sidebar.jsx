"use client";
import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  CreditCard,
  History,
  Landmark,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  ShieldCheck,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const userRole = session?.user?.role;
  const userType = session?.user?.userType;

  const isAdmin = userRole === "ADMIN";
  const isReviewer = userRole === "REVIEWER";
  const isAuthority = userRole === "AUTHORITY";

  const getPortalLabel = () => {
    if (isAdmin) return "Admin Portal";
    if (isAuthority) return "Authority Portal";
    if (isReviewer) return "Reviewer Portal";
    return "Researcher Portal";
  };

  const researcherItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Submit Abstract", icon: PlusCircle, path: "/dashboard/submit" },
    // 🚀 Logic: "My Abstracts" merged into Dashboard, removed from Sidebar
    { name: "Event Timeline", icon: Calendar, path: "/dashboard/schedule" },
    { name: "Certificates", icon: Award, path: "/dashboard/certificates" },
  ];

  const reviewerItems = [
    { name: "Review Overview", icon: LayoutDashboard, path: "/reviewer" },
    {
      name: "Pending Reviews",
      icon: ClipboardCheck,
      path: "/reviewer/pending",
    },
    {
      name: "Completed Reviews",
      icon: CheckCircle,
      path: "/reviewer/completed",
    },
  ];

  const adminItems = [
    { name: "Admin Console", icon: ShieldCheck, path: "/admin" },
    { name: "Manage Abstracts", icon: BarChart3, path: "/admin/abstracts" },
    { name: "Event Schedule", icon: Calendar, path: "/admin/schedule" },
    { name: "Finance & Revenue", icon: CreditCard, path: "/admin/finance" },
    { name: "User Management", icon: Users, path: "/admin/users" },
    { name: "Activity Logs", icon: History, path: "/admin/logs" },
  ];

  const authorityItems = [
    { name: "Authority Desk", icon: Landmark, path: "/authority" },
    { name: "Event Stats", icon: BarChart3, path: "/authority/stats" },
  ];

  const menuItems = isAdmin
    ? [
        ...adminItems,
        { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
        { name: "Settings", icon: Settings, path: "/admin/settings" },
      ]
    : isReviewer
      ? [
          ...reviewerItems,
          { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
        ]
      : isAuthority
        ? [
            ...authorityItems,
            { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
          ]
        : [
            ...researcherItems,
            { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
          ];

  return (
    <>
      {/* Mobile Trigger Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#001f3d] flex items-center justify-between px-6 z-[60] border-b border-white/5">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={22}
            height={22}
            className="object-contain"
          />
          <h2 className="text-xs font-black text-white uppercase tracking-tighter">
            DBA <span className="text-[#C5A059]">Conference</span>
          </h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white/70 hover:text-white transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-[80] flex flex-col w-64 bg-[#003366] text-white h-screen transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* HEADER SECTION */}
        <div className="p-6 bg-[#00284d] border-b border-white/5 text-center flex flex-col items-center">
          <div className="relative w-12 h-12 mb-4 p-1.5 bg-white/5 rounded-xl border border-white/10 shadow-lg">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              sizes="48px"
              className="object-contain p-1.5"
              priority
            />
          </div>
          <h2 className="text-base font-black uppercase tracking-tighter leading-none text-white">
            DBA <span className="text-[#C5A059]">CONFERENCE</span>
          </h2>
          <p className="text-[8px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1.5">
            INTERNATIONAL 2026
          </p>

          {/* PORTAL INDICATOR */}
          <div className="mt-5 flex items-center justify-center gap-0 w-full max-w-[180px]">
            <div className="w-full py-1.5 border border-[#C5A059]/40 rounded-full bg-transparent flex items-center justify-center">
              <span className="text-[8px] text-[#C5A059] font-black uppercase tracking-widest leading-none">
                {getPortalLabel()}
              </span>
            </div>
          </div>
        </div>

        {/* NAVIGATION BODY */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar bg-[#003366]">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider group ${
                  isActive
                    ? "bg-[#C5A059] text-[#003366] shadow-md scale-[1.02]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon
                  size={16}
                  className={
                    isActive
                      ? "text-[#003366]"
                      : "text-slate-400 group-hover:text-[#C5A059]"
                  }
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER SECTION */}
        <div className="p-5 bg-[#001f3d] border-t border-white/5">
          <div className="flex items-center gap-3 mb-5 px-1">
            <div className="relative w-11 h-11 shrink-0">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  fill
                  sizes="44px"
                  className="rounded-full border-2 border-[#C5A059] object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#C5A059] flex items-center justify-center text-[#003366] font-black text-base border border-white/10 uppercase">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black truncate text-white uppercase tracking-tight leading-tight">
                {session?.user?.name || "User Name"}
              </p>
              <p className="text-[9px] text-slate-400 truncate font-bold mt-0.5 opacity-80 italic">
                {session?.user?.email}
              </p>
              <p className="text-[8px] text-[#C5A059] font-black uppercase tracking-[0.1em] mt-1 opacity-90">
                {userType || userRole}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#003366]/40 hover:bg-red-500/10 text-red-400 border border-white/5 rounded-xl transition-all font-black uppercase text-[9px] tracking-widest group"
          >
            <LogOut
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Logout
          </button>
        </div>
      </aside>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
