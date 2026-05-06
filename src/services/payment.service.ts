import { env } from "@/env";
import { ApiResponse, Payment } from "@/types";
import { GetIdeaSearchParams } from "@/types/idea.type";
import { cookies } from "next/headers";

export interface PaymentIntent {
  ideaId: string;
}

export interface ConfirmPaymentPayload {
  ideaId: string;
  transactionId: string;
  paymentMethod: string;
}

const API_URL = env.API_URL;

export const paymentServices = {
  createPaymentIntent: async (
    payload: PaymentIntent,
  ): Promise<ApiResponse<null>> => {
    try {
      const url = `${API_URL}/api/v1/payments/create-payment-intent`;

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
          message: "Error creating payment intent",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error creating payment intent",
          data: null,
        };
      }

      return {
        success: true,
        message: "Payment intent created successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error creating payment intent",
        data: null,
      };
    }
  },
  confirmPayment: async (
    payload: ConfirmPaymentPayload,
  ): Promise<ApiResponse<null>> => {
    try {
      const url = `${API_URL}/api/v1/payments/confirm-payment`;

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
          message: "Error confirming payment",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error confirming payment",
          data: null,
        };
      }

      return {
        success: true,
        message: "Payment confirmed successfully",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error confirming payment",
        data: null,
      };
    }
  },
  getSales: async (
    params?: GetIdeaSearchParams,
  ): Promise<ApiResponse<Payment[]>> => {
    try {
      const url = new URL(`${API_URL}/api/v1/payments/get-sales`);

      const cookieStore = await cookies();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        return {
          success: false,
          message: "Error fetching payments",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error fetching payments",
          data: null,
        };
      }

      return {
        success: true,
        message: result.message || "Payments fetched successfully",
        data: result.data.data,
        meta: result.data.meta,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching payments",
        data: null,
      };
    }
  },
  getAllPayments: async (
    params?: GetIdeaSearchParams,
  ): Promise<ApiResponse<Payment[]>> => {
    try {
      const url = new URL(`${API_URL}/api/v1/payments/get-all-payments`);

      const cookieStore = await cookies();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        return {
          success: false,
          message: "Error fetching all payments",
          data: null,
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Error fetching all payments",
          data: null,
        };
      }

      return {
        success: true,
        message: result.message || "All payments fetched successfully",
        data: result.data.data,
        meta: result.data.meta,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Error fetching all payments",
        data: null,
      };
    }
  },
};
