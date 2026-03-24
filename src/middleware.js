import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    // 1. Define Role-Based Access Rules
    const isAdminPage = pathname.startsWith("/admin");
    const isReviewerPage = pathname.startsWith("/reviewer");
    const isResearcherPage = pathname.startsWith("/dashboard");

    // 2. Protection Logic
    if (isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (
      isReviewerPage &&
      token?.role !== "REVIEWER" &&
      token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Optional: If a user is logged in but tries to hit the login/landing page
    if (pathname === "/" && isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // This ensures the middleware only runs if the user is authenticated
      authorized: ({ token }) => !!token,
    },
  },
);

// 3. Define which routes this middleware should protect
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/reviewer/:path*",
    // Add other protected routes here
  ],
};
