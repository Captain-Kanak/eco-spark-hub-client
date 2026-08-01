import { env } from "@/env";
import { api } from "@/lib/api";
import { LoginUser, RegisterUser, User, VerifyEmail } from "@/types";

const API_URL = `${env.API_URL}/api/v1/auth`;

const register = async (payload: RegisterUser) => {
  return api.post<User>(`${API_URL}/register`, payload);
};

const verifyEmail = async (payload: VerifyEmail) => {
  return api.post<null>(`${API_URL}/verify-email`, payload);
};

const login = async (payload: LoginUser) => {
  return api.post<User>(`${API_URL}/login`, payload);
};

const getMe = async () => {
  return api.get<User>(`${API_URL}/get-me`, {
    auth: true,
  });
};

export const authService = {
  register,
  verifyEmail,
  login,
  getMe,
};
