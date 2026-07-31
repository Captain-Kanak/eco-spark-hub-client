import { Idea } from "./idea";

export interface CreateCategory {
  name: string;
  icon?: string;
  description?: string;
}

export interface UpdateCategory {
  name?: string;
  icon?: string;
  description?: string;
}

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
