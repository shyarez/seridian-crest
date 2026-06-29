import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/auth';
import { SessionData } from '@/types';

const PROTECTED_PREFIXES = ['/admin/dashboard', '/admin/content', '/admin/services', '/admin/leads'];
const PROTECTED_API_PREFIXES = ['/api/content', '/api/services', '/api/leads'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPage = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isProtectedApi = PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p));
  const isWriteApi = isProtectedApi && request.method !== 'GET';

  if (!isProtectedPage && !isWriteApi) return NextResponse.next();

  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request.cookies, sessionOptions);

  if (!session.isLoggedIn || !session.adminId) {
    if (isProtectedPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/content/:path*', '/api/services/:path*', '/api/leads/:path*'],
};
