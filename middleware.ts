import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Teacher area protection
  if (pathname.startsWith('/progress-dashboard')) {
    const teacherSession = request.cookies.get('teacher_session')?.value
    if (!teacherSession) {
      return NextResponse.redirect(new URL('/teacher-login', request.url))
    }
  }

  // Teacher login redirect if already authenticated as teacher
  if (pathname === '/teacher-login') {
    const teacherSession = request.cookies.get('teacher_session')?.value
    if (teacherSession) {
      return NextResponse.redirect(new URL('/progress-dashboard', request.url))
    }
  }

  // Student area protection
  const studentProtectedPrefixes = ['/quiz', '/games', '/phishing', '/bad-guys', '/powers']
  const isStudentProtected = studentProtectedPrefixes.some((p) => pathname.startsWith(p))
  if (isStudentProtected) {
    const studentSession = request.cookies.get('session')?.value
    if (!studentSession) {
      const url = new URL('/login', request.url)
      url.searchParams.set('next', pathname + (search || ''))
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in students away from login/signup
  if (pathname === '/login' || pathname === '/signup') {
    const studentSession = request.cookies.get('session')?.value
    if (studentSession) {
      const next = request.nextUrl.searchParams.get('next')
      return NextResponse.redirect(new URL(next || '/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/progress-dashboard/:path*',
    '/teacher-login',
    '/quiz/:path*',
    '/games/:path*',
    '/phishing/:path*',
    '/bad-guys/:path*',
    '/powers/:path*',
    '/login',
    '/signup',
  ],
}
