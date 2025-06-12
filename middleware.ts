import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/todos/:path*', '/login', '/profile'],
};

export const PROTECTED_ROUTES = new Set(['/todos', '/todos/add', '/profile']);

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const currentPage = request.nextUrl.pathname;
  const isLoginPage = currentPage === '/login';

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/todos', request.url));
  }

  if (PROTECTED_ROUTES.has(currentPage) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
