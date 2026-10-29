import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.cookies.get("session")) return NextResponse.next();

  const url = new URL("/auth/signin", request.url);
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/dashboard/:path*"],
};