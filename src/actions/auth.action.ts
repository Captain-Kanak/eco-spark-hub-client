"use server";

import { authServices } from "@/services/auth.service";
import { RegisterPayload } from "@/types";

export const register = async (payload: RegisterPayload) => {
  return await authServices.register(payload);
};
