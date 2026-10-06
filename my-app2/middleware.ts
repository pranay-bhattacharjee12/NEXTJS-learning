import { NextRequest, NextResponse } from 'next/server';

let cnt =0;

export default function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

  // Only count home page visits
  if (pathname === "/") {
    cnt++;
    console.log("Home page hit:", cnt);
  }

  // Redirect /admin to /signin
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  return NextResponse.next();
}