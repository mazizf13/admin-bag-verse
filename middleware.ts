// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware({
//   publicRoutes: ['/api/:path*'],
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';
import type { NextFetchEvent } from 'next/server';

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const publicRoutes = ['/api/:path*'];
  const { pathname } = req.nextUrl;

  if (publicRoutes.some((route) => new RegExp(route).test(pathname))) {
    return NextResponse.next();
  }

  return clerkMiddleware()(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
