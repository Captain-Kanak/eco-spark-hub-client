import { env } from "@/env";
import { ApiResponse, SearchQueryParams, User } from "@/types";
import { cookies } from "next/headers";

const API_URL = `${env.API_URL}/api/v1/users`;

export const userService = {
  getUsers: async (params: SearchQueryParams): Promise<ApiResponse<User[]>> => {
    try {
      const url = new URL(`${API_URL}`);

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value.toString());
        }
      });

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
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
        message: "Users fetched successfully",
        data: result.data.data,
        meta: result.data.meta,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  updateProfile: async (payload: FormData): Promise<ApiResponse<User>> => {
    try {
      const url = `${API_URL}/update-profile`;

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
        message: "Profile updated successfully",
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
  blockUser: async (userId: string): Promise<ApiResponse<null>> => {
    try {
      const url = `${API_URL}/block/${userId}`;

      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "PATCH",
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
        message: "User blocked successfully",
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
  deleteUser: async (userId: string): Promise<ApiResponse<null>> => {
    try {
      const url = `${API_URL}/delete/${userId}`;

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
        message: "User deleted successfully",
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
};
