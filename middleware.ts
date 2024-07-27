import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/api/:path*']);

const middlewareHandler = async (req: NextRequest, ev: any) => {
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  return clerkMiddleware()(req, ev);
};

export default middlewareHandler;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
