"use server";

import { authService } from "@/services/auth.service";
import { LoginUser, RegisterUser, VerifyEmail } from "@/types";

export const register = async (payload: RegisterUser) => {
  return await authService.register(payload);
};

export const verifyEmail = async (payload: VerifyEmail) => {
  return await authService.verifyEmail(payload);
};

export const login = async (payload: LoginUser) => {
  return await authService.login(payload);
};

export const getMe = async () => {
  return await authService.getMe();
};
