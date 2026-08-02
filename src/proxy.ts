import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./types/enums";
import { getMe } from "./actions/auth";
import {
  ADMIN_ROUTE_PREFIX,
  AUTH_ROUTE_PATHS,
  DONATION_ROUTE_PREFIX,
  MEMBER_ROUTE_PREFIX,
} from "./routes/routes-constant";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const result = await getMe();
  const user = result?.data;
  const isLoggedIn = !!user;

  const isAuthRoute = Object.values(AUTH_ROUTE_PATHS).includes(
    pathname as (typeof AUTH_ROUTE_PATHS)[keyof typeof AUTH_ROUTE_PATHS],
  );
  const isAdminRoute = pathname.startsWith(ADMIN_ROUTE_PREFIX);
  const isMemberRoute = pathname.startsWith(MEMBER_ROUTE_PREFIX);
  const isDonationRoute = pathname.startsWith(DONATION_ROUTE_PREFIX);

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(
      new URL(
        user.role === UserRole.ADMIN ? ADMIN_ROUTE_PREFIX : MEMBER_ROUTE_PREFIX,
        request.url,
      ),
    );
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(AUTH_ROUTE_PATHS.LOGIN, request.url),
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL(MEMBER_ROUTE_PREFIX, request.url));
    }
  }

  if (isMemberRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(AUTH_ROUTE_PATHS.LOGIN, request.url),
      );
    }

    if (user.role !== UserRole.MEMBER) {
      return NextResponse.redirect(new URL(ADMIN_ROUTE_PREFIX, request.url));
    }
  }

  if (isDonationRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(AUTH_ROUTE_PATHS.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
