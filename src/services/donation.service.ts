import { env } from "@/env";
import { api } from "@/lib/api";
import { CreatePaymentIntent } from "@/types";

const API_URL = `${env.API_URL}/api/v1/donations`;

export const paymentServices = {
  createPaymentIntent: async (payload: CreatePaymentIntent) => {
    return api.post<string>(API_URL, payload, {
      auth: true,
    });
  },
};
