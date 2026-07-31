import type { Idea } from "./idea";
import type { User } from "./user";

export interface Like {
  id: string;
  userId: string;
  ideaId: string;
  createdAt: string;

  user?: User;
  idea?: Idea;
}
