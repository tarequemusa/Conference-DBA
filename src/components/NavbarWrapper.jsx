"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  /**
   * Define all portal-based routes where the public Navbar must be hidden.
   * This includes:
   * - /dashboard (Researcher)
   * - /admin (Administrator)
   * - /reviewer (Reviewer)
   * - /authority (Conference Authority)
   */
  const hideNavbarPaths = ["/dashboard", "/admin", "/reviewer", "/authority"];

  // Check if the current URL starts with any of the restricted portal paths
  const shouldHide = hideNavbarPaths.some((path) => pathname?.startsWith(path));

  // If we are in any researcher, admin, reviewer, or authority area, return null
  if (shouldHide) return null;

  // Otherwise, render the standard public Navbar for the landing page and other sections
  return <Navbar />;
}
