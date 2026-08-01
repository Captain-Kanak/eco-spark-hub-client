"use server";

import { donationService } from "@/services/donation.service";
import { CreatePaymentIntent } from "@/types";

const createPaymentIntent = async (payload: CreatePaymentIntent) => {
  return await donationService.createPaymentIntent(payload);
};

export const donationAction = {
  createPaymentIntent,
};
