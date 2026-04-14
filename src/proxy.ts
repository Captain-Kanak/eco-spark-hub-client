import { NextRequest, NextResponse } from "next/server";
import { getMe } from "./actions/auth.action";
import { UserRole } from "./types/enums";
import {
  adminRoutes,
  memberRoutes,
  protectedRoutes,
} from "./routes/ProtectedRoutes";

const isMatch = (pathname: string, routes: string[]) => {
  return routes.some((route) => pathname.startsWith(route));
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = isMatch(pathname, adminRoutes);
  const isMemberRoute = isMatch(pathname, memberRoutes);
  const isProtectedRoute = isMatch(pathname, protectedRoutes);

  if (!isAdminRoute && !isMemberRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  const result = await getMe();
  const user = result?.data;

  if (!result.success || !user) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url),
    );
  }

  if (isAdminRoute && user.role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isMemberRoute && user.role !== UserRole.MEMBER) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
