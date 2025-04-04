import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname
  
  // Get the token using next-auth
  const token = await getToken({ 
    req: request,
    secret: secret
  })

  // Protected routes check
  if (path.startsWith('/my')) {
    if (!token) {
      // Redirect unauthenticated users to the login page
      const url = new URL('/auth', request.url)
      url.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(url)
    }

    // Optional: Add role-based access control
    if (token.role && token.role !== 'user') {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized access' }),
        { status: 403 }
      )
    }
  }

  return NextResponse.next()
}

// Update the config to protect the /my route
export const config = {
  matcher: [
    '/my/:path*',
    '/api/protected/:path*'
  ]
}