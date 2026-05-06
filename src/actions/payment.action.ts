"use server";

import {
  ConfirmPaymentPayload,
  PaymentIntent,
  paymentServices,
} from "@/services/payment.service";
import { ApiResponse, Payment } from "@/types";
import { GetIdeaSearchParams } from "@/types/idea.type";

export const createPaymentIntent = async (
  payload: PaymentIntent,
): Promise<ApiResponse<null>> => {
  return await paymentServices.createPaymentIntent(payload);
};

export const confirmPayment = async (payload: ConfirmPaymentPayload) => {
  return await paymentServices.confirmPayment(payload);
};

export const getSales = async (
  params?: GetIdeaSearchParams,
): Promise<ApiResponse<Payment[]>> => {
  return await paymentServices.getSales(params);
};

export const getAllPayments = async (
  params?: GetIdeaSearchParams,
): Promise<ApiResponse<Payment[]>> => {
  return await paymentServices.getAllPayments(params);
};
