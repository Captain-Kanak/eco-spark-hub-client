import { env } from "@/env";
import { ApiResponse, Idea, Payment } from "@/types";
import { GetIdeaSearchParams } from "@/types/idea.type";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const ideaServices = {
  createIdea: async (payload: FormData): Promise<ApiResponse<Idea>> => {
    try {
      const url = `${API_URL}/api/v1/ideas`;

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
  getIdeas: async (
    params?: GetIdeaSearchParams,
  ): Promise<ApiResponse<Idea[]>> => {
    try {
      const url = new URL(`${API_URL}/api/v1/ideas`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

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
        data: result.data.data,
        meta: result.data.meta,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching ideas",
        data: null,
      };
    }
  },
  getMyIdeas: async (): Promise<ApiResponse<Idea[]>> => {
    try {
      const url = `${API_URL}/api/v1/ideas/my-ideas`;

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
  getPurchasedIdeas: async (): Promise<ApiResponse<Payment[]>> => {
    try {
      const url = `${API_URL}/api/v1/ideas/purchased-ideas`;

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

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
        message: "Ideas fetched successfully",
        data: result.data,
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
        message: "Idea fetched successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching idea",
        data: null,
      };
    }
  },
  updateIdeaById: async (
    id: string,
    payload: FormData,
  ): Promise<ApiResponse<Idea>> => {
    console.log("payload", payload);
    try {
      const url = `${API_URL}/api/v1/ideas/${id}`;

      const cookieStore = await cookies();

      console.log("payload", payload);

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
          message: "Error updating idea",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error updating idea",
          data: null,
        };
      }

      return {
        success: true,
        message: "Idea updated successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error updating idea",
        data: null,
      };
    }
  },
  deleteIdeaById: async (id: string): Promise<ApiResponse<Idea>> => {
    try {
      const url = `${API_URL}/api/v1/ideas/${id}`;

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
          message: "Error deleting idea",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error deleting idea",
          data: null,
        };
      }

      return {
        success: true,
        message: "Idea deleted successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error deleting idea",
        data: null,
      };
    }
  },
};
