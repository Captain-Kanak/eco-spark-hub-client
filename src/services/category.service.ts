import { env } from "@/env";
import { ApiResponse, Category, Idea } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const categoryServices = {
  createCategory: async (payload: FormData): Promise<ApiResponse<Category>> => {
    try {
      const url = `${API_URL}/api/v1/categories`;

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
          message: "Error creating category",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error creating category",
          data: null,
        };
      }

      return {
        success: true,
        message: "Category created successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error creating category",
        data: null,
      };
    }
  },
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    try {
      const url = `${API_URL}/api/v1/categories`;

      const res = await fetch(url.toString());

      if (!res.ok) {
        return {
          success: false,
          message: "Error fetching categories",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error fetching categories",
          data: null,
        };
      }

      return {
        success: true,
        message: "Categories fetched successfully",
        data: result.data.data,
        meta: result.data.meta,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching categories",
        data: null,
      };
    }
  },
};
