import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith("/reservations");

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  // User is not logged in
  if (!token) {
    if (isProtectedRoute) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    return NextResponse.next();
  }

  // User has an invalid/expired token
  const payload = await verifyToken(token);

  if (!payload) {
    const response = isProtectedRoute
      ? NextResponse.redirect(
          new URL("/login", request.url)
        )
      : NextResponse.next();

    response.cookies.delete("token");

    return response;
  }

  // User is already logged in
  if (isAuthPage) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/reservations/:path*",
    "/login",
    "/register",
  ],
};