import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // 🚀 ROLE-BASED PROTECTION LOGIC
    const isAdminPage = pathname.startsWith("/admin");
    const isReviewerPage = pathname.startsWith("/reviewer");

    // Protect Admin Pages
    if (isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Protect Reviewer Pages (Allow ADMIN and REVIEWER)
    if (isReviewerPage) {
      if (token?.role === "ADMIN" || token?.role === "REVIEWER") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // 🚀 CRITICAL: Do not require auth for the registration API or public assets
        if (
          pathname.startsWith("/api/register") ||
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/api/contact")
        ) {
          return true;
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    /*
     * 🚀 UPDATED REGEX:
     * Added 'auth/reset-password' to the exclusion list.
     */
    "/((?!api/register|api/auth|api/contact|api/schedule|auth/reset-password|_next/static|_next/image|favicon.ico|images|logo.png|schedule|legal|$).*)",

    "/dashboard/:path*",
    "/admin/:path*",
    "/reviewer/:path*",
  ],
};

// export const config = {
//   matcher: [
//     /*
//      * 🚀 FIXED REGEX:
//      * 1. Excludes all public folders (images, favicon, etc.)
//      * 2. Excludes registration and public auth APIs
//      * 3. Protects dashboard, admin, and reviewer paths
//      */
//     "/((?!api/register|api/auth|api/contact|api/schedule|_next/static|_next/image|favicon.ico|images|logo.png|schedule|legal|$).*)",

//     "/dashboard/:path*",
//     "/admin/:path*",
//     "/reviewer/:path*",
//   ],
// };
