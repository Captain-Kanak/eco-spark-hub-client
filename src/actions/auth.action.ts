"use server";

import { authServices } from "@/services/auth.service";
import { LoginPayload, RegisterPayload } from "@/types";

export const register = async (payload: RegisterPayload) => {
  return await authServices.register(payload);
};

export const login = async (payload: LoginPayload) => {
  return await authServices.login(payload);
};
