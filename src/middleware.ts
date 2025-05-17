import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from './basics/enums/schema.enums';
import { auth } from './lib/auth';

export { auth } from 'lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = new URL(req.url);

  const accessRules: Record<string, string[]> = {
    '/kitchen': [Role.KITCHEN, Role.ADMINISTRATION],
    '/service': [Role.SERVICE, Role.ADMINISTRATION],
    '/administration': [Role.ADMINISTRATION],
  };

  if (accessRules[pathname]) {
    const userRole = session?.user?.role;

    if (!userRole || !accessRules[pathname].includes(userRole)) {
      return NextResponse.redirect(new URL('/verify', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/kitchen/:path*', '/service/:path*', '/administration/:path*'],
};
