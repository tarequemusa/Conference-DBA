"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Define routes where the main Navbar should be hidden
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) return null;

  return <Navbar />;
}
