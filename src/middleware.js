import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // 1. Role Protection Logic
    const isAdminPage = pathname.startsWith("/admin");
    const isReviewerPage = pathname.startsWith("/reviewer");

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

    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run the function above if a token exists
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: [
    /*
     * 🚀 CRITICAL FIX:
     * Exclude the following paths from middleware to prevent redirect loops:
     * - api/auth (NextAuth internal routes)
     * - _next (Static files)
     * - images, favicon, etc.
     * - The root "/" path (where your AuthModal/Login lives)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images|logo.png|auth|$).*)",

    // Explicitly protect these route groups
    "/dashboard/:path*",
    "/admin/:path*",
    "/reviewer/:path*",
  ],
};
