import { env } from "@/env";
import { ApiResponse, Idea, SearchQueryParams } from "@/types";
import { IdeaStatus } from "@/types/enums";
import { cookies } from "next/headers";

const API_URL = `${env.API_URL}/api/v1/ideas`;

export const ideaServices = {
  createIdea: async (payload: FormData): Promise<ApiResponse<Idea>> => {
    try {
      const url = `${API_URL}`;

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: payload,
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
  getIdeas: async (
    params?: SearchQueryParams,
  ): Promise<ApiResponse<Idea[]>> => {
    try {
      const url = new URL(`${API_URL}`);

      const cookieStore = await cookies();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const res = await fetch(url.toString(), {
        method: "GET",
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
        data: result.data.data,
        meta: result.data.meta,
      };
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error occurred",
        data: null,
      };
    }
  },
  updateIdeaStatusById: async (
    id: string,
    status: IdeaStatus,
  ): Promise<ApiResponse<Idea>> => {
    try {
      const url = `${API_URL}/update-status/${id}`;

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
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
  getIdeaById: async (id: string): Promise<ApiResponse<Idea>> => {
    try {
      const url = `${API_URL}/${id}`;

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "GET",
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
  updateIdeaById: async (
    id: string,
    payload: FormData,
  ): Promise<ApiResponse<Idea>> => {
    try {
      const url = `${API_URL}/${id}`;

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: payload,
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
  deleteIdeaById: async (id: string): Promise<ApiResponse<Idea>> => {
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
