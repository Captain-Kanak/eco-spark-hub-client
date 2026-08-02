export const ADMIN_ROUTE_PREFIX = "/admin-dashboard";
export const MEMBER_ROUTE_PREFIX = "/dashboard";

export const AUTH_ROUTE_PATHS = {
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const;

export const PUBLIC_ROUTE_PATHS = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_SERVICE: "/terms-of-service",
  UNAUTHORIZED: "/unauthorized",

  CATEGORIES: "/categories",
  IDEAS: "/ideas",

  DONATIONS: "/donations",
} as const;

export const ADMIN_ROUTE_PATHS = {
  OVERVIEW: ADMIN_ROUTE_PREFIX,
  PROFILE: `${ADMIN_ROUTE_PREFIX}/profile`,
  MANAGE_CATEGORIES: `${ADMIN_ROUTE_PREFIX}/manage-categories`,
  MANAGE_IDEAS: `${ADMIN_ROUTE_PREFIX}/manage-ideas`,
  MANAGE_USERS: `${ADMIN_ROUTE_PREFIX}/manage-users`,
  PAYMENTS_HISTORY: `${ADMIN_ROUTE_PREFIX}/payments-history`,
} as const;

export const MEMBER_ROUTE_PATHS = {
  OVERVIEW: MEMBER_ROUTE_PREFIX,
  PROFILE: `${MEMBER_ROUTE_PREFIX}/profile`,
  MY_IDEAS: `${MEMBER_ROUTE_PREFIX}/my-ideas`,
  PAYMENTS_HISTORY: `${MEMBER_ROUTE_PREFIX}/payments-history`,
} as const;
