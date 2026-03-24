"use client";
import {
  Award,
  BarChart3,
  CheckCircle,
  ClipboardCheck,
  FileText,
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

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const userRole = session?.user?.role;
  const isAdmin = userRole === "ADMIN";
  const isReviewer = userRole === "REVIEWER";

  // 1. Researcher Menu Items (Updated Path)
  const researcherItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Submit Abstract", icon: PlusCircle, path: "/dashboard/submit" }, // Path updated to fix 404
    { name: "My Abstracts", icon: FileText, path: "/dashboard/abstracts" },
    { name: "Certificates", icon: Award, path: "/dashboard/certificates" },
  ];

  // 2. Reviewer Menu Items
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

  // 3. Admin Menu Items
  const adminItems = [
    { name: "Admin Console", icon: ShieldCheck, path: "/admin" },
    { name: "Manage Abstracts", icon: BarChart3, path: "/admin/abstracts" },
    { name: "User Management", icon: Users, path: "/admin/users" },
  ];

  // 4. Common Items
  const commonItems = [
    { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const getMenuItems = () => {
    if (isAdmin) return [...adminItems, ...commonItems];
    if (isReviewer) return [...reviewerItems, ...commonItems];
    return [...researcherItems, ...commonItems];
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Trigger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#003366] flex items-center justify-between px-6 z-[60] shadow-md">
        <h2 className="text-xl font-bold text-[#C5A059]">
          Conference DBA 2026
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed md:sticky top-0 left-0 z-[80]
        flex flex-col w-72 bg-[#003366] text-white h-screen p-6 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="mb-10 px-2 hidden md:block text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#C5A059]">
            Conference DBA 2026
          </h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-1">
            {isAdmin
              ? "Administrator"
              : isReviewer
                ? "Reviewer Panel"
                : "Researcher Portal"}
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium group ${
                  isActive
                    ? "bg-[#C5A059] text-[#003366] shadow-lg"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon
                  size={20}
                  className={
                    isActive
                      ? "text-[#003366]"
                      : "text-slate-400 group-hover:text-white"
                  }
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-white/10 mt-auto">
          <div className="flex items-center gap-3 px-2 mb-6">
            {session?.user?.image ? (
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src={session.user.image}
                  alt="Profile"
                  fill
                  className="rounded-full border-2 border-[#C5A059] object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 shrink-0 rounded-full bg-[#C5A059] flex items-center justify-center text-[#003366] font-bold">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">
                {session?.user?.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate uppercase tracking-tighter">
                {userRole} • {session?.user?.email?.split("@")[0]}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-semibold group"
          >
            <LogOut
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
            Logout
          </button>
        </div>
      </aside>

      <div className="h-16 md:hidden" />
    </>
  );
}
