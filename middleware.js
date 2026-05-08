import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get('admin_session')?.value;

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const payload = await decrypt(session);
      if (!payload || !payload.user || payload.user.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
