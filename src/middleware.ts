import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRolesEnum } from './basics/enums/auth.enum';
import { auth } from './lib/auth';

export { auth } from 'lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = new URL(req.url);

  const accessRules: Record<string, string[]> = {
    '/kitchen': [UserRolesEnum.kitchen, UserRolesEnum.administration],
    '/service': [UserRolesEnum.service, UserRolesEnum.administration],
    '/administration': [UserRolesEnum.administration],
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
