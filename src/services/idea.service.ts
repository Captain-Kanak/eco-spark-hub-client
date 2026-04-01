import { env } from "@/env";
import { ApiResponse, Idea } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const ideaServices = {
  getIdeas: async (): Promise<ApiResponse<Idea[]>> => {
    try {
      const url = `${API_URL}/api/v1/ideas`;

      const res = await fetch(url.toString());

      if (!res.ok) {
        return {
          success: false,
          message: "Error fetching ideas",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error fetching ideas",
          data: null,
        };
      }

      return {
        success: true,
        message: result.message || "Ideas fetched successfully",
        data: result.data,
        meta: result.meta,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching ideas",
        data: null,
      };
    }
  },
  getIdeaById: async (id: string): Promise<ApiResponse<Idea>> => {
    try {
      const url = `${API_URL}/api/v1/ideas/${id}`;

      const res = await fetch(url.toString());

      if (!res.ok) {
        return {
          success: false,
          message: "Error fetching idea",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error fetching idea",
          data: null,
        };
      }

      return {
        success: true,
        message: "Error fetching idea",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching idea",
        data: null,
      };
    }
  },
  createIdea: async (payload: Partial<Idea>): Promise<ApiResponse<Idea>> => {
    try {
      const url = `${API_URL}/api/v1/ideas`;

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
          message: "Error creating idea",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error creating idea",
          data: null,
        };
      }

      return {
        success: true,
        message: "Idea created successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error creating idea",
        data: null,
      };
    }
  },
};
