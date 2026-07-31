import { env } from "@/env";
import { ApiResponse, Comment, CreateComment, UpdateComment } from "@/types";
import { cookies } from "next/headers";

const API_URL = `${env.API_URL}/api/v1/comments`;

export const commentService = {
  createComment: async (
    payload: CreateComment,
  ): Promise<ApiResponse<Comment>> => {
    try {
      const url = `${API_URL}`;

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
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

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
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

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
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
