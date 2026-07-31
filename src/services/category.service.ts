import { env } from "@/env";
import { ApiResponse, Category, SearchQueryParams } from "@/types";
import { cookies } from "next/headers";

const API_URL = `${env.API_URL}/api/v1/categories`;

export const categoryServices = {
  createCategory: async (payload: FormData): Promise<ApiResponse<Category>> => {
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
  getCategories: async (
    params?: SearchQueryParams,
  ): Promise<ApiResponse<Category[]>> => {
    try {
      const url = new URL(`${API_URL}`);

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
  getCategoryById: async (id: string): Promise<ApiResponse<Category>> => {
    try {
      const url = `${API_URL}/${id}`;

      const res = await fetch(url.toString());

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
  updateCategory: async (
    id: string,
    payload: FormData,
  ): Promise<ApiResponse<Category>> => {
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
  deleteCategory: async (id: string): Promise<ApiResponse<Category>> => {
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
