const authRoutes = [
  "/register",
  "/login",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
];

const adminRoutes = [
  "/admin-dashboard",
  "/admin-dashboard/profile",
  "/admin-dashboard/create-category",
  "/admin-dashboard/manage-categories",
  "/admin-dashboard/manage-ideas",
  "/admin-dashboard/manage-users",
  "/admin-dashboard/payments-history",
];

const memberRoutes = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/create-idea",
  "/dashboard/my-ideas",
  "/dashboard/payments-history",
];

export const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.some((route) => pathname.startsWith(route));
};

export const isAdminRoute = (pathname: string): boolean => {
  return adminRoutes.some((route) => pathname.startsWith(route));
};

export const isMemberRoute = (pathname: string): boolean => {
  return memberRoutes.some((route) => pathname.startsWith(route));
};
