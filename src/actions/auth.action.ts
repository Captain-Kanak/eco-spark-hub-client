"use server";

import { authServices } from "@/services/auth.service";
import { LoginPayload, RegisterPayload } from "@/types";

export const register = async (payload: RegisterPayload) => {
  return await authServices.register(payload);
};

export const verifyEmail = async (email: string, otp: string) => {
  return await authServices.verifyEmail(email, otp);
};

export const login = async (payload: LoginPayload) => {
  return await authServices.login(payload);
};

export const getMe = async () => {
  return await authServices.getMe();
};

export const updateProfile = async (payload: FormData) => {
  return await authServices.updateProfile(payload);
};
