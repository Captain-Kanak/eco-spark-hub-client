import { env } from "@/env";
import {
  setAccessTokenInCookie,
  setBetterAuthTokenInCookie,
  setRefreshTokenInCookie,
} from "@/lib/token";
import { LoginPayload, RegisterPayload, User } from "@/types";

const API_URL = env.API_URL;

export const authServices = {
  register: async (
    payload: RegisterPayload,
  ): Promise<{ success: boolean; data: User | null }> => {
    try {
      const url = `${API_URL}/api/v1/auth/register`;

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return { success: false, data: null };
      }

      const result = await res.json();

      if (!result.success) {
        return { success: false, data: null };
      }

      return { success: true, data: result.data.user };
    } catch (error) {
      return { success: false, data: null };
    }
  },
  login: async (
    payload: LoginPayload,
  ): Promise<{ success: boolean; data: User | null }> => {
    try {
      const url = `${API_URL}/api/v1/auth/login`;

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return { success: false, data: null };
      }

      const result = await res.json();

      if (!result.success) {
        return { success: false, data: null };
      }

      const { token, accessToken, refreshToken } = result.data;

      await setBetterAuthTokenInCookie(token);
      await setAccessTokenInCookie(accessToken);
      await setRefreshTokenInCookie(refreshToken);

      return { success: true, data: result.data.user };
    } catch (error) {
      return { success: false, data: null };
    }
  },
};
