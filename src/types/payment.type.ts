import { PaymentStatus } from "./enums";

export interface Payment {
  id: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  paymentMethod: string;
  isDeleted: boolean;
  ideaId: string;
  userId: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}
