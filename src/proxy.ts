import { NextRequest, NextResponse } from "next/server";
import { getMe } from "./actions/auth.action";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const result = await getMe();
  const user = result.data;

  if (!result.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin-dashboard")) {
    if (user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (user.role !== "MEMBER") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard/:path*", "/dashboard/:path*"],
};
