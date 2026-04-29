"use server";

import {
  ConfirmPaymentPayload,
  PaymentIntent,
  paymentServices,
} from "@/services/payment.service";
import { ApiResponse } from "@/types";

export const createPaymentIntent = async (
  payload: PaymentIntent,
): Promise<ApiResponse<null>> => {
  return await paymentServices.createPaymentIntent(payload);
};

export const confirmPayment = async (payload: ConfirmPaymentPayload) => {
  return await paymentServices.confirmPayment(payload);
};
