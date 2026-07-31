import { env } from "@/env";
import { ApiResponse, CreatePaymentIntent } from "@/types";
import { cookies } from "next/headers";

const API_URL = `${env.API_URL}/api/v1/donations`;

export const paymentServices = {
  createPaymentIntent: async (
    payload: CreatePaymentIntent,
  ): Promise<ApiResponse<string>> => {
    try {
      const url = `${API_URL}/create-payment-intent`;

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
};
