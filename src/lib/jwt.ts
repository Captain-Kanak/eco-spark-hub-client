"use server";

import { env } from "@/env";
import { DecodedToken } from "@/types";
import jwt from "jsonwebtoken";

const secret = env.ACCESS_TOKEN_SECRET;

export const verifyToken = (token: string): DecodedToken => {
  try {
    return jwt.verify(token, secret) as DecodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
