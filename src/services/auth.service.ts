import { env } from "@/env";
import { setBetterAuthTokenInCookie } from "@/lib/token";
import { ApiResponse, LoginPayload, RegisterPayload, User } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const authServices = {
  register: async (payload: RegisterPayload): Promise<ApiResponse<null>> => {
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
        return {
          success: false,
          message: "An unexpected error occurred",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return { success: false, message: result.message, data: null };
      }

      return {
        success: true,
        message: "Registration successful",
        data: result.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error occurred",
        data: null,
      };
    }
  },
  verifyEmail: async (
    email: string,
    otp: string,
  ): Promise<ApiResponse<null>> => {
    try {
      const url = `${API_URL}/api/v1/auth/verify-email`;

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) {
        return {
          success: false,
          message: "An unexpected error occurred",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return { success: false, message: result.message, data: null };
      }

      return {
        success: true,
        message: "Email verified successfully",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error occurred",
        data: null,
      };
    }
  },
  login: async (payload: LoginPayload): Promise<ApiResponse<User>> => {
    try {
      const url = `${API_URL}/api/v1/auth/login`;

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.message === "Email not verified") {
        return { success: false, message: result.message, data: null };
      }

      if (!res.ok) {
        return {
          success: false,
          message: "An unexpected error occurred",
          data: null,
        };
      }

      if (!result.success) {
        return { success: false, message: result.message, data: null };
      }

      const { token, user } = result.data;

      await setBetterAuthTokenInCookie(token);

      return { success: true, message: "Login successful", data: user };
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error occurred",
        data: null,
      };
    }
  },
  getMe: async (): Promise<ApiResponse<User>> => {
    try {
      const url = `${API_URL}/api/v1/auth/me`;

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        return {
          success: false,
          message: "An unexpected error occurred",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return { success: false, message: result.message, data: null };
      }

      return {
        success: true,
        message: "User data retrieved successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error occurred",
        data: null,
      };
    }
  },
};
