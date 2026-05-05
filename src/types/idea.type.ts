import { User } from "./auth.type";
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
  user: User;
  _count: {
    votes: number;
    comments: number;
    payments: number;
  };
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetIdeaSearchParams {
  page?: string;
  limit?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  selectFields?: string;
  categoryId?: string;
  includeFields?: string | undefined;
  [key: string]: string | undefined;
}
