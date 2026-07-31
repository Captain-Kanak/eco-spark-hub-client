import { env } from "@/env";
import { api } from "@/lib/api";
import { LoginUser, RegisterUser, User, VerifyEmail } from "@/types";

const API_URL = `${env.API_URL}/api/v1/auth`;

export const authService = {
  register: async (payload: RegisterUser) => {
    return api.post<User>(`${API_URL}/register`, payload);
  },
  verifyEmail: async (payload: VerifyEmail) => {
    return api.post<null>(`${API_URL}/verify-email`, payload);
  },
  login: async (payload: LoginUser) => {
    return api.post<User>(`${API_URL}/login`, payload);
  },
  getMe: async () => {
    return api.get<User>(`${API_URL}/get-me`, {
      auth: true,
    });
  },
};
