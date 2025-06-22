import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/todos/:path*', '/profile'],
};

const PROTECTED_ROUTES = ['/todos', '/profile'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const currentPage = request.nextUrl.pathname;
  const isLoginPage = currentPage === '/login';

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/todos', request.url));
  }

  const isProtectedRoute =
    currentPage.startsWith('/dashboard') ||
    PROTECTED_ROUTES.some((prefix) => currentPage.startsWith(prefix));
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
