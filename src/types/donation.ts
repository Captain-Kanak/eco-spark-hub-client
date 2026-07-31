import { User } from "./auth";
import { Currency, PaymentGateway, PaymentStatus } from "./enums";
import { Idea } from "./idea";

export interface Donation {
  id: string;
  originalCurrency: Currency;
  originalAmount: string;
  exchangeRate: string;
  baseCurrency: Currency;
  baseAmount: string;
  gateway: PaymentGateway;
  paymentMethod: string | null;
  transactionId: string;
  status: PaymentStatus;
  userId: string;
  ideaId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  user?: User;
  idea?: Idea;
}
