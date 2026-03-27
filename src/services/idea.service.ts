import { env } from "@/env";
import { ApiResponse, Idea } from "@/types";

const API_URL = env.API_URL;

export const ideaServices = {
  getIdeas: async (): Promise<ApiResponse<Idea>> => {
    try {
      const url = `${API_URL}/api/v1/ideas`;

      const res = await fetch(url.toString());

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Error fetching ideas" },
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          data: null,
          error: { message: "Error fetching ideas" },
        };
      }

      return {
        data: result.data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: { message: "Error fetching ideas" },
      };
    }
  },
};
