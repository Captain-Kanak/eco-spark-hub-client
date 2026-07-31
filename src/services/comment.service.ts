import { env } from "@/env";
import { getCookieHeaders } from "@/lib/getCookieHeaders";
import { ApiResponse, Comment, CreateComment, UpdateComment } from "@/types";

const API_URL = `${env.API_URL}/api/v1/comments`;

export const commentService = {
  createComment: async (
    payload: CreateComment,
  ): Promise<ApiResponse<Comment>> => {
    try {
      const url = `${API_URL}`;

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: await getCookieHeaders(),
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
  updateCommentById: async (
    id: string,
    payload: UpdateComment,
  ): Promise<ApiResponse<Comment>> => {
    try {
      const url = `${API_URL}/${id}`;

      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: await getCookieHeaders(),
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
  deleteCommentById: async (id: string): Promise<ApiResponse<Comment>> => {
    try {
      const url = `${API_URL}/${id}`;

      const res = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
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
