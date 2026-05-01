import { env } from "@/env";
import { ApiResponse } from "@/types";
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
  getMyPayments: async () => {},
};
