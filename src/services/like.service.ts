import { env } from "@/env";
import { getCookieHeaders } from "@/lib/getCookieHeaders";
import { ApiResponse, Like } from "@/types";

const API_URL = `${env.API_URL}/api/v1/likes`;

export const userService = {
  likeHandler: async (ideaId: string): Promise<ApiResponse<Like>> => {
    try {
      const url = `${API_URL}/${ideaId}`;

      const res = await fetch(url.toString(), {
        method: "POST",
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
