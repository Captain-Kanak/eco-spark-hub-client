import { User } from "./auth";
import { Category } from "./category";
import { Comment } from "./comment";
import { IdeaStatus } from "./enums";
import { Like } from "./like";

export interface Idea {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  description: string;
  problemStatement: string;
  proposedSolution: string;
  expectedImpact: string[];
  location: string;
  estimatedBudget: string;
  fundingGoal: string;
  currentFunding: string;
  status: IdeaStatus;
  views: number;
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  user?: User;
  category?: Category;

  likes?: Like[];
  comments?: Comment[];
  // donations?: Donation[];
  ideaUpdates?: IdeaUpdate[];
}

export interface IdeaUpdate {
  id: string;
  title: string;
  content: string;
  progressPercentage: number;
  userId: string;
  ideaId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  user?: User;

  ideaUpdateImages?: IdeaUpdateImage[];
}

export interface IdeaUpdateImage {
  id: string;
  imageUrl: string | null;
  ideaUpdateId: string;
  createdAt: string;
}
