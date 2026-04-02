import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";
import { isAdminRoute, isAuthRoute, isMemberRoute } from "./lib/authUtils";
import { DecodedToken } from "./types";
import { UserRole } from "./types/enums";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const verifiedToken =
    accessToken && ((await verifyToken(accessToken)) as DecodedToken);

  const authRoute = isAuthRoute(pathname);
  const adminRoute = isAdminRoute(pathname);
  const memberRoute = isMemberRoute(pathname);

  if (!accessToken && (adminRoute || memberRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && authRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (verifiedToken && verifiedToken.role === UserRole.ADMIN && !adminRoute) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (verifiedToken && verifiedToken.role === UserRole.MEMBER && !memberRoute) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
