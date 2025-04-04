import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  // Check if the path starts with /my
  if (request.nextUrl.pathname.startsWith('/my')) {
    if (!token) {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    // Check if user has an active subscription
    // You'll need to customize this based on where you store subscription info
    if (!token.subscription?.status === 'active') {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/my/:path*'
}