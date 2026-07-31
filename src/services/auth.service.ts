import { env } from "@/env";
import { getCookieHeaders } from "@/lib/getCookieHeaders";
import {
  ApiResponse,
  LoginUser,
  RegisterUser,
  User,
  VerifyEmail,
} from "@/types";

const API_URL = `${env.API_URL}/api/v1/auth`;

export const authService = {
  register: async (payload: RegisterUser): Promise<ApiResponse<User>> => {
    try {
      const url = `${API_URL}/register`;

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
        return {
          success: false,
          message: result.message,
          data: null,
        };
      }

      return {
        success: true,
        message: result.message,
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
  verifyEmail: async (payload: VerifyEmail): Promise<ApiResponse<null>> => {
    try {
      const url = `${API_URL}/verify-email`;

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
        return {
          success: false,
          message: result.message,
          data: null,
        };
      }

      return {
        success: true,
        message: result.message,
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
  login: async (payload: LoginUser): Promise<ApiResponse<User>> => {
    try {
      const url = `${API_URL}/login`;

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 403) {
        return {
          success: false,
          message:
            "Your account has not been verified, please verify your account",
          data: null,
        };
      }

      if (!res.ok) {
        return {
          success: false,
          message: "An unexpected error occurred",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message,
          data: null,
        };
      }

      const { token, user } = result.data;

      // await setBetterAuthTokenInCookie(token);

      return {
        success: true,
        message: result.message,
        data: user,
      };
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
      const url = `${API_URL}/get-me`;

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: await getCookieHeaders(),
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
        return {
          success: false,
          message: result.message,
          data: null,
        };
      }

      return {
        success: true,
        message: result.message,
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
