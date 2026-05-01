import { User } from "./auth.type";
import { PaymentStatus } from "./enums";
import { Idea } from "./idea.type";

export interface Payment {
  id: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  paymentMethod: string;
  isDeleted: boolean;
  ideaId: string;
  idea: Idea;
  userId: string;
  user: User;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}
