"use server";

import { env } from "@/env";
import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookie";

const secret = env.ACCESS_TOKEN_SECRET;

const getTokenRemainingTime = (token: string): number => {
  if (!token) return 0;

  try {
    const tokenPayload = secret
      ? (jwt.verify(token, secret) as JwtPayload)
      : (jwt.decode(token) as JwtPayload);

    if (tokenPayload && !tokenPayload.exp) {
      return 0;
    }

    const remainingTime =
      tokenPayload && tokenPayload.exp
        ? tokenPayload.exp * 1000 - Math.floor(Date.now())
        : 0;

    return remainingTime > 0 ? remainingTime : 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const setTokenInCookie = async (
  name: string,
  token: string,
): Promise<void> => {
  const maxAge = getTokenRemainingTime(token);

  await setCookie(name, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge,
  });
};
