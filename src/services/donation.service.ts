import { env } from "@/env";
import { getCookieHeaders } from "@/lib/getCookieHeaders";
import { ApiResponse, CreatePaymentIntent } from "@/types";

const API_URL = `${env.API_URL}/api/v1/donations`;

export const paymentServices = {
  createPaymentIntent: async (
    payload: CreatePaymentIntent,
  ): Promise<ApiResponse<string>> => {
    try {
      const url = `${API_URL}/create-payment-intent`;

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
};
