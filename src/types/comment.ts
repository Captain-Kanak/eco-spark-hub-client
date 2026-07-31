import type { Idea } from "./idea";
import type { User } from "./auth";

export interface Comment {
  id: string;
  content: string;
  userId: string;
  ideaId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  user?: User;
  idea?: Idea;

  parent?: Comment;
  replies?: Comment[];
}
