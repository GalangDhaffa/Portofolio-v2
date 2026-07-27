import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Wrap auth with custom logic for the proxy handler
const authHandler = auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = req.nextUrl.pathname === '/admin/login'

  if (isOnAdmin && !isLoginPage) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
    }
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }

  return NextResponse.next()
})

// Export as named "proxy" function for Next.js 16+
export const proxy = authHandler

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
