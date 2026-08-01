"use server";

import { authService } from "@/services/auth.service";
import { LoginUser, RegisterUser, VerifyEmail } from "@/types";

const register = async (payload: RegisterUser) => {
  return await authService.register(payload);
};

const verifyEmail = async (payload: VerifyEmail) => {
  return await authService.verifyEmail(payload);
};

const login = async (payload: LoginUser) => {
  return await authService.login(payload);
};

const getMe = async () => {
  return await authService.getMe();
};

export const authAction = {
  register,
  verifyEmail,
  login,
  getMe,
};
