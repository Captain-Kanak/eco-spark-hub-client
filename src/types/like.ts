import type { Idea } from "./idea";
import type { User } from "./auth";

export interface Like {
  id: string;
  userId: string;
  ideaId: string;
  createdAt: string;

  user?: User;
  idea?: Idea;
}
