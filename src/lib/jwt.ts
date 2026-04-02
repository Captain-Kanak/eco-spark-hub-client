"use server";

import { env } from "@/env";
import { DecodedToken } from "@/types";
import jwt from "jsonwebtoken";
import { getCookieToken } from "./cookie";

const secret = env.ACCESS_TOKEN_SECRET;

export const verifyToken = async (token: string): Promise<DecodedToken> => {
  try {
    return jwt.verify(token, secret) as DecodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const getUserFromToken = async (): Promise<DecodedToken> => {
  const token = await getCookieToken("accessToken");

  if (!token) {
    throw new Error("Token not found");
  }

  return jwt.verify(token, secret) as unknown as DecodedToken;
};
