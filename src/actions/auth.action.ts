"use server";

import { authServices } from "@/services/auth.service";
import { LoginPayload, RegisterPayload } from "@/types";
import { GetIdeaSearchParams } from "@/types/idea.type";

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

export const getUsers = async (params: GetIdeaSearchParams) => {
  return await authServices.getUsers(params);
};

export const deleteUser = async (userId: string) => {
  return await authServices.deleteUser(userId);
};
