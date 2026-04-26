import { IdeaStatus } from "./enums";

export interface Idea {
  id: string;
  title: string;
  description: string;
  image: string | null;
  problemStatement: string;
  solution: string;
  isPaid: boolean;
  price: number | null;
  status: IdeaStatus;
  feedback: string | null;
  upvotes: number;
  downvotes: number;
  isDeleted: boolean;
  categoryId: string;
  userId: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
