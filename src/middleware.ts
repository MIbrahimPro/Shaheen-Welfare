import { NextResponse, type NextRequest } from 'next/server';

const ADMIN_COOKIE = 'sws_admin';

/**
 * Gate /admin behind the presence of a session cookie. Route handlers and
 * server components still verify the token against Supabase Auth — this only
 * keeps unauthenticated visitors away from admin pages entirely.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
