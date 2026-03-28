import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Role-Based Protection
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
      return NextResponse.next(); // Allow Admins to see Reviewer pages
    }

    if (isReviewerPage && token?.role !== "REVIEWER") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth internals)
     * - api/schedule (Public API)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - logo.png (branded logo)
     * - schedule (The public timeline page)
     * - legal (🚀 ADDED: The public legal page)
     * - $ (The root/landing page)
     */
    "/((?!api/auth|api/schedule|_next/static|_next/image|favicon.ico|images|logo.png|schedule|legal|$).*)",

    // Explicitly protect these route groups
    "/dashboard/:path*",
    "/admin/:path*",
    "/reviewer/:path*",
  ],
};
