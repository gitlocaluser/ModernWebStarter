import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Check if the path starts with /my
  if (path.startsWith('/my')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // Redirect unauthenticated users to the login page
    if (!token) {
      const loginUrl = new URL('/auth', request.nextUrl.origin)
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Configure the paths that should be handled by this middleware 
export const config = {
  matcher: '/my/:path*'
}
