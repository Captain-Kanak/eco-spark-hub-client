"use server";

import { setCookie } from "./cookie";

const oneDayInSeconds = 24 * 60 * 60;
const sevenDaysInSeconds = 7 * oneDayInSeconds;

export const setBetterAuthTokenInCookie = async (
  token: string,
): Promise<void> => {
  const name = "better-auth.session_token";

  await setCookie(name, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: oneDayInSeconds,
  });
};

export const setAccessTokenInCookie = async (token: string): Promise<void> => {
  const name = "accessToken";

  await setCookie(name, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: oneDayInSeconds,
  });
};

export const setRefreshTokenInCookie = async (token: string): Promise<void> => {
  const name = "refreshToken";

  await setCookie(name, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: sevenDaysInSeconds,
  });
};
