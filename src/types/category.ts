import { Idea } from "./idea";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  ideas?: Idea[];
}
