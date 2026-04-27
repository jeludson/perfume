import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === "ADMIN"
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin")

    // If user is logged in and tries to access auth pages, redirect to home
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    // If user is not admin and tries to access admin pages, redirect to home
    if (isAdminPage && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                           req.nextUrl.pathname.startsWith("/register") ||
                           req.nextUrl.pathname.startsWith("/admin/login")
        
        // If it's an auth page, allow access without token
        if (isAuthPage) return true
        
        // Otherwise, require token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/", "/admin/:path*", "/profile/:path*", "/login", "/register"],
}
